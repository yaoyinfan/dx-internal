import storage from "@/utils/storage";
import Vue from "vue";

const defaultState = {
  token: "",
  refreshToken: "",
  expired: false,
  mpInfo: {},
  phone: "",
  email: "",
  boundPhone: true,
  checked: false,
  userInfoChecked: true,
  permissions: null
};
const storegeData = storage.get(Vue.$global.storageKey) || {};
const state = { ...defaultState, ...storegeData };

const mutations = {
  UPDATE_ACCOUNT(state, account) {
    for (const i in account) {
      if (Object.prototype.hasOwnProperty.call(account, i)) {
        state[i] = account[i];
      }
    }
    storage.set(Vue.$global.storageKey, {
      token: state.token,
      refreshToken: state.refreshToken
    });
  },
  RESET_ACCOUNT(state) {
    for (const i in state) {
      if (
        Object.prototype.hasOwnProperty.call(defaultState, i) &&
        Object.prototype.hasOwnProperty.call(state, i)
      ) {
        state[i] = defaultState[i];
      }
    }
    storage.del(Vue.$global.storageKey);
  }
};
const actions = {
  FETCH_PERMISSIONS({ commit }) {
    return new Promise((resolve, reject) => {
      Promise.all([
        Vue.http({
          method: "get",
          url: Vue.$api.applicationStatus,
          noLoading: true,
          always: true
        }),
        Vue.http({
          method: "get",
          url: Vue.$api.permissions,
          noLoading: true,
          always: true
        })
      ]).then(
        (re) => {
          const permissions = {};
          if (re[1].data.data.permissions) {
            re[1].data.data.permissions.map((re) => {
              permissions[re] = true;
            });
          }
          commit("UPDATE_ACCOUNT", {
            ...re[0].data.data,
            permissions,
            checked: true
          });
          resolve();
        },
        (err) => {
          reject(err);
        }
      );
    });
  },
  FETCH_USERINFO({ commit }) {
    return new Promise((resolve, reject) => {
      Vue.http({
        method: "get",
        url: Vue.$api.userInfo,
        noLoading: true,
        always: true
      }).then(
        (re) => {
          commit("UPDATE_ACCOUNT", { ...re.data.data });
          resolve();
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
