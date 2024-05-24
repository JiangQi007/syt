import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api/hosp": {
        target: "http://139.198.34.216:8201",
        changeOrigin: true,
      },
      "/api/cmn/dict": {
        target: "http://139.198.34.216:8202",
        changeOrigin: true,
      },
      "/api/sms": {
        target: "http://139.198.34.216:8204",
        changeOrigin: true,
      },
      "/api/user": {
        target: "http://139.198.34.216:8203",
        changeOrigin: true,
      },
      "/api/order": {
        target: "http://139.198.34.216:8206",
        changeOrigin: true,
      },
      "/api/oss": {
        target: "http://139.198.34.216:8205",
        changeOrigin: true,
      },
      "/api/auth/userAuah": {
        target: "http://syt.atguigu.cn",
        changeOrigin: true,
      },
    },
  },
});
