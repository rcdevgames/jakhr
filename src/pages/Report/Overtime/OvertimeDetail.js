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
      title: "Overtime Number",
      dataIndex: "overtime_no",
      key: "overtime_no",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },

    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },

    {
      title: "Date In",
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
      title: "Date Out",
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
      title: "Time In",
      dataIndex: "time_in",
      key: "time_in",
    },

    {
      title: "Time Out",
      dataIndex: "time_out",
      key: "time_out",
    },

    {
      title: "Hours",
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
