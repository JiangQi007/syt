<template>
  <!-- 有参数订单id -->
  <div v-if="$route.query.orderId"><Detail /></div>
  <!-- 没有参数 -->
  <div v-else><All /></div>
</template>

<script setup lang="ts">
// 在页面加载时，判断有无参数来决定显示的页面
import { useRoute } from "vue-router";
import All from "./all/index.vue";
import Detail from "./detail/index.vue";
let $route = useRoute();
</script>

<style scoped></style>
