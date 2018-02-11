import Vue from "vue";
import curi from "@curi/core";
import { CuriPlugin } from "@curi/vue";
import Browser from "@hickory/browser";

import routes from "./routes";
import App from "./components/App";

const history = Browser();
const router = curi(history, routes);

Vue.use(CuriPlugin, { router });

router.respond(() => {
  const vm = new Vue({
    el: "#root",
    template: "<app />",
    components: { app: App }
  });
});