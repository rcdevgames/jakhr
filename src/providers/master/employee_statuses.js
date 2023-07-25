import { sys_post, sys_put, sys_get, sys_del } from "../../utils/api_client";

const uri = "master/";
export const getData = async (page = 1, limit = 10, search = "") => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri +
        `employee_statuses?page=${page}&perPage=${limit}&keywords=${search}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDataMax = async () => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `employee_statuses?page=1&perPage=999999`,
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
      endpoint: uri + `detail_employee_status/${id}`,
    });
    // console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
export const insertData = async (body = {}) => {
  try {
    // console.log(body);
    const response = await sys_post({
      auth: true,
      body,
      endpoint: uri + "create_employee_status",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateData = async (body = {}, id = "") => {
  // console.log(body);
  try {
    const response = await sys_put({
      auth: true,
      body,
      endpoint: uri + "update_employee_status/" + id,
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
      endpoint: uri + "delete_employee_status/" + id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
