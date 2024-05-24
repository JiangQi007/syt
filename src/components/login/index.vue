<template>
  <div class="login_container">
    <el-dialog
      v-model="userStore.visiable"
      title="用户登录"
      width="700px"
      @close="close">
      <!-- main content -->
      <el-row class="main_container">
        <!-- left part -->
        <el-col :span="12">
          <section class="leftPart">
            <!-- Verification code login -->
            <section v-show="loginMode == 0">
              <!-- form content -->
              <el-form :model="loginParams" :rules="rule" ref="formRef">
                <el-form-item prop="phone">
                  <el-input
                    placeholder="请输入手机号码"
                    v-model="loginParams.phone">
                    <template #prefix>
                      <el-icon><Cellphone /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>

                <el-form-item prop="code">
                  <el-input
                    placeholder="请输入验证码"
                    v-model="loginParams.code">
                    <template #prefix>
                      <el-icon><Message /></el-icon>
                    </template>
                  </el-input>
                </el-form-item>

                <el-form-item>
                  <el-button
                    :disabled="!isPhone || flag ? true : false"
                    @click="getCode">
                    <CountDown v-if="flag" :flag="flag" @getFlag="getFlag" />
                    <span v-else> 获取验证码</span>
                  </el-button>
                </el-form-item>
              </el-form>

              <!-- botton button -->
              <section class="bottomButton">
                <el-button
                  type="primary"
                  style="width: 90%"
                  :disabled="
                    !isPhone || loginParams.code.length < 6 ? true : false
                  "
                  @click="login">
                  用户登录
                </el-button>
                <p @click="changeMode">微信扫码登录</p>
                <svg
                  t="1715165930665"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5835"
                  width="32"
                  height="32"
                  @click="changeMode">
                  <path
                    d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                    fill="#28C445"
                    p-id="5836"></path>
                  <path
                    d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                    fill="#28C445"
                    p-id="5837"></path>
                </svg>
              </section>
            </section>

            <!-- QRcode login -->
            <section v-show="loginMode == 1">
              <p>微信扫码登录</p>
              <div class="loader"></div>
              <button class="btn-12" @click="changeMode">
                <span>手机验证码登录</span>
              </button>
            </section>
          </section>
        </el-col>

        <!-- right part -->
        <el-col :span="12">
          <section class="rightPart">
            <!-- top part -->
            <section class="top">
              <div class="item">
                <img
                  src="../../assets/code_login_wechat.jpg"
                  alt="微信公众号关注" />
                <svg
                  t="1715165930665"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="5835"
                  width="16"
                  height="16">
                  <path
                    d="M337.387283 341.82659c-17.757225 0-35.514451 11.83815-35.514451 29.595375s17.757225 29.595376 35.514451 29.595376 29.595376-11.83815 29.595376-29.595376c0-18.49711-11.83815-29.595376-29.595376-29.595375zM577.849711 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763zM501.641618 401.017341c17.757225 0 29.595376-12.578035 29.595376-29.595376 0-17.757225-11.83815-29.595376-29.595376-29.595375s-35.514451 11.83815-35.51445 29.595375 17.757225 29.595376 35.51445 29.595376zM706.589595 513.479769c-11.83815 0-22.936416 12.578035-22.936416 23.6763 0 12.578035 11.83815 23.676301 22.936416 23.676301 17.757225 0 29.595376-11.83815 29.595376-23.676301s-11.83815-23.676301-29.595376-23.6763z"
                    fill="#707070"
                    p-id="5836"></path>
                  <path
                    d="M510.520231 2.959538C228.624277 2.959538 0 231.583815 0 513.479769s228.624277 510.520231 510.520231 510.520231 510.520231-228.624277 510.520231-510.520231-228.624277-510.520231-510.520231-510.520231zM413.595376 644.439306c-29.595376 0-53.271676-5.919075-81.387284-12.578034l-81.387283 41.433526 22.936416-71.768786c-58.450867-41.433526-93.965318-95.445087-93.965317-159.815029 0-113.202312 105.803468-201.988439 233.803468-201.98844 114.682081 0 216.046243 71.028902 236.023121 166.473989-7.398844-0.739884-14.797688-1.479769-22.196532-1.479769-110.982659 1.479769-198.289017 85.086705-198.289017 188.67052 0 17.017341 2.959538 33.294798 7.398844 49.572255-7.398844 0.739884-15.537572 1.479769-22.936416 1.479768z m346.265896 82.867052l17.757225 59.190752-63.630058-35.514451c-22.936416 5.919075-46.612717 11.83815-70.289017 11.83815-111.722543 0-199.768786-76.947977-199.768786-172.393063-0.739884-94.705202 87.306358-171.653179 198.289017-171.65318 105.803468 0 199.028902 77.687861 199.028902 172.393064 0 53.271676-34.774566 100.624277-81.387283 136.138728z"
                    fill="#707070"
                    p-id="5837"></path>
                </svg>
                <p>微信扫一扫关注</p>
                <p>”快速预约挂号“</p>
              </div>
              <div class="item">
                <img src="../../assets/code_app.jpg" alt="下载app" />
                <el-icon><Iphone /></el-icon>
                <p>扫一扫下载</p>
                <p>”预约挂号app“</p>
              </div>
            </section>

            <!-- foot part -->
            <section class="foot">
              <p>xxxx官方指定平台</p>
              <p>快速挂号，安全放心</p>
            </section>
          </section>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// countdown function
// import countdown component
import CountDown from "../countdown/index.vue";
// if flag is true, start countdown
let flag = ref<boolean>(false);
// son component finish countdown;
const getFlag = (val: boolean) => {
  flag.value = val;
};

// <!-- get data from piniastore-->
import useUserStore from "../../store/modules/user";
let userStore = useUserStore();

// control to choose QRcode or verificationcode to login
import { computed, reactive, ref } from "vue";
import { ElMessage } from "element-plus";
// 0:verification; 1:QRcode
let loginMode = ref<number>(0);
// a method to change the login mode
const changeMode = () => {
  if (loginMode.value == 0) {
    loginMode.value = 1;
  } else {
    loginMode.value = 0;
  }
};

// verification code login function
// first,get the phone number
let loginParams = reactive({
  phone: "",
  code: "",
});
//second,check if the number is right format
let isPhone = computed(() => {
  const reg = /^1([38][0-9]|5[0-35-9]|6[6]|7[0135678]|9[89])\d{8}$/;
  return reg.test(loginParams.phone);
});
// third,if the phone is right format,then while click the button,
// get the verification code from the backend
const getCode = async () => {
  // inform pinia to send request and save the data
  try {
    // start countdown
    flag.value = true;

    await userStore.getCode(loginParams.phone);
    loginParams.code = userStore.code;
  } catch (error) {}
};

// form check
const rule = {
  phone: [
    { required: true, message: "请输入手机号码：", trigger: "blur" },
    {
      pattern: /^1([38][0-9]|5[0-35-9]|6[6]|7[0135678]|9[89])\d{8}$/, // 添加正则表达式校验
      message: "请输入中国大陆的手机号码",
      trigger: "blur",
    },
  ],
  code: [
    { required: true, message: "请输入验证码：", trigger: "change" },
    {
      pattern: /^\d{6}$/, // 匹配6位数字
      message: "请输入6位验证码",
      trigger: "blur",
    },
  ],
};

// phone login function
let formRef = ref<any>();
const login = async () => {
  // form check
  await formRef.value.validate();
  try {
    await userStore.userLogin(loginParams);
    userStore.visiable = false;
  } catch (error) {
    ElMessage({
      type: "error",
      message: (error as Error).message,
    });
  }
};

// close login
const close = () => {
  formRef.value.resetFields();
};
</script>

<style scoped lang="scss">
.login_container {
  ::v-deep(.el-dialog__body) {
    border-top: 1px solid #7f7f7f;
    border-top: 1px solid #7f7f7f;
  }

  .main_container {
    margin-top: 30px;

    .leftPart {
      border: 1px solid #ccc;
      padding: 20px;

      .bottomButton {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 25px;

        p {
          margin: 10px 0;
        }
      }

      .loader {
        position: relative;
        width: 120px;
        height: 90px;
        margin-top: 90px;
      }

      .loader:before {
        content: "";
        position: absolute;
        bottom: 30px;
        left: 50px;
        height: 30px;
        width: 30px;
        border-radius: 50%;
        background: #2a9d8f;
        animation: loading-bounce 0.5s ease-in-out infinite alternate;
      }

      .loader:after {
        content: "";
        position: absolute;
        right: 0;
        top: 0;
        height: 7px;
        width: 45px;
        border-radius: 4px;
        box-shadow: 0 5px 0 #f2f2f2, -35px 50px 0 #f2f2f2, -70px 95px 0 #f2f2f2;
        animation: loading-step 1s ease-in-out infinite;
      }

      @keyframes loading-bounce {
        0% {
          transform: scale(1, 0.7);
        }

        40% {
          transform: scale(0.8, 1.2);
        }

        60% {
          transform: scale(1, 1);
        }

        100% {
          bottom: 140px;
        }
      }

      @keyframes loading-step {
        0% {
          box-shadow: 0 10px 0 rgba(0, 0, 0, 0), 0 10px 0 #f2f2f2,
            -35px 50px 0 #f2f2f2, -70px 90px 0 #f2f2f2;
        }

        100% {
          box-shadow: 0 10px 0 #f2f2f2, -35px 50px 0 #f2f2f2,
            -70px 90px 0 #f2f2f2, -70px 90px 0 rgba(0, 0, 0, 0);
        }
      }

      .btn-12,
      .btn-12 *,
      .btn-12 :after,
      .btn-12 :before,
      .btn-12:after,
      .btn-12:before {
        border: 0 solid;
        box-sizing: border-box;
      }

      .btn-12 {
        -webkit-tap-highlight-color: transparent;
        -webkit-appearance: button;
        background-color: #000;
        background-image: none;
        color: #fff;
        cursor: pointer;
        font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif,
          Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
        font-size: 100%;
        font-weight: 900;
        line-height: 1.5;
        margin: 0;
        -webkit-mask-image: -webkit-radial-gradient(#000, #fff);
        padding: 0;
        text-transform: uppercase;
      }

      .btn-12:disabled {
        cursor: default;
      }

      .btn-12:-moz-focusring {
        outline: auto;
      }

      .btn-12 svg {
        display: block;
        vertical-align: middle;
      }

      .btn-12 [hidden] {
        display: none;
      }

      .btn-12 {
        border-radius: 99rem;
        border-width: 2px;
        overflow: hidden;
        padding: 0.8rem 3rem;
        position: relative;
      }

      .btn-12 span {
        mix-blend-mode: difference;
      }

      .btn-12:after,
      .btn-12:before {
        background: linear-gradient(
          90deg,
          #fff 25%,
          transparent 0,
          transparent 50%,
          #fff 0,
          #fff 75%,
          transparent 0
        );
        content: "";
        inset: 0;
        position: absolute;
        transform: translateY(var(--progress, 100%));
        transition: transform 0.2s ease;
      }

      .btn-12:after {
        --progress: -100%;
        background: linear-gradient(
          90deg,
          transparent 0,
          transparent 25%,
          #fff 0,
          #fff 50%,
          transparent 0,
          transparent 75%,
          #fff 0
        );
        z-index: -1;
      }

      .btn-12:hover:after,
      .btn-12:hover:before {
        --progress: 0;
      }
    }

    .rightPart {
      margin-left: 20px;
      .top {
        display: flex;
        justify-content: space-between;

        .item {
          display: flex;
          flex-direction: column;
          align-items: center;

          img {
            margin-bottom: 10px;
          }

          p {
            margin-top: 5px;
          }
        }
      }

      .foot {
        text-align: center;
        margin-top: 40px;
        p {
          font-weight: bolder;
          font-size: large;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
