import Vue from "vue";
import storage from "@/utils/storage";
import qs from "qs";

// 特殊请求参数
// noLoading - 不显示加载图标
// noMessage - 出错不弹出提示框
// headersFilter - 形如 <name1>|<name2>，会将默认header中同名header去除请求

let HASPOST_REFREASH = false;

const events = window.eventHook;

export function refreshToken(callback, store, router) {
  return new Promise((resolve, reject) => {
    const account = storage.get(Vue.$global.storageKey);

    if (account.refreshToken) {
      if (typeof callback === "function") {
        events.$on("refreshTokenReady", callback);
      }
      if (!HASPOST_REFREASH) {
        HASPOST_REFREASH = true;
        Vue.http({
          url: Vue.$api.refreshToken,
          method: "post",
          headersFilter: "Authorization",
          noLoading: true,
          noMessage: true,
          data: { refreshToken: account.refreshToken }
        }).then(
          (re) => {
            HASPOST_REFREASH = false;
            store.commit("Account/UPDATE_ACCOUNT", re.data.data);
            if (typeof callback === "function") {
              events.$emit("refreshTokenReady", re.data.data);
              setTimeout(() => {
                events.$off("refreshTokenReady");
              }, 500);
            }
            resolve({ ...re.data.data });
          },
          (err) => {
            HASPOST_REFREASH = false;
            store.commit("Account/RESET_ACCOUNT");
            if (typeof callback === "function") {
              setTimeout(() => {
                events.$off("refreshTokenReady");
                router.push({ path: "/top" });
              }, 500);
            }
            reject(new Error(err));
          }
        );
      }
    } else {
      store.commit("Account/RESET_ACCOUNT");
      reject(new Error("no refreshToken"));
    }
  });
}

function doError(error, store, router) {
  if (error.response) {
    if (error.response.status === 401) {
      // 这里追加token失效逻辑
      const config = error.config;

      return new Promise((resolve, reject) => {
        refreshToken(
          (account) => {
            if (account.token) {
              config.headers["Authorization"] = `Bearer ${account.token}`;
            }
            resolve(Vue.http(config));
          },
          store,
          router
        ).then(
          () => {},
          (err) => {
            reject(err);
          }
        );
      });
    } else if (error.response.status === 500) {
      Vue.prototype.$message({
        message: "系统繁忙，请稍后",
        type: "error",
        showClose: "true"
      });
    } else if (
      error.response.data.errMsg &&
      !error.response.config.noMessage &&
      !store.state.Account.stop
    ) {
      Vue.prototype.$message({
        message: error.response.data.errMsg,
        type: "error",
        showClose: "true"
      });
    }
  }
  return error.response;
}

export function setInterceptors(ins, store, router) {
  const requestInterceptor = ins.interceptors.request.use(
    (config) => {
      const user = storage.get(Vue.$global.storageKey) || {};
      if (user.token) {
        config.headers.common["Authorization"] = `Bearer ${user.token}`;
      }
      if (config.headersFilter && typeof config.headersFilter === "string") {
        const headerArr = config.headersFilter.split("|");
        headerArr.map((h) => {
          delete config.headers.common[h];
        });
      }
      if (!config.noLoading) {
        store.commit("Global/INCREMENT_LOADING");
      }
      // get传参序列化
      if (config.method === "get") {
        config.paramsSerializer = (params) => {
          return qs.stringify(params, { arrayFormat: "repeat" });
        };
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  const responseInterceptor = ins.interceptors.response.use(
    (response) => {
      if (!response.config.noLoading) {
        store.commit("Global/DECREMENT_LOADING");
      }
      if (response.config && response.config.responseType === "blob") {
        const blob = new Blob([response.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
        }); // application/vnd.openxmlformats-officedocument.spreadsheetml.sheet这里表示xlsx类型
        let filename = "excel.xlsx";
        if ("download" in document.createElement("a")) {
          const downloadElement = document.createElement("a");
          let href = "";
          if (window.URL) href = window.URL.createObjectURL(blob);
          else href = window.webkitURL.createObjectURL(blob);
          downloadElement.href = href;
          downloadElement.download = filename;
          document.body.appendChild(downloadElement);
          downloadElement.click();
          if (window.URL) window.URL.revokeObjectURL(href);
          else window.webkitURL.revokeObjectURL(href);
          document.body.removeChild(downloadElement);
        } else {
          navigator.msSaveBlob(blob, filename);
        }
        return;
      }
      if (response.data.errCode && response.data.errMsg) {
        if (!response.config.noMessage) {
          Vue.prototype.$message({
            message: response.data.errMsg,
            type: "error",
            showClose: "true"
          });
        }
        return Promise.reject(response);
      }
      if (response.config.waiting) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(response);
          }, 1000);
        });
      }
      return Promise.resolve(response);
    },
    (error) => {
      if (!(error.response && error.response.config.noLoading)) {
        store.commit("Global/DECREMENT_LOADING");
      }
      if (error.response && error.response.status === 401) {
        return Promise.resolve(doError(error, store, router));
      }
      return Promise.reject(doError(error, store, router));
    }
  );
  return {
    requestInterceptor,
    responseInterceptor
  };
}
