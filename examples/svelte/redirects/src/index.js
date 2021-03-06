import Browser from "@hickory/browser";
import { curi } from "@curi/router";
import { curiStore } from "@curi/svelte";
import { Store } from "svelte/store";
import { parse, stringify } from "qs";

import routes from "./routes";
import app from "./components/App.html";

const history = Browser({
  query: { parse, stringify }
});
const router = curi(history, routes, {
  emitRedirects: false
});
const store = curiStore(router);

const target = document.getElementById("root");
const view = new app({ target, store });
