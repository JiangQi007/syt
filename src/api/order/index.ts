import request from "../../utils/request";
import {
  AddOrderResData,
  DetailOrderResData,
  AllOrderResData,
  StateResData,
} from "./type";

enum API {
  // 创建订单
  ADDORDER_URL = "/api/order/orderInfo/auth/submitOrder/",

  // 获取指定id订单详情
  GETORDERINFO_URL = "/api/order/orderInfo/auth/getOrderInfo/",

  // 取消订单
  CANCELORDER_URL = "/api/order/orderInfo/auth/cancelOrder/",

  // 获取所有订单详情
  GETALLINFO_URL = "/api/order/orderInfo/auth/",

  // 获取系统支持的所有的订单状态
  ALLSTATE_URL = "/api/order/orderInfo/auth/getStatusList",
}

export const reqAddOrder = (
  hoscode: string,
  scheduleId: string,
  patientId: number
) =>
  request.post<any, AddOrderResData>(
    API.ADDORDER_URL + `${hoscode}/${scheduleId}/${patientId}`
  );

// 获取指定id订单详情
export const reqOrderDetail = (id: string) =>
  request.get<any, DetailOrderResData>(API.GETORDERINFO_URL + id);

// 取消订单
export const reqCancelOrder = (id: string) =>
  request.get<any, any>(API.CANCELORDER_URL + id);

// 获取所有订单的信息
export const reqAllOrder = (
  page: number,
  limit: number,
  patientId: string,
  orderStatus: string
) =>
  request.get<any, AllOrderResData>(
    API.GETALLINFO_URL +
      `${page}/${limit}?patientId=${patientId}&orderStatus=${orderStatus}`
  );

// 获取系统支持的所有的订单状态
export const reqAllState = () =>
  request.get<any, StateResData>(API.ALLSTATE_URL);
