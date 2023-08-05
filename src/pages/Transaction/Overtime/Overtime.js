import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/transaction/overtime";
import {DataTablePaginantionFilter} from "../../../components/DataTable";
import { sys_labels } from "../../../utils/constants";
import { routes_name } from "../../../route/static_route";

const Overtime = () => {
  const columns = [
    { title: "Name", dataIndex: "employee", key: "employee",render:(val,record)=>record.employee.name },
    { title: "Overtime No", dataIndex: "overtime_no", key: "overtime_no" },
    { title: "Reason", dataIndex: "reason", key: "reason" },
    { title: "Approve", dataIndex: "is_approved", key: "is_approved",render:(val,record)=>record.is_approved?'APPROVED':"NO APPROVED" },
    { title: "Reject", dataIndex: "is_rejected", key: "is_rejected",render:(val,record)=>record.is_rejected?'REJECTED':"NO REJECTED" },
    { title: "Date Attendance", dataIndex: "attendance", key: "attendance",render:(val,record)=>record.attendance.date_in },
   
  ];
  const action = [
    <Link
      to={routes_name.TRANSAC_OVERTIME_CREATE}
      className="btn icon icon-left btn-primary"
    >
      <i className="bi bi-plus" /> Tambah
    </Link>,
  ];

  return (
    <AdminDashboard label="">
      <DataTablePaginantionFilter
        fetchDataFunc={providers.getData}
        columns={columns}
        title={sys_labels.menus.OVERTIME}
        action={action}
      />
    </AdminDashboard>
  );
};

export default Overtime;