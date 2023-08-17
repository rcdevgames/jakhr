import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import DatePicker from "../../../components/DatePicker";
import UploadFile from "../../../components/UploadFile";
import convert from "../../../model/cash_advanceModel";
import convert_employee from "../../../model/employeeModel";
import * as providers from "../../../providers/payroll/cash_advance";
import * as providers_employee from "../../../providers/master/employee";
import { SysDateTransform, showToast } from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
import TimeInput from "../../../components/TimeInput";
import { disablePaste, onlyNumber } from "../../../utils/validation";
import {useLoadingContext}from "../../../components/Loading"

import { Switch } from "antd";
const ScheduleForm = ({readOnly=false}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfcash_advanceModel({}));
  const [data_employee, setData_employee] = useState(
    convert_employee.listOfemployeeModel([])
  );
  const {showLoading,hideLoading} = useLoadingContext()
  const title = `${id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM} ${
    sys_labels.menus.CASH_ADVANCE
  }`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDateStartChange = (val) => {
    setData((prevState) => ({ ...prevState, cash_date: val }));
  };
  // handleChangeTimeIn
  const handleDateEndChange = (val) => {
    setData((prevState) => ({ ...prevState, due_date: val }));
  };
  const handleChangeActive = (val) => {
    setData((prevState) => ({ ...prevState, is_paid: val }));
  };
  
  useEffect(() => {
    getEmployee();
    setData((prevState) => ({ ...prevState, is_paid: false }));

    if (id) {
      // console.log(id);
      handleDetail(id);
    }
  }, []);
  const handleDetail = async (id) => {
    showLoading();
    try {
      const resp = await providers.getDetail(id);
      setData(resp.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
    hideLoading();
  };
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
    //   {
    //     "employee_id": "c81d9b58-d25b-4f23-be96-d6818f8a7f3d",
    //     "title": "Kasbon pembayaran sekolah",
    //     "amount": 2000000,
    //     "description": "Pembayaran akan dilakukan 2 bulan kedepan",
    //     "cash_date": "2023-07-14",
    //     "due_date": "2023-09-14",
    //     "is_paid": false
    // }
      const resp = await providers.insertData({
        employee_id: data.employee_id,
        title: data.title,
        description: data.description,
        amount:data.amount,
        cash_date: SysDateTransform({
          date: data.cash_date,
          withTime: false,
          forSql: true,
        }),
        due_date: SysDateTransform({
          date: data.due_date,
          withTime: false,
          forSql: true,
        }),
        is_paid:data.is_paid
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
          title: data.title,
          description: data.description,
          amount:data.amount,
          cash_date: SysDateTransform({
            date: data.cash_date,
            withTime: false,
            forSql: true,
          }),
          due_date: SysDateTransform({
            date: data.due_date,
            withTime: false,
            forSql: true,
          }),
          is_paid:data.is_paid
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
                <div className="col-md-12">
                      <div className="form-group">
                        <div
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        ></div>
                        <label style={{ marginRight: 15 }}>Lunas</label>
                        <Switch
                          name="is_paid"
                          disabled={readOnly}

                          checked={data.is_paid}                          
                          onChange={handleChangeActive}
                        />
                      </div>
                    </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Karyawan:</label>
                      <select
                        className="form-select"
                        id="employee_id"
                        name="employee_id"
                            disabled={readOnly}
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
                        name="description"
                        value={data.description}
                            disabled={readOnly}
                            onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Nominal:</label>
                      <input
                        className="form-control"
                        name="amount"
                        onKeyDown={onlyNumber}
                        onPaste={disablePaste}
                            disabled={readOnly}
                            value={data.amount}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tanggal Cash Advance:</label>
                      <DatePicker
                        name="cash_date"
                        onChange={handleDateStartChange}
                        value={data.cash_date}
                            disabled={readOnly}
                            placeholder={"Tanggal Cash Advance"}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tanggal Bayar:</label>
                      <DatePicker
                        name="due_date"
                        onChange={handleDateEndChange}
                            disabled={readOnly}
                            value={data.due_date}
                        placeholder={"Tanggal Bayar"}
                      />
                    </div>
                  </div>
                 
                </div>
                {readOnly?null:
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
