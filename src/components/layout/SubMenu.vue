<!--
 * @Autor: hezy
 * @Description:
 * @Date: 2021-04-26 08:32:51
 * @LastEditTime: 2021-04-26 09:48:40
 * @FilePath: \zt-code\src\components\Layout\SubMenu.vue
-->
<template functional>
  <a-sub-menu :key="props.menuInfo.path">
    <span slot="title">
      <a-icon
        v-if="props.menuInfo.meta.icon"
        :type="props.menuInfo.meta.icon"
      /><span> {{ props.menuInfo.meta.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.path"
        @click="
          () => {
            parent.$router.push({
              path: item.path,
              query: parent.$route.query
            });
          }
        "
      >
        <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
        <span>{{ item.meta.title }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.path" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>

<script>
export default {
  props: ["menuInfo"]
};
</script>

<style></style>
