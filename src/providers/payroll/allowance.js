import { sys_post, sys_put, sys_get, sys_del } from "../../utils/api_client";

const uri = "payroll/";
export const getData = async (employee_id = "",type='tetap') => {
  try {
    const response = await sys_get({
      auth: true,
      // endpoint: uri + `allowances/${employee_id}`,
      endpoint: uri + `allowances/${employee_id}?type=${type}`,
    });

    return response;
  } catch (error) {
    throw error;
  }
};
export const insertData = async (body = {}, employee_id = "") => {
  try {
    const response = await sys_post({
      auth: true,
      body,
      endpoint: uri + "create_allowance/" + employee_id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateData = async (body = {}, employee_id = "", id = "") => {
  try {
    const response = await sys_put({
      auth: true,
      body,
      endpoint: uri + "update_allowance/" + employee_id + "/" + id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (employee_id = "", id = "") => {
  try {
    const response = await sys_del({
      auth: true,
      endpoint: uri + `delete_allowance/${employee_id}/${id}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
