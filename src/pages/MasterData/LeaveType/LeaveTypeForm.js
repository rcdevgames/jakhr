import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import DatePicker from "../../../components/DatePicker";
import convert from "../../../model/leave_typeModel";
import * as providers from "../../../providers/master/leave_type";
import {
  SysDateTransform,
  SysValidateForm,
  showToast,
} from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
import { disablePaste, onlyNumber } from "../../../utils/validation";
import { useLoadingContext } from "../../../components/Loading";

const LeaveMassForm = ({ readOnly = false }) => {
  const required_field = ["name", "description", "default_total_leave"];
  const { showLoading, hideLoading } = useLoadingContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfleave_typeModel({}));
  const title = `${id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM} ${
    sys_labels.menus.LEAVE_TYPE
  }`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDateChange = (val) => {
    setData((prevState) => ({ ...prevState, leave_date: val }));
  };
  useEffect(() => {
    if (id) {
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
  const handleSubmit = async () => {
    showLoading();
    try {
      const data_submit = {
        name: data.name,
        description: data.description,
        default_total_leave: data.default_total_leave,
      };
      SysValidateForm(required_field, data_submit);
      const resp = await providers.insertData(data_submit);
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
      const data_submit = {
        name: data.name,
        description: data.description,
        default_total_leave: data.default_total_leave,
      };
      SysValidateForm(required_field, data_submit);

      const resp = await providers.updateData(data_submit, data.id);
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
                      <label>Leave Type:</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        disabled={readOnly}
                        value={data.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Description:</label>
                      <input
                        className="form-control"
                        type="text"
                        disabled={readOnly}
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Leave Balance:</label>
                      <input
                        className="form-control"
                        type="text"
                        disabled={readOnly}
                        onKeyDown={onlyNumber}
                        onPaste={disablePaste}
                        name="default_total_leave"
                        value={data.default_total_leave}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {readOnly ? null : (
                  <button
                    onClick={() => (data.id ? handleUpdate() : handleSubmit())}
                    className="btn btn-primary"
                  >
                    {data.id ? "Update" : "Submit"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminDashboard>
  );
};

export default LeaveMassForm;
