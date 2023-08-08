import { sys_get,sys_put } from "../../utils/api_client";

const uri = "auth/verify?token=";
export const verify = async (token) => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri+token,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
