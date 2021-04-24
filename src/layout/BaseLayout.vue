<template>
  <div class="applayout">
  <a-layout id="components-layout-demo-top-side-2">
    <a-layout-header @click="collapsed = !collapsed" class="header">
      <Header/>
    </a-layout-header>
    <a-layout>
      <a-layout-sider
      v-model="collapsed" :trigger="null" collapsible
      breakpoint="lg"
      collapsed-width="0"
      @collapse="onCollapse"
      @breakpoint="onBreakpoint"
       width="200" style="background: #fff">
        <SiderMenu/>
      </a-layout-sider>
      <a-layout class="right-box" style="padding: 0 24px 24px">
        <!-- <a-layout class="right-box-header" style="padding: 0 24px 24px">
        
        </a-layout> -->
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>Home</a-breadcrumb-item>
          <a-breadcrumb-item>List</a-breadcrumb-item>
          <a-breadcrumb-item>App</a-breadcrumb-item>
        </a-breadcrumb>
        
        <a-layout-content
        class='right-box-content'
          :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
         <router-view/>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>

    
    
    
  </div>
</template>

<script>
import Header from '@layout/Header'
import SiderMenu from '@layout/SiderMenu'
export default {
  components:{
    Header,
    SiderMenu

  },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    },
  },
}
</script>

<style lang='scss'>

.applayout{
  height: 100vh;
  // .right-box{
  //   display:flex;
  //   &-header{
  //     height: 100px;
  //   }
  //   &-content{
  //     flex:1;
  //   }
  // }
}
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
#components-layout-demo-top-side-2{
  height: 100vh;
}
</style>
