import Vue from "vue";

const global = {
  page: "internal",
  storageKey: "my-user",
  baseUrl: "https://www.daxian.com",
  requestTimeout: 15000
};
Vue.$global = Vue.prototype.$global = global;

export default global;
