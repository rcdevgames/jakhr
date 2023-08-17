import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import DatePicker from "../../../components/DatePicker";
import UploadFile from "../../../components/UploadFile";
import convert from "../../../model/scheduleModel";
import convert_employee from "../../../model/employeeModel";
import * as providers from "../../../providers/master/schedule";
import * as providers_employee from "../../../providers/master/employee";
import {
  SysDateTransform,
  SysGenValueOption,
  showToast,
} from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
import TimeInput from "../../../components/TimeInput";
import Select from "react-select";
import {useLoadingContext}from "../../../components/Loading"

const ScheduleForm = ({readOnly=false}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfscheduleModel({}));
  const [data_employee, setData_employee] = useState(
    convert_employee.listOfemployeeModel([])
  );
  const title = `${id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM} ${
    sys_labels.menus.SCHEDULE
  }`;
  const {showLoading,hideLoading}= useLoadingContext();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDateStartChange = (val) => {
    setData((prevState) => ({ ...prevState, start_date: val }));
  };
  // handleChangeTimeIn
  const handleDateEndChange = (val) => {
    setData((prevState) => ({ ...prevState, end_date: val }));
  };

  const handleChangeTimeIn = (val) => {
    setData((prevState) => ({ ...prevState, time_in: val }));
  };
  const handleChangeTimeOut = (val) => {
    setData((prevState) => ({ ...prevState, time_out: val }));
  };
  useEffect(() => {
    getEmployee();
    if (id) {
      // console.log(id);
      handleDetail(id);
    }
  }, []);
  const handleDetail = async (id) => {
    try {
      const resp = await providers.getDetail(id);
      console.log(resp.data);
      setData(resp.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
  };
  const getEmployee = async () => {
    showLoading();
    try {
      const resp = await providers_employee.getData(1, 99999999, "");
      setData_employee(resp.data.data);
    } catch (error) {}
    // showLoading();
    hideLoading();
  };
  const handleSubmit = async () => {
    showLoading();

    try {
      const resp = await providers.insertData({
        employee_id: data.employee_id,
        start_date: SysDateTransform({
          date: data.start_date,
          withTime: false,
          forSql: true,
        }),
        end_date: SysDateTransform({
          date: data.end_date,
          withTime: false,
          forSql: true,
        }),
        time_in: data.time_in,
        time_out: data.time_out,
        title: data.title,
        description: data.description,
      });
      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
    hideLoading();
  };

  const handleUpdate = async () => {
    showLoading();
    try {
      const resp = await providers.updateData(
        {
          employee_id: data.employee_id,
          start_date: SysDateTransform({
            date: data.start_date,
            withTime: false,
            forSql: true,
          }),
          end_date: SysDateTransform({
            date: data.end_date,
            withTime: false,
            forSql: true,
          }),
          time_in: data.time_in,
          time_out: data.time_out,
          title: data.title,
          description: data.description,
        },
        id
      );
      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
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
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Karyawan:</label>
                      <Select
                        onChange={handleChange}
                        isDisabled={readOnly}
                        value={SysGenValueOption(
                          data_employee,
                          data.employee_id,
                          "id",
                          "name"
                        )}
                        formatOptionLabel={(val) => `${val.full_name}`}
                        options={data_employee.map((option, index) => ({
                          value: option.id,
                          label: `${option.full_name}`,
                          full_name:option.full_name,
                          target: {
                            name: "employee_id",
                            value: option.id,
                          },
                        }))}
                        placeholder="Select Employee"
                        aria-label="Nama"
                        required
                        isSearchable
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Title:</label>
                      <input
                        className="form-control"
                            disabled={readOnly}
                            name="title"
                        value={data.title}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Deskripsi:</label>
                      <input
                        className="form-control"
                            disabled={readOnly}
                            name="description"
                        value={data.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tanggal Mulai:</label>
                      <DatePicker
                        name="start_date"
                        onChange={handleDateStartChange}
                            disabled={readOnly}
                            value={data.start_date}
                        placeholder={"Tanggal Mulai"}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tanggal Akhir:</label>
                      <DatePicker
                        name="end_date"
                        onChange={handleDateEndChange}
                            disabled={readOnly}
                            value={data.end_date}
                        placeholder={"Tanggal Akhir"}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Jam Masuk:</label>
                      <TimeInput
                        className="form-control"
                        onChange={handleChangeTimeIn}
                        value={data.time_in}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Jam Keluar:</label>
                      <TimeInput
                        className="form-control"
                        onChange={handleChangeTimeOut}
                        value={data.time_out}
                      />
                    </div>
                  </div>
                </div>
                {
                  readOnly?null:
                <button
                onClick={() => (data.id ? handleUpdate() : handleSubmit())}
                className="btn btn-primary"
                >
                  {data.id ? "Update" : "Submit"}
                </button>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminDashboard>
  );
};

export default ScheduleForm;
