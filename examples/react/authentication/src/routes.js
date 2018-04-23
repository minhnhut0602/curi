import Home from "./components/Home";
import Protected from "./components/Protected";
import Login from "./components/Login";
import Logout from "./components/Logout";
import NotFound from "./components/NotFound";

import fakeAuth from "./fakeAuth";

export default [
  {
    name: "Home",
    path: "",
    match: {
      response: ({ set }) => {
        set.body(Home);
      }
    }
  },
  {
    name: "Protected",
    path: "protected",
    match: {
      response: ({ set }) => {
        if (!fakeAuth.authenticated()) {
          set.redirect(
            {
              name: "Login",
              query: { next: "/protected" }
            },
            302
          );
        } else {
          set.body(Protected);
        }
      }
    }
  },
  {
    name: "Login",
    path: "login",
    match: {
      response: ({ set }) => {
        if (fakeAuth.authenticated()) {
          set.redirect({
            name: "Home"
          });
        }
        set.body(Login);
      }
    }
  },
  {
    name: "Logout",
    path: "logout",
    match: {
      response: ({ set }) => {
        if (!fakeAuth.authenticated()) {
          set.redirect({
            name: "Home"
          });
        }
        set.body(Logout);
      }
    }
  },
  {
    name: "Not Found",
    path: "(.*)",
    match: {
      response: ({ set }) => {
        set.body(NotFound);
      }
    }
  }
];