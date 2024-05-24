import request from "../../utils/request";

enum API {
  GETDISTRICT_URL = "/api/cmn/dict/findByParentId/",
}

export const reqDistrict = (parentId: string) =>
  request.get<any, any>(API.GETDISTRICT_URL + parentId);
