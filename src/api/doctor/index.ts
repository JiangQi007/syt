import request from "../../utils/request";
import { DocResData, DetailResData } from "./type";

enum API {
  DOCTORINFO_URL = "/api/hosp/hospital/auth/findScheduleList/",
  DETAILINFO_URL = "/api/hosp/hospital/getSchedule/",
}

export const reqDoctorInfo = (
  hoscode: string,
  depcode: string,
  workDate: string
) =>
  request.get<any, DocResData>(
    API.DOCTORINFO_URL + `${hoscode}/${depcode}/${workDate}`
  );

export const reqDetaiInfo = (docId: string) =>
  request.get<any, DetailResData>(API.DETAILINFO_URL + docId);
