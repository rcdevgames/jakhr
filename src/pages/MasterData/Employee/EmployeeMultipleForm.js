import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table, Select } from "antd";
import AdminDashboard from "../../AdminDashboard";
import "./styles.css";
import {
  file_template,
  sys_iamges,
  sys_path_data,
} from "../../../utils/constants";
import * as XLSX from "xlsx";
import * as providers from "../../../providers/master/employee";
import {
  SysReadData,
  showToast,
  SysExportData,
} from "../../../utils/global_store";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "../../../components/Loading";
import * as providers_employee_status from "../../../providers/master/employee_statuses";
import * as providers_branch from "../../../providers/master/branch";
import * as providers_organization from "../../../providers/master/organization";
import * as providers_job_level from "../../../providers/master/job_level";
import * as providers_job_position from "../../../providers/master/job_position";
import * as provider_direktorat from "../../../providers/master/direktorat";
import * as providers_department from "../../../providers/master/department";

let branch_data = [];
let organization_data = [];
let job_position_data = [];
let job_level_data = [];
let employee_status_data = [];

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const gender = SysReadData(sys_path_data.gender_data);
  const religion = SysReadData(sys_path_data.religion_data);
  const marital_status = SysReadData(sys_path_data.marital_status_data);
  const blood_type = SysReadData(sys_path_data.blood_type_data);
  const ptkp = SysReadData(sys_path_data.ptkp);
  const form = useContext(EditableContext);
  const [employee_status, set_employee_status] = useState([]);
  const [branch, set_branch] = useState([]);
  const [organization, set_organization] = useState([]);
  const [direktorat, set_direktorat] = useState([]);
  const [department, set_department] = useState([]);
  const [job_level, set_job_level] = useState([]);
  const [job_position, set_job_position] = useState([]);
  const getEmployeeStatus = async () => {
    try {
      const resp = await providers_employee_status.getDataMax();
      set_employee_status(resp.data.data);
      employee_status_data= resp.data.data;
    } catch (error) {}
  };

  const getBranch = async () => {
    try {
      const resp = await providers_branch.getDataMax();
      set_branch(resp.data.data);
      branch_data = resp.data.data;
    } catch (error) {}
  };
  const getOrganization = async () => {
    try {
      const resp = await providers_organization.getDataMax();
      set_organization(resp.data.data);
      organization_data = resp.data.data;
    } catch (error) {}
  };

  const getDirektorat = async () => {
    try {
      const resp = await provider_direktorat.getDataMax();
      set_direktorat(resp.data.data);
    } catch (error) {}
  };
  const getDepartment = async () => {
    try {
      const resp = await providers_department.getDataMax();
      set_department(resp.data.data);
    } catch (error) {}
  };
  const getJobLevel = async () => {
    try {
      const resp = await providers_job_level.getDataMax();
      set_job_level(resp.data.data);
      job_level_data = resp.data.data;
    } catch (error) {}
  };
  const getJobPosition = async () => {
    try {
      const resp = await providers_job_position.getDataMax();
      set_job_position(resp.data.data);
      job_position_data = resp.data.data;
    } catch (error) {}
  };
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  useEffect(() => {
    getEmployeeStatus();
    getBranch();
    getJobLevel();
    getJobPosition();
    // getDepartment();
    getOrganization();
    // getDirektorat();
  }, []);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      dataIndex == "gender" ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select
            ref={inputRef}
            onBlur={save}
            onPressEnter={save}
            onChange={save}
            // style={{ width: "100%" }}
            style={{ minWidth: "150px" }}
          >
            {gender.map((val) => (
              <option style={{ minWidth: "150px" }} value={val.value}>
                {val.name}
              </option>
            ))}
          </Select>
        </Form.Item>
      ) : dataIndex == "religion" ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select
            ref={inputRef}
            onBlur={save}
            onPressEnter={save}
            onChange={save}
            // style={{ width: "100%" }}
            style={{ minWidth: "150px" }}
          >
            {religion.map((val) => (
              <option style={{ minWidth: "150px" }} value={val.value}>
                {val.name}
              </option>
            ))}
          </Select>
        </Form.Item>
      ) : dataIndex == "ptkp" ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select
            ref={inputRef}
            onBlur={save}
            onPressEnter={save}
            onChange={save}
            // style={{ width: "100%" }}
            style={{ minWidth: "150px" }}
          >
            {ptkp.map((val) => (
              <option style={{ minWidth: "150px" }} value={val.value}>
                {val.name}
              </option>
            ))}
          </Select>
        </Form.Item>
      ) : dataIndex == "marital_status" ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select
            ref={inputRef}
            onBlur={save}
            onPressEnter={save}
            onChange={save}
            style={{ minWidth: "150px" }}
            // style={{ width: "100%" }}
          >
            {marital_status.map((val) => (
              <option style={{ minWidth: "150px" }} value={val.value}>
                {val.name}
              </option>
            ))}
          </Select>
        </Form.Item>
      ) : dataIndex == "blood_type" ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select
            ref={inputRef}
            onBlur={save}
            onPressEnter={save}
            onChange={save}
            style={{ minWidth: "150px" }}
            // style={{ width: "100%" }}
          >
            {blood_type.map((val) => (
              <option value={val.value} style={{ minWidth: "150px" }}>
                {val.name}
              </option>
            ))}
          </Select>
        </Form.Item>
      ) : dataIndex == "employee_status_id" ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select
            ref={inputRef}
            onBlur={save}
            onPressEnter={save}
            onChange={save}
            style={{ minWidth: "150px" }}
            // style={{ width: "100%" }}
          >
            {employee_status.map((val) => (
              <option value={val.id} style={{ minWidth: "150px" }}>
                {val.name}
              </option>
            ))}
          </Select>
        </Form.Item>
      ) : dataIndex == "branch_id" ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select
            ref={inputRef}
            onBlur={save}
            onPressEnter={save}
            onChange={save}
            style={{ minWidth: "150px" }}
            // style={{ width: "100%" }}
          >
            {branch.map((val) => (
              <option value={val.id} style={{ minWidth: "150px" }}>
                {val.name}
              </option>
            ))}
          </Select>
        </Form.Item>
      ) : dataIndex == "organization_id" ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select
            ref={inputRef}
            onBlur={save}
            onPressEnter={save}
            onChange={save}
            style={{ minWidth: "150px" }}
            // style={{ width: "100%" }}
          >
            {organization.map((val) => (
              <option value={val.id} style={{ minWidth: "150px" }}>
                {val.name}
              </option>
            ))}
          </Select>
        </Form.Item>
      ) : dataIndex == "job_position_id" ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select
            ref={inputRef}
            onBlur={save}
            onPressEnter={save}
            onChange={save}
            style={{ minWidth: "150px" }}
            // style={{ width: "100%" }}
          >
            {job_position.map((val) => (
              <option value={val.id} style={{ minWidth: "150px" }}>
                {val.name}
              </option>
            ))}
          </Select>
        </Form.Item>
      ) : dataIndex == "job_level_id" ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select
            ref={inputRef}
            onBlur={save}
            onPressEnter={save}
            onChange={save}
            style={{ minWidth: "150px" }}
            // style={{ width: "100%" }}
          >
            {job_level.map((val) => (
              <option value={val.id} style={{ minWidth: "150px" }}>
                {val.name}
              </option>
            ))}
          </Select>
        </Form.Item>
      ) : (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input
            ref={inputRef}
            onPressEnter={save}
            style={{
              minWidth: "150px",
              height: "40px",
            }}
            onBlur={save}
          />
        </Form.Item>
      )
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          minWidth: "150px",
          height: "40px",
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const EmployeeMultipleForm = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);
  const title = "Multipleform";
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const { showLoading, hideLoading } = useLoadingContext();
  const defaultColumns = [
    {
      title: "Nama Lengkap",
      dataIndex: "full_name",
      width: "40%",
      editable: true,
    },
    {
      title: "NIP",
      width: "40%",
      dataIndex: "employee_id",
      editable: true,
    },
    {
      width: "40%",
      title: "NIK",
      dataIndex: "nik",
      editable: true,
    },

    {
      title: "NPWP",
      dataIndex: "npwp",
      width: "40%",
      editable: true,
    },

    {
      width: "40%",
      title: "Agama",
      dataIndex: "religion",
      editable: true,
    },

    {
      title: "Tempat Lahir",
      dataIndex: "place_of_birth",
      width: "40%",
      editable: true,
    },

    {
      title: "Nomor Handphone",
      dataIndex: "phone_number",
      width: "40%",
      editable: true,
    },
    {
      title: "Jenis Kelamin",
      width: "40%",
      dataIndex: "gender",
      editable: true,
    },
    {
      title: "Status Pernikahan",
      width: "40%",
      dataIndex: "marital_status",
      editable: true,
    },

    {
      title: "Golongan Darah",
      dataIndex: "blood_type",
      width: "40%",
      editable: true,
    },

    {
      title: "PTKP",
      dataIndex: "ptkp",
      width: "40%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "40%",
      editable: true,
    },

    {
      title: "Password Akun",
      width: "40%",
      dataIndex: "account_password",
      editable: true,
    },

    {
      title: "Alamat",
      dataIndex: "address",
      width: "40%",
      editable: true,
    },

    {
      title: "Alamat KTP",
      dataIndex: "citizen_address",
      width: "40%",
      editable: true,
    },
    {
      title: "Status Karyawan",
      dataIndex: "employee_status_id",
      render:(val)=>employee_status_data.find(obj=>obj.id == val)?.name??"",
      width: "40%",
      editable: true,
    },
    {
      title: "Kantor/Cabang",
      dataIndex: "branch_id",
      render:(val)=>branch_data.find(obj=>obj.id == val)?.name??"",
      width: "40%",
      editable: true,
    },
    {
      title: "Divisi",
      render:(val)=>organization_data.find(obj=>obj.id == val)?.name??"",
      dataIndex: "organization_id",
      width: "40%",
      editable: true,
    },
    {
      title: "Posisi Jabatan",
      render:(val)=>job_position_data.find(obj=>obj.id == val)?.name??"",
      dataIndex: "job_position_id",
      width: "40%",
      editable: true,
    },
    {
      title: "Level Jabatan",
      render:(val)=>job_level_data.find(obj=>obj.id == val)?.name??"",
      dataIndex: "job_level_id",
      width: "40%",
      editable: true,
    },
    {
      title: "Aksi",
      dataIndex: "action",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
  const downloadTemplates = async () => {
    try {
      const response = await fetch(file_template.EMPLOYEE_MULTIPLE);
      const blob = await response.blob();
      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      element.download = "Template Multipleform Employee.xlsx";
      document.body.appendChild(element);
      element.click();
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      jsonData.map((val) => handleAddFromImport(val));

      // Now you have the jsonData containing the rows from the Excel file.
      console.log("Data from Excel:", jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleAddFromImport = (data) => {
    const newData = {
      key: count,
      full_name: data["Nama Lengkap"] ?? "",
      employee_id: data["NIP"] ?? "",
      nik: data["NIK"] ?? "",
      ptkp: data["PTKP"] ?? "",
      npwp: data["NPWP"] ?? "",
      religion: data["Agama"] ?? "Islam",
      place_of_birth: data["Tempat Lahir"] ?? "",
      phone_number: data["Nomor Handphone"] ?? "",
      gender: data["Jenis Kelamin"] ?? "Laki-laki",
      marital_status: data["Status Pernikahan"] ?? "Lajang",
      blood_type: data["Golongan Darah"] ?? "A",
      email: data["Email"] ?? "",
      account_password: data["Password Akun"] ?? "",
      address: data["Alamat"] ?? "",
      citizen_address: data["Alamat KTP"] ?? "",
      employee_status_id: data["ID Status Karyawan"] ?? "",
      branch_id: data["ID Kantor/Cabang"] ?? "",
      organization_id: data["ID Divisi"] ?? "",
      job_position_id: data["ID Posisi Jabatan"] ?? "",
      job_level_id: data["ID Level Jabatan"] ?? "",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleClickImport = () => {
    fileInputRef.current.click();
  };
  const handleSubmit = async () => {
    showLoading();
    let is_reject = false;
    for (let index = 0; index < dataSource.length; index++) {
      try {
        const element = dataSource[index];
        const resp = await providers.insertData({
          full_name: element.full_name,
          phone_number: element.phone_number.toString(),
          email: element.email,
          gender: element.gender,
          marital_status: element.marital_status,
          religion: element.religion,
          pob: element.pob,
          dob: null,
          blood_type: element.blood_type,
          ptkp: element.ptkp,
          id_type: "KTP",
          id_number: element.nik.toString(),
          citizen_address: element.citizien_address,
          residential_address: element.address,
          employee_id: element.employee_id.toString(),
          employee_join_date: null,
          employee_expired_date: null,
          tax_config: 1,
          tax_number: element.npwp.toString(),
          branch_id: element.branch_id.toString(),
          organization_id: element.organization_id.toString(),
          job_level_id: element.job_level_id.toString(),
          job_position_id: element.job_position_id.toString(),
          employee_status_id: element.employee_status_id.toString(),
          create_user: true,
          emergency_contact_name: null,
          emergency_contact_relationship: null,
          emergency_contact_phone_number: null,
          is_payroll: true,
          user: {
            is_new: true,
            password: element.account_password.toString(),
          },
          photo: sys_iamges.EMPLOYEE_DEFAULT,
        });
        handleDelete(element.key);
      } catch (error) {
        is_reject = true;
      }
      if (is_reject) {
        showToast({ message: "Somedata is rejected, please cek data" });
      } else {
        showToast({ message: "Data successfully insert", type: "success" });
        navigate(-2);
      }
    }
    hideLoading();
  };
  const handleExportJobPosition = async () => {
    try {
      const columns = [
        { title: "ID Direktorat", key: "direktorat_id" },
        { title: "Direktorat", key: "direktorat_name" },
        { title: "ID Divisi", key: "organization_id" },
        { title: "Divisi", key: "organization_name" },
        { title: "ID Departmen", key: "department_id" },
        { title: "Departmen", key: "department_name" },
        { title: "ID Posisi Jabatan", key: "id" },
        { title: "Posisi Jabatan", key: "name" },
        { title: "ID Level Jabatan", key: "job_level_job_level_id" },
        { title: "Level Jabatan", key: "job_level_job_level_name" },
      ];
      await SysExportData(job_position_data, columns, "Posisi Jabatan");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleExportBranch = async () => {
    try {
      const columns = [
        { title: "ID Kantor/Cabang", key: "id" },
        { title: "Kantor/Cabang", key: "name" },
      ];
      await SysExportData(branch_data, columns, "Kantor/Cabang");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleExportEmployeeStatus = async () => {
    try {
      const columns = [
        { title: "ID Status Karyawan", key: "id" },
        { title: "Status Karyawan", key: "name" },
      ];
      await SysExportData(employee_status_data, columns, "Status Karyawan");
    } catch (error) {
      console.log(error.message);
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
            <div className="row mb-3 justify-content-between">
              <div className="col-md-10">
                {" "}
                <Button onClick={() => handleExportBranch()} type="primary">
                  Download Kantor/Cabang
                </Button>{" "}
                <Button
                  onClick={() => handleExportEmployeeStatus()}
                  type="primary"
                  style={{
                    marginLeft: 10,
                  }}
                >
                  Download Status Karyawan
                </Button>
                <Button
                  onClick={() => handleExportJobPosition()}
                  type="primary"
                  style={{
                    marginLeft: 10,
                  }}
                >
                  Download Posisi Jabatan
                </Button>
                <Button
                  style={{
                    marginLeft: 10,
                  }}
                  onClick={downloadTemplates}
                  type="primary"
                >
                  Download Templates
                </Button>
                <Button
                  onClick={handleClickImport}
                  type="primary"
                  style={{
                    marginLeft: 10,
                  }}
                >
                  Import File
                </Button>
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImport}
                ></input>
              </div>
              <div className="col-md-2 align-items-end">
                <Button type="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </div>
            </div>

            <Table
              style={{ overflowX: "scroll" }}
              components={components}
              className="table-responsive"
              rowClassName={() => "editable-row"}
              bordered
              pagination={false}
              dataSource={dataSource}
              columns={columns}
            />

            <Button
              onClick={handleAddFromImport}
              type="primary"
              style={{
                marginBottom: 16,
                borderRadius: 100,
              }}
            >
              +
            </Button>
          </div>
        </div>
      </section>
    </AdminDashboard>
  );
};
export default EmployeeMultipleForm;
