import { sys_del, sys_get, sys_post, sys_put } from "../../utils/api_client";

const uri = "master/";
export const getData = async (page = 1,limit=10,search="",sort="") => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `roles?page=${page}&perPage=${limit}&keywords=${search}&sort_by=${sort}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const insertData = async (id,body = {}) => {
  try {
    const response = await sys_post({
      auth: true,
      body,
      endpoint: uri + "menu_role/"+id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getRoleMenu = async (id) => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `menu_roles/${id}?page=1&perPage=999999`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteRoleMenu=async(id_role,id_menu)=>{
  try {
    const response = await sys_del({
      auth: true,
      endpoint: uri + `menu_role/${id_role}/${id_menu}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const insertRole = async (body = {}) => {
  try {
    const response = await sys_post({
      auth: true,
      body,
      endpoint: uri + "role/",
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateRole = async (id,body = {}) => {
  try {
    const response = await sys_put({
      auth: true,
      body,
      endpoint: uri + "role/"+id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    const response = await sys_del({
      auth: true,
      endpoint: uri + "role/"+id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
