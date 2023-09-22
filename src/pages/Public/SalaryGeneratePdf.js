import { Link, useParams,useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import * as providers from "../../providers/payroll/salary";
import { useLoadingContext } from "../../components/Loading";
import PayrollPdf from "../PDF/payroll_pdf";
// import 
const GenerateSalaryPdf = () => {
    function useQuery() {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
      }
    const query=useQuery();
  const{showLoading,hideLoading}=useLoadingContext()

  const handlePrintPDF = async() => {
    showLoading();
    try {
        console.log(query.get('id_payroll'),query.get('token'));
      const resp = await providers.getDetailSalaryPublic(query.get('id_payroll'),query.get('token'));
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
    const pdfData = PayrollPdf(final_data, parseInt(m_y_periode[1])-1, parseInt(m_y_periode[0]),query.get('token')); // Generate the PDF data
    const pdfBlob = await pdf(pdfData).toBlob(); // Convert to a PDF Blob

    // Open a new tab and display the PDF
    const fileURL = URL.createObjectURL(pdfBlob);
    window.open(fileURL);
    } catch (error) {
      console.log(error);
    //   showToast({message:error.message})
    }
    hideLoading();
  };
  useEffect(()=>{
    handlePrintPDF()
  },[])
  return (
    <div></div>
  );
};

export default GenerateSalaryPdf;
