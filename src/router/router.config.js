// // import { mainMenuLayout } from "@/components/layouts";
// const Home = import("@views/channel/index");

// // import { render } from "node-sass";

// /**
//  * 基础路由
//  * @type { *[] }
//  */
// export const constantRouterMap = [
//   {
//     path: "/",
//     component: () => import("@/layout/BaseLayout"),
//     meta: { title: "渠道中心" },
//     children: [
//       {
//         path: "/channel",
//         name: "channel",
//         meta: {
//           title: "轨迹"
//         },
//         children: [
//           // {
//           //   path: "/channel/work",
//           //   title: "轨迹管理",
//           //   name: "work",
//           //   component: () => import("@views/channel/index")
//           // },
//           {
//             path: "/channel/work",
//             title: "轨迹管理",
//             name: "work",
//             component: () => import("@views/channel/mannerger")
//           }
//         ]
//       }
//     ]
//   },
//   {
//     path: "/work",
//     name: "work",
//     component: Home,
//     meta: {
//       title: "轨迹"
//       // icon: "dashboard",
//       // permission: ["dashboard"]
//     }
//   }
// ];
