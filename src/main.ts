import Vue from "vue";
import App from "@/App.vue";
import axios from "axios";
import global from "@/settings/global";

import { createApp, h } from "vue-demi";
import "@/styles/element-variables.scss";
import "@/styles/common.scss";

import "windi.css";
import router from "@/router";
import store from "@/store";
import { setInterceptors } from "@/utils/interceptors";

const axiosIns = axios.create({
  baseURL: global.baseUrl,
  timeout: global.requestTimeout,
  headers: { "Content-Type": "application/json;charset=UTF-8" },
});

setInterceptors(axiosIns, store, router);

Vue.config.productionTip = false;
Vue.config.devtools = true;

const app = createApp({
  router,
  store,
  render: () => h(App),
});

app.mount("#app");
