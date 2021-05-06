<template>
  <div class="applayout">
    <a-layout id="components-layout-demo-top-side-2">
      <Header />

      <a-layout class="slider ">
        <a-tabs
          :style="{ width: 'px' }"
          default-active-key="/channel"
          class="self-tab"
          :tab-position="tabPosition"
        >
          <a-tab-pane
            class="tab-content"
            :key="item.path"
            v-for="item in menuData"
          >
            <span slot="tab">
              <icon-font class="self-icon fz-44" type="icon-tool_1" />
              <span>{{ item.meta.title }}</span>
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
              <SiderMenu :data="item.children" :theme="themeLight" />
            </a-layout-sider>
          </a-tab-pane>
        </a-tabs>

        <a-layout class="right-box" style="padding: 0 24px 24px">
          <div class="tags-box">
            <Tags></Tags>
          </div>

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
import { mapState } from 'vuex'
import Header from '@layout/BaseLayout/Header'
import Tags from '@layout/BaseLayout/Tags'
import SiderMenu from '@layout/BaseLayout/SiderMenu'
export default {
  components: {
    Header,
    SiderMenu,
    Tags
  },
  data() {
    const menuData = this.initMenuData(this.$router.options.routes)
    return {
      themeDark: 'dark',
      themeLight: 'light',
      collapsed: false,
      collapsedMain: false,
      tabPosition: 'left',
      menuData
    }
  },
  computed: {
    ...mapState({})
  },
  methods: {
    // TODO: dela
    // FIXME: dela
    initMenuData(routes = []) {
      let menuList = []
      routes &&
        routes.forEach(item => {
          const newItem = { ...item }
          if (newItem.children) {
            menuList = newItem.children
          }
        })
      return menuList
    },
    onCollapse(collapsed, type) {
      // console.log(collapsed, type)
    },
    onBreakpoint(broken) {
      // console.log(broken)
    }
  }
}
</script>

<style lang="less">
@import '@/styles/variable.less';

.applayout {
  height: 100%;
  .header {
    padding: 0;
    display: flex;
    .logo {
      width: 106px;
      height: 64px;
      text-align: center;
      img {
        width: 40px;
      }
    }
    .navMenu {
      flex: 1;
    }
  }

  .slider {
    // min-height: 100vh;
    .ant-tabs .ant-tabs-left-content {
      height: 100%;
      background: white;
    }
    .self-tab.ant-tabs {
      overflow: visible;
      min-width: 357px;
    }
    .ant-tabs .ant-tabs-left-bar .ant-tabs-nav-container {
      background: #000;
    }

    .ant-tabs-nav .ant-tabs-tab:hover {
      color: white;
    }
    .ant-tabs-nav .ant-tabs-tab-active {
      color: white;
      font-weight: 500;
    }
    .ant-tabs-tab {
      color: #80b9cf;
      font-weight: 500;
    }
    .ant-tabs .ant-tabs-left-bar .ant-tabs-ink-bar {
      opacity: 0.5;
    }
    .ant-tabs .ant-tabs-left-content {
      padding-left: 0;
    }
    .ant-layout-sider-children {
      background: white;
    }
    .sider {
      // height: 100vh;
      .ant-menu-submenu-title {
        padding-left: 48px !important;
        text-align: left;
        span {
          text-align: left;
        }
      }
      .ant-menu-sub.ant-menu-inline > .ant-menu-item,
      .ant-menu-sub.ant-menu-inline
        > .ant-menu-submenu
        > .ant-menu-submenu-title {
        padding-left: 80px !important;
        text-align: left;
        span {
          text-align: left;
        }
      }
    }
  }
  .self-icon.anticon {
    display: flex !important;
    flex-flow: column !important;
    justify-content: center;
    align-items: center;
    margin-right: 0;
  }
}
// #components-layout-demo-top-side-2 .logo {
//   width: 120px;
//   height: 31px;
//   background: rgba(255, 255, 255, 0.2);
//   margin: 16px 28px 16px 0;
//   float: left;
// }
#components-layout-demo-top-side-2 {
  height: 100%;
}
</style>
