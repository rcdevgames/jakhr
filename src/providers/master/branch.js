import { sys_post, sys_put, sys_get,sys_del } from "../../utils/api_client";

const uri = "master/";
export const getData = async (page = 1,limit=10,search="",sort="") => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `get_branches?page=${page}&perPage=${limit}&keywords=${search}&sort_by=${sort}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getDataMax = async (id_company=null) => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `get_branches?page=1&perPage=999999`+(id_company?`&company_id=${id_company}`:""),
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
      endpoint: uri + `detail_branch/${id}`,
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
      endpoint:uri+"create_branch"
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
      endpoint:uri+"update_branch/"+id
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const deleteData= async(id="")=>{
  try {
    const response = await sys_del({auth:true,endpoint:uri+`delete_branch/${id}`});
    return response;
  } catch (error) {
    throw error
  }
}