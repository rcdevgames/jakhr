import { getSession, getToken } from "./session";
import { SESSION } from "./constants";
const API_URL = process.env.REACT_APP_API_URL;

const callbackModel = {
  code: 500,
  success: false,
  message: "Internal Server Error!",
  data: null,
};

export const sys_get = async ({ auth = false, endpoint = "" }) => {
  try {
    let token = getToken();
    var callback = callbackModel;
    const head = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth ? "Bearer " + token : "",
      },
    }
    // console.log(head);
    const response = await fetch(API_URL + endpoint,head );
    const data = await response.json();
    // console.log(data);
    callback.code = response.status;
    callback.success = response.status == 200 ? true : false;
    callback.message = data?.message ?? "ERROR!";
    callback.data = data?.totalData ? { ...data } : data.data;
    if (response.status != 201 && response.status != 200) {
      callback.message=data?.error??data?.message??"";
      throw callback;
    }
    return callback;
  } catch (error) {
    throw error;
  }
};

export const sys_get_unstructure_data = async ({ auth = false, endpoint = "" }) => {
  try {
    let token = getToken();
    var callback = callbackModel;
    const head = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth ? "Bearer " + token : "",
      },
    }
    // console.log(head);
    const response = await fetch(API_URL + endpoint,head );
    const data = await response.json();
    // console.log(data);
    callback.code = response.status;
    callback.success = response.status == 200 ? true : false;
    callback.message = data?.message ?? "ERROR!";
    callback.data = data;
    if (response.status != 201 && response.status != 200) {
      callback.message=data?.error??data?.message??"";
      throw callback;
    }
    return callback;
  } catch (error) {
    throw error;
  }
};

export const sys_get_report = async ({ auth = false, endpoint = "" }) => {
  try {
    let token = getToken();
    var callback = callbackModel;
    const head = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth ? "Bearer " + token : "",
      },
    }
    // console.log(API_URL+endpoint);
    const response = await fetch(API_URL + endpoint,head );
    const data = await response.json();
    // console.log(data);
    callback.code = response.status;
    callback.success = response.status == 200 ? true : false;
    callback.message = data?.message ?? "ERROR!";
    callback.data =  data.datas??data.data??[];
    callback.totalData= data.totalPages
    if (response.status != 201 && response.status != 200) {
      callback.message=data?.error??data?.message??"";
      throw callback;
    }
    return callback;
  } catch (error) {
    throw error;
  }
};
export const sys_post = async ({ auth = false, endpoint = "", body = {} }) => {
  try {
    let token = getToken();
    var callback = callbackModel;
    const response = await fetch(API_URL + endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth ? "Bearer " + token : "",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    // console.log(API_URL + endpoint);
    // console.log(body);
    // console.log(data);
    callback.code = response.status;
    callback.message = data?.message ?? "ERROR!";
    callback.success = response.status == 200 ? true : false;
    callback.data = data?.data ?? {};
    if (endpoint == "auth/login") callback.data = { token: data.token };
    if (response.status != 201 && response.status != 200) {
      callback.message=data?.error??data?.message??"";
      throw callback;
    }
    return callback;
  } catch (error) {
    // console.log(error);
    throw error;
  }
};
export const sys_del = async ({ auth = false, endpoint = "" }) => {
  try {
    let token = getToken();
    var callback = callbackModel;
    const response = await fetch(API_URL + endpoint, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth ? "Bearer " + token : "",
      },
    });
    const data = await response.json();
    callback.code = response.status;
    callback.success = response.status == 200 ? true : false;
    callback.message = data?.message ?? "ERROR!";
    callback.data = data?.data ?? {};
    if (response.status != 201 && response.status != 200) {
      
      callback.message=data?.error??data?.message??"";
      throw callback;
    }
    return callback;
  } catch (error) {
    throw error;
  }
};
export const sys_put = async ({
  auth = false,
  endpoint = "",
  body = {},
  is_refresh = false,
}) => {
  try {
    let token = getToken();
    if (is_refresh) {
      token = getSession(SESSION.REFRESH_TOKEN);
    }
    var callback = callbackModel;
    const response = await fetch(API_URL + endpoint, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: auth ? "Bearer " + token : "",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    // console.log(API_URL + endpoint);
    // console.log(body);
    // console.log(data);
    callback.code = response.status;
    callback.success = response.status == 200 ? true : false;
    callback.message = data?.message ?? "ERROR!";
    callback.data = data?.data ?? {};
    if (response.status != 201 && response.status != 200) {
      
      callback.message=data?.error??data?.message??"";
      throw callback;
    }
    return callback;
  } catch (error) {
    throw error;
  }
};

export const image_uri_to_base64 = async (uri = "") => {
  try {
    const response = await fetch(uri);
    const img_blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(img_blob);
    });
  } catch (error) {
    throw error;
  }
};

export const sys_cors =async(uri)=>{
  const resp = await fetch('https://api.allorigins.win/get?url='+uri);
  const data =await resp.json();
  return data.content;
}