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
import { SysDateTransform, showToast } from "../../../utils/global_store";
import { routes_name } from "../../../route/static_route";
const EmployeeForm = () => {
  const gender = ["Laki-laki", "Perempuan"];
  const religion = ["Islam", "Kristen", "Hindu", "Budha", "Konghucu"];
  const marital_status = ["Lajang", "Suami", "Istri", "Duda", "Janda"];
  const blood_type = ["A", "B", "AB", "O"];
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfemployeeModel({}));
  const [password, set_password] = useState("");
  const [branch, set_branch] = useState(convert_branch.listOfbranchModel([]));
  const [organization, set_organization] = useState(
    convert_organization.listOforganizationModel([])
  );
  const [job_level, set_job_level] = useState(
    convert_job_level.listOfjob_levelModel([])
  );
  const [job_position, set_job_position] = useState(
    convert_job_position.listOfjob_positionModel([])
  );
  const title = "Employee " + (id ? "Edit Form" : "Form");
  const handleChange = (event) => {
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
    getBranch();
    // getOrganization();
    if (id) {
      handleDetail(id);
    }
  }, []);
  const handleDetail = async (id) => {
    try {
      const resp = await providers.getDetail(id);
      setData({
        ...resp.data,
        photo: resp.data.photo ? { source: resp.data.photo } : null,
      });
      await getOrganization();
      await getJobLevel();
      await getJobPosition();
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
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
  };
  const handleSubmit = async () => {
    try {
      const resp = await providers.insertData({
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
        citizen_address: data.citizien_address,
        residential_address: data.address,
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
        employee_status_id: null,
        create_user: true,
        emergency_contact_name: data.emergency_contact_name,
        emergency_contact_relationship: data.emergency_contact_relationship,
        emergency_contact_phone_number: data.emergency_contact_phone_number,
        is_payroll: true,
        user: {
          password: password,
        },
        photo: data.photo,
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
          citizen_address: data.citizien_address,
          residential_address: data.address,
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
          employee_status_id: null,
          create_user: false,
          emergency_contact_name: data.emergency_contact_name,
          emergency_contact_relationship: data.emergency_contact_relationship,
          emergency_contact_phone_number: data.emergency_contact_phone_number,
          is_payroll: true,
          photo: data.photo,
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
  const handleUpload = (value) => {
    setData((val) => ({ ...val, photo: value }));
  };
  const getBranch = async () => {
    try {
      const resp = await providers_branch.getDataMax();
      set_branch(resp.data.data);
      // setData(val=>({...val,branch_id:resp.data.data[0].id}))
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
  };
  const getOrganization = async () => {
    try {
      const resp = await providers_organization.getDataMax(data.branch_id);
      set_organization(resp.data.data);
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
  };
  const getJobLevel = async () => {
    try {
      const resp = await providers_job_level.getDataMax(data.organization_id);
      set_job_level(resp.data.data);
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
  };
  const getJobPosition = async () => {
    try {
      const resp = await providers_job_position.getDataMax(data.job_level_id);
      set_job_position(resp.data.data);
    } catch (error) {
      showToast({ message: error.message, type: "error" });
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
                    <div className="col-md-6">
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
                        <label>Fullname:</label>
                        <input
                          className="form-control"
                          type="text"
                          name="full_name"
                          value={data.full_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Employee ID:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="employee_id"
                            value={data.employee_id}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>NIK:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="id_number"
                            value={data.id_number}
                            onChange={handleChange}
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
                          <label>NPWP:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="tax_number"
                            value={data.tax_number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Religion:</label>
                          <select
                            className="form-select"
                            id="religion"
                            name="religion"
                            value={data.religion}
                            onChange={handleChange}
                            aria-label="Religion"
                          >
                            <option value="" disabled>
                              Select Religion
                            </option>
                            {religion.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Branch:</label>
                          <select
                            className="form-select"
                            id="branch_id"
                            name="branch_id"
                            value={data.branch_id}
                            onChange={handleBranchChange}
                            aria-label="Branch"
                          >
                            <option value={null}>Select Branch</option>
                            {branch.map((option, index) => (
                              <option key={index} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Division:</label>
                          <select
                            className="form-select"
                            id="organization_id"
                            name="organization_id"
                            value={data.organization_id}
                            onChange={handleOrganizationChange}
                            aria-label="Division"
                          >
                            <option value={null}>Select Division</option>
                            {organization.map((option, index) => (
                              <option key={index} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Job Level:</label>
                          <select
                            className="form-select"
                            id="job_level_id"
                            name="job_level_id"
                            value={data.job_level_id}
                            onChange={handleJobLevelChange}
                            aria-label="Job Level"
                          >
                            <option value={null}>Select Job Level</option>
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
                          <select
                            className="form-select"
                            id="job_position_id"
                            name="job_position_id"
                            value={data.job_position_id}
                            onChange={handleChange}
                            aria-label="Job Position"
                          >
                            <option value={null}>Select Job Position</option>
                            {job_position.map((option, index) => (
                              <option key={index} value={option.id}>
                                {option.name}
                              </option>
                            ))}
                          </select>
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
                          <label>Gender:</label>
                          <select
                            className="form-select"
                            id="gender"
                            name="gender"
                            value={data.gender}
                            onChange={handleChange}
                            aria-label="gender"
                          >
                            <option value="" disabled>
                              Select Gender
                            </option>
                            {gender.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Marital Status:</label>
                          <select
                            className="form-select"
                            id="marital_status"
                            name="marital_status"
                            value={data.marital_status}
                            onChange={handleChange}
                            aria-label="marital_status"
                          >
                            <option value="" disabled>
                              Select Marital Status
                            </option>
                            {marital_status.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Blood Type:</label>
                          <select
                            className="form-select"
                            id="blood_type"
                            name="blood_type"
                            value={data.blood_type}
                            onChange={handleChange}
                            aria-label="Blood Type"
                          >
                            <option value="" disabled>
                              Select Blood Type
                            </option>
                            {blood_type.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            className="form-control"
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
                        <label>Address</label>
                        <input
                          className="form-control"
                          type="text"
                          name="address"
                          value={data.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Citizen Address</label>
                        <input
                          className="form-control"
                          type="text"
                          name="citizien_address"
                          value={data.citizien_address}
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
