import { sys_post, sys_put, sys_get } from "../utils/api_client";

const uri = "master/";
export const getData = async (page = 1) => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `get_branches?page=${page}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
