import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { createI18n } from "./i18n";
import store from "./store";
import "./registerServiceWorker";

Vue.config.productionTip = false;

const i18n = createI18n();

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
