import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/attendance_detailModel";
import convert_employee from "../../../model/employeeModel";
import * as providers from "../../../providers/transaction/attendace";
import * as providers_employee from "../../../providers/master/employee";
import {
  SysDateTransform,
  SysGenValueOption,
  SysJWTDecoder,
  SysValidateForm,
  showToast,
} from "../../../utils/global_store";
import { useLoadingContext } from "../../../components/Loading";

import Select from "react-select";

import { sys_labels } from "../../../utils/constants";
import TimeInput from "../../../components/TimeInput";
import DatePicker from "../../../components/DatePicker";
import UploadFile from "../../../components/UploadFile";
const AttendanceForm = () => {
  const navigate = useNavigate();
  const required_field_update = [
    "date_out as tanggal_keluar",
    "time_out as jam_keluar",
    "lat as latitude",
    "lng as longitude",
    "file_out as foto_keluar",
  ];
  const required_field_insert = [
    "date_in as tanggal_masuk",
    "time_in as jam_masuk",
    "lat as latitude",
    "lng as longitude",
    "file as foto",
  ];
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfattendance_detailModel({}));
  const [employee_data, set_employee_data] = useState(
    convert_employee.listOfemployeeModel([])
  );
  const [attendace_data, set_attendance_data] = useState({
    employee: { full_name: "" },
    date_in: null,
    date_out: null,
    time_in: null,
    time_out: null,
    file: null,
    file_name: null,
    file_out: null,
    file_out_name: null,
    lat: null,
    lng: null,
    employee_id: null,
  });
  const { showLoading, hideLoading } = useLoadingContext();
  const title = `${id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM} ${
    sys_labels.menus.ATTENDANCE
  }`;
  const token = SysJWTDecoder();
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      data: { ...data, [name]: value },
    }));
    set_attendance_data((prevState) => ({
      ...prevState,
      // employee:{full_name:value},
      employee_id: value,
    }));
  };
  const getEmployee = async () => {
    showLoading();
    try {
      const resp = await providers_employee.getData(1, 99999999999);
      set_employee_data(resp.data.data);
    } catch (error) {}
    hideLoading();
  };
  const getLocation=()=>{
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          set_attendance_data((prev) => ({
            ...prev,
            lat: latitude.toString(),
            lng: longitude.toString(),
          }));
        },
        (error) => {
          // showToast({message:"please enable location permission!"})
        }
      );
    }
  }
  useEffect(() => {
   getLocation();
    if (token.role == "pegawai") {
      set_attendance_data((prev) => ({
        ...prev,
        employee_id: token.employee_id,
      }));
    }
    if (id) {
      getDetail();
    } else {
      getEmployee();
    }
  }, []);
  const getDetail = async () => {
    showLoading();
    try {
      const resp = await providers.getDetail(id);
      set_attendance_data({
        ...resp.data.data,
        file: resp.data?.attendance_images?.in
          ? {
              source: resp.data.attendance_images.in,
            }
          : null,
        file_out: resp.data?.attendance_images?.out
          ? {
              source: resp.data.attendance_images.out,
            }
          : null,
      });
      setData(resp.data);
      getLocation();
    } catch (error) {}
    hideLoading();
  };
  const handleSubmit = async () => {
    showLoading();
    try {
      const submit_data = {
        employee_id: attendace_data.employee_id,
        date_in: SysDateTransform({
          date: attendace_data.date_in,
          forSql: true,
          withTime: false,
        }),
        time_in: attendace_data.time_in,
        lat: attendace_data.lat,
        lng: attendace_data.lng,
        file: attendace_data.file,
        file_name: attendace_data.file_name,
      };
      // console.log(submit_data);
      SysValidateForm(required_field_insert, submit_data);
      const resp = await providers.insertData({
        attendances: [submit_data],
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
      const submit_data = {
        attendance_id: id,
        employee_id: attendace_data.employee_id,
        date_out: SysDateTransform({
          date: attendace_data.date_out,
          forSql: true,
          withTime: false,
        }),
        time_out: attendace_data.time_out,
        lat: attendace_data.lat,
        lng: attendace_data.lng,
        file_out: attendace_data.file_out,
        file_name_out: attendace_data.file_out_name,
      };
      console.log(submit_data);
      SysValidateForm(required_field_update, submit_data);
      const resp = await providers.updateData({
        attendances: [submit_data],
      });
      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
    hideLoading();
  };
  const handleTimeInChange = (val) => {
    set_attendance_data((prev) => ({ ...prev, time_in: val }));
  };

  const handleTimeOutChange = (val) => {
    set_attendance_data((prev) => ({ ...prev, time_out: val }));
  };

  const handleDateStartChange = (val) => {
    set_attendance_data((prev) => ({ ...prev, date_in: val }));
  };
  const handleDateEndChange = (val) => {
    set_attendance_data((prev) => ({ ...prev, date_out: val }));
  };
  const handleUploadIn = (value) => {
    set_attendance_data((val) => ({
      ...val,
      file: value,
      file_name: `${Date.now()}.jpg`,
    }));
  };
  const handleUploadOut = (value) => {
    set_attendance_data((val) => ({
      ...val,
      file_out: value,
      file_out_name: `${Date.now()}.jpg`,
    }));
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
                      <label>Foto Masuk:</label>

                      <UploadFile
                        onImageUpload={handleUploadIn}
                        file={attendace_data.file}
                      />
                    </div>
                    {id ? (
                      <div className="col-md-12">
                        <label>Foto Keluar:</label>
                        <UploadFile
                          onImageUpload={handleUploadOut}
                          file={attendace_data.file_out}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="col-md-6">
                    {id ? (
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Karyawan:</label>
                          <input
                            className="form-control"
                            name="employee_name"
                            value={attendace_data.employee.full_name}
                            readOnly
                          />
                        </div>
                      </div>
                    ) : null}
                    {token.role == "pegawai" || id ? null : (
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Karyawan:</label>
                          <Select
                            onChange={handleChange}
                            value={SysGenValueOption(
                              employee_data,
                              attendace_data.employee_id,
                              "id",
                              "employee_id"
                            )}
                            formatOptionLabel={(val) =>
                              val.employee_id + "-" + val.full_name
                            }
                            options={employee_data.map((option, index) => ({
                              value: option.id,
                              label: `${option.employee_id} - ${option.full_name}`,
                              employee_id: option.employee_id,
                              full_name: option.full_name,
                              target: {
                                value: option.id,
                                name: "employee_id",
                              },
                            }))}
                            placeholder="Pilih Karyawan"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                    )}
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Tanggal Masuk:</label>
                        <DatePicker
                          name="date_in"
                          onChange={handleDateStartChange}
                          value={attendace_data.date_in}
                          placeholder={"Tanggal Masuk"}
                          disabled={id ? true : false}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Jam Masuk:</label>
                        <TimeInput
                          disabled={id ? true : false}
                          className="form-control"
                          name="time_in"
                          value={attendace_data.time_in}
                          onChange={handleTimeInChange}
                        />
                      </div>
                    </div>
                    {id ? (
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Tanggal Keluar:</label>
                          <DatePicker
                            name="date_out"
                            onChange={handleDateEndChange}
                            value={attendace_data.date_out}
                            placeholder={"Tanggal Keluar"}
                          />
                        </div>
                      </div>
                    ) : null}

                    {id ? (
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Jam Keluar:</label>
                          <TimeInput
                            className="form-control"
                            name="time_out"
                            value={attendace_data.time_out}
                            onChange={handleTimeOutChange}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <button
                  onClick={() => (id ? handleUpdate() : handleSubmit())}
                  className="btn btn-primary"
                >
                  {id ? "Absen Keluar" : "Absen Masuk"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminDashboard>
  );
};

export default AttendanceForm;
