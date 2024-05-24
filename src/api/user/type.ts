export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// login required data
export interface LoginData {
  phone: string;
  code: string;
}
// login response data part
export interface UserInfo {
  name: string;
  token: string;
}
// login response data
export interface LoginResData extends ResponseData {
  data: UserInfo;
}

// 请求用户实名认证的信息
export interface RealNameData {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {};
  openid: null;
  nickName: null;
  phone: string;
  name: string;
  certificatesType: string;
  certificatesNo: string;
  certificatesUrl: null;
  authStatus: number;
  status: number;
}
export interface CheckRealNameResData extends ResponseData {
  data: RealNameData;
}

// 用户提交实名认证的信息
export interface UserParams {
  certificatesNo: string;
  certificatesType: string;
  certificatesUrl: string;
  name: string;
}
