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

const getState = function(name, value) {
  value = typeof value === 'undefined' ? null : value
  return (
    JSON.parse(sessionStorage.getItem(name)) ||
    JSON.parse(localStorage.getItem(name)) ||
    value
  )
}
Vue.use(Vuex)

const state = {
  login: getState('login'), // 用户登录信息,可包含token
  buttonPermission: getState('buttonPermission'), // 按钮权限
  tags: [], // 标签数组
  routeData: {}, // 路由信息
  includeList: [], // 缓存路由
  refresh: false // 是否刷新缓存
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
    cms
  }
})
