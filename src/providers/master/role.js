import { sys_get } from "../../utils/api_client";

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
