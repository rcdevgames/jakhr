import { sys_post, sys_put, sys_get,sys_del } from "../../utils/api_client";

const uri = "payroll/";
export const getData = async (page = 1, limit = 10, search = "") => {
  console.log(uri + `?page=${page}&perPage=${limit}&keywords=${search}`);
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri + `cash_advances?page=${page}&perPage=${limit}&keywords=${search}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDataMax = async (id=null) => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri + `cash_advance?page=1&perPage=99999999`+(id?`&branch_id=${id}`:''),
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDetail = async (id) => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `cash_advance/${id}`,
    });
    // console.log(response);
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
      endpoint: uri + "cash_advance",
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
      endpoint: uri + "cash_advance/" + id,
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
      endpoint: uri + `cash_advance/${id}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
