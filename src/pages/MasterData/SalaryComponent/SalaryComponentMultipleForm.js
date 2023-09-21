import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table, Select, Tabs } from "antd";
import AdminDashboard from "../../AdminDashboard";
import "./styles.css";
import {
  file_template,
  sys_iamges,
  sys_path_data,
} from "../../../utils/constants";
import * as XLSX from "xlsx";
import {
  SysReadData,
  showToast,
  SysExportData,
} from "../../../utils/global_store";
import { useNavigate } from "react-router-dom";
import { useLoadingContext } from "../../../components/Loading";
import * as providers_employee from "../../../providers/master/employee";
import * as providers_allowance from "../../../providers/payroll/allowance";
import * as providers_deduction from "../../../providers/payroll/deduction";
import * as providers_component from "../../../providers/config/component_name";
import * as providers_late from "../../../providers/payroll/late";
import * as providers_overtime from "../../../providers/payroll/overtime";
import * as providers_salary from "../../../providers/payroll/salary";
const { TabPane } = Tabs;

let employee_data = [];
let allowance_data = [];
let deduction_data = [];
let bank_data = [];
let calc_base_data = [];
let calc_mode_data = [];

const EditableContextSalary = React.createContext(null);
const EditableRowSalary = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContextSalary.Provider value={form}>
        <tr {...props} />
      </EditableContextSalary.Provider>
    </Form>
  );
};
const EditableCellSalary = ({
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
  const calc_base = SysReadData(sys_path_data.calc_base_data);
  calc_base_data = SysReadData(sys_path_data.calc_base_data);
  const calc_mode = SysReadData(sys_path_data.calc_mode_data);
  const bank = SysReadData(sys_path_data.bank_data);
  bank_data = SysReadData(sys_path_data.bank_data);
  calc_mode_data = SysReadData(sys_path_data.calc_mode_data);
  const form = useContext(EditableContextSalary);
  const [employee, set_employee] = useState([]);
  const [allowance, set_allowance] = useState([]);
  const [deduction, set_deduction] = useState([]);
  const getEmployee = async () => {
    try {
      const resp = await providers_employee.getData(1, 999999999);
      set_employee(resp.data.data);
      employee_data = resp.data.data;
    } catch (error) {}
  };

  const getAllowance = async () => {
    let data = [];
    try {
      const resp = await providers_component.getDataAllowanceMax();
      resp.data.data.map((val) => {
        data.push({
          ...val,
          type: "tetap",
        });
      });
    } catch (error) {}
    try {
      const resp_daily = await providers_component.getDataAllowanceDailyMax();
      resp_daily.data.data.map((val) => {
        data.push({
          ...val,
          type: "harian",
        });
      });
    } catch (error) {}
    try {
      const resp_ex = await providers_component.getDataAllowanceExMax();
      resp_ex.data.data.map((val) => {
        data.push({
          ...val,
          type: "lainnya",
        });
      });
    } catch (error) {}
    set_allowance(data);
    allowance_data = data;
  };
  const getDeduction = async () => {
    try {
      const resp = await providers_component.getDataDeductionMax();
      set_deduction(resp.data.data);
      deduction_data = resp.data.data;
    } catch (error) {}
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  useEffect(() => {
    getEmployee();
    getAllowance();
    getDeduction();
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
      dataIndex == "employee_id" ? (
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
            style={{ minWidth: "200px" }}
            // style={{ width: "100%" }}
          >
            {employee_data.map((val) => (
              <option value={val.id}>{val.employee_id}</option>
            ))}
          </Select>
        </Form.Item>
      ) : dataIndex == "bank_name" ? (
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
            style={{ minWidth: "200px" }}
            // style={{ width: "100%" }}
          >
            {bank_data.map((val) => (
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
              // minWidth: "150px",
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
          // minWidth: "150px",
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

const EditableContextAllowance = React.createContext(null);
const EditableRowAllowance = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContextAllowance.Provider value={form}>
        <tr {...props} />
      </EditableContextAllowance.Provider>
    </Form>
  );
};
const EditableCellAllowance = ({
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
  const form = useContext(EditableContextAllowance);
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
      dataIndex == "employee_id" ? (
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
            style={{ minWidth: "200px" }}
            // style={{ width: "100%" }}
          >
            {employee_data.map((val) => (
              <option value={val.id}>{val.employee_id}</option>
            ))}
          </Select>
        </Form.Item>
      ) : dataIndex == "component_name_id" ? (
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
            {allowance_data.map((val) => (
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
              // minWidth: "150px",
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
          // minWidth: "150px",
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

const EditableContextDeduction = React.createContext(null);
const EditableRowDeduction = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContextDeduction.Provider value={form}>
        <tr {...props} />
      </EditableContextDeduction.Provider>
    </Form>
  );
};
const EditableCellDeduction = ({
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
  const form = useContext(EditableContextDeduction);
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
      dataIndex == "employee_id" ? (
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
            style={{ minWidth: "200px" }}
            // style={{ width: "100%" }}
          >
            {employee_data.map((val) => (
              <option value={val.id}>{val.employee_id}</option>
            ))}
          </Select>
        </Form.Item>
      ) : dataIndex == "component_name_id" ? (
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
            {deduction_data.map((val) => (
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
const SalaryComponent = () => {
  const fileInputRef = useRef(null);
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const { showLoading, hideLoading } = useLoadingContext();
  const defaultColumns = [
    {
      title: "NIP",
      dataIndex: "employee_id",
      render: (val) =>
        employee_data.find((obj) => obj.id == val)?.employee_id ?? "",
      // width: "40%",
      editable: true,
    },
    {
      title: "Karyawan",
      // width: "40%",
      render: (val, rec) =>
        employee_data.find((obj) => obj.id == rec.employee_id)?.full_name ?? "",
      dataIndex: "employee_name",
      editable: false,
    },
    {
      // width: "40%",
      title: "Gaji Pokok",
      dataIndex: "basic_salary",
      editable: true,
    },

    {
      title: "Kode Bank",
      dataIndex: "bank_name",
      render: (val) => bank_data.find((obj) => obj.value == val)?.name ?? "",
      // width: "40%",
      editable: true,
    },

    {
      // width: "40%",
      title: "Rekening",
      dataIndex: "bank_account",
      editable: true,
    },

    {
      title: "Hari Kerja",
      dataIndex: "working_days",
      // width: "40%",
      editable: true,
    },
    {
      title: "BPJS JHT Karyawan",
      dataIndex: "jht",
      // width: "40%",
      editable: true,
    },
    {
      title: "BPJS Kesehatan Karyawan",
      dataIndex: "kesehatan",
      // width: "40%",
      editable: true,
    },
    {
      title: "BPJS JP Karyawan",
      dataIndex: "jp",
      // width: "40%",
      editable: true,
    },
    {
      title: "Asuransi Lain Karyawan",
      dataIndex: "other_insurance",
      // width: "40%",
      editable: true,
    },
    {
      title: "BPJS JHT Perusahaan",
      dataIndex: "jht_company",
      // width: "40%",
      editable: true,
    },
    {
      title: "BPJS Kesehatan Perusahaan",
      dataIndex: "kesehatan_company",
      // width: "40%",
      editable: true,
    },
    {
      title: "BPJS JP Perusahaan",
      dataIndex: "jp_company",
      // width: "40%",
      editable: true,
    },
    {
      title: "BPJS JKM Perusahaan",
      dataIndex: "jkm_company",
      // width: "40%",
      editable: true,
    },
    {
      title: "BPJS JKK Perusahaan",
      dataIndex: "jkk_company",
      // width: "40%",
      editable: true,
    },
    {
      title: "Asuransi Lain Perusahaan",
      dataIndex: "other_insurance_company",
      // width: "40%",
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
      row: EditableRowSalary,
      cell: EditableCellSalary,
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
      const response = await fetch(file_template.SALARY_COMPONENT);
      const blob = await response.blob();
      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      element.download = "Template Multipleform Salary.xlsx";
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
    };
    reader.readAsArrayBuffer(file);
  };

  const handleAddFromImport = (data) => {
    const nip = data["NIP"] ?? "";
    const employee_id =
      employee_data.find((val) => val.employee_id == nip)?.id ?? "";
    const newData = {
      key: count+ data.__rowNum__,
      employee_id: employee_id,
      basic_salary: data["Gaji Pokok"] ?? "",
      bank_name: data["Kode Bank"] ?? "",
      bank_account: data["Rekening"] ?? "",
      working_days: data["Hari Kerja"] ?? "",
      jht: data["BPJS JHT Karyawan"] ?? "",
      kesehatan: data["BPJS Kesehatan Karyawan"] ?? "",
      jp: data["BPJS JP Karyawan"] ?? "",
      other_insurance: data["Asuransi Lain Karyawan"] ?? "",
      jht_company: data["BPJS JHT Perusahaan"] ?? "",
      kesehatan_company: data["BPJS Kesehatan Perusahaan"] ?? "",
      jp_company: data["BPJS JP Perusahaan"] ?? "",
      jkm_company: data["BPJS JKM Perusahaan"] ?? "",
      jkk_company: data["BPJS JKK Perusahaan"] ?? "",
      other_insurance_company: data["Asuransi Lain Perusahaan"] ?? "",
    };
    setDataSource((prev)=>[...prev, newData]);
    setCount(count + data.__rowNum__);
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
        const id = element.employee_id;
        const resp_salary = await providers_salary.getData(1, 1, "", id);
        let is_salary = false;
        if (resp_salary.data?.data?.length > 0) is_salary = true;
        console.log(id, element);
        if (is_salary) {
          const detail = await providers_salary.getDetail(
            resp_salary.data.data[0].id
          );
          const resp = await providers_salary.updateData(
            {
              employee_id: id,
              basic_salary: element.basic_salary,
              overtime_config: "config-1",
              overtime: 0,
              late_deduction_config: "config-1",
              late_deduction: 0,
              working_days: element.working_days,
              leave_balance_incentive: element.leave_balance_incentive ?? 0,
              jht: element.jht,
              kesehatan: element.kesehatan,
              jp: element.jp,
              other_insurance: element.other_insurance,
              jht_company: element.jht_company,
              kesehatan_company: element.kesehatan_company,
              jp_company: element.jp_company,
              jkm_company: element.jkm_company,
              jkk_company: element.jkk_company,
              other_insurance_company: element.other_insurance_company,
              bank_name: element.bank_name,
              bank_account: element.bank_account.toString(),
            },
            detail.data.id
          );
        } else {
          console.log("INSERT");
          const resp = await providers_salary.insertData({
            employee_id: id,
            basic_salary: element.basic_salary,
            overtime_config: "config-1",
            overtime: 0,
            late_deduction_config: "config-1",
            late_deduction: 0,
            working_days: element.working_days,
            leave_balance_incentive: element.leave_balance_incentive ?? 0,
            jht: element.jht,
            kesehatan: element.kesehatan,
            jp: element.jp,
            other_insurance: element.other_insurance,
            jht_company: element.jht_company,
            kesehatan_company: element.kesehatan_company,
            jp_company: element.jp_company,
            jkm_company: element.jkm_company,
            jkk_company: element.jkk_company,
            other_insurance_company: element.other_insurance_company,
            bank_name: element.bank_name,
            bank_account: element.bank_account.toString(),
          });
        }

        handleDelete(element.key);
      } catch (error) {
        is_reject = true;
        console.log(error);
      }
      if (is_reject) {
        showToast({ message: "Somedata is rejected, please cek data" });
      } else {
        showToast({ message: "Data successfully insert", type: "success" });
        // navigate(-2);
      }
    }
    hideLoading();
  };
  const handleExportBank = async () => {
    try {
      const columns = [
        { title: "Kode Bank", key: "value" },
        { title: "Nama Bank", key: "name" },
      ];
      await SysExportData(bank_data, columns, "Bank");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card-body">
      <div className="row mb-3 justify-content-between">
        <div className="col-md-10">
          {" "}
          <Button onClick={() => handleExportBank()} type="primary">
            Download Bank
          </Button>{" "}
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
      {/* <div className="table-responsive"> */}
      <Table
        components={components}
        tableLayout="auto"
        scroll={{ x: "max-content" }}
        // className="table-container-responsive"
        rowClassName={() => "editable-row"}
        bordered
        pagination={false}
        dataSource={dataSource}
        columns={columns}
      />
      {/* </div> */}

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
  );
};

const AllowanceComponent = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const { showLoading, hideLoading } = useLoadingContext();
  const defaultColumns = [
    {
      title: "NIP",
      dataIndex: "employee_id",
      render: (val) =>
        employee_data.find((obj) => obj.id == val)?.employee_id ?? "",
      // width: "40%",
      editable: true,
    },
    {
      title: "Karyawan",
      // width: "40%",
      render: (val, rec) =>
        employee_data.find((obj) => obj.id == rec.employee_id)?.full_name ?? "",
      dataIndex: "employee_name",
      editable: false,
    },
    {
      // width: "40%",
      title: "Tipe",
      dataIndex: "tipe",
      render: (val, rec) =>
        allowance_data.find((obj) => obj.id == rec.component_name_id)?.type ??
        "",
      editable: false,
    },

    {
      title: "Tunjangan",
      dataIndex: "component_name_id",
      render: (val) => allowance_data.find((obj) => obj.id == val)?.name ?? "",
      // width: "40%",
      editable: true,
    },

    {
      // width: "40%",
      title: "Nominal",
      dataIndex: "ammount",
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
      row: EditableRowAllowance,
      cell: EditableCellAllowance,
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
      const response = await fetch(file_template.ALLOWANCE_TEMPLATE);
      const blob = await response.blob();
      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      element.download = "Template Multipleform Allowance.xlsx";
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
    };
    reader.readAsArrayBuffer(file);
  };

  const handleAddFromImport = (data) => {
    const nip = data["NIP"] ?? "";
    const employee_id =
      employee_data.find((val) => val.employee_id == nip)?.id ?? "";
    const newData = {
      key: count+ data.__rowNum__,
      employee_id: employee_id,
      component_name_id: data["ID Tunjangan"] ?? "",
      ammount: data["Nominal"] ?? "",
    };
    setDataSource((prev)=>[...prev, newData]);
    setCount(count + data.__rowNum__);
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
        const id = element.employee_id;
        console.log(allowance_data);
        const type =
          allowance_data.find((val) => val.id == element.component_name_id)
            .type ?? "";
        const resp = await providers_allowance.insertData(
          {
            allowance_type: type,
            component_name_id: element.component_name_id,
            ammount: element.ammount,
            is_taxable: false,
            is_final_tax: false,
          },
          id
        );
        handleDelete(element.key);
      } catch (error) {
        is_reject = true;
        console.log(error);
      }
      if (is_reject) {
        showToast({ message: "Somedata is rejected, please cek data" });
      } else {
        showToast({ message: "Data successfully insert", type: "success" });
        // navigate(-2);
      }
    }
    hideLoading();
  };
  const handleExportAllowance = async () => {
    try {
      const columns = [
        { title: "ID Tunjangan", key: "id" },
        { title: "Tipe Tunjangan", key: "type" },
        { title: "Tunjangan", key: "name" },
        { title: "Deskripsi", key: "description" },
      ];
      await SysExportData(allowance_data, columns, "Tunjangan");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card-body">
      <div className="row mb-3 justify-content-between">
        <div className="col-md-10">
          {" "}
          <Button onClick={() => handleExportAllowance()} type="primary">
            Download Tunjangan
          </Button>{" "}
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
        tableLayout="auto"
        scroll={{ x: "max-content" }}
        components={components}
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
  );
};

const DeductionComponent = () => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [dataSource_deduction, setDataSource_deduction] = useState([]);
  const [count_deduction, setCount_deduction] = useState(0);
  const handleDelete = (key) => {
    const newData = dataSource_deduction.filter((item) => item.key !== key);
    setDataSource_deduction(newData);
  };
  const { showLoading, hideLoading } = useLoadingContext();
  const defaultColumns = [
    {
      title: "NIP",
      dataIndex: "employee_id",
      render: (val) =>
        employee_data.find((obj) => obj.id == val)?.employee_id ?? "",
      // width: "40%",
      editable: true,
    },
    {
      title: "Karyawan",
      // width: "40%",
      render: (val, rec) =>
        employee_data.find((obj) => obj.id == rec.employee_id)?.full_name ?? "",
      dataIndex: "employee_name",
      editable: false,
    },

    {
      title: "Potongan",
      dataIndex: "component_name_id",
      render: (val) => deduction_data.find((obj) => obj.id == val)?.name ?? "",
      // width: "40%",
      editable: true,
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      width: "40%",
      editable: true,
    },

    {
      // width: "40%",
      title: "Nominal",
      dataIndex: "amount",
      editable: true,
    },
    {
      title: "Aksi",
      dataIndex: "action",
      render: (_, record) =>
        dataSource_deduction.length >= 1 ? (
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
    const newData = [...dataSource_deduction];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource_deduction(newData);
  };
  const components = {
    body: {
      row: EditableRowDeduction,
      cell: EditableCellDeduction,
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
      const response = await fetch(file_template.DEDUCTION_TEMPLATE);
      const blob = await response.blob();
      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      element.download = "Template Multipleform Deduction.xlsx";
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
      console.log(jsonData);
      jsonData.map((val) => handleAddFromImport(val));
    };
    reader.readAsArrayBuffer(file);
  };

  const handleAddFromImport = (data) => {
    const nip = data["NIP"] ?? "";
    const employee_id =
    employee_data.find((val) => val.employee_id == nip)?.id ?? "";
    const newData = {
      key: count_deduction + data.__rowNum__,
      employee_id: employee_id,
      component_name_id: data["ID Potongan"] ?? "",
      description: data["Deskripsi"] ?? "",
      amount: data["Nominal"] ?? "",
    };
    setDataSource_deduction((prev)=>[...prev, newData]);
    console.log(count_deduction+ data.__rowNum__);
    setCount_deduction(count_deduction + data.__rowNum__);
  };
  const handleClickImport = () => {
    fileInputRef.current.click();
  };
  const handleSubmit = async () => {
    showLoading();
    let is_reject = false;
    for (let index = 0; index < dataSource_deduction.length; index++) {
      try {
        const element = dataSource_deduction[index];
        const id = element.employee_id;
        const resp = await providers_deduction.insertData({
          component_name_id: element.component_name_id,
          amount: element.amount,
          description: element.description,
          employee_id: id,
        });
        handleDelete(element.key);
      } catch (error) {
        is_reject = true;
        console.log(error);
      }
      if (is_reject) {
        showToast({ message: "Somedata is rejected, please cek data" });
      } else {
        showToast({ message: "Data successfully insert", type: "success" });
        // navigate(-2);
      }
    }
    hideLoading();
  };
  const handleExportDeduction = async () => {
    try {
      const columns = [
        { title: "ID Potongan", key: "id" },
        { title: "Potongan", key: "name" },
        { title: "Deskripsi", key: "description" },
      ];
      await SysExportData(deduction_data, columns, "Potongan");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="card-body">
      <div className="row mb-3 justify-content-between">
        <div className="col-md-10">
          {" "}
          <Button onClick={() => handleExportDeduction()} type="primary">
            Download Potongan
          </Button>{" "}
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
        tableLayout="auto"
        scroll={{ x: "max-content" }}
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        pagination={false}
        dataSource={dataSource_deduction}
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
  );
};
const SalaryComponentMultipleForm = () => {
  const title = "Multipleform";

  return (
    <AdminDashboard label="">
      <section className="section">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3>{title}</h3>
          </div>
          <Tabs defaultActiveKey="1" className="m-2">
            <TabPane tab="Gaji" key="1">
              <SalaryComponent />
            </TabPane>
            <TabPane tab="Tunjangan" key="2">
              <AllowanceComponent />
            </TabPane>
            <TabPane tab="Potongan" key="3">
              <DeductionComponent />
            </TabPane>
          </Tabs>
        </div>
      </section>
    </AdminDashboard>
  );
};

export default SalaryComponentMultipleForm;
