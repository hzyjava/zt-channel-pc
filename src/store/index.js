/*
 * @Autor: hezy
 * @Description:
 * @Date: 2021-04-25 08:39:09
 * @LastEditTime: 2021-04-27 09:39:31
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import actions from "./actions";
import mutation from './mutation'
import app from './modules/app'
import user from './modules/user'
import channel from './modules/channel'
import permission from './modules/permission'
import srm from './modules/srm'
import cms from './modules/cms'
import tagsView from './modules/tagsView'

// const getState = function(name, value) {
//   value = typeof value === 'undefined' ? null : value
//   return (
//     JSON.parse(sessionStorage.getItem(name)) ||
//     JSON.parse(localStorage.getItem(name)) ||
//     value
//   )
// }
Vue.use(Vuex)

const state = {
  login: 'login', // 用户登录信息,可包含token
  buttonPermission: 'buttonPermission', // 按钮权限
  // tagsView: {
  visitedViews: 'visitedViews',
  cachedViews: 'cachedViews'
  // }
}

export default new Vuex.Store({
  state: state,
  getters: {},
  mutation: mutation,
  actions: {},
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
