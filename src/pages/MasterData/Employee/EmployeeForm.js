import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import DatePicker from "../../../components/DatePicker";
import UploadFile from "../../../components/UploadFile";
import convert from "../../../model/employeeModel";
import convert_branch from "../../../model/branchModel";
import convert_organization from "../../../model/organizationModel";
import convert_job_level from "../../../model/job_levelModel";
import convert_job_position from "../../../model/job_positionModel";
import * as providers from "../../../providers/master/employee";
import * as providers_branch from "../../../providers/master/branch";
import * as providers_organization from "../../../providers/master/organization";
import * as providers_job_level from "../../../providers/master/job_level";
import * as providers_job_position from "../../../providers/master/job_position";
import * as providers_employee_status from "../../../providers/master/employee_statuses";
import {
  SysDateTransform,
  SysGenValueOption,
  SysReadData,
  SysValidateForm,
  showToast,
} from "../../../utils/global_store";
import { routes_name } from "../../../route/static_route";
import { sys_labels, sys_path_data } from "../../../utils/constants";

import Select from "react-select";

const EmployeeForm = () => {
  const required_field = [
    "full_name",
    "phone_number",
    "email",
    "gender",
    "marital_status",
    "religion",
    "id_number as NIK",
    "employee_id as NIP",
    "ptkp",
  ];
  const gender = SysReadData(sys_path_data.gender_data);
  const religion = SysReadData(sys_path_data.religion_data);
  const marital_status = SysReadData(sys_path_data.marital_status_data);
  const blood_type = SysReadData(sys_path_data.blood_type_data);
  const ptkp = SysReadData(sys_path_data.ptkp);
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfemployeeModel({}));
  const [password, set_password] = useState("");
  const [branch, set_branch] = useState(convert_branch.listOfbranchModel([]));
  const [employee_status, set_employee_status] = useState([]);
  const [organization, set_organization] = useState(
    convert_organization.listOforganizationModel([])
  );
  const [job_level, set_job_level] = useState(
    convert_job_level.listOfjob_levelModel([])
  );
  const [job_position, set_job_position] = useState(
    convert_job_position.listOfjob_positionModel([])
  );

  const title = `${id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM} ${
    sys_labels.menus.EMPLOYEE
  }`;
  const handleChange = (event) => {
    // console.log(event.target);
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDateChange = (val) => {
    setData((prevState) => ({ ...prevState, dob: val }));
  };

  const handleDateChangeEmployeeJoinDate = (val) => {
    setData((prevState) => ({ ...prevState, employee_join_date: val }));
  };

  const handleDateChangeEmployeeExpiredDate = (val) => {
    setData((prevState) => ({ ...prevState, employee_expired_date: val }));
  };
  useEffect(() => {
    getEmployeeStatus();
    getOrganization();
    getJobLevel();
    getJobPosition();
    if (id) {
      handleDetail(id);
    }
    setTimeout(() => {
      getBranch();
    }, 1000);
  }, []);
  const handleDetail = async (id) => {
    try {
      const resp = await providers.getDetail(id);
      setData({
        ...resp.data,
        photo: resp.data.photo ? { source: resp.data.photo } : null,
      });
      // set_password(resp.data.user.password)
      // await handleBranchChange({ target: { value: data.branch_id, name: "" } });
      // await handleOrganizationChange({
      //   target: { value: data.organization_id, name: "" },
      // });
      // await handleJobLevelChange({
      //   target: { value: data.job_level_id, name: "" },
      // });
      // handleChange({
      //   target: { value: data.job_position_id, name: "job_position_id" },
      // });
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: error });
      // navigate(-1);
    }
  };
  const handleSubmit = async () => {
    try {
      const data_submit = {
        full_name: data.full_name,
        phone_number: data.phone_number,
        email: data.email,
        gender: data.gender,
        marital_status: data.marital_status,
        religion: data.religion,
        pob: data.pob,
        dob: SysDateTransform({
          date: data.dob,
          withTime: false,
          forSql: true,
        }),
        blood_type: data.blood_type,
        id_type: "KTP",
        id_number: data.id_number,
        citizen_address: data.citizen_address,
        residential_address: data.residential_address,
        employee_id: data.employee_id,
        employee_join_date: SysDateTransform({
          date: data.employee_join_date,
          withTime: false,
          forSql: true,
        }),
        employee_expired_date: SysDateTransform({
          date: data.employee_expired_date,
          withTime: false,
          forSql: true,
        }),
        tax_config: 1,
        tax_number: data.tax_number,
        branch_id: data.branch_id,
        organization_id: data.organization_id,
        job_level_id: data.job_level_id,
        job_position_id: data.job_position_id,
        ptkp: data.ptkp,
        employee_status_id: data.employee_status_id,
        create_user: true,
        emergency_contact_name: data.emergency_contact_name,
        emergency_contact_relationship: data.emergency_contact_relationship,
        emergency_contact_phone_number: data.emergency_contact_phone_number,
        is_payroll: true,
        user: {
          password: password,
        },
        photo: data.photo,
      };
      const validateForm = SysValidateForm(required_field, data_submit);
      if (!validateForm.is_valid) {
        showToast({ message: validateForm.message });
        return false;
      }
      const resp = await providers.insertData(data_submit);
      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
  };

  const handleUpdate = async () => {
    try {
      const data_submit = {
        full_name: data.full_name,
        phone_number: data.phone_number,
        email: data.email,
        gender: data.gender,
        marital_status: data.marital_status,
        religion: data.religion,
        ptkp: data.ptkp,
        pob: data.pob,
        dob: SysDateTransform({
          date: data.dob,
          withTime: false,
          forSql: true,
        }),
        blood_type: data.blood_type,
        id_type: "KTP",
        id_number: data.id_number,
        citizen_address: data.citizen_address,
        residential_address: data.residential_address,
        employee_id: data.employee_id,
        employee_join_date: SysDateTransform({
          date: data.employee_join_date,
          withTime: false,
          forSql: true,
        }),
        employee_expired_date: SysDateTransform({
          date: data.employee_expired_date,
          withTime: false,
          forSql: true,
        }),
        tax_config: 1,
        tax_number: data.tax_number,
        branch_id: data.branch_id,
        organization_id: data.organization_id,
        job_level_id: data.job_level_id,
        job_position_id: data.job_position_id,
        employee_status_id: data.employee_status_id,
        create_user: false,
        emergency_contact_name: data.emergency_contact_name,
        emergency_contact_relationship: data.emergency_contact_relationship,
        emergency_contact_phone_number: data.emergency_contact_phone_number,
        is_payroll: true,
        photo: data.photo,
      };
      // console.log(data_submit);
      const validateForm = SysValidateForm(required_field, data_submit);
      if (!validateForm.is_valid) {
        showToast({ message: validateForm.message });
        return false;
      }
      const resp = await providers.updateData(data_submit, data.id);
      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
  };
  const handleUpload = (value) => {
    setData((val) => ({ ...val, photo: value }));
  };
  const getBranch = async () => {
    try {
      const resp = await providers_branch.getDataMax();
      set_branch(resp.data.data);
      // setData(val=>({...val,branch_id:resp.data.data[0].id}))
    } catch (error) {
      // showToast({ message: error.message, type: "error" });
    }
  };

  const getEmployeeStatus = async () => {
    try {
      const resp = await providers_employee_status.getDataMax();
      set_employee_status(resp.data.data);
      // setData(val=>({...val,branch_id:resp.data.data[0].id}))
    } catch (error) {
      // showToast({ message: error.message, type: "error" });
    }
  };
  const getOrganization = async () => {
    try {
      const resp = await providers_organization.getDataMax(data.branch_id);
      set_organization(resp.data.data);
    } catch (error) {
      // showToast({ message: error.message, type: "error" });
    }
  };
  const getJobLevel = async () => {
    try {
      const resp = await providers_job_level.getDataMax(data.organization_id);
      set_job_level(resp.data.data);
    } catch (error) {
      // showToast({ message: error.message, type: "error" });
    }
  };
  const getJobPosition = async () => {
    try {
      const resp = await providers_job_position.getDataMax(data.job_level_id);
      set_job_position(resp.data.data);
    } catch (error) {
      // showToast({ message: error.message, type: "error" });
    }
  };

  const handleBranchChange = async (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      branch_id: value,
      organization_id: null,
    }));
    await getOrganization();
  };

  const handleOrganizationChange = async (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      organization_id: value,
      job_level_id: null,
    }));
    await getJobLevel();
  };

  const handleJobLevelChange = async (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      job_level_id: value,
      job_position_id: null,
    }));
    await getJobPosition();
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
                      <label>Logo:</label>
                      <UploadFile
                        onImageUpload={handleUpload}
                        file={data.photo}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    {data.id == null ? (
                      <div className="col-md-12">
                        <Link
                          to={routes_name.M_EMPLOYEE_CREATE_MULTIPLE}
                          className="btn icon icon-left btn-primary"
                        >
                          <i className="bi bi-plus" /> Multiple
                        </Link>
                      </div>
                    ) : null}
                    <div className="col-md-12">
                      <h4>Employee Information</h4>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Fullname:*</label>
                        <input
                          className="form-control"
                          type="text"
                          name="full_name"
                          value={data.full_name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Employee ID:*</label>
                          <input
                            className="form-control"
                            type="text"
                            name="employee_id"
                            value={data.employee_id}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>NIK:*</label>
                          <input
                            className="form-control"
                            type="text"
                            name="id_number"
                            value={data.id_number}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Employee Join Date:</label>
                          <DatePicker
                            name="employee_join_date"
                            onChange={handleDateChangeEmployeeJoinDate}
                            value={data.employee_join_date}
                            placeholder={"Date of Birth"}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Employee Expired Date:</label>
                          <DatePicker
                            name="employee_expired_date"
                            onChange={handleDateChangeEmployeeExpiredDate}
                            value={data.employee_expired_date}
                            placeholder={"Date of Birth"}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>NPWP:*</label>
                          <input
                            className="form-control"
                            type="text"
                            name="tax_number"
                            value={data.tax_number}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Religion:*</label>
                          <Select
                            onChange={handleChange}
                            value={SysGenValueOption(
                              religion,
                              data.religion,
                              "value",
                              "name"
                            )}
                            formatOptionLabel={(val) => `${val.label}`}
                            options={religion.map((option, index) => ({
                              value: option.value,
                              label: `${option.name}`,
                              ext: index,
                              target: {
                                name: "religion",
                                value: option.value,
                              },
                            }))}
                            placeholder="Select Religion"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Employee Status:</label>
                          <Select
                            onChange={handleChange}
                            value={SysGenValueOption(
                              employee_status,
                              data.employee_status_id,
                              "id",
                              "name"
                            )}
                            formatOptionLabel={(val) => `${val.label}`}
                            options={employee_status.map((option, index) => ({
                              value: option.id,
                              label: `${option.name}`,
                              target: {
                                name: "employee_status_id",
                                value: option.id,
                              },
                            }))}
                            placeholder="Select Employee Status"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>PTKP:*</label>
                          <Select
                            onChange={handleChange}
                            value={SysGenValueOption(
                              ptkp,
                              data.ptkp,
                              "value",
                              "name"
                            )}
                            formatOptionLabel={(val) => `${val.label}`}
                            options={ptkp.map((option, index) => ({
                              value: option.value,
                              label: `${option.name}`,
                              target: {
                                name: "ptkp",
                                value: option.value,
                              },
                            }))}
                            placeholder="Select PTKP"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Branch:</label>
                          <Select
                            onChange={handleBranchChange}
                            value={SysGenValueOption(
                              branch,
                              data.branch_id,
                              "id",
                              "name"
                            )}
                            formatOptionLabel={(val) => `${val.label}`}
                            options={branch.map((option, index) => ({
                              value: option.id,
                              label: `${option.name}`,
                              target: {
                                name: "branch_id",
                                value: option.id,
                              },
                            }))}
                            placeholder="Select Branch"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Division:</label>
                          <Select
                            onChange={handleOrganizationChange}
                            value={SysGenValueOption(
                              organization,
                              data.organization_id,
                              "id",
                              "name"
                            )}
                            formatOptionLabel={(val) => `${val.label}`}
                            options={organization.map((option, index) => ({
                              value: option.id,
                              label: `${option.name}`,
                              target: {
                                name: "organization_id",
                                value: option.id,
                              },
                            }))}
                            placeholder="Select Division"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Job Level:</label>
                          <Select
                            onChange={handleJobLevelChange}
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
                          <Select
                            onChange={handleChange}
                            value={SysGenValueOption(
                              job_position,
                              data.job_position_id,
                              "id",
                              "name"
                            )}
                            formatOptionLabel={(val) => `${val.label}`}
                            options={job_position.map((option, index) => ({
                              value: option.id,
                              label: `${option.name}`,
                              target: {
                                name: "job_position_id",
                                value: option.id,
                              },
                            }))}
                            placeholder="Select Job Position"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Place of Birth:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="pob"
                            value={data.pob}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone Number:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="phone_number"
                            maxLength={15}
                            value={data.phone_number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Date of Birth:</label>
                          <DatePicker
                            name="dob"
                            onChange={handleDateChange}
                            value={data.dob}
                            placeholder={"Date of Birth"}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Gender:*</label>
                          <Select
                            onChange={handleChange}
                            value={SysGenValueOption(
                              gender,
                              data.gender,
                              "value",
                              "name"
                            )}
                            formatOptionLabel={(val) => `${val.label}`}
                            options={gender.map((option, index) => ({
                              value: option.value,
                              label: `${option.name}`,
                              target: {
                                name: "gender",
                                value: option.value,
                              },
                            }))}
                            placeholder="Select Gender"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Marital Status:*</label>
                          <Select
                            onChange={handleChange}
                            value={SysGenValueOption(
                              marital_status,
                              data.marital_status,
                              "value",
                              "name"
                            )}
                            formatOptionLabel={(val) => `${val.label}`}
                            options={marital_status.map((option, index) => ({
                              value: option.value,
                              label: `${option.name}`,
                              target: {
                                name: "marital_status",
                                value: option.value,
                              },
                            }))}
                            placeholder="Select Marital Status"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Blood Type:*</label>
                          <Select
                            onChange={handleChange}
                            value={SysGenValueOption(
                              blood_type,
                              data.blood_type,
                              "value",
                              "name"
                            )}
                            formatOptionLabel={(val) => `${val.label}`}
                            options={blood_type.map((option, index) => ({
                              value: option.value,
                              label: `${option.name}`,
                              target: {
                                name: "blood_type",
                                value: option.value,
                              },
                            }))}
                            placeholder="Select Blood Type"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Email:*</label>
                          <input
                            className="form-control"
                            required
                            type="text"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      {data.id ? null : (
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Account Password</label>
                            <input
                              className="form-control"
                              type="text"
                              name="password"
                              value={password}
                              onChange={(val) => set_password(val.target.value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Citizen Address:*</label>
                        <input
                          className="form-control"
                          required
                          type="text"
                          name="citizien_address"
                          value={data.citizen_address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Address:*</label>
                        <input
                          className="form-control"
                          required
                          type="text"
                          name="residential_address"
                          value={data.residential_address}
                          onChange={handleChange}
                        />
                      </div>
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

export default EmployeeForm;
