import { sys_get, sys_post } from "../../utils/api_client";
import { SysJWTDecoder } from "../../utils/global_store";

const uri = "overtimes";
export const getData = async (
  page = 1,
  limit = 10,
  search = "",
  startDate,
  endDate,
  sort=""
) => {const token = SysJWTDecoder();
  if(token.role=='pegawai'){
    search+= `&employee_id=${token.employee_id}`
  }
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri +
        `?page=${page}&perPage=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}&sort_by=${sort}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const insertData = async (body = {}) => {
  try {
    const response = await sys_post({
      auth: true,
      body,
      endpoint: uri,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
