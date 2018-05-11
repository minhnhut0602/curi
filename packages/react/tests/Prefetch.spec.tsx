import "jest";
import React from "react";
import ReactDOM from "react-dom";
import InMemory from "@hickory/in-memory";
import curi from "@curi/core";
import prefetchInteraction from "@curi/route-prefetch";

import Prefetch from "../src/Prefetch";
import Link from "../src/Link";
import CuriProvider from "../src/CuriProvider";

// simulate IntersectionObserver
// https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver
function createIntersectionObserver() {
  let entries = [];
  // noop
  let callback: (...any: Array<any>) => void = () => {};
  let intersectionRatio = 1;
  function flush() {
    callback(entries);
  }
  const observe = jest.fn(target => {
    entries.push({
      target,
      intersectionRatio
    });
    flush();
  });
  function update(target, ratio) {
    entries = entries.map(
      e =>
        e.target !== target
          ? e
          : {
              target,
              intersectionRatio: ratio
            }
    );
    flush();
  }
  const disconnect = jest.fn();
  const unobserve = jest.fn();

  return {
    entries,
    observe,
    disconnect,
    unobserve,
    update,
    setRatio(ratio) {
      intersectionRatio = ratio;
    },
    io(fn) {
      callback = fn;
      return {
        observe,
        disconnect,
        unobserve
      };
    }
  };
}

function childrenResponse({ response }) {
  const { body: Body } = response;
  return <Body response={response} />;
}

describe("prefetch", () => {
  let node, intersection;

  beforeEach(() => {
    node = document.createElement("div");
    intersection = createIntersectionObserver();
    global.IntersectionObserver = intersection.io;
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(node);
    jest.resetAllMocks();
  });

  describe("calling callback", () => {
    let linkRef;

    const history = InMemory();
    const prefetchRoute = {
      name: "Prefetch",
      path: "prefetch",
      on: {
        // use on.every instead of on.initial so that the routes
        // can be re-used (on.initial() is only called once)
        every: jest.fn()
      }
    };
    const routes = [
      {
        name: "Home",
        path: "",
        response() {
          return {
            body: () => (
              <Prefetch match={{ name: "Prefetch" }}>
                {ref => {
                  linkRef = ref;
                  return (
                    <Link to="Prefetch" ref={ref}>
                      Prefetch
                    </Link>
                  );
                }}
              </Prefetch>
            )
          };
        }
      },
      prefetchRoute,
      { name: "Not Found", path: "(.*)" }
    ];
    const router = curi(history, routes, {
      route: [prefetchInteraction()]
    });

    afterEach(() => {
      prefetchRoute.on.every.mockReset();
    });

    it('calls "on" fns immediately if the element is immediately visible', () => {
      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(prefetchRoute.on.every.mock.calls.length).toBe(1);
    });

    it('does not call "on" fns immediately if the element is not visible', () => {
      intersection.setRatio(0);
      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(prefetchRoute.on.every.mock.calls.length).toBe(0);
    });

    it('calls "on" fns when element becomes visible', () => {
      intersection.setRatio(0);
      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(prefetchRoute.on.every.mock.calls.length).toBe(0);
      intersection.update(linkRef.current, 1);
      expect(prefetchRoute.on.every.mock.calls.length).toBe(1);
    });

    it("stops observing ref and disconnects observer after calling callback", () => {
      expect(intersection.unobserve.mock.calls.length).toBe(0);
      expect(intersection.disconnect.mock.calls.length).toBe(0);
      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(prefetchRoute.on.every.mock.calls.length).toBe(1);
      expect(intersection.unobserve.mock.calls.length).toBe(1);
      expect(intersection.disconnect.mock.calls.length).toBe(1);
      expect(intersection.unobserve.mock.calls[0][0]).toBe(linkRef.current);
    });
  });

  describe("changing refs", () => {
    it("stops observing old ref, starts observing new ref", () => {
      // cannot be visible to start or else it will be called immediately
      intersection.setRatio(0);
      const history = InMemory();
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        on: {
          // use on.every instead of on.initial so that the routes
          // can be re-used (on.initial() is only called once)
          every: jest.fn()
        }
      };
      const routes = [
        {
          name: "Home",
          path: ""
        },
        prefetchRoute,
        { name: "Not Found", path: "(.*)" }
      ];
      const router = curi(history, routes, {
        route: [prefetchInteraction()]
      });

      expect(intersection.unobserve.mock.calls.length).toBe(0);
      expect(intersection.disconnect.mock.calls.length).toBe(0);
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Prefetch match={{ name: "Prefetch" }}>
              {ref => (
                <Link to="Prefetch" ref={ref}>
                  Prefetch
                </Link>
              )}
            </Prefetch>
          )}
        </CuriProvider>,
        node
      );

      expect(intersection.unobserve.mock.calls.length).toBe(0);
      expect(intersection.disconnect.mock.calls.length).toBe(0);

      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Prefetch match={{ name: "Prefetch" }}>
              {ref => <div>Prefetch</div>}
            </Prefetch>
          )}
        </CuriProvider>,
        node
      );

      expect(prefetchRoute.on.every.mock.calls.length).toBe(0);
      expect(intersection.unobserve.mock.calls.length).toBe(1);
      expect(intersection.disconnect.mock.calls.length).toBe(0);
    });

    it("doesn't add new observer if data is already fetched", () => {
      const history = InMemory();
      const routes = [
        {
          name: "Home",
          path: ""
        },
        {
          name: "Prefetch",
          path: "prefetch",
          on: {
            // use on.every instead of on.initial so that the routes
            // can be re-used (on.initial() is only called once)
            every: jest.fn()
          }
        },
        { name: "Not Found", path: "(.*)" }
      ];
      const router = curi(history, routes, {
        route: [prefetchInteraction()]
      });

      expect(intersection.unobserve.mock.calls.length).toBe(0);
      expect(intersection.disconnect.mock.calls.length).toBe(0);
      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Prefetch match={{ name: "Prefetch" }}>
              {ref => (
                <Link to="Prefetch" ref={ref}>
                  Prefetch
                </Link>
              )}
            </Prefetch>
          )}
        </CuriProvider>,
        node
      );

      expect(intersection.observe.mock.calls.length).toBe(1);
      expect(intersection.unobserve.mock.calls.length).toBe(1);
      expect(intersection.disconnect.mock.calls.length).toBe(1);

      ReactDOM.render(
        <CuriProvider router={router}>
          {() => (
            <Prefetch match={{ name: "Prefetch" }}>
              {ref => <div>Prefetch</div>}
            </Prefetch>
          )}
        </CuriProvider>,
        node
      );
      // no new observer
      expect(intersection.observe.mock.calls.length).toBe(1);
    });
  });

  describe("match", () => {
    it('passes match object to "on" fns', () => {
      const history = InMemory();
      const match = { name: "Prefetch" };
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        on: {
          initial: jest.fn(),
          every: jest.fn()
        }
      };
      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return {
              body: () => (
                <Prefetch match={match}>
                  {ref => (
                    <Link to="Prefetch" ref={ref}>
                      Prefetch
                    </Link>
                  )}
                </Prefetch>
              )
            };
          }
        },
        prefetchRoute,
        { name: "Not Found", path: "(.*)" }
      ];
      const router = curi(history, routes, {
        route: [prefetchInteraction()]
      });

      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(prefetchRoute.on.initial.mock.calls[0][0]).toBe(match);
      expect(prefetchRoute.on.every.mock.calls[0][0]).toBe(match);
    });
  });

  describe("which", () => {
    it("calls both on.initial() and on.every() by default", () => {
      const history = InMemory();
      const match = { name: "Prefetch" };
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        on: {
          initial: jest.fn(),
          every: jest.fn()
        }
      };
      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return {
              body: () => (
                <Prefetch match={match}>
                  {ref => (
                    <Link to="Prefetch" ref={ref}>
                      Prefetch
                    </Link>
                  )}
                </Prefetch>
              )
            };
          }
        },
        prefetchRoute,
        { name: "Not Found", path: "(.*)" }
      ];
      const router = curi(history, routes, {
        route: [prefetchInteraction()]
      });

      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(prefetchRoute.on.initial.mock.calls.length).toBe(1);
      expect(prefetchRoute.on.every.mock.calls.length).toBe(1);
    });

    describe("{ initial: true } (implicit every=false)", () => {
      it("calls on.initial(), does not call on.every()", () => {
        const history = InMemory();
        const match = { name: "Prefetch" };
        const prefetchRoute = {
          name: "Prefetch",
          path: "prefetch",
          on: {
            initial: jest.fn(),
            every: jest.fn()
          }
        };
        const routes = [
          {
            name: "Home",
            path: "",
            response() {
              return {
                body: () => (
                  <Prefetch match={match} which={{ initial: true }}>
                    {ref => (
                      <Link to="Prefetch" ref={ref}>
                        Prefetch
                      </Link>
                    )}
                  </Prefetch>
                )
              };
            }
          },
          prefetchRoute,
          { name: "Not Found", path: "(.*)" }
        ];
        const router = curi(history, routes, {
          route: [prefetchInteraction()]
        });

        ReactDOM.render(
          <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
          node
        );

        expect(prefetchRoute.on.initial.mock.calls.length).toBe(1);
        expect(prefetchRoute.on.every.mock.calls.length).toBe(0);
      });
    });

    describe("{ every: true } (implicit initial=false)", () => {
      it("calls on.initial(), does not call on.every()", () => {
        const history = InMemory();
        const match = { name: "Prefetch" };
        const prefetchRoute = {
          name: "Prefetch",
          path: "prefetch",
          on: {
            initial: jest.fn(),
            every: jest.fn()
          }
        };
        const routes = [
          {
            name: "Home",
            path: "",
            response() {
              return {
                body: () => (
                  <Prefetch match={match} which={{ every: true }}>
                    {ref => (
                      <Link to="Prefetch" ref={ref}>
                        Prefetch
                      </Link>
                    )}
                  </Prefetch>
                )
              };
            }
          },
          prefetchRoute,
          { name: "Not Found", path: "(.*)" }
        ];
        const router = curi(history, routes, {
          route: [prefetchInteraction()]
        });

        ReactDOM.render(
          <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
          node
        );

        expect(prefetchRoute.on.initial.mock.calls.length).toBe(0);
        expect(prefetchRoute.on.every.mock.calls.length).toBe(1);
      });
    });
  });

  describe("children() render-invoked prop", () => {
    it("is called with a ref object to pass to a component that it renders", () => {
      const history = InMemory();
      const match = { name: "Prefetch" };
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        on: {
          initial: jest.fn(),
          every: jest.fn()
        }
      };
      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return {
              body: () => (
                <Prefetch match={match}>
                  {ref => {
                    // verify that ref is an object with a current property
                    // (this is what React.createRef() creates)
                    expect(ref).toHaveProperty("current");
                    return (
                      <Link to="Prefetch" ref={ref}>
                        Prefetch
                      </Link>
                    );
                  }}
                </Prefetch>
              )
            };
          }
        },
        prefetchRoute,
        { name: "Not Found", path: "(.*)" }
      ];
      const router = curi(history, routes, {
        route: [prefetchInteraction()]
      });

      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
    });
  });

  describe("ref", () => {
    it("re-uses the provided ref", () => {
      const history = InMemory();
      const match = { name: "Prefetch" };
      const ref = React.createRef();
      let linkRef;
      const prefetchRoute = {
        name: "Prefetch",
        path: "prefetch",
        on: {
          initial: jest.fn(),
          every: jest.fn()
        }
      };
      const routes = [
        {
          name: "Home",
          path: "",
          response() {
            return {
              body: () => (
                <Prefetch ref={ref} match={match}>
                  {ref => {
                    linkRef = ref;
                    return (
                      <Link to="Prefetch" ref={ref}>
                        Prefetch
                      </Link>
                    );
                  }}
                </Prefetch>
              )
            };
          }
        },
        prefetchRoute,
        { name: "Not Found", path: "(.*)" }
      ];
      const router = curi(history, routes, {
        route: [prefetchInteraction()]
      });

      ReactDOM.render(
        <CuriProvider router={router}>{childrenResponse}</CuriProvider>,
        node
      );
      expect(linkRef).toBe(ref);
    });
  });
});
