import { sys_get, sys_post } from "../../utils/api_client";

const uri = "leaves";
export const getData = async (page = 1, limit = 10, search = "",startDate,endDate) => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri +
        `?page=${page}&perPage=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const insertData = async (body = {}) => {
    try {
      const response = await sys_post({
        auth: true,
        body:{
            leaves:[body]
        },
        endpoint: uri ,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  