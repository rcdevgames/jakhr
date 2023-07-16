import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/job_positionModel";
import convert_job_level from "../../../model/job_levelModel";
import * as providers from "../../../providers/master/job_position";
import * as providers_job_level from "../../../providers/master/job_level";
import { showToast } from "../../../utils/global_store";
const JobPositionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfjob_positionModel({}));
  const [job_level, setJobLevel] = useState(
    convert_job_level.listOfjob_levelModel([])
  );
  const title = "Job Position " + (id ? "Edit Form" : "Form");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    getJobLevel();
    if (id) {
      handleDetail(id);
    }
  }, []);
  const handleDetail = async (id) => {
    try {
      const resp = await providers.getDetail(id);
      setData(resp.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
  };
  const getJobLevel = async () => {
    try {
      const resp = await providers_job_level.getDataMax();
      setJobLevel(resp.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
    }
  };
  const handleSubmit = async () => {
    try {
      const resp = await providers.insertData({
        name: data.name,
        job_level_id:data.job_level_id
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
          name: data.name,
          job_level_id:data.job_level_id
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
                      <label>Job Level:</label>{" "}
                      <select
                        className="form-select"
                        id="job_level_id"
                        name="job_level_id"
                        value={data.job_level_id}
                        onChange={handleChange}
                        aria-label="Job Level"
                      >
                        <option value="" disabled>
                          Select Job Level
                        </option>
                        {job_level.map((option, index) => (
                          <option key={index} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Job Position:</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => (data.id ? handleUpdate() : handleSubmit())}
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

export default JobPositionForm;
