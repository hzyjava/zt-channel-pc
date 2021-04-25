import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@comp/layout/BaseLayout"),
    name: "home",
    children: [
      {
        path: "/channel",
        name: "channel",
        // redirect: "/channel/work",
        component: () => import("@/App"),
        children: [
          {
            path: "/channel/work",
            name: "cwork",
            component: () => import("@views/channel/work")
          },
          {
            path: "/channel/mannerger",
            title: "轨迹管理",
            name: "cmannerger",
            component: () => import("@views/channel/mannerger")
          }
        ]
      },
      {
        path: "/crm",
        title: "轨迹管理",
        name: "crm",
        component: () => import("@/App"),
        // component: () => import("@views/channel/mannerger"),
        children: [
          {
            path: "/crm/work",
            name: "crmwork",
            component: () => import("@views/crm/work")
          },
          {
            path: "/crm/mannerger",
            title: "轨迹管理",
            name: "crmmannerger",
            component: () => import("@views/crm/mannerger")
          }
        ]
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@comp/layout/BaseLayout"),
    meta: {
      title: "轨迹"
    }
  }
];

const router = new VueRouter({
  // mode: "hash",
  routes,
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 })
});

export default router;
