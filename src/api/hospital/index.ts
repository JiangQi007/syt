import request from "../../utils/request";
import {
  HospitalDetailResponse,
  DepartmentResponseData,
  depRgisResData,
} from "./type";

enum API {
  HOSPITALDETAIL_URL = "/api/hosp/hospital/",

  // get department
  HOSPITALDEPARTMENT_URL = "/api/hosp/hospital/department/",

  // get verification code
  GETUSERCODE_URL = "/api/sms/send/",

  // get a department register data
  HOSPITALWORK_URL = "/api/hosp/hospital/auth/getBookingScheduleRule/",
}

// get hospital detail
export const reqHospitalDetail = (hoscode: string) =>
  request.get<any, HospitalDetailResponse>(API.HOSPITALDETAIL_URL + hoscode);

export const reqHospitalDepartment = (hoscode: string) =>
  request.get<any, DepartmentResponseData>(
    API.HOSPITALDEPARTMENT_URL + hoscode
  );

// get verification code
export const reqCode = (phone: string) =>
  request.get<any, any>(API.GETUSERCODE_URL + phone);

// get a department register data
export const reqDepRegister = (
  page: number,
  limit: number,
  hoscode: string,
  depcode: string
) =>
  request.get<any, depRgisResData>(
    API.HOSPITALWORK_URL + `${page}/${limit}/${hoscode}/${depcode}`
  );
