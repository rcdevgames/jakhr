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
import * as providers_role from "../../../providers/master/role";
import * as providers_organization from "../../../providers/master/organization";
import * as providers_job_level from "../../../providers/master/job_level";
import * as providers_job_position from "../../../providers/master/job_position";
import * as providers_employee_status from "../../../providers/master/employee_statuses";
import * as provider_direktorat from "../../../providers/master/direktorat";
import * as providers_department from "../../../providers/master/department";
import {
  SysDateTransform,
  SysGenValueOption,
  SysReadData,
  SysValidateForm,
  showToast,
} from "../../../utils/global_store";
import { routes_name } from "../../../route/static_route";
import { sys_labels, sys_path_data } from "../../../utils/constants";
import { Switch } from "antd";
import { useLoadingContext } from "../../../components/Loading";
import Select from "react-select";
import { onlyNumber } from "../../../utils/validation";

const EmployeeForm = ({ readOnly = false }) => {
  const required_field = [
    "full_name as nama_lengkap",
    "phone_number as nomor_handphone",
    "email",
    "gender as jenis_kelamin",
    "marital_status as status_pernikahan",
    "religion as agama",
    "id_number as NIK",
    "employee_id as NIP",
    "ptkp",
    "citizen_address as alamat ktp",
    "residential_address as alamat",
  ];
  const { showLoading, hideLoading } = useLoadingContext();
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

  const [direktorat, set_direktorat] = useState([]);
  const [department, set_department] = useState([]);
  const [job_level, set_job_level] = useState(
    convert_job_level.listOfjob_levelModel([])
  );
  const [job_position, set_job_position] = useState(
    convert_job_position.listOfjob_positionModel([])
  );
  const [role, set_role] = useState([]);

  const title = `${id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM} ${
    sys_labels.menus.EMPLOYEE
  }`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleChangeOrganization = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
    if (name == "direktorat_id") {
      getOrganization(value);
    }
    if (name == "organization_id") {
      getDepartment(data.direktorat_id, value);
    }
    if (name == "department_id") {
      getJobPosition(data.direktorat_id, data.organization_id, value);
    }
  };

  const handleChangeRole = (event) => {
    // console.log(event.target);
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, role: { id: value } }));
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
    getDirektorat();
    getJobLevel();
    getRole();
    if (id) {
      handleDetail(id);
    }
    setTimeout(() => {
      getBranch();
    }, 1000);
  }, []);
  const handleDetail = async (id) => {
    showLoading();
    try {
      const resp = await providers.getDetail(id);
      setData({
        ...resp.data,
        photo: resp.data.photo ? { source: resp.data.photo } : null,
      });
      getDepartment(data.direktorat_id,data.organization_id);
      getOrganization(data.direktorat_id);
      getJobPosition(data.direktorat_id,data.organization_id,data.department_id);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: error });
      // navigate(-1);
    }
    hideLoading();
  };
  const handleSubmit = async () => {
    showLoading();
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
          is_new: true,
        },
        attend_out_of_range: data.attend_out_of_range,
        photo: data.photo ?? "empty",
        role: { id: data?.role?.id ?? null },
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
        user: { password: null },
        emergency_contact_name: data.emergency_contact_name,
        emergency_contact_relationship: data.emergency_contact_relationship,
        emergency_contact_phone_number: data.emergency_contact_phone_number,
        is_payroll: true,
        attend_out_of_range: data.attend_out_of_range,
        photo: data.photo ?? "empty",
        role: { id: data.role.id },
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
    showLoading();
    try {
      const resp = await providers_employee_status.getDataMax();
      set_employee_status(resp.data.data);
      // setData(val=>({...val,branch_id:resp.data.data[0].id}))
    } catch (error) {
      // showToast({ message: error.message, type: "error" });
    }
    hideLoading();
  };

  const getRole = async () => {
    try {
      const resp = await providers_role.getData(1, 99999, "");
      set_role(resp.data.data);
      // setData(val=>({...val,branch_id:resp.data.data[0].id}))
    } catch (error) {
      // showToast({ message: error.message, type: "error" });
    }
  };
  const getOrganization = async (id) => {
    try {
      const resp = await providers_organization.getDataMax(
        `&direktorat_id=${id ?? ""}`
      );
      // const resp = await providers_organization.getDataMax(data.branch_id);
      set_organization(resp.data.data);
    } catch (error) {
      // showToast({ message: error.message, type: "error" });
    }
  };

  const getDirektorat = async () => {
    try {
      const resp = await provider_direktorat.getDataMax();
      set_direktorat(resp.data.data);
    } catch (error) {}
  };
  const getDepartment = async (id = null, id_or = null) => {
    try {
      const resp = await providers_department.getDataMax(
        `&direktorat_id=${id ?? ""}&&organization_id=${id_or ?? ""}`
      );
      set_department(resp.data.data);
    } catch (error) {}
  };
  const getJobLevel = async () => {
    try {
      const resp = await providers_job_level.getDataMax(data.organization_id);
      set_job_level(resp.data.data);
    } catch (error) {
      // showToast({ message: error.message, type: "error" });
    }
  };
  const getJobPosition = async (
    id_direktorat = null,
    id_organisasi = null,
    id_department = null
  ) => {
    showLoading();
    try {
      const resp = await providers_job_position.getDataMax(
        `&direktorat_id=${id_direktorat ?? ""}&organization_id=${
          id_organisasi ?? ""
        }&department_id=${id_department ?? ""}`
      );
      set_job_position(resp.data.data);
    } catch (error) {
      // showToast({ message: error.message, type: "error" });
    }
    hideLoading();
  };

  const handleBranchChange = async (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      branch_id: value,
    }));
  };

  // const handleOrganizationChange = async (event) => {
  //   const { name, value } = event.target;
  //   setData((prevState) => ({
  //     ...prevState,
  //     organization_id: value,
  //     job_level_id: null,
  //   }));
  //   await getJobLevel();
  // };

  const handleJobLevelChange = async (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({
      ...prevState,
      job_level_id: value,
    }));
  };

  const handleChangeActive = (value) => {
    setData((prevState) => ({ ...prevState, attend_out_of_range: value }));
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
                      <label>Photo:</label>
                      {readOnly ? (
                        <img
                          src={data.photo?.source ?? ""}
                          style={{ objectFit: "contain" }}
                          className="col-md-12"
                        ></img>
                      ) : (
                        <UploadFile
                          onImageUpload={handleUpload}
                          file={data.photo}
                        />
                      )}
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
                    <div className="col-md-12 mb-3">
                      <h4>Informasi Karyawan</h4>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <div
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        ></div>
                        <label style={{ marginRight: 15 }}>
                          Absen Diluar Radius
                        </label>
                        <Switch
                          name="attend_out_of_range"
                          disabled={readOnly}
                          checked={data.attend_out_of_range}
                          onChange={handleChangeActive}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Nama Lengkap:*</label>
                        <input
                          className="form-control"
                          disabled={readOnly}
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
                          <label>NIP:*</label>
                          <input
                            className="form-control"
                            disabled={readOnly}
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
                            disabled={readOnly}
                            onKeyDown={onlyNumber}
                            name="id_number"
                            value={data.id_number}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Role:*</label>
                          <Select
                            onChange={handleChangeRole}
                            isDisabled={readOnly}
                            value={SysGenValueOption(
                              role,
                              data?.role?.id ?? "",
                              "id",
                              "name"
                            )}
                            formatOptionLabel={(val) => `${val.name}`}
                            options={
                              role &&
                              role.map((option, index) => ({
                                value: option.id,
                                label: `${option.name}`,
                                ext: index,
                                name: option.name,
                                target: {
                                  name: "role",
                                  value: option.id,
                                },
                              }))
                            }
                            placeholder="Pilih Role"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Tanggal Join Karyawan:</label>
                          <DatePicker
                            name="employee_join_date"
                            onChange={handleDateChangeEmployeeJoinDate}
                            value={data.employee_join_date}
                            disabled={readOnly}
                            placeholder={"Tanggal Join Karyawan"}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Tanggal Akhir Karyawan:</label>
                          <DatePicker
                            name="employee_expired_date"
                            onChange={handleDateChangeEmployeeExpiredDate}
                            disabled={readOnly}
                            value={data.employee_expired_date}
                            placeholder={"Tanggal Akhir Karyawan"}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>NPWP:*</label>
                          <input
                            className="form-control"
                            type="text"
                            disabled={readOnly}
                            name="tax_number"
                            value={data.tax_number}
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Agama:*</label>
                          <Select
                            onChange={handleChange}
                            isDisabled={readOnly}
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
                            placeholder="Pilih Agama"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Status Karyawan:</label>
                          <Select
                            onChange={handleChange}
                            isDisabled={readOnly}
                            value={SysGenValueOption(
                              employee_status,
                              data.employee_status_id,
                              "id",
                              "name"
                            )}
                            formatOptionLabel={(val) => `${val.label}`}
                            options={
                              employee_status &&
                              employee_status.map((option, index) => ({
                                value: option.id,
                                label: `${option.name}`,
                                target: {
                                  name: "employee_status_id",
                                  value: option.id,
                                },
                              }))
                            }
                            placeholder="Pilih Status Karyawan"
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
                            isDisabled={readOnly}
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
                            placeholder="Pilih PTKP"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Kantor/Cabang:</label>
                          <Select
                            onChange={handleBranchChange}
                            isDisabled={readOnly}
                            value={SysGenValueOption(
                              branch,
                              data.branch_id,
                              "id",
                              "name"
                            )}
                            formatOptionLabel={(val) => `${val.label}`}
                            options={
                              branch &&
                              branch.map((option, index) => ({
                                value: option.id,
                                label: `${option.name}`,
                                target: {
                                  name: "branch_id",
                                  value: option.id,
                                },
                              }))
                            }
                            placeholder="Pilih Kantor/Cabang"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div> <div className="col-md-6">
                        <div className="form-group">
                          <label>Direktorat:</label>
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
                            options={
                              direktorat &&
                              direktorat.map((option, index) => ({
                                value: option.id,
                                label: `${option.name}`,
                                target: {
                                  name: "direktorat_id",
                                  value: option.id,
                                },
                              }))
                            }
                            placeholder="Pilih Direktorat"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Divisi:</label>
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
                            options={
                              organization &&
                              organization.map((option, index) => ({
                                value: option.id,
                                label: `${option.name}`,
                                target: {
                                  name: "organization_id",
                                  value: option.id,
                                },
                              }))
                            }
                            placeholder="Pilih Divisi"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Department:</label>
                          <Select
                            onChange={handleChangeOrganization}
                            isDisabled={readOnly}
                            value={SysGenValueOption(
                              department,
                              data.department_id,
                              "id",
                              "name"
                            )}
                            formatOptionLabel={(val) => `${val.label}`}
                            options={
                              department &&
                              department.map((option, index) => ({
                                value: option.id,
                                label: `${option.name}`,
                                target: {
                                  name: "department_id",
                                  value: option.id,
                                },
                              }))
                            }
                            placeholder="Pilih Department"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                     
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Level Jabatan:</label>
                          <Select
                            onChange={handleJobLevelChange}
                            isDisabled={readOnly}
                            value={SysGenValueOption(
                              job_level,
                              data.job_level_id,
                              "id",
                              "name"
                            )}
                            formatOptionLabel={(val) => `${val.label}`}
                            options={
                              job_level &&
                              job_level.map((option, index) => ({
                                value: option.id,
                                label: `${option.name}`,
                                target: {
                                  name: "job_level_id",
                                  value: option.id,
                                },
                              }))
                            }
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
                          <Select
                            isDisabled={readOnly}
                            onChange={handleChange}
                            value={SysGenValueOption(
                              job_position,
                              data.job_position_id,
                              "id",
                              "name"
                            )}
                            formatOptionLabel={(val) => `${val.label}`}
                            options={
                              job_position &&
                              job_position.map((option, index) => ({
                                value: option.id,
                                label: `${option.name}`,
                                target: {
                                  name: "job_position_id",
                                  value: option.id,
                                },
                              }))
                            }
                            placeholder="Pilih Posisi Jabatan"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Tempat Lahir:</label>
                          <input
                            className="form-control"
                            disabled={readOnly}
                            type="text"
                            name="pob"
                            value={data.pob}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Nomor Handphone:</label>
                          <input
                            className="form-control"
                            disabled={readOnly}
                            type="text"
                            onKeyDown={onlyNumber}
                            name="phone_number"
                            maxLength={15}
                            value={data.phone_number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Tanggal Lahir:</label>
                          <DatePicker
                            name="dob"
                            disabled={readOnly}
                            onChange={handleDateChange}
                            value={data.dob}
                            placeholder={"Tanggal Lahir"}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Jenis Kelamin:*</label>
                          <Select
                            isDisabled={readOnly}
                            onChange={handleChange}
                            value={SysGenValueOption(
                              gender,
                              data.gender,
                              "value",
                              "name"
                            )}
                            name="gender"
                            formatOptionLabel={(val) => `${val.label}`}
                            options={gender.map((option, index) => ({
                              value: option.value,
                              label: `${option.name}`,
                              target: {
                                name: "gender",
                                value: option.value,
                              },
                            }))}
                            placeholder="Pilih Jenis Kelamin"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Status Perkawinan:*</label>
                          <Select
                            isDisabled={readOnly}
                            onChange={handleChange}
                            value={SysGenValueOption(
                              marital_status,
                              data?.marital_status?.toLowerCase(),
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
                            placeholder="Pilih Status Perkawinan"
                            aria-label="Nama"
                            required
                            isSearchable
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Golongan Darah:*</label>
                          <Select
                            isDisabled={readOnly}
                            onChange={handleChange}
                            value={SysGenValueOption(
                              blood_type,
                              data?.blood_type?.toLowerCase(),
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
                            placeholder="Pilih Golongan Darah"
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
                            disabled={readOnly}
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
                            <label>Password Akun</label>
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
                        <label>Alamat KTP:*</label>
                        <input
                          className="form-control"
                          disabled={readOnly}
                          required
                          type="text"
                          name="citizen_address"
                          value={data.citizen_address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Alamat:*</label>
                        <input
                          className="form-control"
                          required
                          disabled={readOnly}
                          type="text"
                          name="residential_address"
                          value={data.residential_address}
                          onChange={handleChange}
                        />
                      </div>
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

export default EmployeeForm;
