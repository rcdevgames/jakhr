import { sys_post, sys_put } from "../utils/api_client";
import { SESSION } from "../utils/constants";
import { clearSession, setSession } from "../utils/session";

const uri = "auth/";
export const doLogin = async ( body = {} ) => {
  try {
    const response = await sys_post({
      auth: false,
      endpoint: uri + "login",
      body: body,
    });
    setSession(SESSION.ACCESS_TOKEN, response.data.token);
    return response;
  } catch (error) {
    throw error;
  }
};
