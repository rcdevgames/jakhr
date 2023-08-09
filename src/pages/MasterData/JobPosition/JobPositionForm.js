import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/job_positionModel";
import convert_job_level from "../../../model/job_levelModel";
import * as providers from "../../../providers/master/job_position";
import * as providers_job_level from "../../../providers/master/job_level";
import { SysGenValueOption, showToast } from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
import { useLoadingContext } from "../../../components/Loading";

import Select from "react-select";

const JobPositionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfjob_positionModel({}));
  const [parent, set_parent] = useState(convert.listOfjob_positionModel([]));
  const { showLoading, hideLoading } = useLoadingContext();
  const getParent = async () => {
    showLoading();
    try {
      const resp = await providers.getDataMax();
      set_parent(resp.data.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
    }
    hideLoading();
  };

  const [job_level, setJobLevel] = useState(
    convert_job_level.listOfjob_levelModel([])
  );
  const title = `${id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM} ${
    sys_labels.menus.JOB_POSITION
  }`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    getJobLevel();
    getParent();
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
  const getJobLevel = async () => {
    showLoading();
    try {
      const resp = await providers_job_level.getDataMax();
      setJobLevel(resp.data.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
    }
    hideLoading();
  };
  const handleSubmit = async () => {
    showLoading();
    try {
      const resp = await providers.insertData({
        name: data.name,
        job_level_id: data.job_level_id,
        parent_id: data.parent_id,
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
          name: data.name,
          job_level_id: data.job_level_id,
          parent_id: data.parent_id,
        },
        data.id
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
                    <div className="form-group">
                      <label>Parent:</label>{" "}
                      <Select
                        onChange={handleChange}
                        value={SysGenValueOption(
                          parent,
                          data.parent_id,
                          "id",
                          "name"
                        )}
                        formatOptionLabel={(val) => `${val.label}`}
                        options={parent.map((option, index) => ({
                          value: option.id,
                          label: `${option.name}`,
                          target: {
                            name: "parent_id",
                            value: option.id,
                          },
                        }))}
                        placeholder="Select Parent"
                        aria-label="Nama"
                        required
                        isSearchable
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Job Level:</label>{" "}
                      <Select
                        onChange={handleChange}
                        value={SysGenValueOption(
                          job_level,
                          data.job_level_id,
                          "id",
                          "name"
                        )}
                        formatOptionLabel={(val) => `${val.label}`}
                        options={job_level.map((option, index) => ({
                          value: option.id,
                          label: `${option.name}`,
                          target: {
                            name: "job_level_id",
                            value: option.id,
                          },
                        }))}
                        placeholder="Select Job Level"
                        aria-label="Nama"
                        required
                        isSearchable
                      />
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
