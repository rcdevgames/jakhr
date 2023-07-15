import { sys_post, sys_put, sys_get } from "../utils/api_client";

const uri = "master/";
export const getData = async (page = 1,limit=10,search="") => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `get_companies?page=${page}&perPage=${limit}&search=${search}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDataMaximum = async () => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `get_companies?page=1&perPage=999999`,
    });
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
      endpoint:"create_branch"
    });
    return response;
  } catch (error) {
    throw error;
  }
}