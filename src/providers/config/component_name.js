import { sys_post, sys_put, sys_get,sys_del } from "../../utils/api_client";

const uri = "configs/";
export const getDataAllowance = async (page = 1, limit = 10, search = "") => {
  const type = 'allowance';
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri + `component_names?page=${page}&perPage=${limit}&type=${type}&keywords=${search}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDataAllowanceMax = async () => {
  const type = 'allowance';
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
      uri + `component_names?page=1&perPage=999999999&type=${type}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDataAllowanceDaily = async (page = 1, limit = 10, search = "") => {
  const type = 'allowance_daily';
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri + `component_names?page=${page}&perPage=${limit}&type=${type}&keywords=${search}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDataAllowanceDailyMax = async () => {
  const type = 'allowance_daily';
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
      uri + `component_names?page=1&perPage=999999999&type=${type}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDataDeduction = async (page = 1, limit = 10, search = "") => {
  const type = 'deduction';
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri + `component_names?page=${page}&perPage=${limit}&type=${type}&keywords=${search}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDataDeductionMax = async () => {
  const type = 'deduction';
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
      uri + `component_names?page=1&perPage=999999999&type=${type}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDataAllowanceEx = async (page = 1, limit = 10, search = "") => {
  const type = 'lainnya';
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri + `component_names?page=${page}&perPage=${limit}&type=${type}&keywords=${search}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDataAllowanceExMax = async () => {
  const type = 'lainnya';
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
      uri + `component_names?page=1&perPage=999999999&type=${type}`,
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
      endpoint: uri + `component_name/${id}`,
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
      endpoint: uri + "component_name",
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
      endpoint: uri + "component_name/" + id,
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
      endpoint: uri + `component_name/${id}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
