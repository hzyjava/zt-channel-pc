import Vue from "vue";
import VueRouter from "vue-router";
import constantRouterMap from "@/router";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  // mode: "hash",
  constantRouterMap,
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 })
});

export default router;
