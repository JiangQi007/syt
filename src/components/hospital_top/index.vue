<template>
  <div class="top">
    <div class="content">
      <!-- 左侧 -->
      <div class="left" @click="goHome">
        <img src="../../assets/logo.png" />
        <p>尚医通 预约挂号统一平台</p>
      </div>

      <!-- 右侧 -->
      <div class="right">
        <p class="help">帮助中心</p>
        <p class="login" @click="login" v-if="!userStore.userInfo.name">
          登录/注册
        </p>

        <!-- 已经登录时 -->
        <p v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ userStore.userInfo.name }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goUser('/user/certification')"
                  >实名认证</el-dropdown-item
                >
                <el-dropdown-item @click="goUser('/user/order')"
                  >挂号订单</el-dropdown-item
                >
                <el-dropdown-item @click="goUser('/user/patient')"
                  >就诊人管理</el-dropdown-item
                >
                <el-dropdown-item divided @click="logout"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

let $router = useRouter();
const goHome = () => {
  $router.push({ path: "/home" });
};

// while click the login button,display the login component
import useUserStore from "../../store/modules/user";
let userStore = useUserStore();
const login = () => {
  userStore.visiable = true;
};

// logout function
const logout = () => {
  userStore.logout();
  $router.push("/home");
};

// 路由跳转
const goUser = (path: string) => {
  $router.push({ path: path });
};
</script>

<style scoped lang="scss">
.top {
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 70px;

  display: flex;
  justify-content: center;
}
.content {
  width: 1200px;
  height: 70px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}
.left {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
  }

  p {
    font-size: 20px;
    color: #55a6fe;
  }
}

.right {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  .help {
    margin-right: 10px;
  }
}
</style>
