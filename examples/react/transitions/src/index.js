import React from "react";
import ReactDOM from "react-dom";
import { curi } from "@curi/router";
import Browser from "@hickory/browser";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { curiProvider } from "@curi/react-dom";

import routes from "./routes";
import NavLinks from "./components/NavLinks";

const history = Browser();
const router = curi(history, routes);
const Router = curiProvider(router);

ReactDOM.render(
  <Router>
    {({ response }) => {
      const { location, params, body: Body } = response;
      return (
        <div>
          <NavLinks />
          <TransitionGroup>
            <CSSTransition
              key={location.pathname}
              classNames="fade"
              timeout={500}
            >
              <Body params={params} />
            </CSSTransition>
          </TransitionGroup>
        </div>
      );
    }}
  </Router>,
  document.getElementById("root")
);
