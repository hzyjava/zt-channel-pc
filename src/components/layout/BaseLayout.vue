<!--
 * @Author: your name
 * @Date: 2021-04-25 08:39:09
 * @LastEditTime: 2021-04-26 14:43:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \zt-code\src\components\layout\BaseLayout.vue
-->
<template>
  <div class="applayout">
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout-header class="header">
        <Header />
      </a-layout-header>
      <a-layout class="slider ">
        <a-tabs
          :style="{ width: '500px' }"
          default-active-key="/channel"
          :tab-position="tabPosition"
        >
          <a-tab-pane :key="item.path" v-for="item in menuData">
            <span slot="tab">
              <a-icon type="apple" />
              {{ item.meta.title }}
            </span>
            <a-layout-sider
              class="sider"
              v-model="collapsed"
              :trigger="null"
              collapsible
              breakpoint="lg"
              collapsed-width="0"
              @collapse="onCollapse"
              @breakpoint="onBreakpoint"
              width="250"
              :theme="themeLight"
            >
              <SiderMenu :theme="themeLight" />
            </a-layout-sider>
          </a-tab-pane>
        </a-tabs>
        <!-- <a-layout-sider
          v-model="collapsedMain"
          :trigger="null"
          collapsible
          class="sider"
          breakpoint="lg"
          collapsed-width="0"
          @collapse="onCollapse"
          @breakpoint="onBreakpoint"
          width="150"
          :theme="themeDark"
        >
          <MainMenu :theme="themeDark"></MainMenu>
        </a-layout-sider> -->

        <a-layout class="right-box" style="padding: 0 24px 24px">
          <a-breadcrumb style="margin: 16px 0">
            <a-breadcrumb-item>Home</a-breadcrumb-item>
            <a-breadcrumb-item>List</a-breadcrumb-item>
            <a-breadcrumb-item>App</a-breadcrumb-item>
          </a-breadcrumb>
          <a-layout-content
            class="right-box-content"
            :style="{
              background: '#fff',
              padding: '24px',
              margin: 0,
              minHeight: '280px'
            }"
          >
            <router-view />
          </a-layout-content>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "@comp/layout/Header";
// import MainMenu from "@comp/layout/MainMenu";
import SiderMenu from "@comp/layout/SiderMenu";
export default {
  components: {
    Header,
    SiderMenu
    // MainMenu
  },
  data() {
    const menuData = this.initMenuData(this.$router.options.routes);
    return {
      themeDark: "dark",
      themeLight: "light",
      collapsed: false,
      collapsedMain: false,
      tabPosition: "left",
      menuData
    };
  },
  methods: {
    // TODO: dela
    // FIXME: dela
    initMenuData(routes = []) {
      let menuList = [];
      routes &&
        routes.forEach(item => {
          const newItem = { ...item };
          if (newItem.children) {
            menuList = newItem.children;
          }
        });
      return menuList;
    },
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    }
  }
};
</script>

<style lang="less">
.applayout {
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
  .slider {
    min-height: 100vh;
  }
}
#components-layout-demo-top-side-2 .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
#components-layout-demo-top-side-2 {
  height: 100vh;
}
</style>
