<template>
  <main class="container">
    <section class="top">
      <div class="name">
        <span>{{ item.isInsure == 1 ? "医保" : "自费" }}</span>
        <span>{{ item.name }}</span>
      </div>
      <div class="edit">
        <el-button type="primary" round @click="handler">
          <el-icon><EditPen /></el-icon>
        </el-button>

        <el-popconfirm title="确认删除?" @confirm="removePatient">
          <template #reference>
            <el-button
              type="danger"
              round
              v-if="$route.path == '/user/patient'">
              <el-icon><Delete /></el-icon>
            </el-button>
          </template>
        </el-popconfirm>
      </div>
    </section>
    <section class="bottom">
      <div class="item">
        <span>证件类型：</span>
        <span>{{ item.param.certificatesTypeString }}</span>
      </div>
      <div class="item">
        <span>证件号码：</span>
        <span>{{ item.certificatesNo }}</span>
      </div>
      <div class="item">
        <span>用户性别：</span>
        <span>{{ item.sex == 0 ? "女生" : "男生" }}</span>
      </div>
      <div class="item">
        <span>出生日期：</span>
        <span>{{ item.birthdate }}</span>
      </div>
      <div class="item">
        <span>手机号码：</span>
        <span>{{ item.phone }}</span>
      </div>
      <div class="item">
        <span>婚姻状况：</span>
        <span>{{ item.isMarry == 0 ? "未婚" : "已婚" }}</span>
      </div>
      <div class="item">
        <span>当前住址：</span>
        <span>{{ item.address }}</span>
      </div>
      <div class="item">
        <span>详细地址：</span>
        <span>{{ item.param.fullAddress }}</span>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { Delete } from "@element-plus/icons-vue";

// 接受父组件信息
let props = defineProps(["item"]);
let $emit = defineEmits(["changeScene", "removePatient"]);

// 获取路由，判断是挂号还是就诊人管理
import { useRoute, useRouter } from "vue-router";
let $route = useRoute();
let $router = useRouter();

// 编辑就诊人的跳转
const handler = () => {
  // 就诊人管理模块点击按钮
  if ($route.path == "/user/patient") {
    $emit("changeScene", props.item);
  }
  // 预约挂号点击按钮
  else {
    $router.push({
      path: "/user/patient",
      query: { type: "edit", id: props.item.id },
    });
  }
};

//删除按钮
import { reqDeletePatient } from "../../../api/patient/index";
import { ElMessage } from "element-plus";
const removePatient = async () => {
  try {
    await reqDeletePatient(props.item.id);
    $emit("removePatient");
    ElMessage({
      type: "success",
      message: "删除成功！",
    });
  } catch (error) {
    ElMessage({
      type: "error",
      message: "删除失败！",
    });
  }
};
</script>

<style scoped lang="scss">
.container {
  border: 1px solid #7f7f7f;
  .top {
    height: 60px;
    background-color: #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 10px;
    .name {
      display: flex;
      align-items: center;

      :nth-child(1) {
        display: block;
        padding: 2px 2px;
        background-color: #fff;
        font-size: smaller;
        color: black;
        font-weight: 600;
      }

      :nth-child(2) {
        margin-left: 10px;
        color: #7f7f7f;
      }
    }
  }

  .bottom {
    padding: 20px 10px;
    .item {
      margin-bottom: 10px;
      :nth-child(2) {
        color: #7f7f7f;
        margin-left: 5px;
      }
    }
  }
}
</style>
