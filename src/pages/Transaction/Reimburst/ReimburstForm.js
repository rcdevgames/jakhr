import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import DatePicker from "../../../components/DatePicker";
import convert from "../../../model/reimburstModel";
import convert_employee from "../../../model/employeeModel";
import * as providers from "../../../providers/transaction/reimburs";
import * as providers_employee from "../../../providers/master/employee";
import { SysDateTransform, showToast } from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
import { disablePaste, onlyNumber } from "../../../utils/validation";
import { Switch } from "antd";
import UploadFile from "../../../components/UploadFile";
import {useLoadingContext}from "../../../components/Loading"

const ReimburstForm = ({readOnly=false}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfreimburstModel({}));
  const [data_employee, setData_employee] = useState(
    convert_employee.listOfemployeeModel([])
  );
  const {showLoading,hideLoading}=useLoadingContext();
  const title = `${id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM} ${
    sys_labels.menus.REIMBURS
  }`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDateStartChange = (val) => {
    setData((prevState) => ({ ...prevState, date: val }));
  };

  const handleUpload = (val) => {
    setData((prevState) => ({ ...prevState, payment_files: val }));
  };
  useEffect(() => {
    getEmployee();

    if (id) {
      handleDetail(id);
    }
  }, []);
  const getEmployee = async () => {
    showLoading();
    try {
      const resp = await providers_employee.getData(1, 99999999, "");
      setData_employee(resp.data.data);
    } catch (error) {}
    hideLoading();
  };
  const handleSubmit = async () => {
    showLoading();
    try {
      const resp = await providers.insertData({
        employee_id: data.employee_id,
        date: SysDateTransform({
          date: data.date,
          withTime: false,
          forSql: true,
        }),
        amount: data.amount,
        description: data.description,
        is_paid: false,
        payment_files: [data.payment_files],
      });
      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
    hideLoading();
  };

  const handleDetail = async (id) => {
    showLoading();
    try {
      const resp = await providers.getDetail(id);
      setData({
        ...resp.data,
        payment_files: resp.data.payment_files
          ? {
              source: resp.data.payment_files[0],
            }
          : null,
      });
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
    hideLoading();
  };

  const handleUpdate = async () => {
    showLoading();
    try {
      const resp = await providers.updateData(
        {
          employee_id: data.employee_id,
          date: SysDateTransform({
            date: data.date,
            withTime: false,
            forSql: true,
          }),
          amount: data.amount,
          description: data.description,
          is_paid: false,
          payment_files: [data.payment_files],
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
                    <label>Bukti:</label>
                    <UploadFile
                      onImageUpload={handleUpload}
                      file={data.payment_files}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Karyawan:</label>
                        <select
                          className="form-select"
                          id="employee_id"
                          name="employee_id"
                          value={data.employee_id}
                            disabled={readOnly}
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

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Tanggal:</label>
                        <DatePicker
                          name="date"
                          onChange={handleDateStartChange}
                            disabled={readOnly}
                            value={data.date}
                          placeholder={"Tanggal"}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Nominal:</label>
                        <input
                          className="form-control"
                            disabled={readOnly}
                            name="amount"
                          onKeyDown={onlyNumber}
                          onPaste={disablePaste}
                          value={data.amount}
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
                  </div>
                </div>
                {readOnly?null:
                <button
                onClick={() => (id ? handleUpdate() : handleSubmit())}
                className="btn btn-primary"
                >
                  {id ? "Update" : "Submit"}
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

export default ReimburstForm;
