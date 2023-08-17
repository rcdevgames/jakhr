import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import DatePicker from "../../../components/DatePicker";
import convert from "../../../model/leaveFormModel";
import convert_employee from "../../../model/employeeModel";
import convert_leave_type from "../../../model/leave_typeModel";
import * as providers from "../../../providers/transaction/leave";
import * as providers_employee from "../../../providers/master/employee";
import * as providers_leave_type from "../../../providers/master/leave_type";
import {
  SysDateTransform,
  SysGenValueOption,
  SysValidateForm,
  showToast,
} from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
import { disablePaste, onlyNumber } from "../../../utils/validation";
import { Switch } from "antd";
import Select from "react-select";
import { useLoadingContext } from "../../../components/Loading";
import UploadFile from "../../../components/UploadFile";
const LeaveForm = ({ readOnly = false }) => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoadingContext();
  const required_field = [
    "employee_id",
    "leave_date",
    "amount as day",
    "reason",
    "attachments",
  ];
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfleaveFormModel({}));
  const [data_employee, setData_employee] = useState(
    convert_employee.listOfemployeeModel([])
  );
  const [data_leave_type, set_data_leave_type] = useState(
    convert_leave_type.listOfleave_typeModel([])
  );
  const title = `${id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM} ${
    sys_labels.menus.LEAVE
  }`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDateStartChange = (val) => {
    setData((prevState) => ({ ...prevState, leave_date: val }));
  };

  useEffect(() => {
    getEmployee();
    getLeaveType();

    if (id) {
      // console.log(id);
      // handleDetail(id);
    }
  }, []);
  const getLeaveType = async () => {
    try {
      const resp = await providers_leave_type.getData(1, 99999999, "");
      set_data_leave_type(resp.data.data);
    } catch (error) {}
    hideLoading();
  };
  const getEmployee = async () => {
    showLoading();
    try {
      const resp = await providers_employee.getData(1, 99999999, "");
      setData_employee(resp.data.data);
    } catch (error) {}
  };
  const handleSubmit = async () => {
    try {
      SysValidateForm(required_field, data);
      const resp = await providers.insertData({
        employee_id: data.employee_id,
        leave_type_id: data.leave_type_id,
        leave_date: SysDateTransform({
          date: data.leave_date,
          withTime: false,
          forSql: true,
        }),
        amount: data.amount,
        reason: data.reason,
        attachments: [data.attachments],
      });
      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({
        message: "Maaf, kamu tidak punya saldo cuti, pengajuan dibatalkan!",
        type: "error",
      });
    }
  };
  const handleImageUpload = (val) => {
    setData((prev) => ({ ...prev, attachments: val }));
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
                    <div className="col-md-12">
                      <label>Attachment:</label>

                      <UploadFile
                        file={data.attachments}
                        onImageUpload={handleImageUpload}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Karyawan:</label>
                        <Select
                          onChange={handleChange}
                          value={SysGenValueOption(
                            data_employee,
                            data.employee_id,
                            "id",
                            "employee_id"
                          )}
                          formatOptionLabel={(val) =>
                            val.employee_id + "-" + val.full_name
                          }
                          options={data_employee.map((option, index) => ({
                            value: option.id,
                            label: `${option.employee_id} - ${option.full_name}`,
                            employee_id: option.employee_id,
                            full_name: option.full_name,
                            target: {
                              value: option.id,
                              name: "employee_id",
                            },
                          }))}
                          placeholder="Select Employee"
                          aria-label="Nama"
                          required
                          isSearchable
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Tipe Cuti:</label>
                        <Select
                          onChange={handleChange}
                          value={SysGenValueOption(
                            data_leave_type,
                            data.leave_type_id,
                            "id"
                          )}
                          options={data_leave_type.map((option, index) => ({
                            value: option.id,
                            label: `${option.name}`,
                            target: {
                              value: option.id,
                              name: "leave_type_id",
                            },
                          }))}
                          placeholder="Pilih Tipe Cuti"
                          aria-label="Nama"
                          required
                          isSearchable
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Tanggal Cuti:</label>
                        <DatePicker
                          name="leave_date"
                          onChange={handleDateStartChange}
                          value={data.leave_date}
                          placeholder={"Tanggal Cuti"}
                        />
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Hari:</label>
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

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Alasan:</label>
                        <input
                          className="form-control"
                          name="reason"
                          value={data.reason}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleSubmit()}
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
