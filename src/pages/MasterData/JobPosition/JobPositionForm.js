import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/job_positionModel";
import convert_job_level from "../../../model/job_levelModel";
import * as providers from "../../../providers/master/job_position";
import * as providers_job_level from "../../../providers/master/job_level";
import * as provider_direktorat from "../../../providers/master/direktorat";
import * as providers_organization from "../../../providers/master/organization";
import * as providers_department from "../../../providers/master/department";
import { SysGenValueOption, showToast } from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
import { useLoadingContext } from "../../../components/Loading";

import Select from "react-select";

const JobPositionForm = ({ readOnly = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfjob_positionModel({}));
  const [parent, set_parent] = useState(convert.listOfjob_positionModel([]));
  const [direktorat,set_direktorat]= useState([]);
  const [department,set_department]= useState([]);
  const [organization,set_organization]= useState([]);
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
  
  const handleChangeOrganization = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
    if(name== 'direktorat_id'){
      getOrganization(value);
    }
    if(name=='organization_id'){
      getDepartment(data.direktorat_id,value);
    }
    
  };
  
  const getOrganization = async (id=null) => {
    try {
      const resp = await providers_organization.getDataMax(`&direktorat_id=${id??""}`);
      set_organization(resp.data.data);
    } catch (error) {}
  };
  const getDirektorat = async () => {
    try {
      const resp = await provider_direktorat.getDataMax();
      set_direktorat(resp.data.data);
    } catch (error) {}
  };
  const getDepartment = async (id=null,id_or=null) => {
    try {
      const resp = await providers_department.getDataMax(`&direktorat_id=${id??""}&&organization_id=${id_or??""}`);
      set_department(resp.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getJobLevel();
    getParent();
    getDirektorat();
    if (id) {
      handleDetail(id);
    }
  }, []);
  const handleDetail = async (id) => {
    showLoading();
    try {
      const resp = await providers.getDetail(id);
      setData(resp.data);
      getOrganization(resp.data.direktorat_id);
      getDepartment(resp.data.direktorat_id,resp.data.organization_id);
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
        organization_id: data.organization_id,
        department_id: data.department_id,
        direktorat_id: data.direktorat_id,
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
          organization_id: data.organization_id,
          department_id: data.department_id,
          direktorat_id: data.direktorat_id,
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
                <div className="row mt-3"> <div className="col-md-6">
                    <div className="form-group">
                      <label>Direktorat:</label>{" "}
                      <Select
                        onChange={handleChangeOrganization}
                        isDisabled={readOnly}
                        value={SysGenValueOption(
                          direktorat,
                          data.direktorat_id,
                          "id",
                          "name"
                        )}
                        formatOptionLabel={(val) => `${val.label}`}
                        options={direktorat&&direktorat.map((option, index) => ({
                          value: option.id,
                          label: `${option.name}`,
                          target: {
                            name: "direktorat_id",
                            value: option.id,
                          },
                        }))}
                        placeholder="Pilih Direktorat"
                        aria-label="Nama"
                        required
                        isSearchable
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Divisi:</label>{" "}
                      <Select
                        onChange={handleChangeOrganization}
                        isDisabled={readOnly}
                        value={SysGenValueOption(
                          organization,
                          data.organization_id,
                          "id",
                          "name"
                        )}
                        formatOptionLabel={(val) => `${val.label}`}
                        options={organization&&organization.map((option, index) => ({
                          value: option.id,
                          label: `${option.name}`,
                          target: {
                            name: "organization_id",
                            value: option.id,
                          },
                        }))}
                        placeholder="Pilih Divisi"
                        aria-label="Nama"
                        required
                        isSearchable
                      />
                    </div>
                  </div> <div className="col-md-6">
                    <div className="form-group">
                      <label>Department:</label>{" "}
                      <Select
                        onChange={handleChange}
                        isDisabled={readOnly}
                        value={SysGenValueOption(
                          department,
                          data.department_id,
                          "id",
                          "name"
                        )}
                        formatOptionLabel={(val) => `${val.label}`}
                        options={department&&department.map((option, index) => ({
                          value: option.id,
                          label: `${option.name}`,
                          target: {
                            name: "department_id",
                            value: option.id,
                          },
                        }))}
                        placeholder="Pilih Department"
                        aria-label="Nama"
                        required
                        isSearchable
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Parent:</label>{" "}
                      <Select
                        onChange={handleChange}
                        isDisabled={readOnly}
                        value={SysGenValueOption(
                          parent,
                          data.parent_id,
                          "id",
                          "name"
                        )}
                        formatOptionLabel={(val) => `${val.label}`}
                        options={parent&&parent.map((option, index) => ({
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
                      <label>Level Jabatan:</label>{" "}
                      <Select
                        onChange={handleChange}
                        isDisabled={readOnly}
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
                        placeholder="Pilih Level Jabatan"
                        aria-label="Nama"
                        required
                        isSearchable
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Posisi Jabatan:</label>
                      <input
                        className="form-control"
                        disabled={readOnly}
                        type="text"
                        name="name"
                        value={data.name}
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

export default JobPositionForm;
