<template>
  <el-container direction="vertical" class="layout">
    <el-header height="64px" class="header-outer" id="page-top">
      <layout-header></layout-header>
    </el-header>
    <el-main id="main-container" class="main-el-container">
      <div class="main-inner" id="main-inner">
        <div class="container-outer">
          <div class="layout-aside" v-if="!$route.meta.hideSideMenu">
            <side-menu :settings="sidemenus"></side-menu>
          </div>
          <div class="main-content" :style="{minHeight:$store.state.Global.containerHeight+'px'}">
            <router-view></router-view>
          </div>
          <layout-footer color="grey" v-if="!$route.meta.hideFooter" style="margin-top:60px;"></layout-footer>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">

import { defineComponent } from "vue-demi";
import sidemenus from '@/settings/sidemenus'

export default defineComponent({
  name: "Layout",
  data() {
    return {
      sidemenus
    }
  },
  mounted() {
    this.checkCHeight()
    window.addEventListener('resize', this.checkCHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.checkCHeight)
  },
  methods: {
    checkCHeight() {
      this.$store.commit(
        'Global/UPDATE_CONTAINER_HEIGHT',
        document.body.clientHeight ? document.body.clientHeight - 224 : 800
      )
    }
  }
});


</script>

<style lang="scss" scoped>
@import "@/styles/libs.scss";

.layout {
  height: 100%;
  min-width: 1200px;
  .header-inner {
    display: flex;
    align-items: center;
    width: 1200px;
    margin: 0 auto;
    position: relative;
    height: 64px;
  }
  .el-header.header-outer {
    color: #333;
    display: flex;
    align-items: center;
    position: relative;
    background-color: #094372;
    padding: 0;
  }

  .main-el-container {
    &.el-main {
      padding: 0;
      position: relative;
    }
    .main-inner {
      padding: 20px;
      // height: 100%;
      box-sizing: border-box;
      overflow-x: hidden;
    }
  }
}
</style>
