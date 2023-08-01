import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import DatePicker from "../../../components/DatePicker";
import convert from "../../../model/leaveFormModel";
import convert_employee from "../../../model/employeeModel";
import * as providers from "../../../providers/transaction/leave";
import * as providers_employee from "../../../providers/master/employee";
import { SysDateTransform, showToast } from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
import { disablePaste, onlyNumber } from "../../../utils/validation";
import { Switch } from "antd";
const LeaveForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfleaveFormModel({}));
  const [data_employee, setData_employee] = useState(
    convert_employee.listOfemployeeModel([])
  );
  const title = `${id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM} ${
    sys_labels.menus.LEAVE
  }`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDateStartChange = (val) => {
    setData((prevState) => ({ ...prevState, cash_date: val }));
  };

  useEffect(() => {
    getEmployee();

    if (id) {
      // console.log(id);
      // handleDetail(id);
    }
  }, []);
  const getEmployee = async () => {
    try {
      const resp = await providers_employee.getData(1, 99999999, "");
      setData_employee(resp.data.data);
    } catch (error) {}
  };
  const handleSubmit = async () => {
    try {
      const resp = await providers.insertData({
        employee_id: data.employee_id,
        leave_type: "harian",
        leave_date: SysDateTransform({
          date: data.leave_date,
          withTime: false,
          forSql: true,
        }),
        amount: data.amount,
        reason: data.reason,
      });
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
            <h3>{title}</h3>
          </div>
          <div className="card-body">
            <div className="form form-horizontal">
              <div className="form-body">
                <div className="row mt-3">
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Karyawan:</label>
                      <select
                        className="form-select"
                        id="employee_id"
                        name="employee_id"
                        value={data.employee_id}
                        onChange={handleChange}
                        aria-label="Nama"
                        required
                      >
                        <option value={null}>Pilih Karyawan</option>

                        {data_employee.map((option, index) => (
                          <option key={index} value={option.id}>
                            {option.employee_id} - {option.full_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Date Leave:</label>
                      <DatePicker
                        name="leave_date"
                        onChange={handleDateStartChange}
                        value={data.leave_date}
                        placeholder={"Start Date"}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Day Leave:</label>
                      <input
                        className="form-control"
                        name="amount"
                        onKeyDown={onlyNumber}
                        onPaste={disablePaste}
                        value={data.amount}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Reason:</label>
                      <input
                        className="form-control"
                        name="reason"
                        value={data.reason}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>  handleSubmit()}
                  className="btn btn-primary"
                >
                  {data.id ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminDashboard>
  );
};

export default LeaveForm;
