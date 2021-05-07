export const routes = [
  {
    path: '/user',
    component: { render: h => h('router-view') },
    children: [
      {
        path: '/user/login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "login" */ '@layout/UserLayout/Login'),
        meta: {
          title: '登录'
        }
      },
      {
        path: '/user/register',
        name: 'register',
        component: () =>
          import(
            /* webpackChunkName: "register" */ '@layout/UserLayout/Register'
          ),
        meta: {
          title: '注册'
        }
      }
    ]
  },
  {
    path: '/',
    component: () => import('@layout/BaseLayout'),
    // name: "home",
    children: [
      {
        path: '/channel',
        name: 'channel',
        meta: { icon: 'dashboard', title: '轨迹管理' },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/channel/work',
            name: 'work',
            meta: { icon: 'dashboard', title: '工作台' },
            component: { render: h => h('router-view') },
            children: [
              {
                path: '/channel/work/tiswork',
                name: 'tiswork',
                meta: { icon: 'dashboard', title: '跟进工作台' },
                component: () =>
                  import(
                    /* webpackChunkName: "tiswork1" */ '@comp/Form/Form' /* '@views/Channel/WithTheLineWork/TisWork/TisWork' */
                    /* webpackChunkName: "tiswork1" */
                  )
              },
              {
                path: '/channel/work/tisworkit',
                name: 'tisworkit',
                meta: { icon: 'dashboard', title: '跟进工作台IT' },
                component: () =>
                  import(
                    /* webpackChunkName: "tisworkit1" */ '@views/Channel/WithTheLineWork/TisWorkIt/TisWorkIt'
                  )
              }
            ]
          },
          {
            path: '/channel/query',
            name: 'query',
            meta: { icon: 'dashboard', title: '轨迹查询' },
            component: { render: h => h('router-view') },
            children: [
              {
                path: '/channel/query/channeldatastatistical',
                name: 'channeldatastatistical',
                meta: { icon: 'dashboard', title: '轨迹数据统计' },
                component: () =>
                  import(
                    /* webpackChunkName: "channeldatastatistical1" */
                    '@views/Channel/Query/DataStatistical/ChannelDataStatistical'
                  )
              },
              {
                path: '/channel/query/querylist',
                name: 'querylist',
                meta: { icon: 'dashboard', title: '轨迹查询列表' },
                component: () =>
                  import(
                    /* webpackChunkName: "querylist1" */ '@views/Channel/Query/QueryList/ChannelQueryList'
                  )
              }
            ]
          }
        ]
      },
      {
        path: '/srm',
        name: 'srm',
        meta: { icon: 'dashboard', title: 'SRM系统' },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/srm/work',
            name: 'work',
            meta: { icon: 'dashboard', title: '供应商管理' },
            component: { render: h => h('router-view') },
            children: [
              {
                path: '/srm/work/tiswork',
                name: 'tiswork',
                meta: { icon: 'dashboard', title: '签约服务商管理' },
                component: () =>
                  import(
                    /* webpackChunkName: "tiswork" */ '@views/SRM/ContracteServiceProvider/ContracteServiceProvider'
                  )
              },
              {
                path: '/srm/work/tisworkit',
                name: 'tisworkit',
                meta: { icon: 'dashboard', title: '末端服务商管理' },
                component: () =>
                  import(
                    /* webpackChunkName: "tisworkit" */ '@views/Channel/WithTheLineWork/TisWorkIt/TisWorkIt'
                  )
              }
            ]
          },
          {
            path: '/srm/query',
            name: 'query',
            meta: { icon: 'dashboard', title: 'srm轨迹查询' },
            // hideChildrenMenu:true,
            component: { render: h => h('router-view') },
            children: [
              {
                path: '/srm/query/channeldatastatistical',
                name: 'channeldatastatistical',
                meta: { icon: 'dashboard', title: 'srm统计' },
                component: () =>
                  import(
                    /* webpackChunkName: "channeldatastatistical" */ '@views/Channel/Query/DataStatistical/ChannelDataStatistical'
                  )
              },
              {
                path: '/srm/query/querylist',
                name: 'querylist',
                meta: { icon: 'dashboard', title: 'srm查询列表' },
                component: () =>
                  import(
                    /* webpackChunkName: "querylist" */ '@views/Channel/Query/QueryList/ChannelQueryList'
                  )
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*',
    hideMenu: true,
    name: '404',
    component: () =>
      import(/* webpackChunkName: "404" */ '@comp/Exception/404'),
    meta: {
      title: '404 NotFound'
    }
  }
]
