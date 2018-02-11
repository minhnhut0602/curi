import Vue from "vue";
import Browser from "@hickory/browser";
import curi from "@curi/core";
import { CuriPlugin } from "@curi/vue";
import createActiveAddon from "@curi/addon-active";

import routes from "./routes";
import App from "./components/App";

const history = Browser();

const router = curi(history, routes, {
  addons: [createActiveAddon()]
});
Vue.use(CuriPlugin, { router });

router.respond(() => {
  const vm = new Vue({
    el: "#root",
    template: "<app />",
    components: { app: App }
  });
});