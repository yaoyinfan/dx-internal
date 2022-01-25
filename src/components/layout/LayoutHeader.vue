<template>
  <div class="header">
    <div class="site" @click="$router.push({path: '/top' })">
      <!-- <img src="@/assets/logo.png" class="logo" /> -->
    </div>
    <template v-if="account.token">
      <a class="top-right">
        <el-dropdown>
          <div class="user">
            <el-avatar :src="
                account.mpInfo &&
                account.mpInfo.imageUrlMap &&
                account.mpInfo.imageUrlMap.icon
                  ? account.mpInfo.imageUrlMap.icon
                  : defaultAvatar
              " :size="40"></el-avatar>
            <svg-icon icon-class="verify" class="identity-ok" v-if="
                account.leftDays > 0 ||
                  account.status === 1 ||
                  account.status === 2
              " />
            <span class="name">{{ account.mpInfo.name || account.phone }}</span>
            <i class="icon eva eva-arrow-down"></i>
          </div>
          <el-dropdown-menu class="dropdown-menu-user" slot="dropdown"
            :class=" ['skin-type' + this.$store.state.Account.skin]">
            <el-dropdown-item class="dropdown-item" @click.native="
                $router.push({
                  path: '/user/account',
                  query: { activeName: 'first' }
                })
              " v-if="
                account.leftDays > 0 ||
                  account.status === 1 ||
                  account.status === 2
              ">账号设置</el-dropdown-item>
            <el-dropdown-item class="dropdown-item" @click.native="
                $router.push({
                  path: '/user/account',
                  query: { activeName: 'second' }
                })
              " v-if="
                account.leftDays > 0 ||
                  account.status === 1 ||
                  account.status === 2
              ">登录设置</el-dropdown-item>
            <el-dropdown-item class="dropdown-item" @click.native="signout()">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </a>
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { defineComponent } from "vue-demi";
import defaultAvatar from "@/assets/default_avatar.png";

export default defineComponent({
  name: "Header",
  data() {
    return {
      defaultAvatar,
    };
  },
  computed: {
    account() {
      return this.$store.state.Account;
    },
    accountEnabled() {
      return (
        !this.$store.state.Account.stop &&
        (this.$store.state.Account.leftDays > 0 ||
          this.$store.state.Account.status === 1 ||
          this.$store.state.Account.status === 2)
      );
    },
    ...mapState("Message", {
      unreadCnt: (state) => {
        const unreadCnt = state.unreadCnt;
        let num = 0;
        for (let attr in unreadCnt) {
          num += unreadCnt[attr];
        }
        return {
          num,
          ...unreadCnt,
        };
      },
    }),
  },
  methods: {
    signout() {
      this.storage.del("account");
      this.$store.commit("Account/RESET_ACCOUNT");
      this.$store.commit("Message/initChat");
      this.$store.dispatch("Message/disconnect");

      this.$router.push({ path: "/top" });
    },
  },
});
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
  position: relative;
  height: 64px;
  .header-bg {
    position: absolute;
    left: -256px;
    height: 64px;
  }
  .header-bg-skin {
    position: absolute;
    left: -236px;
    height: 64px;
  }
  .site {
    position: absolute;
    height: 40px;
    left: 10px;
    top: 12px;
    z-index: 1;
    .logo {
      height: 40px;
    }
    .beta {
      color: #fff;
      font-size: 15px;
      position: absolute;
      top: 5px;
      right: -65px;
    }
  }
  .top-menu {
    position: absolute;
    left: 200px;
    top: 0;
  }
}
.top-right {
  position: absolute;
  right: 20px;
  display: flex !important;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  top: 12px;
  &:hover {
    text-decoration: none;
  }
}
.user {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  .name {
    margin-left: 10px;
    max-width: 270px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .identity-ok {
    position: absolute;
    bottom: 2px;
    left: 26px;
    font-size: 16px;
  }
  .el-avatar > img {
    width: 100%;
  }
}

.message-dropdown {
  margin-right: 40px;
  .message {
    display: flex;
    align-items: center;
    .message-icon {
      .el-badge__content {
        top: -6px;
        transform: scale(0.9);
        right: -8px;
        background-color: #d90514;
      }
    }
    .eva {
      font-size: 30px;
      color: #fff;
    }
  }
}

.dropdown-menu-message {
  .dropdown-item {
    padding: 0 20px;
    color: #5a5e66;
    white-space: nowrap;
    display: flex;
    align-items: center;
    .el-badge {
      display: flex;
      align-items: center;
      margin-left: 6px;
    }
    .el-badge__content {
      background-color: #d90514;
    }
  }
}
.dropdown-menu-user {
  .dropdown-item {
    padding: 0 40px;
    color: #5a5e66;
    white-space: nowrap;
  }
}
</style>
