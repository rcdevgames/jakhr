import { sys_get,sys_put } from "../../utils/api_client";

const uri = "payroll/config_overtime";
export const getData = async (id) => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri +'/'+id,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateData=async (body={},employee_id="",id)=>{
  try {
    const response = await sys_put({
      auth:true,
      body,
      endpoint:uri+"/"+employee_id+"/"+id
    });
    return response;
  } catch (error) {
    throw error;
  }
}