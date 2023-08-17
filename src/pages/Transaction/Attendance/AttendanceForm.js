import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/attendance_detailModel";
import * as providers from "../../../providers/transaction/attendace";
import {
  SysDateTransform,
  SysValidateForm,
  showToast,
} from "../../../utils/global_store";
import { useLoadingContext } from "../../../components/Loading";

import Select from "react-select";

import { sys_labels } from "../../../utils/constants";
import TimeInput from "../../../components/TimeInput";
import DatePicker from "../../../components/DatePicker";
const AttendanceForm = () => {
  const navigate = useNavigate();
  const required_field = [
    "date_in as tanggal_masuk",
    "date_out as tanggal_keluar",
    "time_in as jam_masuk",
    "time_out as jam_keluar",
    "lat as latitude",
    "lng as longitude",
  ];
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfattendance_detailModel({}));
  const [attendace_data, set_attendance_data] = useState({
    employee:{full_name:""},
    date_in:null,
    date_out:null,
    time_in:null,
    time_out:null
  });
  const { showLoading, hideLoading } = useLoadingContext();
  const title = `${id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM} ${
    sys_labels.menus.ATTENDANCE
  }`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      data: { ...data, [name]: value },
    }));
  };

  useEffect(() => {
    getDetail();
  }, []);
  const getDetail = async () => {
    showLoading();
    try {
      const resp = await providers.getDetail(id);
      set_attendance_data(resp.data.data);
      setData(resp.data)
    } catch (error) {}
    hideLoading();
  };
  const handleSubmit = async () => {
    showLoading();
    try {
      const submit_data = {
        attendance_id: id,
        employee_id: attendace_data.employee_id,
        date_out: attendace_data.date_out,
        time_out: attendace_data.time_out,
        date_in: attendace_data.date_in,
        time_in: attendace_data.time_in,
        lat: attendace_data.lat,
        lng: attendace_data.lng,
        file_out: "",
        file_name_out: "",
      };
      // console.log(submit_data);
      SysValidateForm(required_field, submit_data);
      const resp = await providers.updateData({
        attendance: [submit_data],
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
    // console.log(val,"KADIEU TAH?");
    // let the_datas = attendace_data;
    // the_datas.time_in = val;
    set_attendance_data(prev=>({...prev,time_in:val}));
  };
  
  const handleTimeOutChange = (val) => {
    // let the_datas = attendace_data;
    // the_datas.time_out = val;
    // set_attendance_data(the_datas);
    set_attendance_data(prev=>({...prev,time_out:val}));
  };
  
  const handleDateStartChange = (val) => {
    // let the_datas = attendace_data;
    // the_datas.date_in = val;
    // set_attendance_data(the_datas);
    set_attendance_data(prev=>({...prev,date_in:val}));
  };
  const handleDateEndChange = (val) => {
    // let the_datas = attendace_data;
    // the_datas.date_out = val;
    set_attendance_data(prev=>({...prev,date_out:val}));
    // set_attendance_data(the_datas);
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
                      <input
                        className="form-control"
                        name="employee_name"
                        value={attendace_data.employee.full_name}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Tanggal Masuk:</label>
                      <DatePicker
                        name="date_in"
                        onChange={handleDateStartChange}
                        value={attendace_data.date_in}
                        placeholder={"Tanggal Masuk"}
                        />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Jam Masuk:</label>
                      <TimeInput
                        className="form-control"
                        name="time_in"
                        value={attendace_data.time_in}
                        onChange={handleTimeInChange}
                      />
                    </div>
                  </div>{" "}
                  <div className="col-md-6">
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
                  <div className="col-md-6">
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

export default AttendanceForm;
