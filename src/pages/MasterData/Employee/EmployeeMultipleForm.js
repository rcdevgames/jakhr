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
import { SysReadData, showToast } from "../../../utils/global_store";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "../../../components/Loading";

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
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
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
          branch_id: null,
          organization_id: null,
          job_level_id: null,
          job_position_id: null,
          employee_status_id: null,
          create_user: true,
          emergency_contact_name: null,
          emergency_contact_relationship: null,
          emergency_contact_phone_number: null,
          is_payroll: true,
          user: {
            is_new: true,
            password: element.account_password,
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
                <Button onClick={downloadTemplates} type="primary">
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
