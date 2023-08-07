import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import DatePicker from "../../../components/DatePicker";
import UploadFile from "../../../components/UploadFile";
import convert from "../../../model/leave_massModel";
import * as providers from "../../../providers/master/leave_mass";
import { SysDateTransform, showToast } from "../../../utils/global_store";
const LeaveMassForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfleave_massModel({}));
  const title = "Leave Mass " + (id ? "Edit Form" : "Form");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDateChange = (val) => {
    setData((prevState) => ({ ...prevState, leave_date: val }));
  };
  useEffect(() => {
    if (id) {
      // console.log(id);
      handleDetail(id);
    }
  }, []);
  const handleDetail = async (id) => {
    try {
      const resp = await providers.getDetail(id);
      // console.log(resp.data);
      setData(resp.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
  };
  const handleSubmit = async () => {
    try {
      const resp = await providers.insertData({
        leave_name: data.leave_name,
        leave_date: SysDateTransform({date:data.leave_date,withTime:false,forSql:true}),
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
          leave_date: SysDateTransform({date:data.leave_date,withTime:false,forSql:true}),
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
                      <label>Leave Event:</label>
                      <input
                        className="form-control"
                        type="text"
                        name="leave_name"
                        value={data.leave_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Leave Date:</label>
                      <DatePicker name="leave_date" onChange={handleDateChange} value={data.leave_date} placeholder={'Leave Date'} />
                    </div>
                  </div>
                </div>
                <button
                  onClick={()=>
                    data.id ? handleUpdate() : handleSubmit()
                  }
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

export default LeaveMassForm;
