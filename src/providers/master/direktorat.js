import { sys_post, sys_put, sys_get,sys_del } from "../../utils/api_client";

const uri = "master/";
export const getData = async (page = 1, limit = 10, search = "",sort="",filter="") => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri + `direktorats?page=${page}&perPage=${limit}&keywords=${search}&sort_by=${sort}&${filter}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDataMax = async (filter='') => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri + `direktorats?page=1&perPage=99999999&${filter}`,
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
      endpoint: uri + `detail_direktorat/${id}`,
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
      endpoint: uri + "create_direktorat",
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
      endpoint: uri + "update_direktorat/" + id,
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
      endpoint: uri + `delete_direktorat/${id}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
