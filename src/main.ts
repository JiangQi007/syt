//创建应用实例的方法createApp
import { createApp } from "vue";
//引入根组件app
import App from "./App.vue";
import "./style/reset.scss";

//引入全局组件
import HospitalTop from "./components/hospital_top/index.vue";
import HospitalBottom from "./components/hospital_bottom/index.vue";
import Login from "./components/login/index.vue";

//引入router
import router from "./router";

//element-plus
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";

// import pinia
import pinia from "../src/store/index";

//利用vue3提供的createApp方法创建app应用实例，然后挂载到#app上，#app在index.html
const app = createApp(App);
app.component("HospitalTop", HospitalTop);
app.component("HospitalBottom", HospitalBottom);
app.component("Login", Login);

app.use(router);
app.use(pinia);
app.use(ElementPlus, {
  locale: zhCn,
});
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 引入路由鉴权文件
import "./permission";

app.mount("#app");
