import { sys_get,sys_put } from "../../utils/api_client";

const uri = "configs/company";
export const getData = async () => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri+`?page=1&perPage=99999999999`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateData=async (body={},id)=>{
  try {
    const response = await sys_put({
      auth:true,
      body,
      endpoint:uri+"/"+id
    });
    return response;
  } catch (error) {
    throw error;
  }
}