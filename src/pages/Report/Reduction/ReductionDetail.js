import { Link, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/report/global";
import DataTablePagination, {
  DataTablePaginationReportDetail,
} from "../../../components/DataTable";
import { sys_labels } from "../../../utils/constants";
import {
  SysCurrencyTransform,
  SysDateTransform,
} from "../../../utils/global_store";

const ReportReductionDetail = () => {
  const { employee_id } = useParams();
  const columns = [
    {
      title: "Potogan",
      dataIndex: "deduction_name",
      key: "deduction_name",
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Nominal",
      dataIndex: "amount",
      key: "amount",
      render:(val)=>SysCurrencyTransform({num:val,currency:""})
    },

  ];
  return (
    <AdminDashboard label="">
      <DataTablePaginationReportDetail
        fetchDataFunc={providers.deductions_reports_detail}
        columns={columns}
        employee_id={employee_id}
        withPeriode={true}
        title={sys_labels.menus.DEDUCTION}
      />
    </AdminDashboard>
  );
};

export default ReportReductionDetail;
