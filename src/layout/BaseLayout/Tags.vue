<template>
  <div class="tags-body" v-if="showTags">
    <a-tag
      v-for="(tag, index) in tags"
      :key="tag.path"
      :closable="tag.path !== '/Home'"
      class="tag"
      :class="{ active: isActive(tag.path) }"
      @click.native="onLink(tag)"
      @close="tagClose(index)"
    >
      {{ tag.title }}
    </a-tag>
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: String,
      default: ''
    }
    // tags: {
    //   type: Array,
    //   default: function() {
    //     return []
    //   }
    // }
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
      return this.tags.length > 0
    },
    visitedViews() {
      return this.$store.state.tagsView.visitedViews
    },
    tags() {
      return this.$store.state.tagsView.visitedViews
    }
  },
  watch: {
    // 对router进行监听，每当访问router时，对tags的进行修改
    $route(newValue) {
      console.log('$route', newValue)
      console.log('tags==', this.tags)
      this.setTags(newValue)
      // this.moveToCurrentTag()
    }
  },
  mounted() {
    console.log('tags||', this.tags)
    // 第一次进入页面时，修改tag的值
    if (this.tags) {
      this.setTags(this.tags)
    } else {
      this.setTags(this.$route)
    }
  },
  // TODO：关闭其他，关闭所有，刷新，关闭单个 悬浮到tags左侧 显示菜单 滚动条
  methods: {
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    },
    openMenu(tag, e) {
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    isActive(path) {
      console.log('isActive', path, this.$route.fullPath)
      return path === this.$route.fullPath
    },
    moveToCurrentTag() {
      // this.$store.dispatch('tagsView/updateVisitedView', this.$route)
    },
    // 设置标签
    setTags(route) {
      console.log('route', route)
      if (!route.name) return

      const isExist = this.tags.some(item => {
        return item.path === route.fullPath
      })
      !isExist &&
        this.tags.push({
          title: route.meta.title,
          path: route.fullPath,
          meta: route.meta,
          name: route.matched[1].components.default.name
        })
      console.log(this.tags)
      this.$store.dispatch('tagsView/addView', {
        title: route.meta.title,
        path: route.fullPath,
        meta: route.meta,
        name: route.matched[1].components.default.name
      })
    },
    // 跳转指定页面
    onLink: function(tag) {
      if (tag.query) {
        this.jump(tag.path, tag.query)
        return
      }
      this.jump(tag.path)
    },
    tagClose(index) {
      // e.preventDefault();
      const delItem = this.tags.splice(index, 1)[0]
      console.log(delItem)
      //del self
      if (this.$route.fullPath === delItem.path) {
        const item = this.tags[index] ? this.tags[index] : this.tags[index - 1]
        console.log('tagClose', index, delItem, item)
        if (item) {
          delItem.path === this.$route.fullPath && this.$router.push(item.path)
        } else {
          // TODO:报错，需要给默认不关闭tab
          this.$router.push('/')
        }
      } else {
        //del other
        console.log('fullPath', this.$route.fullPath)
        this.$router.push(this.$route.fullPath)
      }
    },
    // 当关闭所有页面时隐藏
    handleTags(command) {
      command === 'other' ? this.closeOther() : this.closeAll()
    },
    // 关闭全部标签
    closeAll() {
      this.tags = []
      this.$router.push('/')
    },
    // 关闭其他标签
    closeOther() {
      const curItem = this.tags.filter(item => {
        return item.path === this.$route.fullPath
      })
      this.tags = curItem
    }
  }
}
</script>

<style lang="less">
@import '@/styles/variable.less';
.tags-body {
  padding: 5px 6px 0;
  background: @background-color;
  border-bottom: 1px solid @primary-color;
  overflow-x: auto;
  // overflow-y: hidden;
  white-space: nowrap;
  display: flex;

  &:-webkit-scrollbar {
    width: 4px;
  }

  &:-webkit-scrollbar-thumb {
    background-color: #d9d9d9;
  }

  .tags:not(.active):hover {
    background: #f8f8f8;
  }
  .ant-tag.active {
    color: #fff;
    border: 1px solid #026dc6;
    background-color: #026dc6 !important;
  }
}
</style>
