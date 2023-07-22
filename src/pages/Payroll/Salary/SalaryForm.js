import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import DatePicker from "../../../components/DatePicker";
import UploadFile from "../../../components/UploadFile";
import convert from "../../../model/salaryModel";
import convert_employee from "../../../model/employeeModel";
import * as providers from "../../../providers/payroll/salary";
import * as providers_employee from "../../../providers/master/employee";
import { SysDateTransform, showToast } from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
import { Tabs, Form } from "antd";

const { TabPane } = Tabs;
const { Item } = Form;

const SalaryForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [salary_id, set_salary_id] = useState(null);
  const [data, setData] = useState(convert.objectOfsalaryModel({}));
  const [employee_data, set_employee_data] = useState(
    convert_employee.listOfemployeeModel([])
  );
  const title = `${
    salary_id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM
  } ${sys_labels.menus.SALARY}`;
  const handleChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDateChange = (val) => {
    setData((prevState) => ({ ...prevState, leave_date: val }));
  };
  useEffect(() => {
    getEmployee();
    if (id) {
      set_salary_id(id);
      handleDetail(id);
    }
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

  const getEmployee = async () => {
    try {
      const resp = await providers_employee.getData(1, 999999, "");
      set_employee_data(resp.data.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
  };
  const checkEmployeeHaveConfig = async (event) => {
    const { name, value } = event.target;
    try {
      const resp = await providers.getData(1, 1, "", value);
      // console.log(resp);
      if (resp.data.data.length > 0) {
        console.log("ADA");
        set_salary_id(resp.data.data[0].id);
        await handleDetail(resp.data.data[0].id);
      } else {
        set_salary_id(null);
        console.log("NGAA");
        setData(convert.objectOfsalaryModel({}));
        handleChange({target:{ value, name }});
      }
    } catch (error) {
      console.log("ERROR");
      set_salary_id(null);
      setData(convert.objectOfsalaryModel({}));
      handleChange({target:{ value, name }});
      // showToast({ message: error.message, type: error });
    }
  };
  const handleSubmit = async () => {
    try {
      const resp = await providers.insertData({
        leave_name: data.leave_name,
        leave_date: SysDateTransform({
          date: data.leave_date,
          withTime: false,
          forSql: true,
        }),
      });
      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
  };

  const handleUpdate = async () => {
    try {
      const resp = await providers.updateData(
        {
          leave_name: data.leave_name,
          leave_date: SysDateTransform({
            date: data.leave_date,
            withTime: false,
            forSql: true,
          }),
        },
        data.id
      );
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
                      <label>Employee:</label>{" "}
                      <select
                        className="form-select"
                        id="employee_id"
                        name="employee_id"
                        value={data.employee_id}
                        onChange={checkEmployeeHaveConfig}
                        aria-label="Employee"
                      >
                        <option value={null}>Select Employee</option>
                        {employee_data.map((option, index) => (
                          <option key={index} value={option.id}>
                            {option.full_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Basic Salary:</label>
                    <input
                      className="form-control"
                      type="number"
                      name="basic_salary"
                      value={data.basic_salary}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <button
                  // onClick={() => (data.id ? handleUpdate() : handleSubmit())}
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

export default SalaryForm;
