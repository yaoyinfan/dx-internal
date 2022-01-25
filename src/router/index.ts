import Vue from "vue";
import VueRouter, { Route, NavigationGuardNext, RouteConfig } from "vue-router";
import About from "@/views/About.vue";
import NotFound from "@/views/NotFound.vue";
import Layout from "@/components/layout/Layout.vue";
import LayoutChildren from "./Layout/index";

Vue.use(VueRouter);
export const routes: RouteConfig[] = [
  {
    path: "/about",
    name: "About",
    // NOTE: you can also apply meta information
    // meta: {authRequired: false }
    component: About,
    // NOTE: you can also lazy-load the component
    // component: () => import("@/views/About.vue")
  },
  {
    path: "/",
    redirect: "/info",
    name: "layout",
    component: Layout,
    children: LayoutChildren,
  },
  {
    path: "/:path(.*)",
    name: "NotFound",
    component: NotFound,
    meta: {
      title: "404",
    },
  },
];

const router = new VueRouter({
  base: "/",
  mode: "history",
  routes,
});

function routerHack(to: Route, from: Route, next: NavigationGuardNext<Vue>) {
  console.log(to);
  next();
}

router.beforeEach(routerHack);

export default router;
