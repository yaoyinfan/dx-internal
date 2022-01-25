<template>
  <el-menu class="page-menu" :default-active="$route.meta.activeMenuPath || $route.path" :unique-opened="true"
    ref="elMenu">
    <template v-for="(menu, i) in menus">
      <template v-if="!menu.children">
        <el-menu-item :index="menu.route" :key="menu.title" class="toplevel-menu" :disabled="menu.disabled"
          @click="goRoute(menu)">
          <template slot="title">
            <span slot="title">{{ menu.title }}</span>
            <i style="width: 10px"></i>
          </template>
        </el-menu-item>
      </template>
      <template v-else>
        <el-submenu class="toplevel-menu" :index="i + ''" :key="menu.title">
          <template slot="title">
            <span slot="title">{{ menu.title }}</span>
            <i class="arr-icon eva eva-arrow-right"></i>
          </template>
          <el-menu-item v-for="(item, ii) in menu.children" :key="item.name"
            :index="item.newTab ? item.newTab : item.route ? item.route : ii" :disabled="item.disabled"
            @click="goRoute(item)">{{ item.name }}</el-menu-item>
        </el-submenu>
      </template>
    </template>
  </el-menu>
</template>

<script>
import { checkMenuPermissions, checkMenuProps } from "@/utils/common";
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "SideMenu",
  props: ["settings"],
  data() {
    return {
      menus: [],
      activeIndex: null,
    };
  },
  mounted() {
    this.activeIndex = this.$refs.elMenu.activeIndex;
    this.menus = this.settings;
  },
  methods: {
    goRoute(item) {
      if (item.newTab) {
        if (item.route !== this.$route.path) {
          this.$refs.elMenu.activeIndex = this.activeIndex;
          window.open(this.$router.resolve({ path: item.route }).href);
        }
      } else {
        if (item.route) {
          this.activeIndex = this.$refs.elMenu.activeIndex;
          this.$router.push({ path: item.route });
        }
      }
    },
  },
});
</script>

<style lang="scss" scoped>
@import "@/styles/libs.scss";

.page-menu {
  display: flex;
  align-items: center;
  flex-direction: column;
  .el-icon-arrow-down {
    display: none;
  }
  .el-menu-item,
  .el-submenu {
    background-color: #fff;
    width: 180px;
    .side-menu-icon {
      width: 20px;
      height: 20px;
      color: #c0c4cc;
    }
    &.is-active {
      span[slot="title"],
      i {
        color: $--color-primary;
      }
      .side-menu-icon {
        color: #d90514;
      }
    }
  }
  .el-menu-item,
  .el-submenu__title {
    height: 48px;
    line-height: 48px;
    padding: 0 10px 0 16px !important;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span[slot="title"] {
      text-align: center;
      width: 100px;
      display: inline-block;
      font-size: 16px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: rgba(5, 4, 7, 1);
    }
  }
  .toplevel-menu {
    margin-top: 12px;
    box-shadow: 0px 1px 5px 0px rgba(228, 231, 237, 0.5);
    border-radius: 4px;
    &:first-child {
      margin-top: 0px;
    }
  }
  .el-submenu {
    .el-menu {
      border-top: 1px solid #ebeef5;
      padding: 10px 0;
      .el-menu-item {
        height: 36px;
        line-height: 36px;
        color: #909399;
        font-weight: normal;
        justify-content: center;
        min-width: 180px;
        &.is-active {
          color: $--color-primary;
        }
      }
    }
    &.is-opened .arr-icon {
      transform: rotate(90deg);
    }
  }
  &:not(.el-menu--collapse) {
    width: 200px;
  }
  .eva {
    &.eva-arrow-right {
      font-size: 10px;
    }
    font-size: 18px;
  }
}
.el-menu {
  font-weight: bold;
  .el-submenu__title,
  .el-menu-item {
    color: #050407;
  }
  .el-submenu.is-active {
    .el-icon-menu,
    .el-submenu__title,
    .eva {
      color: $--color-primary;
    }
  }
  .el-submenu.is-opened {
    .eva-arrow-right {
      transform: rotate(90deg);
    }
  }
}
</style>
