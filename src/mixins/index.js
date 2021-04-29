export default {
  data() {
    return {}
  },
  computed: {},
  methods: {
    // 路由跳转
    jump: function(to, query, isReplace) {
      if (isReplace) {
        this.$router.replace({ path: to, query: query || {} })
        return
      }
      this.$router.push({ path: to, query: query || {} })
    },
    jumpGo: function(to) {
      this.$router.go(to)
    },
    // 内部跳转(参数包含path,name,keep,query属性)
    jumpInside: function(to) {
      const tags = this.$store.state.vm.tags
      const tagIndex = tags.findIndex(t => t.path === to.path)
      if (tagIndex === -1) {
        tags.push(to)
        this.$store.commit('TAGS', tags)
      } else {
        tags.splice(tagIndex, 1, to)
        this.$store.commit('TAGS', tags)
      }
      this.$store.commit('REFRESH', 'refresh')
      this.jump(to.path, to.query)
    },
    // 跳转外链
    jumpOutside: function(path) {
      window.location.href = path
    },
    // 获取路由信息
    getJump: function(name, value) {
      value = typeof value === 'undefined' ? '' : value
      return this.$route.query[name] || value
    },
    // 权限管理
    permissionRequired: function(permission) {
      return (this.$store.state.buttonPermission || []).includes(permission)
    }
  }
}
