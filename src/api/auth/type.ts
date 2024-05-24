export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// 获取系统支持的证件信息
export interface authMethod {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {};
  parentId: number;
  name: string;
  value: string;
  dictCode: "";
  hasChildren: boolean;
}
export type authMethodData = authMethod[];
export interface authMethodResData extends ResponseData {
  data: authMethodData;
}

// 进行实名认证
export interface UserParams {
  certificatesNo: string;
  certificatesType: string;
  certificatesUrl: string;
  name: string;
}
