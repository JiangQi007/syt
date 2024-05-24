<template>
  <div class="container">
    <!-- 顶部全局组件 -->
    <HospitalTop />

    <div class="content">
      <!-- router components -->
      <router-view></router-view>
    </div>

    <HospitalBottom />

    <!-- login component -->
    <Login />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .content {
    margin-top: 70px;
    width: 1200px;
    min-height: 700px;
  }
}
</style>
