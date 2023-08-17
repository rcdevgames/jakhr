import { sys_get_unstructure_data, sys_post } from "../../utils/api_client";

const uri = "worklists";

export const getData = async (
  page = 1,
  limit = 10,
  search = "",
  startDate,
  endDate,
  sort = ""
) => {
  try {
    const response = await sys_get_unstructure_data({
      auth: true,
    //   endpoint: uri + `?page=${page}&perPage=${limit}`,
      endpoint: uri + `?page=${page}&perPage=${limit}&keywords=${search}&sort=${sort}&startDate=${startDate}&endDate=${endDate}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const approve = async (id) => {
  try {
    const response = await sys_post({
      auth: true,
      endpoint: uri,
      body: { worklist_journey_id: id },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const reject = async (id, reason) => {
  try {
    const response = await sys_post({
      auth: true,
      endpoint: uri+'/reject',
      body: { worklist_journey_id: id, "reject_reason":reason },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
