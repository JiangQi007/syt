<template>
  <div class="wrap">
    <!-- top part -->
    <header>
      <div class="top">
        <!-- title -->
        <section>
          <div class="hosname">{{ workData?.baseMap.hosname }}</div>
          <div class="line">|</div>
          <div class="dep">{{ workData?.baseMap.bigname }}</div>
          <div class="dot">·</div>
          <div>{{ workData?.baseMap.depname }}</div>
        </section>
      </div>

      <section class="center">
        <h1>{{ workData?.baseMap.workDateString }}</h1>
        <section class="timer">
          <div
            class="item"
            v-for="item in workData?.bookingScheduleList"
            :key="item"
            @click="changeTime(item)"
            :class="{
              active: item.status == -1 || item.availableNumber == -1,
              cur: item.workDate == currentDate.workDate,
            }">
            <div class="time">{{ item.workDate }}-{{ item.dayOfWeek }}</div>
            <div class="state">
              <div v-if="item.status == -1">停止挂号</div>
              <div v-if="item.status == 0">
                {{
                  item.availableNumber == -1
                    ? "已预约满"
                    : `剩余号(${item.availableNumber})`
                }}
              </div>
              <div v-if="item.status == 1">即将放号</div>
            </div>
          </div>
        </section>
        <el-pagination
          layout="prev, pager, next"
          :total="workData?.total"
          v-model:current-page="pageNo"
          @current-change="fetchRegData" />
      </section>
    </header>

    <footer class="bottom">
      <!-- time -->
      <section class="future" v-if="currentDate.status == 1">
        <span>{{ currentDate.workDateMd }}放号</span>
      </section>
      <!-- doctor -->
      <section class="doctor" v-else>
        <!-- morning -->
        <section class="morning">
          <div class="title">
            <svg
              t="1715573009981"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="4307"
              width="32"
              height="32">
              <path
                d="M512.001 64C264.594 64 64 264.594 64 512.001 64 759.41 264.594 960 512.001 960 759.41 960 960 759.41 960 512.001 960 264.594 759.41 64 512.001 64z m210.446 318.193l23.521 24.078-75.6 73.698-23.522-24.083 75.601-73.693z m-224.53-81.449h33.712v105.618h-33.712V300.744z m-199.388 72.487l80.079 81.873-26.545 25.985-80.079-81.87 26.545-25.988z m8.514 260.402h-114.58v-37.186h114.463v32.484h0.117v4.702z m361.759 5.601H350.72c-1.233-7.84-1.79-15.904-1.79-24.193 0-88.593 72.238-160.943 160.831-160.943 88.703 0 160.946 72.239 160.946 160.943 0 8.178-0.672 16.241-1.905 24.193z m43.484-5.176v-37.292h121.633v37.292H712.286z"
                fill="#FFB454"
                p-id="4308"></path>
            </svg>
            <span>上午号源</span>
          </div>
          <section
            class="doclist"
            v-for="doctor in morningArr"
            :key="doctor.id">
            <div class="doct">
              <div class="info">
                <div class="docinfo">
                  <span class="docname"
                    >{{ doctor.title }}|{{ doctor.docname }}</span
                  >
                  <span class="illness">{{ doctor.skill }}</span>
                </div>
                <div class="ticketinfo">
                  <span class="tickprice">{{ doctor.amount }}</span>
                  <el-button type="primary" @click="goStep2(doctor)">
                    剩余{{ doctor.availableNumber }}
                  </el-button>
                </div>
              </div>
              <hr />
            </div>
          </section>
        </section>

        <!-- noon -->
        <section class="noon">
          <div class="title">
            <svg
              t="1715573311126"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="6016"
              width="32"
              height="32">
              <path
                d="M825.5 424.6h91.3c20.9 0 37.8-16.9 37.8-37.8S937.7 349 916.8 349h-90.2c1.2 11.3 1.9 22.8 1.9 34.4-0.1 14-1.3 27.7-3 41.2zM800.4 667.6c14.8 14.8 38.7 14.8 53.5 0 14.8-14.8 14.8-38.7 0-53.5l-69.8-69.8c-13.1 22-28.5 42.4-46.3 60.6l62.6 62.7zM107.4 424.6h91.3c-1.8-13.5-3-27.2-3-41.2 0-11.6 0.7-23.1 1.9-34.4h-90.2c-20.9 0-37.8 16.9-37.8 37.8s16.9 37.8 37.8 37.8zM246.7 555.3l-58.8 58.8c-14.8 14.8-14.8 38.7 0 53.5 14.8 14.8 38.7 14.8 53.5 0l54.1-54.1c-18.5-17.4-34.9-36.8-48.8-58.2zM474.3 697.3v97c0 20.9 16.9 37.8 37.8 37.8s37.8-16.9 37.8-37.8v-97c-12.4 1.5-25 2.5-37.8 2.5-12.8 0-25.4-1-37.8-2.5zM922.4 267.5H101.8c-20.9 0-37.8-16.9-37.8-37.8s16.9-37.8 37.8-37.8h820.6c20.9 0 37.8 16.9 37.8 37.8s-16.9 37.8-37.8 37.8zM762.6 349.1c1 9.2 1.5 18.5 1.5 28 0 139.2-112.9 252.1-252.1 252.1S260 516.3 260 377.1c0-9.5 0.5-18.8 1.5-28h501.1z"
                p-id="6017"
                fill="#f4ea2a"></path>
            </svg>
            <span>下午号源</span>
          </div>
          <section class="doclist" v-for="doctor in noonArr" :key="doctor.id">
            <div class="doct">
              <div class="info">
                <div class="docinfo">
                  <span class="docname">
                    {{ doctor.title }}|{{ doctor.docname }}
                  </span>
                  <span class="illness">{{ doctor.skill }}</span>
                </div>
                <div class="ticketinfo">
                  <span class="tickprice">{{ doctor.amount }}</span>
                  <el-button type="primary" @click="goStep2(doctor)">
                    剩余{{ doctor.availableNumber }}
                  </el-button>
                </div>
              </div>
              <hr />
            </div>
          </section>
        </section>
      </section>
    </footer>
  </div>
</template>

<script setup lang="ts">
// when components mounted,get the department registered data from backend
import { onMounted, ref, computed } from "vue";
import { reqDepRegister } from "../../../api/hospital/index";
import { depRgisResData } from "../../../api/hospital/type";
import { useRoute } from "vue-router";
let $route = useRoute();
// 分页器的数据
let pageNo = ref<number>(1);
let limit = ref<number>(6);
// 顶部日期的数据
let workData = ref<any>();
onMounted(() => {
  fetchRegData();
});
// get the department registered data from backend
const fetchRegData = async () => {
  let result: depRgisResData = await reqDepRegister(
    pageNo.value,
    limit.value,
    $route.query.hoscode as string,
    $route.query.depcode as string
  );
  if (result.code == 200) {
    workData.value = result.data;

    // 默认显示内容的日期为第一天
    currentDate.value = workData.value?.bookingScheduleList[0];
    fetchDocData();
  }
};

// 根据选择的日期，显示当天的医生内容
import { reqDoctorInfo } from "../../../api/doctor/index";
import {
  DocResData,
  DocDataItemList,
  DocDataItem,
} from "../../../api/doctor/type";
let currentDate = ref<any>({});
let docArr = ref<DocDataItemList>([]);
// 请求当天的数据
const fetchDocData = async () => {
  let workDate: string = currentDate.value.workDate;
  let res: DocResData = await reqDoctorInfo(
    $route.query.hoscode as string,
    $route.query.depcode as string,
    workDate
  );
  if (res.code == 200) {
    docArr.value = res.data;
  }
};
// 点击某一天时，请求相关的数据
const changeTime = (item: any) => {
  currentDate.value = item;
  fetchDocData();
};
// 对数据进行处理，分开上下午
let morningArr = computed(() => {
  return docArr.value.filter((doc: DocDataItem) => {
    return doc.workTime == 0;
  });
});
let noonArr = computed(() => {
  return docArr.value.filter((doc: DocDataItem) => {
    return doc.workTime == 1;
  });
});

// 跳转到下一个界面
import { useRouter } from "vue-router";
let $router = useRouter();
const goStep2 = (doctor: DocDataItem) => {
  $router.push({
    path: "/hospital/register_step2",
    query: { docId: doctor.id },
  });
};
</script>

<style scoped lang="scss">
.wrap {
  .top {
    margin-top: 40px;
    margin-left: 20px;
    section {
      display: flex;
      color: #7f7f7f;
      .hosname,
      .line,
      .dep,
      .dot {
        margin-right: 10px;
      }
    }
  }

  .center {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 60px 20px;
    h1 {
      font-weight: 900;
      color: #7f7f7f;
    }

    .timer {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
      margin-bottom: 25px;
      width: 100%;
      .item {
        flex: 1;
        border: 1px solid #e8f2ff;
        margin: 0 10px;
        &.active {
          border: 1px solid #fff;
          color: #ccc;
        }

        &.cur {
          transform: scale(1.2);
          border: 2px solid greenyellow;
        }

        .time {
          height: 40px;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #e8f2ff;
        }
        .state {
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .bottom {
    .future {
      text-align: center;
      font-size: larger;
      font-weight: bolder;
      color: rgb(59, 176, 222);
    }

    .doctor {
      .morning,
      .noon {
        margin-bottom: 30px;
        .title {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .doclist {
          .doct {
            margin-bottom: 30px;
            .info {
              display: flex;
              justify-content: space-between;
              .docinfo {
                display: flex;
                flex-direction: column;
                justify-content: center;
                .docname {
                  color: skyblue;
                  margin-bottom: 10px;
                }
                .illness {
                  color: #7f7f7f;
                }
              }

              .ticketinfo {
                display: flex;
                align-items: center;
                margin-right: 100px;
                .tickprice {
                  color: #7f7f7f;
                  margin-right: 50px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
