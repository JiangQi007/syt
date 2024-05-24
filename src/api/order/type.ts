export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

export interface AddOrderResData extends ResponseData {
  data: number;
}

// 指定id的order
export interface DetailOrderData {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    orderStatusString: string;
  };
  userId: number;
  outTradeNo: string;
  hoscode: string;
  hosname: string;
  depcode: string;
  depname: string;
  scheduleId: string;
  title: string;
  reserveDate: string;
  reserveTime: number;
  patientId: number;
  patientName: string;
  patientPhone: string;
  hosRecordId: string;
  number: number;
  fetchTime: string;
  fetchAddress: string;
  amount: number;
  quitTime: string;
  orderStatus: number;
}
export interface DetailOrderResData extends ResponseData {
  data: DetailOrderData;
}

// 全部的order
export interface RecordsItem {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    orderStatusString: string;
  };
  userId: number;
  outTradeNo: string;
  hoscode: string;
  hosname: string;
  depcode: string;
  depname: string;
  scheduleId: null;
  title: string;
  reserveDate: string;
  reserveTime: number;
  patientId: number;
  patientName: string;
  patientPhone: string;
  hosRecordId: string;
  number: number;
  fetchTime: string;
  fetchAddress: string;
  amount: number;
  quitTime: string;
  orderStatus: number;
}
export type Records = RecordsItem[];
export interface AllOrderData {
  records: Records;
  total: number;
  size: number;
  current: number;
  orders: [];
  hitCount: boolean;
  searchCount: boolean;
  pages: number;
}
export interface AllOrderResData extends ResponseData {
  data: AllOrderData;
}

// 获取系统支持的所有的订单状态
export interface StateDataItem {
  comment: string;
  status: number;
}
export type StateData = StateDataItem[];
export interface StateResData extends ResponseData {
  data: StateData;
}
