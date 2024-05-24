<template>
  <div class="level">
    <h1>医院</h1>
    <div class="content">
      <div class="left">等级：</div>
      <ul class="hospital">
        <li :class="{ active: activeFlag == '' }" @click="changeLevel('')">
          全部
        </li>
        <li
          v-for="level in levelArr"
          :key="level.value"
          @click="changeLevel(level.value)"
          :class="{ active: activeFlag == level.value }">
          {{ level.name }}
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
let levelArr = ref<HospitalInfoArr>([]);
// 控制医院等级高亮响应式数据
let activeFlag = ref<string>("");

onMounted(() => {
  getLevel();
});

//获取医院等级的数组
const getLevel = async () => {
  let result: HospitalInfoResponseData = await reqHospitalInfo("HosType");
  if (result.code == 200) {
    levelArr.value = result.data;
  }
};

//点击level动态改变高亮的值
let $emit = defineEmits(["getLevel"]);
const changeLevel = (level: string) => {
  activeFlag.value = level;
  // 触发自定义事件，将医院等级回传给父组件
  $emit("getLevel", level);
};
</script>

<style scoped lang="scss">
.level {
  color: #7f7f7f;
  h1 {
    font-weight: 900;
    margin: 10px 0;
  }
  .content {
    display: flex;
    margin-top: 30px;
    .left {
      margin-right: 10px;
    }
    .hospital {
      display: flex;
      li {
        margin-right: 20px;

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
