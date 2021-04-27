/*
 * @Autor: hezy
 * @Description:
 * @Date: 2021-04-27 09:35:51
 * @LastEditTime: 2021-04-27 09:40:15
 */

export default {
  // 登录信息
  LOGIN: (state, data) => {
    state.login = data;
    sessionStorage.login = JSON.stringify(data);
  },
  LOGINOUT: state => {
    state.login = null;
    sessionStorage.removeItem("login");
  },
  // 按钮权限
  BUTTONPERMISSION: (state, data) => {
    state.buttonPermission = data;
  },
  QINIUDOMAIN: (state, data) => {
    state.qiniuDomain = data;
  },
  // 标签数组tags
  TAGS: (state, payload) => {
    state.tags = payload;
  },
  // 跳转路由信息
  ROUTE: (state, payload) => {
    state.routeData = payload;
  },
  // 忽略缓存
  REFRESH: (state, payload) => {
    state.refresh = payload;
  },
  // 缓存页面数组
  INCLUDELIST: (state, payload) => {
    state.includeList = payload;
  }
};
