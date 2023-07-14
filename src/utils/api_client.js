import {getSession, getToken} from './session';
import {SESSION} from './constants';

const API_URL = 'http://45.77.245.25:3006/api/v1/';

const callbackModel = {
  code: 500,
  success: false,
  message: 'Internal Server Error!',
  data: null,
};

export const sys_get = async ({auth = false, endpoint = ''}) => {
  try {
    let token = await getToken();
    var callback = callbackModel;
    const response = await fetch(API_URL + endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth ? 'Bearer ' + token : '',
      },
    });
    const data = await response.json();
    callback.code = response.status;
    callback.success = response.status==200?true:false;
    callback.message = response.status==200?"Success":data.message;
    callback.data = data;
    if (response.status != 201 && response.status != 200) {
      throw callback;
    }
    return callback;
  } catch (error) {
    throw error;
  }
};
export const sys_post = async ({auth = false, endpoint = '', body = {}}) => {
  try {
    let token = await getToken();
    var callback = callbackModel;
    const response = await fetch(API_URL + endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth ? 'Bearer ' + token : '',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    callback.code = response.status;
    callback.success = response.status==200?true:false;
    callback.message = response.status==200?"Success":data.message;
    callback.data = data;
    if (response.status != 201 && response.status != 200) {
      throw callback;
    }
    return callback;
  } catch (error) {
    throw error;
  }
};
export const sys_del = async ({auth = false, endpoint = ''}) => {
  try {
    let token = await getToken();
    var callback = callbackModel;
    const response = await fetch(API_URL + endpoint, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth ? 'Bearer ' + token : '',
      },
    });
    const data = await response.json();
    callback.code = response.status;
    callback.success = response.status==200?true:false;
    callback.message = response.status==200?"Success":data.message;
    callback.data = data;
    if (response.status != 201 && response.status != 200) {
      throw callback;
    }
    return callback;
  } catch (error) {
    throw error;
  }
};
export const sys_put = async ({
  auth = false,
  endpoint = '',
  body = {},
  is_refresh = false,
}) => {
  try {
    let token = await getToken();
    if (is_refresh) {
      token = await getSession(SESSION.REFRESH_TOKEN);
    }
    var callback = callbackModel;
    const response = await fetch(API_URL + endpoint, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth ? 'Bearer ' + token : '',
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    callback.code = response.status;
    callback.success = response.status==200?true:false;
    callback.message = response.status==200?"Success":data.message;
    callback.data = data;
    if (response.status != 201 && response.status != 200) {
      throw callback;
    }
    return callback;
  } catch (error) {
    throw error;
  }
};