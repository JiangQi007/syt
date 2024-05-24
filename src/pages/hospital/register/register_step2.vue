<template>
  <main class="container">
    <h1 class="title">确认挂号信息</h1>
    <!-- user part -->
    <section class="user">
      <el-card class="userinfo">
        <!-- header -->
        <template #header>
          <div class="card-header">
            <span>点击选择就诊人</span>
            <el-button type="success" @click="goUser">添加就诊人</el-button>
          </div>
        </template>

        <!-- body -->
        <main class="visitor">
          <Visitor
            v-for="(item, index) in patientInfo"
            :key="item.id"
            class="item"
            :item="item"
            :style="{ backgroundColor: index == choose ? '#e6f7ff' : '#fff' }"
            @click="changeChoice(index)"></Visitor>
        </main>
      </el-card>
    </section>

    <!-- doctor part -->
    <section class="doctor">
      <el-card>
        <!-- header part -->
        <template #header>
          <div class="card-header">
            <span>挂号信息</span>
          </div>
        </template>

        <!-- body part -->
        <el-descriptions class="margin-top" :column="2" border>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">就诊日期：</div>
            </template>
            {{
              docInfo?.workDate +
              " " +
              docInfo?.param.dayOfWeek +
              " " +
              (docInfo?.workTime == 0 ? "上午" : "下午")
            }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">就诊医院：</div>
            </template>
            {{ docInfo?.param.hosname }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">就诊科室：</div>
            </template>
            {{ docInfo?.param.depname }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">医生姓名：</div>
            </template>
            {{ docInfo?.docname }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">医生职称：</div>
            </template>
            {{ docInfo?.title }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">医生专长：</div>
            </template>
            {{ docInfo?.skill }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">医事服务费：</div>
            </template>
            {{ docInfo?.amount }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </section>

    <!-- confirm button -->
    <div class="confirm">
      <el-button type="primary" @click="submitOrder">确认挂号</el-button>
    </div>
  </main>
</template>

<script setup lang="ts">
// load son component
import Visitor from "./visitor.vue";

// 拿到就诊人信息
import { ref } from "vue";
import { reqGetPatient } from "../../../api/patient/index";
import { PatientInfoResData, PatientInfoArr } from "../../../api/patient/type";
import { onMounted } from "vue";
let patientInfo = ref<PatientInfoArr>([]);
onMounted(() => {
  fetchPatientInfo();
});
const fetchPatientInfo = async () => {
  let resule: PatientInfoResData = await reqGetPatient();
  if (resule.code == 200) {
    patientInfo.value = resule.data;
    fetchDocInfo(docId.value);
  }
};

// 拿到医生的信息
import { useRoute } from "vue-router";
import { reqDetaiInfo } from "../../../api/doctor/index";
import { DetailResData, DocDataItem } from "../../../api/doctor/type";
let docInfo = ref<DocDataItem>();
let $route = useRoute();
let docId = ref<string>($route.query.docId as string);
const fetchDocInfo = async (docId: string) => {
  let result: DetailResData = await reqDetaiInfo(docId);
  if (result.code == 200) {
    docInfo.value = result.data;
  }
};

// 选择就诊人
let choose = ref<number>(0);
const changeChoice = (index: number) => {
  choose.value = index;
};

// 点击提交按钮
import { reqAddOrder } from "../../../api/order/index";
import { AddOrderResData } from "../../../api/order/type";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
let $router = useRouter();
const submitOrder = async () => {
  // 需要的参数
  let hoscode = docInfo.value?.hoscode;
  let scheduleId = docInfo.value?.id;
  let patientId = patientInfo.value[choose.value].id;
  let result: AddOrderResData = await reqAddOrder(
    hoscode as string,
    scheduleId as string,
    patientId
  );
  if (result.code == 200) {
    $router.push({ path: "/user/order", query: { orderId: result.data } });
  } else {
    ElMessage({
      type: "error",
      message: result.message,
    });
  }
};

// 跳转到添加就诊人的页面
const goUser = () => {
  $router.push({
    path: "/user/patient",
    query: { type: "add" },
  });
};
</script>

<style scoped lang="scss">
.container {
  margin: 50px 0;
  .title {
    font-size: larger;
    font-weight: 900;
    margin-left: 30px;
    margin-bottom: 30px;
  }

  .user {
    margin: 30px 30px;
    .userinfo {
      .card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
          font-size: large;
          font-weight: 500;
        }
      }

      .visitor {
        display: flex;
        flex-wrap: wrap;
        .item {
          flex: 0 0 31%;
          margin: 10px 10px;
        }
      }
    }
  }

  .doctor {
    margin: 30px 30px;
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        font-size: large;
        font-weight: 500;
      }
    }
  }

  .confirm {
    width: 100%;
    text-align: center;
  }
}
</style>
