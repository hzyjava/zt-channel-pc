<template>
  <div class="tags-header">
    <div class="tags-body scroll-container" ref="scrollContainer">
      <a-tag
        v-for="tag in visitedViews"
        ref="tag"
        :data="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        :key="tag.path"
        :closable="!isAffix(tag)"
        class="tag"
        :class="{ active: isActive(tag) }"
        @click.native="onLink(tag, $event)"
        @close="closeSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag, $event)"
      >
        {{ tag.title }}
      </a-tag>
    </div>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu"
    >
      <li @click="refreshSelectedTag(selectedTag)">刷新</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        关闭
      </li>
      <li @click="closeOthersTags">关闭其他</li>
      <li @click="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
  </div>
</template>

<script>
// import _ from 'lodash'
// import { mapActions } from 'vuex'
import { Debounce } from '@utils/common'
export default {
  inject: ['reload'],
  props: {
    current: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    showTags() {
      return this.routes.length > 0
    },
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },

    routes() {
      return this.$router.options.routes
      // 后台返回的权限路由和自己需要展示的路由（面板形成数组）
      // return this.$store.state.permission.routes
    }
    // scrollWrapper() {
    //   return this.$refs.scrollContainer
    // }
  },
  watch: {
    // 对router进行监听，每当访问router时，对tags的进行修改
    $route(newValue) {
      this.addTags()
      this.moveToCurrentTag()

      // offsetWidth
      //  const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      // const offsetWidth = this.$el.offsetWidth // container width

      // console.log(this.$refs.tag.getBoundingClientRect().offsetWidth)
      // this.$refs.scrollContainer.scrollLeft = 500
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  // TODO：关闭其他，关闭所有，刷新，关闭单个 悬浮到tags左侧 显示菜单 滚动条
  methods: {
    // ...mapActions(),

    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        console.log(fullPath)
        this.reload()
        // this.$nextTick(() => {
        // this.$router
        //   .replace({
        //     path: fullPath
        //   })
        //   .catch(error => {
        //     if (error.name != 'NavigationDuplicated') {
        //       throw error
        //     }
        //   })
        // this.$router.push({
        //   path: fullPath
        // })
        // .catch(error => {
        //   if (error.name != 'NavigationDuplicated') {
        //     throw error
        //   }
        // })
        // })
      })
    },
    closeSelectedTag(view) {
      this.$store
        .dispatch('tagsView/delView', view)
        .then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view)
          } else {
          }
          this.closeMenu()
        })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store
        .dispatch('tagsView/delOthersViews', this.selectedTag)
        .then(() => {
          this.moveToCurrentTag()
          this.closeMenu()
        })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
        this.closeMenu()
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    //不能删除的，要过滤的tag，比如首页 面板
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    // 默认添加 不能删除的tag
    initTags() {
      // this.$router.options.routes
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes))
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    filterAffixTags(routes) {
      let tags = []
      routes.forEach(route => {
        // 有过滤字段的
        if (route.meta && route.meta.affix) {
          //不能删的路由
          tags.push({
            fullPath: `/${route.path}`,
            path: `/${route.path}`,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    addTags() {
      // 添加默认的两个
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    // 是否选中
    isActive(route) {
      return route.path === this.$route.path
    },
    moveToCurrentTag() {
      this.$nextTick(() => {
        document.querySelector('.tag.active').scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      })
    },
    openMenu: Debounce(function(tag, e) {
      this.visible = false
      const menuMinWidth = 0
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 //+ 15 // 15: margin right
      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = 12 //e.clientY

      this.selectedTag = tag
      this.$nextTick(() => {
        this.visible = true
      })
    }, 500),
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    },
    // 跳转指定页面
    onLink: function(tag, e) {
      // console.log(
      //   document.querySelector('.tag.active').offsetLeft,
      //   this.$refs.scrollContainer.getBoundingClientRect().width
      // )
      // console.log(this.$el, e.target, e.currentTarget)
      // this.$el.querySelector(`.tag.active`).scrollIntoView({
      //   behavior: 'smooth', // 平滑过渡
      //   block: 'start' // 上边框与视窗顶部平齐。默认值
      // })
      this.$nextTick(() => {
        // this.$refs.scrollContainer.scrollTo(200, 0)
        e.target.scrollIntoView({
          behavior: 'smooth', // 平滑过渡
          block: 'start' // 上边框与视窗顶部平齐。默认值
        })
        // document.querySelector('.tag.active').scrollIntoView()
        // document.querySelector('.tag.active').scrollTo({
        //   behavior: 'smooth', //平滑过渡
        //   block: 'start' //上边框与视窗顶部平齐。默认值
        // })
      })

      if (tag.query) {
        this.jump(tag.path, tag.query)
        return
      }
      this.jump(tag.path)
    }
  }
}
</script>

<style lang="less" scoped>
@import '@/styles/variable.less';
.tags-header {
  background: #f7f9fa;
  position: relative;
  .tags-body {
    padding: 8px;
    background: @background-color;
    // border-bottom: 1px solid @primary-color;
    overflow-x: auto;
    // overflow-y: hidden;
    white-space: nowrap;
    display: flex;
    // position: relative;

    // &:-webkit-scrollbar {
    //   width: 4px;
    // }

    // &:-webkit-scrollbar-thumb {
    //   background-color: #d9d9d9;
    // }

    .tags:not(.active):hover {
      background: #f8f8f8;
    }
    .ant-tag.active {
      color: #fff;
      border: 1px solid #026dc6;
      background-color: #026dc6 !important;
    }
  }

  /* 滚动槽 */
  .tags-body::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  .tags-body::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.06);
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.08);
  }
  /* 滚动条滑块 */
  .tags-body::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0, 0, 0, 0.12);
    -webkit-box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
  }
  .contextmenu {
    margin: 0;
    // width: 100px;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
