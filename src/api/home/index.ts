//首页用到的接口管理
import request from "../../utils/request";
import {
  HospitalResponseData,
  HospitalInfoResponseData,
  HospitalByName,
} from "./type";

enum API {
  //获取医院信息
  HOSPITAL_URL = "/api/hosp/hospital/",

  //获取医院等级与地区的接口
  HOSPITALINFO_URL = "/api/cmn/dict/findByDictCode/",

  // 根据关键字搜索相关医院
  HOSPITALBYNAME_URL = "/api/hosp/hospital/findByHosname/",
}
//获取医院信息
export const reqHospital = (
  page: number,
  limit: number,
  hostype: string,
  districtCode: string
) =>
  request.get<any, HospitalResponseData>(
    API.HOSPITAL_URL +
      `${page}/${limit}?hostype=${hostype}&districtCode=${districtCode}`
  );

//获取医院等级与地区的接口
export const reqHospitalInfo = (dictCode: string) =>
  request.get<any, HospitalInfoResponseData>(API.HOSPITALINFO_URL + dictCode);

// 根据关键字搜索相关医院
export const reqHospitalByName = (hosname: string) =>
  request.get<any, HospitalByName>(API.HOSPITALBYNAME_URL + hosname);
