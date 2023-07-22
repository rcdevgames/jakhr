import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/salaryModel";
import convert_employee from "../../../model/employeeModel";
import convert_overtime from "../../../model/overtimeModel";
import convert_late from "../../../model/lateModel";
import * as providers from "../../../providers/payroll/salary";
import * as providers_employee from "../../../providers/master/employee";
import * as providers_late from "../../../providers/payroll/late";
import * as providers_overtime from "../../../providers/payroll/overtime";
import {
  SysDateTransform,
  SysReadData,
  showToast,
} from "../../../utils/global_store";
import { sys_labels, sys_path_data } from "../../../utils/constants";
import { Tabs, Switch } from "antd";
import AllowanceForm from "./AllowanceForm";

const { TabPane } = Tabs;

const SalaryComponentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [is_salary, set_is_salary] = useState(false);
  const [data, setData] = useState(convert.objectOfsalaryModel({}));
  const [late_data, set_late_data] = useState(
    convert_late.objectOflateModel({})
  );
  const bank_data = SysReadData(sys_path_data.bank_data);
  const calc_base = SysReadData(sys_path_data.calc_base_data);
  const calc_mode = SysReadData(sys_path_data.calc_mode_data);
  const work_pateren = SysReadData(sys_path_data.work_patern_data);
  const [overtime_date, set_overtime_date] = useState(
    convert_overtime.objectOfovertimeModel({})
  );
  const [employee_data, set_employee_data] = useState(
    convert_employee.objectOfemployeeModel([])
  );
  const title = `${sys_labels.action.EDIT_FORM} ${sys_labels.menus.SALARY}`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleChangeOvertime = (event) => {
    const { name, value } = event.target;
    const the_name = name.replace("_overtime", "");
    console.log(the_name);
    set_overtime_date((prevState) => ({ ...prevState, [the_name]: value }));
  };
  const handleChangeLate = (event) => {
    const { name, value } = event.target;
    const the_name = name.replace("_late", "");

    set_late_data((prevState) => ({ ...prevState, [the_name]: value }));
  };

  const handleChangeActive = (value) => {
    set_late_data((prevState) => ({ ...prevState, is_approval: value }));
  };
  useEffect(() => {
    getEmployee(id);
    getLateConfig(id);
    getOvertimeConfig(id);
  }, []);
  const handleDetail = async (id) => {
    try {
      const resp = await providers.getDetail(id);
      setData(resp.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
  };

  const getEmployee = async (id) => {
    try {
      const resp = await providers_employee.getDetail(id);
      set_employee_data(resp.data);
      await checkEmployeeHaveConfig(id);
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
  };
  const getLateConfig = async (id) => {
    try {
      const resp = await providers_late.getData(id);
      console.log(resp.data);
      set_late_data(resp.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
    }
  };

  const getOvertimeConfig = async (id) => {
    try {
      const resp = await providers_overtime.getData(id);
      set_overtime_date(resp.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
    }
  };
  const checkEmployeeHaveConfig = async (id) => {
    try {
      const resp = await providers.getData(1, 1, "", id);
      if (resp.data.data.length > 0) {
        await handleDetail(resp.data.data[0].id);
        set_is_salary(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmit = async () => {
    const resp_overtime = await providers_overtime.updateData(
      {
        calc_base: overtime_date.calc_base,
        calc_mode: overtime_date.calc_mode,
        total_custom: overtime_date.total_custom,
        work_pattern: data.working_days,
        is_approval: overtime_date.is_approval,
      },
      employee_data.id,
      overtime_date.id
    );
    const resp_late = await providers_late.updateData(
      {
        calc_base: late_data.calc_base,
        total_custom: late_data.total_custom,
      },
      employee_data.id,
      late_data.id
    );
    try {
      const resp = await providers.insertData({
        employee_id: employee_data.id,
        basic_salary: data.basic_salary,
        overtime_config: "config-1",
        overtime: overtime_date.total_custom ?? 0,
        late_deduction_config: "config-1",
        late_deduction: late_data.total_custom ?? 0,
        working_days: data.working_days,
        leave_balance_incentive: data.leave_balance_incentive,
        jht: data.jht,
        kesehatan: data.kesehatan,
        jp: data.jp,
        other_insurance: data.other_insurance,
        jht_company: data.jht_company,
        kesehatan_company: data.kesehatan_company,
        jp_company: data.jp_company,
        jkm_company: data.jkm_company,
        jkk_company: data.jkk_company,
        other_insurance_company: data.other_insurance_company,
        bank_name: data.bank_name,
        bank_account: data.bank_account.toString(),
      });

      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
  };

  const handleUpdate = async () => {  const resp_overtime = await providers_overtime.updateData(
    {
      calc_base: overtime_date.calc_base,
      calc_mode: overtime_date.calc_mode,
      total_custom: overtime_date.total_custom,
      work_pattern: data.working_days,
      is_approval: overtime_date.is_approval,
    },
    employee_data.id,
    overtime_date.id
  );
  const resp_late = await providers_late.updateData(
    {
      calc_base: late_data.calc_base,
      total_custom: late_data.total_custom,
    },
    employee_data.id,
    late_data.id
  );
  try {
    const resp = await providers.updateData({
      employee_id: employee_data.id,
      basic_salary: data.basic_salary,
      overtime_config: "config-1",
      overtime: overtime_date.total_custom ?? 0,
      late_deduction_config: "config-1",
      late_deduction: late_data.total_custom ?? 0,
      working_days: data.working_days,
      leave_balance_incentive: data.leave_balance_incentive,
      jht: data.jht,
      kesehatan: data.kesehatan,
      jp: data.jp,
      other_insurance: data.other_insurance,
      jht_company: data.jht_company,
      kesehatan_company: data.kesehatan_company,
      jp_company: data.jp_company,
      jkm_company: data.jkm_company,
      jkk_company: data.jkk_company,
      other_insurance_company: data.other_insurance_company,
      bank_name: data.bank_name,
      bank_account: data.bank_account.toString(),
    },data.id);

    showToast({ message: resp.message, type: "success" });
    navigate(-1);
  } catch (error) {
    console.log(error);
    showToast({ message: error.message, type: "error" });
  }
  };

  return (
    <AdminDashboard label="">
      <section className="section">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3>
              {title} {employee_data.full_name}
            </h3>
            <button
              onClick={() => (is_salary ? handleUpdate() : handleSubmit())}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
          <div className="card-body">
            <div className="form form-horizontal">
              <div className="form-body">
                <div className="row mt-3">
                  <Tabs defaultActiveKey="1">
                    <TabPane key="1" tab={sys_labels.menus.SALARY}>
                      <div className="row">
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Nama Bank:</label>{" "}
                            <select
                              className="form-select"
                              id="bank_name"
                              name="bank_name"
                              value={data.bank_name}
                              onChange={handleChange}
                              aria-label="Nama Bank"
                            >
                              <option value={null}>Select Bank</option>
                              {bank_data.map((option, index) => (
                                <option key={index} value={option.value}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Rekening:</label>
                            <input
                              className="form-control"
                              type="number"
                              name="bank_account"
                              value={data.bank_account}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Hari Kerja:</label>{" "}
                            <select
                              className="form-select"
                              id="working_days"
                              name="working_days"
                              value={data.working_days}
                              onChange={handleChange}
                              aria-label="Hari Kerja"
                            >
                              <option value={null}>Select Work Days</option>
                              {work_pateren.map((option, index) => (
                                <option key={index} value={option.value}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Gaji:</label>
                            <input
                              className="form-control"
                              type="number"
                              name="basic_salary"
                              value={data.basic_salary}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Insentif Cuti:</label>
                            <input
                              className="form-control"
                              type="number"
                              name="leave_balance_incentive"
                              value={data.leave_balance_incentive}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Jaminan Hari Tua:</label>
                            <input
                              className="form-control"
                              type="number"
                              name="jht"
                              value={data.jht}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Kesehatan:</label>
                            <input
                              className="form-control"
                              type="number"
                              name="kesehatan"
                              value={data.kesehatan}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Jaminan Pensiun:</label>
                            <input
                              className="form-control"
                              type="number"
                              name="jp"
                              value={data.jp}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Jaminan Hari Tua Perusahaan:</label>
                            <input
                              className="form-control"
                              type="number"
                              name="jht_company"
                              value={data.jht_company}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Asuransi Perusahaan:</label>
                            <input
                              className="form-control"
                              type="number"
                              name="other_insurance_company"
                              value={data.other_insurance_company}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Asuransi Lain:</label>
                            <input
                              className="form-control"
                              type="number"
                              name="other_insurance"
                              value={data.other_insurance}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Kesehatan Perusahaan:</label>
                            <input
                              className="form-control"
                              type="number"
                              name="kesehatan_company"
                              value={data.kesehatan_company}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Jaminan Pensiun Perusahaan:</label>
                            <input
                              className="form-control"
                              type="number"
                              name="jp_company"
                              value={data.jp_company}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Jaminan Kematian Perusahaan:</label>
                            <input
                              className="form-control"
                              type="number"
                              name="jkm_company"
                              value={data.jkm_company}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-3">
                          <div className="form-group">
                            <label>Jaminan Keselamatan Kerja Perusahaan:</label>
                            <input
                              className="form-control"
                              type="number"
                              name="jkk_company"
                              value={data.jkk_company}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </TabPane>
                    <TabPane key="2" tab={sys_labels.menus.OVERTIME}>
                      <div className="col-md-3">
                        <div className="form-group">
                          <div
                            style={{
                              flexDirection: "row",
                              justifyContent: "flex-start",
                              alignItems: "center",
                            }}
                          ></div>
                          <label style={{ marginRight: 15 }}>Approval</label>
                          <Switch
                            name="is_approval_overtime"
                            checked={overtime_date.is_approval}
                            onChange={handleChangeActive}
                          />
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Calc Base:</label>{" "}
                          <select
                            className="form-select"
                            id="calc_base_overtime"
                            name="calc_base_overtime"
                            value={overtime_date.calc_base}
                            onChange={handleChangeOvertime}
                            aria-label="Calc Base"
                          >
                            <option value={null}>Select Calc Base</option>
                            {calc_base.map((option, index) => (
                              <option key={index} value={option.value}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Calc Mode:</label>{" "}
                          <select
                            className="form-select"
                            id="calc_mode_overtime"
                            name="calc_mode_overtime"
                            value={overtime_date.calc_mode}
                            onChange={handleChangeOvertime}
                            aria-label="Calc Mode"
                          >
                            <option value={null}>Select Calc Mode</option>
                            {calc_mode.map((option, index) => (
                              <option key={index} value={option.value}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Total Custom:</label>
                          <input
                            className="form-control"
                            type="number"
                            name="total_custom_overtime"
                            value={overtime_date.total_custom}
                            onChange={handleChangeOvertime}
                          />
                        </div>
                      </div>
                    </TabPane>
                    <TabPane key="3" tab={sys_labels.menus.LATE}>
                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Calc Base:</label>{" "}
                          <select
                            className="form-select"
                            id="calc_base_late"
                            name="calc_base_late"
                            value={late_data.calc_base}
                            onChange={handleChangeLate}
                            aria-label="Calc Base"
                          >
                            <option value={null}>Select Calc Base</option>
                            {calc_base.map((option, index) => (
                              <option key={index} value={option.value}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-3">
                        <div className="form-group">
                          <label>Total Custom:</label>
                          <input
                            className="form-control"
                            type="number"
                            name="total_custom_late"
                            value={late_data.total_custom}
                            onChange={handleChangeLate}
                          />
                        </div>
                      </div>
                    </TabPane>
                    <TabPane key="4" tab={sys_labels.menus.ALLOWANCE}>
                      <AllowanceForm
                        employee_id={employee_data.id}
                        is_salary={is_salary}
                        employee_data={employee_data}
                      />
                    </TabPane>
                    <TabPane key="5" tab={sys_labels.menus.DEDUCTION}></TabPane>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminDashboard>
  );
};

export default SalaryComponentForm;
