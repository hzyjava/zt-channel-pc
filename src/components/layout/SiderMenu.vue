<template>
  <div style="width: 300px">
    <!-- <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button> -->
    <!-- :inline-collapsed="collapsed"  -->
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="
            () => {
              $router.push({ path: item.path, query: $route.query });
            }
          "
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :key="item.path" :menu-info="item" />
      </template>
    </a-menu>
  </div>
</template>

<script>
import SubMenu from "./SubMenu";
export default {
  components: {
    "sub-menu": SubMenu
  },
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  watch: {
    "$route.path": function(val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    }
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    this.initMenuData(this.$router.options.routes);
    const menuData = this.getMenuData(this.$router.options.routes);

    return {
      collapsed: false,
      list: [],
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  methods: {
    initMenuData(routes = []) {},
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], pKeys = [], selectKey) {
      const _this = this;
      const menuList = [];
      routes &&
        routes.forEach(item => {
          if (item.name && !item.hideMenu) {
            this.openKeysMap[item.path] = pKeys;
            this.selectedKeysMap[item.path] = [selectKey || item.path];

            const newItem = { ...item };
            delete newItem.children;
            if (item.children && !item.hideChildrenMenu) {
              newItem.children = _this.getMenuData(item.children, [
                ...pKeys,
                item.path
              ]);
            } else {
              _this.getMenuData(
                item.children,
                selectKey ? pKeys : [...pKeys, item.path],
                selectKey || item.path
              );
            }
            menuList.push(newItem);
          } else if (
            !item.hideMenu &&
            !item.hideChildrenMenu &&
            item.children
          ) {
            menuList.push(
              ..._this.getMenuData(item.children, [...pKeys, item.path])
            );
          }
        });
      return menuList;
    }
  }
};
</script>
