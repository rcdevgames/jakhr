import { sys_get_unstructure_data } from "../utils/api_client";
import { SysDateTransform, addZero } from "../utils/global_store";

const uri = "reports/";
export const getAbsentEmployee = async (
  page = 1,
  limit = 999999,
  date = SysDateTransform({ date: new Date(), withTime: false, forSql: true })
) => {
  try {
    const response = await sys_get_unstructure_data({
      auth: true,
      endpoint:
        uri + `employee_not_absent?page=${page}&limit=${limit}&date=${date}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getOutEarlyEmployee = async (
  page = 1,
  limit = 999999,
//   date = '2023-09-13'
  date = SysDateTransform({ date: new Date(), withTime: false, forSql: true })
) => {
  try {
    const response = await sys_get_unstructure_data({
      auth: true,
      endpoint:
        uri + `employee_out_early?page=${page}&limit=${limit}&date=${date}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getTotalPayroll = async (year = new Date().getFullYear()) => {
  try {
    const response = await sys_get_unstructure_data({
      auth: true,
      endpoint: uri + `total_payroll_in_year?year=${year}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getTotalLatePerMonth = async (
  year = new Date().getFullYear(),
  month = new Date().getMonth() + 1
) => {
  try {
    const response = await sys_get_unstructure_data({
      auth: true,
      endpoint:
        uri + `total_late_by_month?periode=${year}-${addZero({ num: month })}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const getContractStatus = async (
    page = 1,
    limit = 9999999
  ) => {
    try {
      const response = await sys_get_unstructure_data({
        auth: true,
        endpoint:
          uri + `employee_contract_status?page=${page}&limit=${limit}`,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };
  