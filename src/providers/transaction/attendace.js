import { sys_get, sys_del } from "../../utils/api_client";

const uri = "transactions/";
export const getData = async (page = 1, limit = 10, search = "",startDate,endDate) => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri +
        `get_attendances?page=${page}&perPage=${limit}&search=${search}&startDate=${startDate}&endDate=${endDate}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getDataMax = async () => {
  try {
    const response = await sys_get({
      auth: true,
      endpoint:
        uri +
        `get_attendances?page=1&perPage=9999999`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async (id = "") => {
  try {
    const response = await sys_del({
      auth: true,
      endpoint: uri + `delete_attendance/${id}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
