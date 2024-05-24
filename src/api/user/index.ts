import request from "../../utils/request";
import { LoginData, LoginResData, CheckRealNameResData } from "./type.ts";

enum API {
  USERLOGIN_URL = "/api/user/login",

  REALNAME_URL = "/api/user/auth/getUserInfo",
}
// user login interface
export const reqUserLogin = (data: LoginData) =>
  request.post<any, LoginResData>(API.USERLOGIN_URL, data);

// 检查用户是否实名认证
export const checkRealName = () =>
  request.get<any, CheckRealNameResData>(API.REALNAME_URL);
