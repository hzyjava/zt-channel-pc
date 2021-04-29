import { getState } from './storage'

const state = {
  login: getState('login'), // 用户登录信息,可包含token
  btnPermission: getState('btnPermission') // 按钮权限
}

export default state
