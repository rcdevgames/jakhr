import { sys_post, sys_put, sys_get, sys_del } from "../../utils/api_client";

const uri = "payroll/";
export const getData = async (
  page = 1,
  limit = 10,
  search = "",
  employee_id = ""
) => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri +
        `salary_components?page=${page}&perPage=${limit}&search=${search}&employee_id=${employee_id}`,
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
      endpoint: uri + `salary_component/${id}`,
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
      endpoint: uri + "salary_component",
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
      endpoint: uri + "salary_component/" + id,
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
      endpoint: uri + `salary_component/${id}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const generateData = async (data = []) => {
  try {
    const response = await sys_post({
      auth: true,
      endpoint: uri + `generate`,
      body: {
        payroll: data,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
