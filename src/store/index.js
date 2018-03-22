import Vue from "vue";
import Vuex from "vuex";
import { mutations, state } from "./mutations";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  actions: {},
  getters: {
    lastPunchType: state => {
      var lastPunch = state.punches[state.punches.length - 1];
      return lastPunch.punchType;
    }
  }
});
