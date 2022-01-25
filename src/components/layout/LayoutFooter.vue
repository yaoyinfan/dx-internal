<template>
  <div class="footer" :class="{'grey':color==='grey'}">
    <div class="title">
      <div class="line">
        <a href="" target="_blank">关于我们</a>
        <div class="split">|</div>
        <a href="https://www.12377.cn/" target="_blank">违法和不良信息举报</a>
        <div class="split">|</div>
        <a href="" target="_blank">测试平台</a>
        <div class="split">|</div>
        <a href="" target="_blank">测试股份有限公司</a>
      </div>
      <div class="line">
        <div class="line-item">
          <i class="eva eva-phone-outline"></i>
          电话：xxx
        </div>
        <div class="split">|</div>
        <div class="line-item">
          <i class="eva eva-printer-outline"></i>
          传真：xxx
        </div>
        <div class="split">|</div>
        <div class="line-item">
          <i class="eva eva-at-outline"></i>邮箱：xxx
        </div>
        <div class="split">|</div>
        <div class="line-item">
          <i class="eva eva-pin-outline"></i>地址：xxx
        </div>
      </div>
      <div>
        © xxxx All rights reserved.
        <a href="http://www.beian.miit.gov.cn/" target="_blank">备案号</a>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "LayoutFooter",
  props: ["color"],
  data() {
    return {};
  },
  methods: {},
});
</script>

<style lang="scss" scoped>
.footer {
  text-align: center;
  box-sizing: border-box;
  overflow: hidden;
  // position: absolute;
  // bottom: 0;
  min-width: 1200px;
  line-height: 20px;
  width: 100%;
  &.grey {
    .title {
      color: #909399;
      a {
        color: #909399 !important;
      }
    }
  }
  .title {
    text-align: center;
    width: 100%;
    color: #fff;
    cursor: default;
    font-size: 12px;
    a {
      color: #fff !important;
    }
    .line {
      display: flex;
      align-items: center;
      justify-content: center;
      .split {
        margin: 0 10px;
      }
      .line-item {
        display: flex;
        align-items: center;
      }
      .eva {
        margin-right: 4px;
      }
    }
  }
}
</style>
