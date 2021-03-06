import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './router-config'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRouter)

// 处理路由器推送的导航复制（全局）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  routes,
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 })
})

router.beforeEach((to, from, next) => {
  // 页面路由切换过度
  NProgress.start()
  // 动态修改title
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
router.afterEach(() => {
  const bodySrcollTop = document.body.scrollTop

  if (bodySrcollTop !== 0) {
    document.body.scrollTop = 0
    return
  }
  const docSrcollTop = document.documentElement.scrollTop
  console.log(bodySrcollTop, docSrcollTop)
  if (docSrcollTop !== 0) {
    document.documentElement.scrollTop = 0
  }
  NProgress.done()
})

export default router
