import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@comp/Layout/BaseLayout"),
    name: "home",
    children: [
      {
        path: "/channel",
        name: "channel",
        title: "轨迹管理",
        component: () => import("@/App"),
        children: [
          {
            path: "/channel/work",
            name: "work",
            title: "工作台",
            component: () => import("@/App"),
            children: [
              {
                path: "/channel/work/tiswork",
                name: "tiswork",
                component: () =>
                  import("@views/Channel/WithTheLineWork/TisWork/TisWork")
              },
              {
                path: "/channel/work/tisworkit",
                name: "tisworkit",
                component: () =>
                  import("@views/Channel/WithTheLineWork/TisWorkIt/TisWorkIt")
              }
            ]
          },
          {
            path: "/channel/query",
            name: "query",
            title: "轨迹查询",
            component: () => import("@/App"),
            children: [
              {
                path: "/channel/query/channeldatastatistical",
                name: "channeldatastatistical",
                component: () =>
                  import(
                    "@views/Channel/Query/DataStatistical/ChannelDataStatistical"
                  )
              },
              {
                path: "/channel/query/querylist",
                name: "querylist",
                component: () =>
                  import("@views/Channel/Query/QueryList/ChannelQueryList")
              }
            ]
          }
        ]
      },
      {
        path: "/srm",
        name: "channel",
        title: "SRM系统",
        component: () => import("@/App"),
        children: [
          {
            path: "/channel/work",
            name: "work",
            title: "工作台",
            component: () => import("@/App"),
            children: [
              {
                path: "/channel/work/tiswork",
                name: "tiswork",
                component: () =>
                  import("@views/Channel/WithTheLineWork/TisWork/TisWork")
              },
              {
                path: "/channel/work/tisworkit",
                name: "tisworkit",
                component: () =>
                  import("@views/Channel/WithTheLineWork/TisWorkIt/TisWorkIt")
              }
            ]
          },
          {
            path: "/channel/query",
            name: "query",
            title: "轨迹查询",
            component: () => import("@/App"),
            children: [
              {
                path: "/channel/query/channeldatastatistical",
                name: "channeldatastatistical",
                component: () =>
                  import(
                    "@views/Channel/Query/DataStatistical/ChannelDataStatistical"
                  )
              },
              {
                path: "/channel/query/querylist",
                name: "querylist",
                component: () =>
                  import("@views/Channel/Query/QueryList/ChannelQueryList")
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@comp/Layout/BaseLayout"),
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
