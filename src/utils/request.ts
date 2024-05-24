//二次封装axios
import axios from "axios";
import { ElMessage } from "element-plus";

// 获取用户仓库
import useUserStore from "../store/modules/user";

//创建axios实例
const request = axios.create({
  timeout: 10000,
});

//请求拦截器
request.interceptors.request.use((config) => {
  let userStore = useUserStore();
  if (userStore.userInfo.token) {
    config.headers.token = userStore.userInfo.token;
  }
  return config;
});

//响应拦截器
request.interceptors.response.use(
  (response) => {
    //response是服务器返回的数组数据；会注入到axios请求的res中
    return response.data;
  },
  (error) => {
    //处理http网络错误
    let status = 0;
    if (
      error.name == "AxiosError" &&
      error.message == "timeout of 10000ms exceeded"
    ) {
      status = error.request.status;
    } else {
      status = error.response.status;
    }
    switch (status) {
      case 404:
        ElMessage({
          type: "error",
          message: error.message,
        });
        break;

      case 500 | 501 | 502 | 503 | 504 | 505:
        ElMessage({
          type: "error",
          message: error.message,
        });
        break;

      case 0:
        ElMessage({
          type: "error",
          message: error.message,
        });
        break;
    }
    return Promise.reject(new Error(error.message));
  }
);

export default request;
