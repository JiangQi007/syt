<template>
  <div class="container">
    <el-card>
      <!-- header -->
      <template #header>
        <div class="card-header">
          <span style="font-size: large; font-weight: 600">挂号详情</span>
        </div>
      </template>

      <!-- body -->
      <section class="body">
        <div class="state">
          <span class="word">{{ orderInfo.param?.orderStatusString }}</span>
        </div>
        <div class="content">
          <!-- left part -->
          <div class="left">
            <el-descriptions class="margin-top" :column="1" border>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">就诊人信息</div>
                </template>
                {{ orderInfo.patientName }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">就诊日期</div>
                </template>
                {{
                  orderInfo.reserveDate +
                  " " +
                  (orderInfo.reserveTime == 0 ? "上午" : "下午")
                }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">就诊医院</div>
                </template>
                {{ orderInfo.hosname }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">就诊科室</div>
                </template>
                <el-tag size="small">{{ orderInfo.depname }}</el-tag>
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">医生职称</div>
                </template>
                {{ orderInfo.title }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">医事服务费</div>
                </template>
                {{ orderInfo.amount }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">挂号单号</div>
                </template>
                {{ orderInfo.outTradeNo }}
              </el-descriptions-item>
              <el-descriptions-item>
                <template #label>
                  <div class="cell-item">挂号时间</div>
                </template>
                {{ orderInfo.createTime }}
              </el-descriptions-item>
            </el-descriptions>
          </div>

          <!-- right part -->
          <div class="right">
            <el-card>
              <template #header>
                <div class="card-header">
                  <span>注意事项</span>
                </div>
              </template>
              <p>
                1.请确认就诊人信息是否准确，若填写错误将无法取号就诊，损失由本人承担；
              </p>
              <p>
                2.【取号】就诊当天需要在{{
                  orderInfo.fetchTime
                }}在医院取号，未取号视为爽约，该号不退不换；
              </p>
              <p>
                3.【退号】在{{
                  orderInfo.quitTime
                }}前可在线退号，逾期将不可办理退号退费；
              </p>
              <p>
                4.北京114预约挂号支持自费患者使用身份证预约，同时支持北京市医保患者使用北京社保卡在平台预约挂号。请与就诊当日，携带预约挂号所使用的有效身份证件到院取号;
              </p>
            </el-card>
          </div>
        </div>
      </section>

      <template #footer>
        <el-popconfirm title="确认取消订单?" @confirm="cancel">
          <template #reference>
            <el-button
              plain
              v-if="orderInfo.orderStatus == 0 || orderInfo.orderStatus == 1"
              >取消预约</el-button
            >
          </template>
        </el-popconfirm>
        <el-button
          type="primary"
          plain
          v-if="orderInfo.orderStatus == 0"
          @click="openLog"
          >支付</el-button
        >
      </template>

      <!-- 支付对话框 -->
      <section class="log">
        <el-dialog v-model="dialogVisible" title="微信支付" width="400px">
          <div class="core">
            <img :src="path" alt="正在加载中..." />
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <template #footer>
            <div class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
            </div>
          </template>
        </el-dialog>
      </section>
    </el-card>
  </div>
</template>

<script setup lang="ts">
// 获取对应id的order的信息
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { reqOrderDetail } from "../../../../api/order/index";
import { DetailOrderResData } from "../../../../api/order/type";
let orderInfo = ref<any>({});
let $route = useRoute();
const getDetailOrder = async () => {
  let result: DetailOrderResData = await reqOrderDetail(
    $route.query.orderId as string
  );
  if (result.code == 200) {
    orderInfo.value = result.data;
  }
};

// 挂载时获取数据
onMounted(() => {
  getDetailOrder();
});

// 点击确定按钮取消订单
import { reqCancelOrder } from "../../../../api/order/index";
import { ElMessage } from "element-plus";
const cancel = async () => {
  let result = await reqCancelOrder($route.query.orderId as string);
  if (result.code == 200) {
    alert("取消成功！");
    getDetailOrder();
  } else {
    ElMessage({
      type: "error",
      message: result.message,
    });
  }
};

// 支付对话框
import { reqPayQr } from "../../../../api/payment/index";
import { PayResData } from "../../../../api/payment/type";
// @ts-ignore
import QRCode from "qrcode";
let path = ref<string>("");
let dialogVisible = ref<boolean>(false);
const openLog = async () => {
  dialogVisible.value = true;
  let res: PayResData = await reqPayQr($route.query.orderId as string);
  if (res.code == 200) {
    path.value = await QRCode.toDataURL(res.data.codeUrl);
  }
};
</script>

<style scoped lang="scss">
.container {
  .body {
    .state {
      width: 100%;
      margin: 30px 20px;
      .word {
        font-size: small;
        padding: 2px 2px;
        background-color: rgb(141, 217, 26);
        color: aliceblue;
        font-weight: 600;
      }
    }
    .content {
      display: flex;
      justify-content: space-around;
      align-items: center;
      .left {
        flex: 1;
      }
      .right {
        flex: 1;
        p {
          margin: 20px 10px;
        }
        p:nth-of-type(2) {
          color: red;
        }
      }
    }
  }

  .log {
    .core {
      text-align: center;
      margin: 30px 30px;
    }
  }
}
</style>
