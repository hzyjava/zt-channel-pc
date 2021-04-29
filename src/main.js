import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import store from './store'
import mixins from './mixins'
import {
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Button,
  Tabs,
  Radio,
  Tag
} from 'ant-design-vue'
import './styles/common.less'
import axios from './utils/request'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2497116_xm2pt5ickq.js'
})
Vue.component('icon-font', IconFont)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Radio)
Vue.use(Breadcrumb)
Vue.use(Button)
Vue.use(Tabs)
Vue.use(Tag)

Vue.mixin(mixins)
Vue.config.productionTip = false
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
