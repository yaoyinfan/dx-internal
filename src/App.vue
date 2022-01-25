<template>
  <div style="height:100%" v-if="ready">
    <RouterView />
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue-demi";

export default defineComponent({
  name: "Layout",
  data() {
    return {
      ready: true
    }
  },
  mounted() {
  },
  destroyed() {
  },
  methods: {
  }
});

</script>
