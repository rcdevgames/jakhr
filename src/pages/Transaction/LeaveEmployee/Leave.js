import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/transaction/leave";
import {DataTablePaginantionFilter} from "../../../components/DataTable";
import { sys_labels } from "../../../utils/constants";
import { routes_name } from "../../../route/static_route";

const Leave = () => {
  const columns = [
    { title: "Name", dataIndex: "employee", key: "employee",render:(val,record)=>record.employee.name },
    { title: "Leave No", dataIndex: "leave_no", key: "leave_no" },
    { title: "Date", dataIndex: "leave_date", key: "leave_date" },
    { title: "Day", dataIndex: "amount", key: "amount",render:(val,record)=>val + ' Day' },
    { title: "Reason", dataIndex: "reason", key: "reason" },
    { title: "Approved", dataIndex: "is_approved", key: "is_approved",render:(val,record)=>val?'Yes':'No' },
    { title: "Rejected", dataIndex: "is_rejected", key: "is_rejected",render:(val,record)=>val?'Yes':'No' },
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
