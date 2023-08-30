import { sys_get, sys_del,sys_get_unstructure_data,sys_put, sys_post } from "../../utils/api_client";
import { SysJWTDecoder } from "../../utils/global_store";

const uri = "transactions/";
export const getData = async (page = 1, limit = 10, search = "",startDate,endDate,sort="") => {
  const token = SysJWTDecoder();
  if(token.role=='pegawai'){
    search+= `&employee_id=${token.employee_id}`
  }
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri +
        `get_attendances?page=${page}&perPage=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}&sort_by=${sort}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDataMax = async () => {
  const token = SysJWTDecoder();
  let search ='';
  if(token.role=='pegawai'){
    search+= `&employee_id=${token.employee_id}`
  }
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri +
        `get_attendances?page=1&perPage=9999999${search}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDetail = async (id) => {
  try {
    const response = await sys_get_unstructure_data({
      auth: true,
      endpoint:
        uri +
        `get_attendance/${id}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (id = "") => {
  try {
    const response = await sys_del({
      auth: true,
      endpoint: uri + `delete_attendance/${id}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateData = async (body = {}, id = "") => {
  try {
    const response = await sys_put({
      auth: true,
      body,
      endpoint: uri + "/update_attendances/" + id,
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
      endpoint: uri + "/create_attendances",
    });
    return response;
  } catch (error) {
    throw error;
  }
};