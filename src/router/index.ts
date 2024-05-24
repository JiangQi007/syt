import { createRouter, createWebHistory } from "vue-router";

//createRouter方法创建路由器实例
export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      component: () => import("../pages/home/index.vue"),
      meta: {
        title: "首页",
      },
    },
    {
      path: "/hospital",
      component: () => import("../pages/hospital/index.vue"),
      meta: {
        title: "医院",
      },
      children: [
        {
          path: "register",
          component: () => import("../pages/hospital/register/index.vue"),
        },
        {
          path: "close",
          component: () => import("../pages/hospital/close/index.vue"),
        },
        {
          path: "detail",
          component: () => import("../pages/hospital/detail/index.vue"),
        },
        {
          path: "notice",
          component: () => import("../pages/hospital/notice/index.vue"),
        },
        {
          path: "search",
          component: () => import("../pages/hospital/search/index.vue"),
        },
        {
          path: "register_step1",
          component: () =>
            import("../pages/hospital/register/register_step1.vue"),
        },
        {
          path: "register_step2",
          component: () =>
            import("../pages/hospital/register/register_step2.vue"),
        },
      ],
    },
    {
      path: "/",
      redirect: "/home",
      meta: {
        title: "首页",
      },
    },
    {
      path: "/user",
      component: () => import("../pages/user/index.vue"),
      meta: {
        title: "用户",
      },
      children: [
        {
          path: "certification",
          component: () => import("../pages/user/certification/index.vue"),
        },
        {
          path: "feedback",
          component: () => import("../pages/user/feedback/index.vue"),
        },
        {
          path: "order",
          component: () => import("../pages/user/order/index.vue"),
        },
        {
          path: "patient",
          component: () => import("../pages/user/patient/index.vue"),
        },
        {
          path: "profile",
          component: () => import("../pages/user/profile/index.vue"),
        },
      ],
    },
  ],
  scrollBehavior() {
    return {
      left: 0,
      top: 0,
    };
  },
});
