<template>
  <div class="notice">
    <div class="title">
      {{ hosStore.hospitalInfo.hospital?.hosname }}预约挂号通知
    </div>
    <div class="content">
      为方便您早日就医康复，请认真阅读预约挂号需知：
      <el-empty description="没有数据" />
    </div>
  </div>
</template>

<script setup lang="ts">
//get hospital detail data
import useDetailStore from "../../../store/modules/hospitalDetail";
let hosStore = useDetailStore();
</script>

<style scoped lang="scss">
.notice {
  .title {
    font-size: 25px;
    text-align: center;
  }

  .content {
    margin-top: 30px;
    margin-left: 50px;
  }
}
</style>
