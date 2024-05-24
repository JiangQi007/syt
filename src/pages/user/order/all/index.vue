<template>
  <section class="container">
    <el-card>
      <!-- header -->
      <template #header>
        <div class="card-header">
          <span>挂号订单</span>
        </div>
      </template>

      <!-- body -->
      <section class="body">
        <!-- 选择区域 -->
        <section class="select">
          <el-form :inline="true">
            <el-form-item label="就诊人">
              <el-select
                v-model="patientId"
                placeholder="全部患者"
                style="width: 240px"
                @change="changeSelect">
                <el-option label="全部患者" value=""></el-option>
                <el-option
                  v-for="item in allPatient"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id" />
              </el-select>
            </el-form-item>

            <el-form-item label="订单状态">
              <el-select
                v-model="orderStatus"
                placeholder="全部订单状态"
                style="width: 240px"
                @change="changeSelect">
                <el-option label="全部订单状态" value=""></el-option>
                <el-option
                  v-for="(item, index) in allState"
                  :key="index"
                  :label="item.comment"
                  :value="item.status" />
              </el-select>
            </el-form-item>
          </el-form>
        </section>

        <!-- 展示区域 -->
        <section class="detail">
          <el-table :data="orderInfo">
            <el-table-column prop="reserveDate" label="就诊时间" />
            <el-table-column prop="hosname" label="医院" />
            <el-table-column prop="depname" label="科室" />
            <el-table-column prop="title" label="医生" />
            <el-table-column prop="amount" label="医事服务费" />
            <el-table-column prop="patientName" label="就诊人" />
            <el-table-column prop="param.orderStatusString" label="订单状态" />
            <el-table-column label="操作">
              <template #="{ row }">
                <el-button type="text" @click="goDetail(row)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </section>
      </section>

      <!-- 底部分页器 -->
      <template #footer>
        <section class="bottom">
          <el-pagination
            v-model:current-page="pageNo"
            v-model:page-size="pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout=" prev, pager, next, jumper,->,total, sizes,"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange" />
        </section>
      </template>
    </el-card>
  </section>
</template>

<script setup lang="ts">
// 分页器数据与分页器的事件
import { onMounted, ref } from "vue";
let pageNo = ref<number>(1);
let pageSize = ref<number>(10);
const handleCurrentChange = (pager: number) => {
  pageNo.value = pager;
  getAllOrderInfo();
};
const handleSizeChange = (newSize: number) => {
  pageSize.value = newSize;
  getAllOrderInfo();
};

// 获取所有订单的数据
let patientId = ref<string>("");
let orderStatus = ref<string>("");
let orderInfo = ref<Records>([]);
let total = ref<number>(0);
import { reqAllOrder } from "../../../../api/order/index";
import { AllOrderResData, Records } from "../../../../api/order/type";
onMounted(() => {
  getAllOrderInfo();
  getSelectInfo();
});
const getAllOrderInfo = async () => {
  let result: AllOrderResData = await reqAllOrder(
    pageNo.value,
    pageSize.value,
    patientId.value,
    orderStatus.value
  );
  if (result.code == 200) {
    orderInfo.value = result.data.records;
    total.value = result.data.total;
  }
};

// 点击详情跳转到具体订单的页面
import { useRouter } from "vue-router";
let $router = useRouter();
const goDetail = (row: any) => {
  $router.push({ path: "/user/order", query: { orderId: row.id } });
};

// 获取该账号下所有的就诊人和系统支持的订单状态，为选择器提供数据
import { reqGetPatient } from "../../../../api/patient/index";
import {
  PatientInfoResData,
  PatientInfoArr,
} from "../../../../api/patient/type";
import { reqAllState } from "../../../../api/order/index";
import { StateResData, StateData } from "../../../../api/order/type";
let allPatient = ref<PatientInfoArr>([]);
let allState = ref<StateData>([]);
const getSelectInfo = async () => {
  let patientResult: PatientInfoResData = await reqGetPatient();
  if (patientResult.code == 200) {
    allPatient.value = patientResult.data;
  }
  let stateResult: StateResData = await reqAllState();
  if (stateResult.code == 200) {
    allState.value = stateResult.data;
  }
};

// 使用选择器选择后，再次请求展示相关的数据
const changeSelect = () => {
  getAllOrderInfo();
};
</script>

<style scoped lang="scss">
.container {
  margin: 20px 20px;
  .card-header {
    font-size: larger;
    margin: 10px 5px;
  }
}
</style>
