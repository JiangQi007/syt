import request from "../../utils/request";
import { PatientInfoResData, addInfo } from "./type";

enum API {
  GETPATIENT_URL = "/api/user/patient/auth/findAll",

  // 新增就诊人
  ADDPATIENT_URL = "/api/user/patient/auth/save",

  // 更改就诊人信息
  UPDATEPATIENT_URL = "/api/user/patient/auth/update",

  // 删除就诊人信息
  DELETEPATIENT_URL = "/api/user/patient/auth/remove/",
}

export const reqGetPatient = () =>
  request.get<any, PatientInfoResData>(API.GETPATIENT_URL);

export const reqChangePatient = (data: addInfo) => {
  if (data.id) {
    return request.put<any, any>(API.UPDATEPATIENT_URL, data);
  } else {
    return request.post<any, any>(API.ADDPATIENT_URL, data);
  }
};

export const reqDeletePatient = (id: number) =>
  request.delete<any, any>(API.DELETEPATIENT_URL + id);
