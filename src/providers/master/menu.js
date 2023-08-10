import { sys_del, sys_post, sys_put, sys_get } from "../../utils/api_client";

const uri = "master/";
export const getData = async (page = 1,limit=10,search="",sort="") => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `menus?page=${page}&perPage=${limit}&keywords=${search}&sort_by=${sort}`,
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
      endpoint: uri + `menus?page=1&perPage=999999`,
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
        endpoint: uri + `menu/${id}`,
      });
      // console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  };
  export const insertData=async (body={})=>{
    try {
      const response = await sys_post({
        auth:true,
        body,
        endpoint:uri+"menu"
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  export const updateData=async (body={},id="")=>{
    try {
      const response = await sys_put({
        auth:true,
        body,
        endpoint:uri+"menu/"+id
      });
      return response;
    } catch (error) {
      throw error;
    }
  }
  
  export const deleteData= async(id="")=>{
    try {
      const response = await sys_del({auth:true,endpoint:uri+`menu/${id}`});
      return response;
    } catch (error) {
      throw error
    }
  }
  
export const getMenu = async () => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `menus_pretify`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};