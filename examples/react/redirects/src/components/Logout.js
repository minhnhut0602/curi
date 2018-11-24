import React from "react";

import fakeAuth from "../fakeAuth";

const Logout = props => (
  <div>
    <button
      type="button"
      onClick={e => {
        fakeAuth.logout();
        props.history.navigate("/", "REPLACE");
      }}
    >
      Logout
    </button>
  </div>
);

export default Logout;
