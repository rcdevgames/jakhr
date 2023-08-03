import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/trans_overtimeModel";
import * as providers from "../../../providers/transaction/overtime";
import * as providers_attendance from "../../../providers/transaction/attendace";
import { SysDateTransform, showToast } from "../../../utils/global_store";

import Select from "react-select";

import { sys_labels } from "../../../utils/constants";
const OvertimeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOftrans_overtimeModel({}));
  const [data_attendance, setData_attendance] = useState([]);
  const title = `${id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM} ${
    sys_labels.menus.OVERTIME
  }`;
  const handleChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    getAttendance();
    setData((prevState) => ({ ...prevState, is_paid: false }));
  }, []);
  const getAttendance = async () => {
    try {
      const resp = await providers_attendance.getDataMax();
      setData_attendance(resp.data.data);
    } catch (error) {}
  };
  const handleSubmit = async () => {
    try {
      const obj = data_attendance.find((val) => val.id == data.attendance_id);
      const resp = await providers.insertData({
        attendance_id: data.attendance_id,
        employee_id: obj.employee.id,
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
                      <Select
                        id="attendance_id"
                        name="attendance_id"
                        onChange={handleChange}
                        options={data_attendance.map((option) => ({
                          value: option.id,
                          label: `(${option.date_in}) - ${option.employee.name}`,
                          target: {
                            name: "attendance_id",
                            value: option.id,
                          },
                        }))}
                        aria-label="Nama"
                        required
                        isSearchable
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

export default OvertimeForm;
