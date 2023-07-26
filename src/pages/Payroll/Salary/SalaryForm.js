import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/salaryModel";
import convert_employee from "../../../model/employeeModel";
import * as providers from "../../../providers/payroll/salary";
import * as providers_employee from "../../../providers/master/employee";
import {
  SysCurrencyTransform,
  SysDateTransform,
  showToast,
} from "../../../utils/global_store";
import { Tabs, Form, Popconfirm, Input, Table, Button } from "antd";
import { disablePaste, onlyNumber } from "../../../utils/validation";
import "./styles.css";
import { file_template, sys_labels } from "../../../utils/constants";
import * as XLSX from "xlsx";
import { useRef } from "react";

import { pdf } from "@react-pdf/renderer";
import PayrollPdf from "../../PDF/payroll_pdf";
const { TabPane } = Tabs;
const { Item } = Form;

const SalaryForm = () => {
  const navigate = useNavigate();
  const title = `${sys_labels.action.FORM} Payroll`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    // setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const [employee_data, set_employee_data] = useState(
    convert_employee.listOfemployeeModel([])
  );
  useEffect(() => {
    getEmployee();
  }, []);
  const getEmployee = async () => {
    try {
      const resp = await providers_employee.getDataHasComponent(1, 99999999, "");
      set_employee_data(resp.data.data);
    } catch (error) {
      showToast({ message: error.message });
    }
  };
  const handleGenerate = async () => {
    try {
      const date = new Date();
      let payroll = [];
      employee_data.map((val_employee) => {
        let emp_allowance = [];
        let emp_deduction = [];
        let emp_incentive = [];
        incentive_data.map((val_incentive) => {
          if (val_incentive.employee_id == val_employee.employee_id) {
            emp_incentive.push({
              amount: val_incentive.amount,
              description: val_incentive.description,
              total_tax: 0,
              date: SysDateTransform({
                date: date,
                withTime: false,
                forSql: true,
              }),
            });
          }
        });
        allowance_data.map((val_allowance) => {
          if (val_allowance.employee_id == val_employee.employee_id) {
            emp_allowance.push({
              amount: val_allowance.amount,
              description: val_allowance.description,
              total_tax: 0,
              date: SysDateTransform({
                date: date,
                withTime: false,
                forSql: true,
              }),
            });
          }
        });
        deduction_data.map((val_deduction) => {
          if (val_deduction.employee_id == val_employee.employee_id) {
            emp_deduction.push({
              amount: val_deduction.amount,
              description: val_deduction.description,
              total_tax: 0,
              date: SysDateTransform({
                date: date,
                withTime: false,
                forSql: true,
              }),
            });
          }
        });
          payroll.push({
            employee_id: val_employee.employee_id,
            components: {
              allowances: emp_allowance,
              incentives: emp_incentive,
              deductions: emp_deduction,
            },
          });
      });
      const resp = await providers.generateData(payroll);
      set_payroll_data(resp.data);
      // const resp = await providers.insertData({
      //   leave_name: data.leave_name,
      //   leave_date: SysDateTransform({
      //     date: data.leave_date,
      //     withTime: false,
      //     forSql: true,
      //   }),
      // });
      // showToast({ message: resp.message, type: "success" });
      // navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
  };
  const [key_allowance, set_key_allowance] = useState(0);
  const [edit_key_allowance, set_edit_key_allowance] = useState("");
  const [allowance_file, set_allowance_file] = useState(null);
  const [allowance_data, set_allowance_data] = useState([]);
  const is_editing_allowance = (record) => record.id === edit_key_allowance;
  const allowanceRef = useRef(null);
  const handleInputChangeAllowance = (e, key, dataIndex) => {
    const updatedData = allowance_data.map((item) =>
      item.id === key ? { ...item, [dataIndex]: e.target.value } : item
    );
    set_allowance_data(updatedData);
  };
  const handleAddRowAllowance = (data) => {
    if (data) {
      let index_total = 1;
      let new_data = [];
      data.map((val, index) => {
        const newData = {
          id: index + 1 + key_allowance,
          employee_id: val["Employee Id"] ?? "",
          full_name: "",
          description: val["Nama Tunjangan"] ?? "",
          amount: val["Nominal"] ?? 0,
        };
        new_data.push(newData);
        index_total++;
      });
      set_allowance_data([...allowance_data, ...new_data]);
      set_key_allowance(key_allowance + index_total);
    } else {
      const newData = {
        id: key_allowance,
        employee_id: "",
        full_name: "",
        description: "",
        amount: 0,
      };
      set_allowance_data([...allowance_data, newData]);
      set_key_allowance(key_allowance + 1);
      set_edit_key_allowance(key_allowance);
    }
  };
  const handleDeleteAllowance = async (id) => {
    const newData = [...allowance_data];
    const index = newData.findIndex((val) => val.id == id);
    newData.splice(index, 1);
    set_allowance_data(newData);
  };
  const handleImportAllowance = (event) => {
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
      handleAddRowAllowance(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };
  const downloadTemplatesAllowance = async () => {
    try {
      const response = await fetch(file_template.ALLOWANCE);
      const blob = await response.blob();
      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      element.download = "Template Allowance.xlsx";
      document.body.appendChild(element);
      element.click();
    } catch (error) {}
  };

  const handleClickImportAllowance = () => {
    allowanceRef.current.click();
  };
  const columns_allowance = [
    {
      title: "Employee Id",
      dataIndex: "employee_id",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_allowance(record);
        return !is_edit ? (
          record.employee_id
        ) : (
          <select
            className="form-select"
            id="employee_id"
            name="employee_id"
            value={record.employee_id}
            onChange={(e) =>
              handleInputChangeAllowance(e, record.id, "employee_id")
            }
            aria-label="Nama Tunjangan"
            required
          >
            <option value={null}>Pilih Karyawan</option>
            {employee_data.map((option, index) => (
              <option key={index} value={option.employee_id}>
                {option.employee_id} - {option.full_name}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      title: "Nama",
      dataIndex: "full_name",
      render: (val, record) => {
        const full_name = employee_data.find(
          (val) => val.employee_id === record.employee_id
        );
        return full_name?.full_name ?? "";
      },
    },
    {
      title: "Nama Tunjangan",
      dataIndex: "description",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_allowance(record);
        return !is_edit ? (
          record.description
        ) : (
          <Input
            value={val}
            onChange={(e) =>
              handleInputChangeAllowance(e, record.id, "description")
            }
          />
        );
      },
    },
    {
      title: "Nominal",
      dataIndex: "amount",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_allowance(record);
        return !is_edit ? (
          record.amount
        ) : (
          <Input
            value={val}
            onKeyDown={onlyNumber}
            onPaste={disablePaste}
            onChange={(e) => handleInputChangeAllowance(e, record.id, "amount")}
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const is_edit = is_editing_allowance(record);
        return !is_edit ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDeleteAllowance(record.id)}
          >
            <a className="btn icon btn-danger btn-sm">
              <i className="bi bi-trash"></i>
            </a>
          </Popconfirm>
        ) : (
          <a
            className="btn icon btn-primary btn-sm"
            onClick={() => {
              set_edit_key_allowance("");
            }}
          >
            <i className="bi bi-check"></i>
          </a>
        );
      },
    },
  ];

  const [key_deduction, set_key_deduction] = useState(0);
  const [edit_key_deduction, set_edit_key_deduction] = useState("");
  const [deduction_file, set_deduction_file] = useState(null);
  const [deduction_data, set_deduction_data] = useState([]);
  const is_editing_deduction = (record) => record.id === edit_key_deduction;
  const deductionRef = useRef(null);
  const handleInputChangeDeduction = (e, key, dataIndex) => {
    const updatedData = deduction_data.map((item) =>
      item.id === key ? { ...item, [dataIndex]: e.target.value } : item
    );
    set_deduction_data(updatedData);
  };
  const handleAddRowDeduction = (data) => {
    // const key = index?
    if (data) {
      let index_total = 1;
      let new_data = [];
      data.map((val, index) => {
        const newData = {
          id: index + 1 + key_allowance,
          employee_id: val["Employee Id"] ?? "",
          full_name: "",
          description: val["Nama Potongan"] ?? "",
          amount: val["Nominal"] ?? 0,
        };
        new_data.push(newData);
        index_total++;
      });
      set_deduction_data([...deduction_data, ...new_data]);
      set_key_deduction(key_deduction + index_total);
    } else {
      const newData = {
        id: key_allowance,
        employee_id: "",
        full_name: "",
        description: "",
        amount: 0,
      };
      set_deduction_data([...deduction_data, newData]);
      set_edit_key_deduction(key_deduction);
      set_key_deduction(key_deduction + 1);
    }
  };
  const handleDeleteDeduction = async (id) => {
    const newData = [...deduction_data];
    const index = newData.findIndex((val) => val.id == id);
    newData.splice(index, 1);
    set_deduction_data(newData);
  };
  const handleImportDeduction = (event) => {
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
      handleAddRowDeduction(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };
  const downloadTemplatesDeduction = async () => {
    try {
      const response = await fetch(file_template.DEDUCTION);
      const blob = await response.blob();
      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      element.download = "Template Potongan.xlsx";
      document.body.appendChild(element);
      element.click();
    } catch (error) {}
  };

  const handleClickImportDeduction = () => {
    deductionRef.current.click();
  };
  const columns_deduction = [
    {
      title: "Employee Id",
      dataIndex: "employee_id",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_deduction(record);
        return !is_edit ? (
          record.employee_id
        ) : (
          <select
            className="form-select"
            id="employee_id"
            name="employee_id"
            value={record.employee_id}
            onChange={(e) =>
              handleInputChangeDeduction(e, record.id, "employee_id")
            }
            aria-label="Nama Karyawan"
            required
          >
            <option value={null}>Pilih Karyawan</option>

            {employee_data.map((option, index) => (
              <option key={index} value={option.employee_id}>
                {option.employee_id} - {option.full_name}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      title: "Nama",
      dataIndex: "full_name",
      render: (val, record) => {
        const full_name = employee_data.find(
          (val) => val.employee_id === record.employee_id
        );
        return full_name?.full_name ?? "";
      },
    },
    {
      title: "Nama Potongan",
      dataIndex: "description",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_deduction(record);
        return !is_edit ? (
          record.description
        ) : (
          <Input
            value={val}
            onChange={(e) =>
              handleInputChangeDeduction(e, record.id, "description")
            }
          />
        );
      },
    },
    {
      title: "Nominal",
      dataIndex: "amount",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_deduction(record);
        return !is_edit ? (
          record.amount
        ) : (
          <Input
            value={val}
            onKeyDown={onlyNumber}
            onPaste={disablePaste}
            onChange={(e) => handleInputChangeDeduction(e, record.id, "amount")}
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const is_edit = is_editing_deduction(record);
        return !is_edit ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDeleteDeduction(record.id)}
          >
            <a className="btn icon btn-danger btn-sm">
              <i className="bi bi-trash"></i>
            </a>
          </Popconfirm>
        ) : (
          <a
            className="btn icon btn-primary btn-sm"
            onClick={() => {
              set_edit_key_deduction("");
            }}
          >
            <i className="bi bi-check"></i>
          </a>
        );
      },
    },
  ];

  const [key_incentive, set_key_incentive] = useState(0);
  const [edit_key_incentive, set_edit_key_incentive] = useState("");
  const [incentive_file, set_incentive_file] = useState(null);
  const [incentive_data, set_incentive_data] = useState([]);
  const is_editing_incentive = (record) => record.id === edit_key_incentive;
  const incentiveRef = useRef(null);
  const handleInputChangeIncentive = (e, key, dataIndex) => {
    const updatedData = incentive_data.map((item) =>
      item.id === key ? { ...item, [dataIndex]: e.target.value } : item
    );
    set_incentive_data(updatedData);
  };
  const handleAddRowIncentive = (data) => {
    // const key = index?
    if (data) {
      let index_total = 1;
      let new_data = [];
      data.map((val, index) => {
        const newData = {
          id: index + 1 + key_incentive,
          employee_id: val["Employee Id"] ?? "",
          full_name: "",
          description: val["Nama Insentif"] ?? "",
          amount: val["Nominal"] ?? 0,
        };
        new_data.push(newData);
        index_total++;
      });
      set_incentive_data([...incentive_data, ...new_data]);
      set_key_incentive(key_incentive + index_total);
    } else {
      const newData = {
        id: key_incentive,
        employee_id: "",
        full_name: "",
        description: "",
        amount: 0,
      };
      set_incentive_data([...incentive_data, newData]);
      set_edit_key_incentive(key_incentive);
      set_key_incentive(key_incentive + 1);
    }
  };
  const handleDeleteIncentive = async (id) => {
    const newData = [...incentive_data];
    const index = newData.findIndex((val) => val.id == id);
    newData.splice(index, 1);
    set_incentive_data(newData);
  };
  const handleImportIncentive = (event) => {
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
      handleAddRowIncentive(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };
  const downloadTemplatesIncentive = async () => {
    try {
      const response = await fetch(file_template.ICENTIVE);
      const blob = await response.blob();
      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      element.download = "Template Insentif.xlsx";
      document.body.appendChild(element);
      element.click();
    } catch (error) {}
  };

  const handleClickImportIncentive = () => {
    incentiveRef.current.click();
  };
  const columns_incentive = [
    {
      title: "Employee Id",
      dataIndex: "employee_id",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_incentive(record);
        return !is_edit ? (
          record.employee_id
        ) : (
          <select
            className="form-select"
            id="employee_id"
            name="employee_id"
            value={record.employee_id}
            onChange={(e) =>
              handleInputChangeIncentive(e, record.id, "employee_id")
            }
            aria-label="Nama"
            required
          >
            <option value={null}>Pilih Karyawan</option>

            {employee_data.map((option, index) => (
              <option key={index} value={option.employee_id}>
                {option.employee_id} - {option.full_name}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      title: "Nama",
      dataIndex: "full_name",
      render: (val, record) => {
        const full_name = employee_data.find(
          (val) => val.employee_id === record.employee_id
        );
        return full_name?.full_name ?? "";
      },
    },
    {
      title: "Nama Insentif",
      dataIndex: "description",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_incentive(record);
        return !is_edit ? (
          record.description
        ) : (
          <Input
            value={val}
            onChange={(e) =>
              handleInputChangeIncentive(e, record.id, "description")
            }
          />
        );
      },
    },
    {
      title: "Nominal",
      dataIndex: "amount",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_incentive(record);
        return !is_edit ? (
          record.amount
        ) : (
          <Input
            value={val}
            onKeyDown={onlyNumber}
            onPaste={disablePaste}
            onChange={(e) => handleInputChangeIncentive(e, record.id, "amount")}
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const is_edit = is_editing_incentive(record);
        return !is_edit ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDeleteIncentive(record.id)}
          >
            <a className="btn icon btn-danger btn-sm">
              <i className="bi bi-trash"></i>
            </a>
          </Popconfirm>
        ) : (
          <a
            className="btn icon btn-primary btn-sm"
            onClick={() => {
              set_edit_key_incentive("");
            }}
          >
            <i className="bi bi-check"></i>
          </a>
        );
      },
    },
  ];

  const [key_payroll, set_key_payroll] = useState(0);
  const [edit_key_payroll, set_edit_key_payroll] = useState("");
  const [payroll_file, set_payroll_file] = useState(null);
  const [payroll_data, set_payroll_data] = useState([]);
  const payrollRef = useRef(null);
  const columns_payroll = [
    {
      title: "Employee Id",
      dataIndex: "employee_id",
      width: 200,
      render: (val, record) => {
        const is_edit = is_editing_allowance(record);
        return <p style={{ minWidth: "150px" }}>{record.employee_id}</p>;
      },
    },
    {
      title: "Nama",
      width: 200,
      dataIndex: "employee_name",
      render: (val, record) => {
        return <p style={{ minWidth: "150px" }}>{record.employee_name}</p>;
      },
    },

    {
      title: "Gaji",
      dataIndex: "final_salary",
      width: 200,
      render: (val, record) => {
        return (
          <p style={{ minWidth: "150px" }}>
            {SysCurrencyTransform({ num: record.final_salary })}
          </p>
        );
      },
    },
    {
      title: "Gaji Pokok",
      dataIndex: "value_to_add",
      width: 200,
      render: (val, record) => {
        return (
          <p style={{ minWidth: "150px" }}>
            {SysCurrencyTransform({ num: record.value_to_add.gaji_pokok })}
          </p>
        );
      },
    },
    {
      title: "Tunjangan Tetap",
      dataIndex: "value_to_add",
      width: 200,
      render: (val, record) => {
        return (
          <p style={{ minWidth: "150px" }}>
            {SysCurrencyTransform({
              num: record.value_to_add.tunjangan_tetap,
            })}
          </p>
        );
      },
    },
    {
      title: "Tunjangan Harian",
      dataIndex: "value_to_add",
      width: 200,
      render: (val, record) => {
        return (
          <p style={{ minWidth: "150px" }}>
            {SysCurrencyTransform({
              num: record.value_to_add.tunjangan_harian,
            })}
          </p>
        );
      },
    },
    {
      title: "Lembur",
      dataIndex: "value_to_add",
      render: (val, record) => {
        return (
          <p style={{ minWidth: "150px" }}>
            {SysCurrencyTransform({
              num: record.value_to_add.lembur,
            })}
          </p>
        );
      },
    },
    {
      title: "Insentif",
      dataIndex: "value_to_add",
      render: (val, record) => {
        return (
          <p style={{ minWidth: "150px" }}>
            {SysCurrencyTransform({
              num: record.value_to_add.insentive_bonus,
            })}
          </p>
        );
      },
    },
    {
      title: "Tunjangan Tidak Tetap",
      dataIndex: "value_to_add",
      render: (val, record) => {
        return (
          <p style={{ minWidth: "150px" }}>
            {SysCurrencyTransform({
              num: record.value_to_add.tunjangan_tidak_tetap,
            })}
          </p>
        );
      },
    },

    {
      title: "Pajak",
      dataIndex: "value_to_reduce",
      render: (val, record) => {
        return (
          <p style={{ minWidth: "150px" }}>
            {SysCurrencyTransform({
              num: record.value_to_reduce.pajak,
            })}
          </p>
        );
      },
    },
    {
      title: "Terlambat",
      dataIndex: "value_to_reduce",
      render: (val, record) => {
        return (
          <p style={{ minWidth: "150px" }}>
            {SysCurrencyTransform({
              num: record.value_to_reduce.late_penalty,
            })}
          </p>
        );
      },
    },
    {
      title: "JHT",
      dataIndex: "value_to_reduce",
      render: (val, record) => {
        return (
          <p style={{ minWidth: "150px" }}>
            {SysCurrencyTransform({
              num: record.value_to_reduce.asuransi.jht,
            })}
          </p>
        );
      },
    },
    {
      title: "Kesehatan",
      dataIndex: "value_to_reduce",
      render: (val, record) => {
        return (
          <p style={{ minWidth: "150px" }}>
            {SysCurrencyTransform({
              num: record.value_to_reduce.asuransi.kesehatan,
            })}
          </p>
        );
      },
    },
    {
      title: "Asuransi Lain",
      dataIndex: "value_to_reduce",
      render: (val, record) => {
        return (
          <p style={{ minWidth: "150px" }}>
            {SysCurrencyTransform({
              num: record.value_to_reduce.asuransi.other_insurance,
            })}
          </p>
        );
      },
    },
    {
      title: "Potongan Tetap",
      dataIndex: "value_to_reduce",
      render: (val, record) => {
        return (
          <p style={{ minWidth: "150px" }}>
            {SysCurrencyTransform({
              num: record.value_to_reduce.fix_deduction,
            })}
          </p>
        );
      },
    },
    {
      title: "Potongan Tidak Tetap",
      dataIndex: "value_to_reduce",
      render: (val, record) => {
        return (
          <p style={{ minWidth: "150px" }}>
            {SysCurrencyTransform({
              num: record.value_to_reduce.no_fix_deduction,
            })}
          </p>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (val, record) => {
        return (
          <a
            className="btn icon btn-primary btn-sm"
            onClick={() => {
              handleOpenPDF(record);
            }}
          >
            <i className="bi bi-file"></i>
          </a>
        );
      },
    },
  ];
  const handleOpenPDF = async (record) => {
    const pdfData = PayrollPdf(record); // Generate the PDF data
    const pdfBlob = await pdf(pdfData).toBlob(); // Convert to a PDF Blob

    // Open a new tab and display the PDF
    const fileURL = URL.createObjectURL(pdfBlob);
    window.open(fileURL, "_blank");
  };
  return (
    <AdminDashboard label="">
      <section className="section">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3>{title}</h3>

            <button onClick={handleGenerate} className="btn btn-primary">
              {/* <button onClick={handleOpenPDF} className="btn btn-primary"> */}
              Generate
            </button>
          </div>
          <div className="card-body">
            <div className="row mt-3">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Tunjangan" key="1">
                  <div className="row">
                    <div className="col-md-3">
                      <Button
                        onClick={downloadTemplatesAllowance}
                        type="primary"
                      >
                        Download Templates
                      </Button>
                    </div>

                    <div className="col-md-3">
                      <Button
                        onClick={handleClickImportAllowance}
                        type="primary"
                      >
                        Import File
                      </Button>
                      <input
                        type="file"
                        ref={allowanceRef}
                        style={{ display: "none" }}
                        onChange={handleImportAllowance}
                      ></input>
                    </div>
                  </div>
                  <Table
                    pagination={false}
                    dataSource={allowance_data}
                    columns={columns_allowance}
                  />
                  <Button
                    onClick={() => handleAddRowAllowance(null)}
                    className="btn btn-sm btn-primary mt-4"
                    style={{ borderRadius: 100 }}
                  >
                    <i className="bi bi-plus"></i>
                  </Button>
                </TabPane>
                <TabPane tab="Potongan" key="2">
                  <div className="row">
                    <div className="col-md-3">
                      <Button
                        onClick={downloadTemplatesDeduction}
                        type="primary"
                      >
                        Download Templates
                      </Button>
                    </div>

                    <div className="col-md-3">
                      <Button
                        onClick={handleClickImportDeduction}
                        type="primary"
                      >
                        Import File
                      </Button>
                      <input
                        type="file"
                        ref={deductionRef}
                        style={{ display: "none" }}
                        onChange={handleImportDeduction}
                      ></input>
                    </div>
                  </div>
                  <Table
                    pagination={false}
                    dataSource={deduction_data}
                    columns={columns_deduction}
                  />
                  <Button
                    onClick={() => handleAddRowDeduction(null)}
                    className="btn btn-sm btn-primary mt-4"
                    style={{ borderRadius: 100 }}
                  >
                    <i className="bi bi-plus"></i>
                  </Button>
                </TabPane>
                <TabPane tab="Insentif" key="3">
                  <div className="row">
                    <div className="col-md-3">
                      <Button
                        onClick={downloadTemplatesIncentive}
                        type="primary"
                      >
                        Download Templates
                      </Button>
                    </div>

                    <div className="col-md-3">
                      <Button
                        onClick={handleClickImportIncentive}
                        type="primary"
                      >
                        Import File
                      </Button>
                      <input
                        type="file"
                        ref={incentiveRef}
                        style={{ display: "none" }}
                        onChange={handleImportIncentive}
                      ></input>
                    </div>
                  </div>
                  <Table
                    pagination={false}
                    dataSource={incentive_data}
                    columns={columns_incentive}
                  />
                  <Button
                    onClick={() => handleAddRowIncentive(null)}
                    className="btn btn-sm btn-primary mt-4"
                    style={{ borderRadius: 100 }}
                  >
                    <i className="bi bi-plus"></i>
                  </Button>
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>

        {payroll_data.length > 0 ? (
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h3>Payroll</h3>
            </div>
            <div className="card-body">
              <div className="row mt-3">
                <Table
                  pagination={false}
                  className="overflow-scroll"
                  dataSource={payroll_data}
                  columns={columns_payroll}
                />
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </AdminDashboard>
  );
};

export default SalaryForm;
