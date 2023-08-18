import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/transaction/leave";
import {DataTablePaginantionFilter} from "../../../components/DataTable";
import { sys_labels } from "../../../utils/constants";
import { routes_name } from "../../../route/static_route";
import { SysDateTransform } from "../../../utils/global_store";

const Leave = () => {
  // SysDateTransform
  const columns = [
    { title: "Karyawan", dataIndex: "employee", key: "employee",render:(val,record)=>record.employee.name },
    { title: "Tipe Cuti", dataIndex: "leave_type", key: "leave_type",render:(val,record)=>record.leave_type.name },
    { title: "Nomor Cuti", dataIndex: "leave_no", key: "leave_no",sortable:true },
    { title: "Tanggal Cuti", dataIndex: "leave_date", key: "leave_date",sortable: true,render:(val)=>SysDateTransform({date:val,checkIsToDay:true,withTime:false,type:'long',lang:'in'}) },
    { title: "Hari", dataIndex: "amount", key: "amount",render:(val,record)=>val + ' Hari',sortable:true },
    { title: "Alasan", dataIndex: "reason", key: "reason",sortable:true },
    { title: "Approved", dataIndex: "is_approved", key: "is_approved" },
    { title: "Rejected", dataIndex: "is_rejected", key: "is_rejected" },
  ];
  const action = [
    <Link
      to={routes_name.TRANSAC_LEAVE_CREATE}
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
        title={sys_labels.menus.LEAVE}
        action={action}
      />
    </AdminDashboard>
  );
};

export default Leave;
