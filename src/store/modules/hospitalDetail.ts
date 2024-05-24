import { defineStore } from "pinia";
import {
  reqHospitalDetail,
  reqHospitalDepartment,
} from "../../api/hospital/index";
import type {
  HospitalDetailResponse,
  DepartmentResponseData,
} from "../../api/hospital/type";
import type { HospitalDetail } from "../../api/hospital/type";
import type { DetailState } from "./interface/index";

const useDetailStore = defineStore("Detail", {
  state: (): DetailState => {
    return {
      hospitalInfo: {} as HospitalDetail,

      departmentArr: [],
    };
  },
  actions: {
    // get hospital detail
    async getHospital(hoscode: any) {
      let result: HospitalDetailResponse = await reqHospitalDetail(hoscode);
      if (result.code == 200) {
        this.hospitalInfo = result.data;
      }
    },

    // get hospital department info
    async getDepartment(hoscode: any) {
      let result: DepartmentResponseData = await reqHospitalDepartment(hoscode);
      if (result.code == 200) {
        this.departmentArr = result.data;
      }
    },
  },
  getters: {},
});

export default useDetailStore;
