/*
 * @Autor: hezy
 * @Description:
 * @Date: 2021-04-25 08:39:09
 * @LastEditTime: 2021-04-27 09:39:31
 */
import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutation from './mutation'
import actions from './actions'

import app from './modules/app'
import user from './modules/user'
import channel from './modules/channel'
import permission from './modules/permission'
import srm from './modules/srm'
import cms from './modules/cms'
import tagsView from './modules/tagsView'

Vue.use(Vuex)

export default new Vuex.Store({
  namespaced: true,
  state: state,
  getters: getters,
  mutation: mutation,
  actions: actions,
  modules: {
    app,
    user,
    permission,
    channel,
    srm,
    cms,
    tagsView
  }
})
