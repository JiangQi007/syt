import { defineStore } from "pinia";
import { reqCode } from "../../api/hospital/index";
import { LoginData, LoginResData } from "../../api/user/type";
import { reqUserLogin } from "../../api/user/index";
import { SET_TOKEN, GET_TOKEN, CLEAR_TOKEN } from "../../utils/user";
import { UserInformation } from "./interface";

const useUserStore = defineStore("User", {
  state: (): UserInformation => {
    return {
      // control the component display
      visiable: false,
      code: "",
      userInfo: JSON.parse(GET_TOKEN() as string) || {},
    };
  },
  actions: {
    // get the code
    async getCode(phone: string) {
      let result: any = await reqCode(phone);
      if (result.code == 200) {
        this.code = result.data;
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },

    // phone login
    async userLogin(loginData: LoginData) {
      let result: LoginResData = await reqUserLogin(loginData);
      if (result.code == 200) {
        this.userInfo = result.data;
        // keep data
        SET_TOKEN(JSON.stringify(this.userInfo));
        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    },

    // logout
    async logout() {
      this.userInfo = { name: "", token: "" };
      CLEAR_TOKEN();
    },
  },
  getters: {},
});

export default useUserStore;
