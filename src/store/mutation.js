import * as types from './mutation-types'
export default {
  // 登录信息
  [types.SET_LOGIN](state, payload) {
    state.login = payload
  },
  [types.SET_LOGINOUT](state, payload) {
    state.login = null
  },
  // 按钮权限
  [types.SET_BUTTONPERMISSION](state, payload) {
    state.buttonPermission = payload
  },
  [types.SET_QINIUDOMAIN](state, payload) {
    state.qiniuDomain = payload
  },
  // 标签数组tags
  [types.SET_TAGS](state, payload) {
    state.tags = payload
  },
  // 跳转路由信息
  [types.SET_ROUTE](state, payload) {
    state.routeData = payload
  },
  // 忽略缓存
  [types.SET_REFRESH](state, payload) {
    state.refresh = payload
  },
  // 缓存页面数组
  [types.SET_INCLUDELIST](state, payload) {
    state.includeList = payload
  }
}
