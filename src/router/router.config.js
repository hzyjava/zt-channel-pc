import { mainMenuLayout } from "@/components/layouts";
const Home = () => import("@/views/Home.vue");

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: "/404",
    component: () =>
      import(/* webpackChunkName: "fail" */ "@/views/exception/404")
  },
  {
    path: "/",
    name: "systemchannel",
    component: mainMenuLayout,
    meta: { title: "轨迹管理" },
    redirect: "/dashboard/workplace",
    children: [
      {
        path: "/offline",
        name: "offline",
        redirect: "/offline",
        component: mainMenuLayout,
        meta: {
          title: "离线工作台",
          icon: "dashboard",
          permission: ["dashboard"]
        },
        children: [
          {
            path: "/offline/auto/:code",
            title: "TIS跟进工作台",
            name: "report",
            component: () =>
              import("@/views/modules/online/cgreport/OnlCgreportAutoList")
          }
        ]
      }
    ]
  }
];
