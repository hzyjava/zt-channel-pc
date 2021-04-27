import Vue from 'vue'
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
