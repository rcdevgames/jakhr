import { sys_get_report,sys_get_unstructure_data } from "../../utils/api_client";

const uri = "reports/";

export const employee_reports = async (page = 1,limit=10,search="",sort="",filter="") => {
  try {
    const response = await sys_get_report({
      auth: true,
      endpoint: uri + `employees?page=${page}&perPage=${limit}&keywords=${search}&sort_by=${sort}&${filter}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const attendance_reports = async (page = 1,limit=10,search="",sort="",filter="") => {
  try {
    const response = await sys_get_report({
      auth: true,
      endpoint: uri + `attendances?page=${page}&perPage=${limit}&keywords=${search}&sort_by=${sort}&${filter}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const leaves_reports = async (page = 1,limit=10,search="",sort="",filter="") => {
  try {
    const response = await sys_get_report({
      auth: true,
      endpoint: uri + `leaves?page=${page}&perPage=${limit}&keywords=${search}&sort_by=${sort}&${filter}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const leaves_reports_detail = async (filter="") => {
  try {
    const response = await sys_get_unstructure_data({
      auth: true,
      endpoint: uri + `leaves?page=1&perPage=9999999&${filter}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};


export const overtime_reports = async (page = 1,limit=10,search="",sort="",filter="") => {
  try {
    const response = await sys_get_report({
      auth: true,
      endpoint: uri + `overtimes?page=${page}&perPage=${limit}&keywords=${search}&sort_by=${sort}&${filter}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const overtime_reports_detail = async (filter="") => {
  try {
    const response = await sys_get_unstructure_data({
      auth: true,
      endpoint: uri + `overtimes?page=1&perPage=9999999&${filter}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deductions_reports = async (page = 1,limit=10,search="",sort="",filter="") => {
  try {
    const response = await sys_get_report({
      auth: true,
      endpoint: uri + `deductions?page=${page}&perPage=${limit}&keywords=${search}&sort_by=${sort}&${filter}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
export const deductions_reports_detail = async (filter="") => {
  try {
    const response = await sys_get_unstructure_data({
      auth: true,
      endpoint: uri + `deductions?page=1&perPage=9999999&${filter}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const cash_advances_reports = async (page = 1,limit=10,search="",sort="",filter="") => {
  try {
    const response = await sys_get_report({
      auth: true,
      endpoint: uri + `cash_advances?page=${page}&perPage=${limit}&keywords=${search}&sort_by=${sort}&${filter}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const cash_advances_reports_detail = async (filter="") => {
  try {
    const response = await sys_get_unstructure_data({
      auth: true,
      endpoint: uri + `cash_advances?page=1&perPage=9999999&${filter}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const reimbursements_reports = async (page = 1,limit=10,search="",sort="",filter="") => {
  try {
    const response = await sys_get_report({
      auth: true,
      endpoint: uri + `reimbursements?page=${page}&perPage=${limit}&keywords=${search}&sort_by=${sort}&${filter}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const reimbursements_reports_detail = async (filter="") => {
  try {
    const response = await sys_get_unstructure_data({
      auth: true,
      endpoint: uri + `reimbursements?page=1&perPage=9999999&${filter}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const incentive_reports = async (page = 1,limit=10,search="",sort="",filter="") => {
  try {
    const response = await sys_get_report({
      auth: true,
      endpoint: uri + `incentives?page=${page}&perPage=${limit}&keywords=${search}&sort_by=${sort}&${filter}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const incentive_reports_detail = async (filter="") => {
  try {
    const response = await sys_get_unstructure_data({
      auth: true,
      endpoint: uri + `incentives?page=1&perPage=9999999&${filter}`,
    });
    return response;
  } catch (error) {
    throw error;
  }
};
