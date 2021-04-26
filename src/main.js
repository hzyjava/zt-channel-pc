/*
 * @Autor: zhanglp
 * @Description:
 * @Date: 2021-04-26 14:20:14
 * @LastEditTime: 2021-04-26 14:32:31
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Layout, Menu, Icon, Breadcrumb, Button } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Breadcrumb);
Vue.use(Button);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
