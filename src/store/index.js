import Vue from "vue";
import Vuex from "vuex";
import app from "./modules/app";
import user from "./modules/user";
import channel from "./modules/channel";
import permission from "./modules/permission";
import srm from "./modules/srm";
import cms from "./modules/cms";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    user,
    permission,
    channel,
    srm,
    cms
  }
});
