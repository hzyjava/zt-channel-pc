import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@comp/layout/BaseLayout"),
    // name: "home",
    children: [
      {
        path: "/channel",
        name: "channel",
        title: "轨迹管理",
        meta: { icon: "dashboard", title: "轨迹管理" },
        component: () => import("@/App"),
        children: [
          {
            path: "/channel/work",
            name: "work",
            title: "工作台",
            meta: { icon: "dashboard", title: "工作台" },
            component: () => import("@/App"),
            children: [
              {
                path: "/channel/work/tiswork",
                name: "tiswork",
                meta: { icon: "dashboard", title: "跟进工作台" },
                component: () =>
                  import(
                    /* webpackChunkName: "tiswork1" */ "@views/Channel/WithTheLineWork/TisWork/TisWork"
                  )
              },
              {
                path: "/channel/work/tisworkit",
                name: "tisworkit",
                meta: { icon: "dashboard", title: "跟进工作台IT" },
                component: () =>
                  import(
                    /* webpackChunkName: "tisworkit1" */ "@views/Channel/WithTheLineWork/TisWorkIt/TisWorkIt"
                  )
              }
            ]
          },
          {
            path: "/channel/query",
            name: "query",
            title: "轨迹查询",
            meta: { icon: "dashboard", title: "轨迹查询" },
            component: () => import("@/App"),
            children: [
              {
                path: "/channel/query/channeldatastatistical",
                name: "channeldatastatistical",
                meta: { icon: "dashboard", title: "轨迹数据统计" },
                component: () =>
                  import(
                    /* webpackChunkName: "channeldatastatistical1" */
                    "@views/Channel/Query/DataStatistical/ChannelDataStatistical"
                  )
              },
              {
                path: "/channel/query/querylist",
                name: "querylist",
                meta: { icon: "dashboard", title: "轨迹查询列表" },
                component: () =>
                  import(
                    /* webpackChunkName: "querylist1" */ "@views/Channel/Query/QueryList/ChannelQueryList"
                  )
              }
            ]
          }
        ]
      },
      {
        path: "/srm",
        name: "srm",
        title: "SRM系统",
        meta: { icon: "dashboard", title: "SRM系统" },
        component: () => import("@/App"),
        children: [
          {
            path: "/srm/work",
            name: "work",
            title: "工作台",
            meta: { icon: "dashboard", title: "srm工作台" },
            component: () => import("@/App"),
            children: [
              {
                path: "/srm/work/tiswork",
                name: "tiswork",
                meta: { icon: "dashboard", title: "srm工作台1" },
                component: () =>
                  import(
                    /* webpackChunkName: "tiswork" */ "@views/Channel/WithTheLineWork/TisWork/TisWork"
                  )
              },
              {
                path: "/srm/work/tisworkit",
                name: "tisworkit",
                meta: { icon: "dashboard", title: "srm工作台2" },
                component: () =>
                  import(
                    /* webpackChunkName: "tisworkit" */ "@views/Channel/WithTheLineWork/TisWorkIt/TisWorkIt"
                  )
              }
            ]
          },
          {
            path: "/srm/query",
            name: "query",
            title: "轨迹查询",
            meta: { icon: "dashboard", title: "srm轨迹查询" },
            // hideChildrenMenu:true,
            component: () => import("@/App"),
            children: [
              {
                path: "/srm/query/channeldatastatistical",
                name: "channeldatastatistical",
                meta: { icon: "dashboard", title: "srm统计" },
                component: () =>
                  import(
                    /* webpackChunkName: "channeldatastatistical" */ "@views/Channel/Query/DataStatistical/ChannelDataStatistical"
                  )
              },
              {
                path: "/srm/query/querylist",
                name: "querylist",
                meta: { icon: "dashboard", title: "srm查询列表" },
                component: () =>
                  import(
                    /* webpackChunkName: "querylist" */ "@views/Channel/Query/QueryList/ChannelQueryList"
                  )
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: "*",
    hideMenu: true,
    name: "404",
    component: () =>
      import(/* webpackChunkName: "404" */ "@comp/Exception/404"),
    meta: {
      title: "轨迹"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 })
});

export default router;
