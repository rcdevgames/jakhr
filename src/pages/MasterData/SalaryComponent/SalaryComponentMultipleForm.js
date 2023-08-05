import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import { Button, Form, Input, Popconfirm, Table, Modal,Tabs } from "antd";
import convert from "../../../model/salaryModel";
import convert_employee from "../../../model/employeeModel";
import convert_overtime from "../../../model/overtimeModel";
import convert_late from "../../../model/lateModel";
import convert_allowance from "../../../model/allowanceModel";
import convert_deduction from "../../../model/deductionModel";
import convert_component from "../../../model/component_nameModel";
import * as providers from "../../../providers/payroll/salary";
import * as providers_employee from "../../../providers/master/employee";
import * as providers_component from "../../../providers/config/component_name";
import * as providers_late from "../../../providers/payroll/late";
import * as providers_overtime from "../../../providers/payroll/overtime";
import * as providers_allowance from "../../../providers/payroll/allowance";
import * as providers_deduction from "../../../providers/payroll/deduction";
import { useLoadingContext } from "../../../components/Loading";
import Select from "react-select";
import {
  SysCurrencyTransform,
  SysDateTransform,
  SysGenValueOption,
  SysReadData,
  showToast,
} from "../../../utils/global_store";
import { file_template, sys_labels, sys_path_data } from "../../../utils/constants";
import { Switch } from "antd";
import {
  disablePaste,
  onlyNumber,
  onlyNumberAndDot,
} from "../../../utils/validation";
import * as XLSX from "xlsx";
const { TabPane } = Tabs;

const SalaryComponentMultipleForm = () => {
  const downloadBank = () => {
    const data = SysReadData(sys_path_data.bank_data);
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(data);
    ws["B1"].v = "KODE";
    ws["A1"].v = "BANK NAME";
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Daftar Bank.xlsx");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  
  const downloadTemplatesComponent = async () => {
    try {
      const response = await fetch(file_template.SALARY_COMPONENT);
      const blob = await response.blob();
      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      element.download = "Template Allowance.xlsx";
      document.body.appendChild(element);
      element.click();
    } catch (error) {}
  };
  return (
    <AdminDashboard label="">
      <section className="section">
        <button onClick={() => downloadBank()} className="btn btn-primary mt-4">
          Download Daftar Kode Bank
        </button>
      </section>
    </AdminDashboard>
  );
};

export default SalaryComponentMultipleForm;
