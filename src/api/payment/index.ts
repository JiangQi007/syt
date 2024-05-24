import request from "../../utils/request";
import { PayResData } from "./type";

enum API {
  GETPAYMENTQR_URL = "/api/order/weixin/createNative/",
}

export const reqPayQr = (id: string) =>
  request.get<any, PayResData>(API.GETPAYMENTQR_URL + id);
