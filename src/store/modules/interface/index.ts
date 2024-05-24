import type { HospitalDetail, DepartmentArr } from "../../../api/hospital/type";
// 定义仓库内部数据state的ts类型

export interface DetailState {
  hospitalInfo: HospitalDetail;
  departmentArr: DepartmentArr;
}

export interface UserInformation {
  visiable: boolean;
  code: string;
  userInfo: {
    name: string;
    token: string;
  };
}
