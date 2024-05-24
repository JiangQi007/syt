export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//   hospital detail response data
export interface HospitalDetail {
  bookingRule: {
    cycle: number;
    releaseTime: string;
    stopTime: string;
    quitDay: number;
    quitTime: string;
    rule: string[];
  };
  hospital: {
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
    intro: null;
    route: string;
    status: number;
    bookingRule: null;
  };
}
//hospital detail response
export interface HospitalDetailResponse extends ResponseData {
  data: HospitalDetail;
}

// department data type
export interface Department {
  depcode: string;
  depname: string;
  children?: Department[];
}

// department response data
export type DepartmentArr = Department[];
export interface DepartmentResponseData extends ResponseData {
  data: DepartmentArr;
}

// department register
export interface BaseMap {
  workDateString: string;
  releaseTime: string;
  bigname: string;
  stopTime: string;
  depname: string;
  hosname: string;
}
export interface workData {
  workDate: string;
  workDateMd: string;
  dayOfWeek: string;
  docCount: number;
  reservedNumber: number;
  availableNumber: number;
  status: number;
}
export type list = workData[];
// response data
export type DepRegisData = {
  total: number;
  bookingScheduleList: list;
  baseMap: BaseMap;
};
export interface depRgisResData extends ResponseData {
  data: DepRegisData;
}
