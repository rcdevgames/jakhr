import { sys_post, sys_put, sys_get, sys_del } from "../../utils/api_client";

const uri = "payroll/";
export const getData = async (employee_id = "") => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `deductions?page=1&perPage=999999&employee_id=${employee_id}`,
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
      endpoint: uri + "deduction",
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
      endpoint: uri + "deduction/" + id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async ( id = "") => {
  try {
    const response = await sys_del({
      auth: true,
      endpoint: uri + `deduction/${id}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
