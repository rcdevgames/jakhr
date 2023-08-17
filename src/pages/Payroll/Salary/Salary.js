import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import { pdf } from "@react-pdf/renderer";
import * as providers from "../../../providers/payroll/salary";
import DataTablePagination, {
  DataTablePaginationReport,
} from "../../../components/DataTable";
import { sys_labels } from "../../../utils/constants";
import { SysCurrencyTransform, showToast } from "../../../utils/global_store";
import { routes_name } from "../../../route/static_route";
import { useLoadingContext } from "../../../components/Loading";
import PayrollPdf from "../../PDF/payroll_pdf";
// import 
const Salary = () => {
  const navigate = useNavigate();
  const{showLoading,hideLoading}=useLoadingContext()
  const columns = [
    {
      title: "Karyawan",
      dataIndex: "full_name",
      key: "full_name",
      sortable: true,
    },

    {
      title: "NIP",
      dataIndex: "employee_id",
      key: "employee_id",
      sortable: true,
    },
    {
      title: "NPWP",
      dataIndex: "npwp",
      key: "npwp",
    },
    {
      title: "Periode",
      dataIndex: "periode",
      key: "periode",
    },
    {
      title: "Gaji Bersih",
      dataIndex: "final_salary",
      key: "final_salary",
      render: (val) => SysCurrencyTransform({ num: val, currency: "" }),
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() =>handlePrintPDF(val)}
            style={{ marginRight: 10 }}
            className="btn icon btn-primary btn-sm"
          >
            <i className="bi bi-printer"></i>
          </a>
        </div>
      ),
    },
  ];

  const action = [
    <Link
      to={routes_name.PAYROLL_SALARY_GENERATE}
      className="btn icon icon-left btn-primary"
    >
      <i className="bi bi-plus" /> Generate
    </Link>,
  ];

  const handlePrintPDF = async(id) => {
    showLoading();
    try {
      const resp = await providers.getDetailSalary(id);
      // console.log(resp.data);
      const data = resp.data.data;
      const details = resp.data.details;
      const periode = data.periode;
      let m_y_periode = periode.split("-");
      let total_add = 0;
      total_add += details?.base_salary ?? 0;
      total_add += details?.tax_paid_by_company ?? 0;
      total_add += details?.fix_allowances?.total ?? 0;
      total_add += details?.daily_allowances?.total ?? 0;
      total_add += details?.other_allowances?.total ?? 0;
      total_add += details?.overtimes ?? 0;
      total_add += details?.incentives?.total ?? 0;
      total_add += details?.not_fix_allowances?.total ?? 0;
      let total_reduce = 0;
      total_reduce += details?.tax ?? 0;
      total_reduce += details?.late_penalty ?? 0;
      total_reduce += details?.cash_advances?.total ?? 0;
      total_reduce += details?.fix_deductions?.total ?? 0;
      total_reduce += details?.not_fix_deductions?.total ?? 0;
      let final_data = {
        id: data?.id ?? "",
        employee_id: data?.employee?.employee_id ?? "",
        employee_name: data?.employee?.full_name ?? "",
        periode: data?.periode ?? "",
        final_salary: data?.final_salary ?? 0,
        value_to_add: {
          total_add: total_add,
          gaji_pokok: details?.base_salary ?? 0,
          total_attendance: details?.total_attendance ?? 0,
          total_workday_per_month: details?.total_workday_per_month ?? 0,
          tax_paid_by_company: details?.tax_paid_by_company ?? 0,
          tunjangan_tetap: details?.fix_allowances ?? { total: 0, details: [] },
          tunjangan_harian: details?.daily_allowances ?? {
            total: 0,
            details: [],
          },
          tunjangan_lainnya: details?.other_allowances ?? {
            total: 0,
            details: [],
          },
          lembur: details?.overtimes ?? 0,
          insentive_bonus: details?.incentives ?? { total: 0, details: [] },
          tunjangan_tidak_tetap: details?.not_fix_allowances ?? {
            total: 0,
            details: [],
          },
        },
        value_to_reduce: {
          total_reduce: total_reduce,
          pajak: details?.tax ?? 0,
          late_penalty: details?.late_penalty ?? 0,
          kasbon: details?.cash_advances ?? { total: 0, details: [] },
          asuransi: details?.insurances ?? {},
          fix_deduction: details?.fix_deductions ?? { total: 0, details: [] },
          not_fix_deduction: details?.not_fix_deductions ?? {
            total: 0,
            details: [],
          },
        },
        other_informations: {
          bank_name: "",
          bank_account: "",
        },
      };
    const pdfData = PayrollPdf(final_data, parseInt(m_y_periode[1])-1, parseInt(m_y_periode[0])); // Generate the PDF data
    const pdfBlob = await pdf(pdfData).toBlob(); // Convert to a PDF Blob

    // Open a new tab and display the PDF
    const fileURL = URL.createObjectURL(pdfBlob);
    window.open(fileURL, "_blank");
    } catch (error) {
      console.log(error);
      showToast({message:error.message})
    }
    hideLoading();
  };
  return (
    <AdminDashboard label="">
      <DataTablePaginationReport
        fetchDataFunc={providers.getListSalary}
        columns={columns}
        withExport={false}
        action={action}
        withPeriode={true}
        title={sys_labels.menus.SALARY}
        filters={[]}
      />
    </AdminDashboard>
  );
};

export default Salary;
