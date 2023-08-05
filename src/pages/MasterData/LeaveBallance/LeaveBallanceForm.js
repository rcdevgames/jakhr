import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import DatePicker from "../../../components/DatePicker";
import convert from "../../../model/leave_ballanceModel";
import convert_leave_type from "../../../model/leave_typeModel";
import convert_employee from "../../../model/employeeModel";
import * as providers from "../../../providers/master/leave_ballance";
import * as providers_leave_type from "../../../providers/master/leave_type";
import * as providers_employee from "../../../providers/master/employee";
import {
  SysDateTransform,
  SysGenValueOption,
  SysValidateForm,
  showToast,
} from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
import { disablePaste, onlyNumber } from "../../../utils/validation";
import { useLoadingContext } from "../../../components/Loading";
import Select from "react-select";
const LeaveBallanceForm = () => {
  const { showLoading, hideLoading } = useLoadingContext();
  const required_field = ["leave_type_id", "balance", "periode"];
  const navigate = useNavigate();
  const [data, setData] = useState(convert.objectOfleave_ballanceModel({}));
  const [data_employee, set_data_employee] = useState(
    convert_employee.listOfemployeeModel([])
  );
  const [data_leave_type, set_data_leave_type] = useState(
    convert_leave_type.listOfleave_typeModel([])
  );
  const [selected_employee, set_selected_employee] = useState([]);
  const title = `${sys_labels.action.FORM} ${sys_labels.menus.LEAVE_BALLANCE}`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    let changed = {
      [name]: value,
    };
    if (name == "leave_type_id") {
      const obj = data_leave_type.find((val) => val.id === value);
      changed.balance = obj.default_total_leave;
    }
    setData((prevState) => ({ ...prevState, ...changed }));
  };

  const handleChangeEmployee = (value) => {
    set_selected_employee(value);
  };
  const handleGetEmployee = async () => {
    showLoading();
    try {
      const resp = await providers_employee.getData(1, 9999999);
      set_data_employee(resp.data.data);
    } catch (error) {}
  };
  const handleGetType = async () => {
    try {
      const resp = await providers_leave_type.getData(1, 9999999);
      set_data_leave_type(resp.data.data);
    } catch (error) {}
    hideLoading();
  };
  useEffect(() => {
    handleGetEmployee();
    handleGetType();
  }, []);

  const handleSubmit = async () => {
    showLoading();
    if (selected_employee.length <= 0) {
      showToast({ message: "No employee selected!" });
      return;
    }
    const validateForm = SysValidateForm(required_field, data);
    if (!validateForm.is_valid) {
      showToast({ message: validateForm.message });
      return;
    }
    for (let index = 0; index < selected_employee.length; index++) {
      try {
        const resp = await providers.insertData({
          leave_type_id: data.leave_type_id,
          employee_id: selected_employee[index].value,
          periode: data.periode,
          balance: data.balance,
        });
      } catch (error) {}
    }
    showToast({ message: "Leave ballance succesfully add!" });
    navigate(-1);
    hideLoading();
  };

  return (
    <AdminDashboard label="">
      <section className="section">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3>{title}</h3>
          </div>
          <div className="card-body">
            <div className="form form-horizontal">
              <div className="form-body">
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Employee:</label>
                      <Select
                        onChange={handleChangeEmployee}
                        value={selected_employee}
                        options={data_employee.map((option, index) => ({
                          value: option.id,
                          label: `${option.employee_id} - ${option.full_name}`,
                          employee_id: option.employee_id,
                        }))}
                        placeholder="Select Employee"
                        aria-label="Nama"
                        required
                        isSearchable
                        isMulti
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Leave Type:</label>
                      <Select
                        onChange={handleChange}
                        value={SysGenValueOption(
                          data_leave_type,
                          data.leave_type_id,
                          "id"
                        )}
                        formatOptionLabel={(val) => `${val.label}`}
                        options={data_leave_type.map((option, index) => ({
                          value: option.id,
                          label: `${option.name}`,
                          target: {
                            value: option.id,
                            name: "leave_type_id",
                          },
                        }))}
                        placeholder="Select Type"
                        aria-label="Nama"
                        required
                        isSearchable
                      />
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Periode:</label>
                      <input
                        className="form-control"
                        type="text"
                        name="periode"
                        onKeyDown={onlyNumber}
                        onPaste={disablePaste}
                        value={data.periode}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <label>Leave Balance:</label>
                      <input
                        className="form-control"
                        type="text"
                        onKeyDown={onlyNumber}
                        onPaste={disablePaste}
                        name="balance"
                        value={data.balance}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleSubmit()}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminDashboard>
  );
};

export default LeaveBallanceForm;
