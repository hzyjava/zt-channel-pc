<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  created() {
    // this.setStore()
    // this.clearStore()
  },
  methods: {
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    setStore() {
      //在页面加载时读取sessionStorage里的状态信息
      // if (sessionStorage.getItem('store')) {
      //   this.$store.replaceState(
      //     Object.assign(
      //       {},
      //       this.$store.state,
      //       JSON.parse(sessionStorage.getItem('store'))
      //     )
      //   )
      // }
      // //在页面刷新时将vuex里的信息保存到sessionStorage里
      // window.addEventListener('beforeunload', () => {
      //   sessionStorage.setItem('store', JSON.stringify(this.$store.state))
      // })
    },
    clearStore() {
      sessionStorage.clear()
      localStorage.clear()
    }
  }
}
</script>
<style lang="less">
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // overflow: scroll;
  // overflow-y: hidden;
}
</style>
