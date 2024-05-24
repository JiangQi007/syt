<template>
  <div class="notice">
    <div class="title">
      {{ hosStore.hospitalInfo.hospital?.hosname }}医院停诊信息
    </div>
    <div class="content">
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
