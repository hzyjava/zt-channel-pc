<template
  ><div style="width: 150px">
    <!-- <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button> -->
    <!--
 :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys" -->

    <a-menu mode="inline" :theme="theme">
      <template v-for="item in menuData">
        <a-menu-item
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
      </template>
    </a-menu>
  </div>
</template>

<script>
export default {
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
    const menuData = this.initMenuData(this.$router.options.routes);
    // console.log(this.$router.options.routes);
    return {
      collapsed: false,
      list: [],
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  methods: {
    //FIXME
    initMenuData(routes = []) {
      let menuList = [];
      routes &&
        routes.forEach(item => {
          const newItem = { ...item };
          if (newItem.children) {
            menuList = newItem.children;
            // item.hideMenu = true;
            // console.log(menuList);
          }
        });
      return menuList;
    },
    getMenuData(routes = [], pKeys = [], selectKey) {
      const _this = this;
      const menuList = [];
      console.log(11, routes);
      routes &&
        routes.forEach(item => {
          console.log(item);
          if (item.name && !item.hideMenu) {
            console.log(1);
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
            console.log(2);
            menuList.push(
              ..._this.getMenuData(item.children, [...pKeys, item.path])
            );
          }
          console.log(menuList);
        });
      return menuList;
    }
  }
};
</script>

<style></style>
