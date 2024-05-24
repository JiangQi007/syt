// 路由鉴权,通过全局守卫来完成
// 引入路由器
import router from "./router";

// 进度条
import Nprogress from "nprogress";
import "nprogress/nprogress.css";

// 仓库
import useUserStore from "./store/modules/user";
import pinia from "./store";
let userStore = useUserStore(pinia);

Nprogress.configure({ showSpinner: false });

// 添加相应的全局首位
// 前置守卫
let whiteList = [
  "/home",
  "/hospital/register",
  "/hospital/detail",
  "/hospital/notice",
  "/hospital/close",
  "/hospital/search",
];
router.beforeEach((to, _from, next) => {
  Nprogress.start();

  //动态设置网页左上角的标题
  document.title = `syt-${to.meta.title}`;

  //   根据token判断用户是否登录
  let token = userStore.userInfo.token;
  if (token) {
    next();
  } else {
    if (whiteList.includes(to.path)) {
      next();
    } else {
      userStore.visiable = true;
      next({ path: "/home" });
    }
  }
});

// 后置路由
router.afterEach((_to) => {
  Nprogress.done();
});
