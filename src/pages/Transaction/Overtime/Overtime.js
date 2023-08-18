import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/transaction/overtime";
import {DataTablePaginantionFilter} from "../../../components/DataTable";
import { sys_labels } from "../../../utils/constants";
import { routes_name } from "../../../route/static_route";

const Overtime = () => {
  const columns = [
    { title: "Karyawan", dataIndex: "employee", key: "employee",render:(val,record)=>record.employee.name },
    { title: "Nomor Lembur", dataIndex: "overtime_no", key: "overtime_no",sortable:true },
    { title: "Alasan", dataIndex: "reason", key: "reason",sortable:true },
    { title: "Approve", dataIndex: "is_approved", key: "is_approved"},
    { title: "Reject", dataIndex: "is_rejected", key: "is_rejected"},
    { title: "Tanggal Kehadiran", dataIndex: "attendance", key: "attendance",render:(val,record)=>record.attendance.date_in },
   
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
