import Vue from "vue";
import Router from "vue-router";
import Week from "./views/Week.vue";
import About from "./views/About.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Week
    },
    {
      path: "/week/:date",
      name: "week",
      component: Week
    },
    {
      path: "/about",
      name: "about",
      component: About
    }
  ]
});
