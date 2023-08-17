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

const ReportImbursmentDetail = () => {
  const { employee_id } = useParams();
  const columns = [
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Tanggal Reimburst",
      dataIndex: "date",
      key: "date",
      render: (val) =>
        SysDateTransform({
          date: val,
          type: "short",
          withTime: false,
          lang: "in",
        }),
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
        fetchDataFunc={providers.reimbursements_reports_detail}
        columns={columns}
        employee_id={employee_id}
        withPeriode={true}
        title={sys_labels.menus.REIMBURS}
      />
    </AdminDashboard>
  );
};

export default ReportImbursmentDetail;
