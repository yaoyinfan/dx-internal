// 个人主页
import Home from "@/views/Home.vue";

export default [
  {
    path: "info",
    component: Home,
    meta: {
      breadcrumb: [{ name: "个人主页" }, { name: "基础资料" }],
    },
  },
];
