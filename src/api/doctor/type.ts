export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

// doctor info
export interface DocDataItem {
  id: string;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    dayOfWeek: string;
    depname: string;
    hosname: string;
  };
  hoscode: string;
  depcode: string;
  title: string;
  docname: string;
  skill: string;
  workDate: string;
  workTime: number;
  reservedNumber: number;
  availableNumber: number;
  amount: number;
  status: number;
  hosScheduleId: string;
}
export type DocDataItemList = DocDataItem[];
export interface DocResData extends ResponseData {
  data: DocDataItemList;
}

// detailInfo
export interface DetailResData extends ResponseData {
  data: DocDataItem;
}
