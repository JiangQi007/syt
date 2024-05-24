<template>
  <div class="region">
    <div class="content">
      <div class="left">地区：</div>
      <ul>
        <li :class="{ active: activeFlag == '' }" @click="changeRegion('')">
          全部
        </li>
        <li
          v-for="region in regionArr"
          :key="region.value"
          :class="{ active: activeFlag == region.value }"
          @click="changeRegion(region.value)">
          {{ region.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { reqHospitalInfo } from "../../../api/home/index";
import type {
  HospitalInfoResponseData,
  HospitalInfoArr,
} from "../../../api/home/type";

//医院数据数组
let regionArr = ref<HospitalInfoArr>([]);
// 控制医院等级高亮响应式数据
let activeFlag = ref<string>("");

onMounted(() => {
  getRegion();
});

//获取医院等级的数组
const getRegion = async () => {
  let result: HospitalInfoResponseData = await reqHospitalInfo("Beijin");
  if (result.code == 200) {
    regionArr.value = result.data;
  }
};

//点击level动态改变高亮的值
let $emit = defineEmits(["getRegion"]);
const changeRegion = (region: string) => {
  activeFlag.value = region;

  $emit("getRegion", region);
};
</script>

<style scoped lang="scss">
.region {
  color: #7f7f7f;
  margin-top: 10px;
  .content {
    display: flex;
    margin-top: 20px;
    .left {
      margin-right: 5px;
      width: 70px;
    }

    ul {
      display: flex;
      flex-wrap: wrap;

      li {
        margin-right: 20px;
        margin-bottom: 15px;

        &.active {
          color: #55a6fe;
        }
      }

      li:hover {
        color: #55a6fe;
        cursor: pointer;
      }
    }
  }
}
</style>
