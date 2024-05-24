<template>
  <div class="search">
    <el-autocomplete
      clearable
      placeholder="请输入医院名称"
      style="width: 600px; margin-right: 5px"
      v-model="hosname"
      :fetch-suggestions="fetchData"
      :trigger-on-focus="false"
      @select="goDetail" />

    <!-- search button -->
    <el-button type="primary">
      <el-icon style="vertical-align: middle">
        <Search />
      </el-icon>
      <span style="vertical-align: middle"> 搜索 </span>
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { reqHospitalByName } from "../../../api/home/index";
import type { HospitalByName } from "../../../api/home/type";
import { useRouter } from "vue-router";

//搜索的关键字
let hosname = ref<string>("");

//创建路由
let $router = useRouter();

// 当用户输入完关键字，此函数会执行一次
const fetchData = async (keyword: string, cb: any) => {
  let result: HospitalByName = await reqHospitalByName(keyword);

  //格式化数据
  let showData = result.data.map((item) => {
    return {
      value: item.hosname,
      hoscode: item.hoscode,
    };
  });

  //给组件提供展示的数组
  cb(showData);
};

// click one suggestion
const goDetail = (item: any) => {
  //router
  $router.push({
    path: "/hospital/register",
    query: { hoscode: item.hoscode },
  });
};
</script>

<style scoped lang="scss">
.search {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
}
</style>
