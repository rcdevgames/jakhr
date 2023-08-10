import { sys_post, sys_put, sys_get,sys_del } from "../../utils/api_client";

const uri = "master/";

export const getData = async (page = 1,limit=10,search="",sort="") => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `get_employees?page=${page}&perPage=${limit}&keywords=${search}&sort_by=${sort}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDataHasComponent = async (page = 1,limit=10,search="") => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `get_employees?page=${page}&perPage=${limit}&keywords=${search}&hasComponent=true`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDataNotHasComponent = async (page = 1,limit=10,search="") => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `get_employees?page=${page}&perPage=${limit}&keywords=${search}&hasComponent=false`,
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
      endpoint: uri + `detail_employee/${id}`,
    });
    // console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
};
export const insertData=async (body={})=>{
  try {
    // console.log(body);
    const response = await sys_post({
      auth:true,
      body,
      endpoint:uri+"create_employee"
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const updateData=async (body={},id="")=>{
  // console.log(body);
  try {
    const response = await sys_put({
      auth:true,
      body,
      endpoint:uri+"update_employee/"+id
    });
    return response;
  } catch (error) {
    throw error;
  }
}
