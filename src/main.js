/*
 * @Autor: hezy
 * @Description:
 * @Date: 2021-04-25 08:39:09
 * @LastEditTime: 2021-04-26 13:32:25
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import {
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Button,
  Tabs,
  Radio
} from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Breadcrumb);
Vue.use(Button);
Vue.use(Tabs);
Vue.use(Radio);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
