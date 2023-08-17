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

const ReportOvertimeDetail = () => {
  const { employee_id } = useParams();
  const columns = [
    {
      title: "Nomor Lembur",
      dataIndex: "overtime_no",
      key: "overtime_no",
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Alasan",
      dataIndex: "reason",
      key: "reason",
    },

    {
      title: "Tanggal Masuk",
      dataIndex: "date_in",
      key: "date_in",
      render: (val) =>
        SysDateTransform({
          date: val,
          type: "short",
          withTime: false,
          lang: "in",
        }),
    },
    {
      title: "Tanggal Keluar",
      dataIndex: "date_out",
      key: "date_out",
      render: (val) =>
        SysDateTransform({
          date: val,
          type: "short",
          withTime: false,
          lang: "in",
        }),
    },

    {
      title: "Jam Masuk",
      dataIndex: "time_in",
      key: "time_in",
    },

    {
      title: "Jam Keluar",
      dataIndex: "time_out",
      key: "time_out",
    },

    {
      title: "Jam",
      dataIndex: "total_hours",
      key: "total_hours",
    },
  ];
  return (
    <AdminDashboard label="">
      <DataTablePaginationReportDetail
        fetchDataFunc={providers.overtime_reports_detail}
        columns={columns}
        employee_id={employee_id}
        withPeriode={true}
        title={sys_labels.menus.OVERTIME}
      />
    </AdminDashboard>
  );
};

export default ReportOvertimeDetail;
