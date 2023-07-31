import {sys_get } from "../../utils/api_client";

const uri = "transactions/";
export const getData = async (page = 1,limit=10,search="") => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint: uri + `get_attendances?page=${page}&perPage=${limit}&search=${search}&byEmployee=false`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};