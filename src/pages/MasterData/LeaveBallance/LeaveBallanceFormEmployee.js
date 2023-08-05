import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
const LeaveBallanceFormEmployee = () => {
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoadingContext();
  const required_field = ["leave_type_id", "balance", "periode"];
  const navigate = useNavigate();
  const [data, setData] = useState(convert.objectOfleave_ballanceModel({}));
  const title = `Edit ${sys_labels.action.FORM} ${sys_labels.menus.LEAVE_BALLANCE}`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    let changed = {
      [name]: value,
    };
    setData((prevState) => ({ ...prevState, ...changed }));
  };

  const handleDetail = async () => {
    showLoading();
    try {
      const resp = await providers.getDetail(id);
      console.log(resp);
      setData(resp.data);
    } catch (error) {
      console.log(error);
    }
    hideLoading();
  };
  useEffect(() => {
    handleDetail();
  }, []);

  const handleSubmit = async () => {
    showLoading();
    try {
      const resp = await providers.updateData({
        leave_type_id: data.leave_type_id,
        employee_id: data.employee.employee_id,
        periode: data.periode,
        balance: data.balance,
      });

      showToast({ message: resp.message });
      navigate(-1);
    } catch (error) {
      showToast({ message: error.message });
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
                      <label>Employee:</label>
                      <input
                        className="form-control"
                        type="text"
                        name="employee"
                        value={data.employee?.full_name??""}
                        // onChange={handleChange}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Leave Type:</label>

                      <input
                        className="form-control"
                        type="text"
                        name="leave_type"
                        value={data?.leave_type?.name??""}
                        // onChange={handleChange}
                        disabled
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
                        disabled
                        // onChange={handleChange}
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

export default LeaveBallanceFormEmployee;
