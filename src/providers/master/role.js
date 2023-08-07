import { sys_del, sys_get, sys_post } from "../../utils/api_client";

const uri = "master/";
export const getData = async (page = 1,limit=10,search="") => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `roles?page=${page}&perPage=${limit}&keywords=${search}`,
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
