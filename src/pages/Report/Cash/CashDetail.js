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

const ReportCashAdvanceDetail = () => {
  const { employee_id } = useParams();
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
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
      render: (val) => SysCurrencyTransform({ num: val, currency: "" }),
    },
    {
      title: "Tanggal Hutang",
      dataIndex: "cash_date",
      key: "cash_date",
      render: (val) =>
        SysDateTransform({
          date: val,
          type: "short",
          withTime: false,
          lang: "in",
        }),
    },
    {
      title: "Tanggal Bayar",
      dataIndex: "due_date",
      key: "due_date",
      render: (val) =>
        SysDateTransform({
          date: val,
          type: "short",
          withTime: false,
          lang: "in",
        }),
    },
  ];
  return (
    <AdminDashboard label="">
      <DataTablePaginationReportDetail
        fetchDataFunc={providers.cash_advances_reports_detail}
        columns={columns}
        employee_id={employee_id}
        withPeriode={true}
        title={sys_labels.menus.CASH_ADVANCE}
      />
    </AdminDashboard>
  );
};

export default ReportCashAdvanceDetail;
