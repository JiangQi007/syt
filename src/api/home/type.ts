//定义ts数据类型
export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//医院
export interface hospital {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    hostypeString: string;
    fullAddress: string;
  };
  hoscode: string;
  hosname: string;
  hostype: string;
  provinceCode: string;
  cityCode: string;
  districtCode: string;
  address: string;
  logoData: string;
  intro: string;
  route: string;
  status: number;
  bookingRule: {
    cycle: number;
    releaseTime: string;
    stopTime: string;
    quitDay: number;
    quitTime: string;
    rule: string[];
  };
}

//存储全部医院
export type Content = hospital[];

//接口返回数据
export interface HospitalResponseData extends ResponseData {
  data: {
    content: Content;
    pageable: {
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      pageNumber: number;
      pageSize: number;
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    totalPages: number;
    totalElements: number;
    last: boolean;
    first: boolean;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    numberOfElements: number;
    size: number;
    number: number;
    empty: boolean;
  };
}

//医院的level或地区的数据
export interface HospitalInfo {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {};
  parentId: number;
  name: string;
  value: string;
  dictCode: string;
  hasChildren: boolean;
}
//存储相关搜索出来的数据
export type HospitalInfoArr = HospitalInfo[];
//获取等级或医院地区接口返回数据类型
export interface HospitalInfoResponseData extends ResponseData {
  data: HospitalInfoArr;
}

//根据名字搜索医院的数据
export interface HospitalByName extends ResponseData {
  data: Content;
}
