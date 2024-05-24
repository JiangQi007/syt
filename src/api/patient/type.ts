export interface ResponseData {
  code: number;
  message: string;
  ok: boolean;
}

//   patient info
export interface PatientInfo {
  id: number;
  createTime: string;
  updateTime: string;
  isDeleted: number;
  param: {
    certificatesTypeString: string;
    contactsCertificatesTypeString: string;
    cityString: null;
    fullAddress: string;
    districtString: null;
    provinceString: null;
  };
  userId: number;
  name: string;
  certificatesType: string;
  certificatesNo: string;
  sex: number;
  birthdate: string;
  phone: string;
  isMarry: number;
  provinceCode: null;
  cityCode: null;
  districtCode: null;
  address: string;
  contactsName: string;
  contactsCertificatesType: string;
  contactsCertificatesNo: string;
  contactsPhone: string;
  isInsure: number;
  cardNo: null;
  status: string;
}
export type PatientInfoArr = PatientInfo[];
export interface PatientInfoResData extends ResponseData {
  data: PatientInfoArr;
}

// 新增就诊人需要携带的数据
export interface addInfo {
  address: string;
  id?: string;
  name: string;
  certificatesType: string;
  certificatesNo: string;
  sex: number;
  birthdate: string;
  phone: string;
  isMarry: number;
  isInsure: number;
  addressSelected: string[];
  contactsName: string;
  contactsCertificatesType: string;
  contactsCertificatesNo: string;
  contactsPhone: string;
  provinceCode: string;
  cityCode: string;
  districtCode: string;
}

// 表单收集到的数据
export interface formInfo {
  id?: string;
  name: string;
  certificatesType: string;
  certificatesNo: string;
  sex: number;
  birthdate: string;
  phone: string;
  isMarry: number;
  isInsure: number;
  addressSelected: string[];
  contactsName: string;
  contactsCertificatesType: string;
  contactsCertificatesNo: string;
  contactsPhone: string;
}
