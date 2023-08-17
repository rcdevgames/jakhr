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

const ReportLeaveDetail = () => {
  const { employee_id } = useParams();
  const columns = [
    {
      title: "Tipe Cuti",
      dataIndex: "leave_type_name",
      key: "leave_type_name",
    },
    {
      title: "Nomor Cuti",
      dataIndex: "leave_no",
      key: "leave_no",
    },
    {
      title: "Alasan",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Tanggal Cuti",
      dataIndex: "leave_date",
      key: "leave_date",
      render: (val) =>
        SysDateTransform({
          date: val,
          type: "short",
          withTime: false,
          lang: "in",
        }),
    },

    {
      title: "Hari",
      dataIndex: "amount",
      key: "amount"
    },

  ];
  return (
    <AdminDashboard label="">
      <DataTablePaginationReportDetail
        fetchDataFunc={providers.leaves_reports_detail}
        columns={columns}
        employee_id={employee_id}
        withPeriode={true}
        title={sys_labels.menus.LEAVE}
      />
    </AdminDashboard>
  );
};

export default ReportLeaveDetail;
