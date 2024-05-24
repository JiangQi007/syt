<template>
  <div>
    <!-- 轮播图 -->
    <Carousel />

    <!-- 搜索医院的表单 -->
    <Search />

    <!-- 底部展示医院信息 -->
    <el-row gutter="20px">
      <el-col :span="20">
        <!-- 等级组件 -->
        <Level @getLevel="getLevel" />

        <!-- 地区组件 -->
        <Region @getRegion="getRegion" />

        <!-- 展示医院 -->
        <div class="hospital" v-if="hasHospitalArr.length > 0">
          <Card
            v-for="(item, index) in hasHospitalArr"
            :key="index"
            :hospitalInfo="item"
            class="item" />
        </div>

        <!-- 如果没有数据展示，显示空图片 -->
        <el-empty v-else description="没有相关医院信息" />

        <!-- 分页器 -->
        <el-pagination
          v-model:current-page="pageNo"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 30, 40]"
          :background="true"
          layout="prev, pager, next, jumper,->,total, sizes,"
          :total="total"
          @current-change="currentChange"
          @size-change="sizeChange"
          style="width: 100%; margin: 15px 0" />
      </el-col>

      <!-- right part -->
      <el-col :span="4"><Tip /></el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Content, HospitalResponseData } from "../../api/home/type.ts";
import { reqHospital } from "../../api/home/index.ts";
import Carousel from "./carousel/index.vue";
import Search from "./search/index.vue";
import Level from "./level/index.vue";
import Region from "./region/index.vue";
import Card from "./card/index.vue";
import Tip from "./tip/index.vue";

// 分页器需要的数据
import { ref } from "vue";

//分页器页码
let pageNo = ref<number>(1);
//分页器一页展示几条数据
let pageSize = ref<number>(10);

//已有医院的数据
let hasHospitalArr = ref<Content>([]);
//医院总个数
let total = ref<number>(0);

//医院等级和地区的标识
let hostype = ref<string>("");
let districtCode = ref<string>("");

onMounted(() => {
  getHospitalInfo();
});

//获取医院的数据
const getHospitalInfo = async () => {
  //默认获取第一页，一页10个
  console.log("pageNo.value:" + pageNo.value);
  console.log("pageSize" + pageSize.value);
  let result: HospitalResponseData = await reqHospital(
    pageNo.value,
    pageSize.value,
    hostype.value,
    districtCode.value
  );
  if (result.code == 200) {
    hasHospitalArr.value = result.data.content;
    total.value = result.data.totalElements;
  }
};

//分页器页码发生变化时
const currentChange = () => {
  getHospitalInfo();
};

//分页器下拉菜单发生变化时
const sizeChange = () => {
  getHospitalInfo();
};

//子组件自定义事件
const getLevel = (level: string) => {
  hostype.value = level;
  getHospitalInfo();
};
const getRegion = (region: string) => {
  districtCode.value = region;
  getHospitalInfo();
};
</script>

<style scoped lang="scss">
.hospital {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    width: 48%;
    margin: 10px 0;
  }
}
</style>
