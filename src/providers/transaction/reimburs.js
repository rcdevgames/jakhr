import { sys_del, sys_get, sys_post, sys_put } from "../../utils/api_client";

const uri = "payroll/reimbursement";
export const getData = async (
  page = 1,
  limit = 10,
  search = "",
  startDate,
  endDate,sort=""
) => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri +
        `s?page=${page}&perPage=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}&sort_by=${sort}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDetail = async (id=""
) => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri +
        `/${id}`,
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

export const updateData = async (body = {}, id = "") => {
  try {
    const response = await sys_put({
      auth: true,
      body,
      endpoint: uri + "/" + id,
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
      endpoint: uri + "/" + id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
