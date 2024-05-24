import request from "../../utils/request";
import { authMethodResData, UserParams } from "./type.ts";

enum API {
  GETAUTHMETHOD_URL = "/api/cmn/dict/findByDictCode/",

  AUTHENTICATION_URL = "/api/user/auth/userAuah",
}

export const reqAuthMethod = (dictCode: string) =>
  request.get<any, authMethodResData>(API.GETAUTHMETHOD_URL + dictCode);

export const reqConductAuthen = (data: UserParams) =>
  request.post(API.AUTHENTICATION_URL, data);
