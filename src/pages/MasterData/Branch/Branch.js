import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import DataTablePagination from "../../../components/DataTable";
import * as branch_providers from "../../../providers/branch";

const Branch = () => {
  const log_data=(val)=>{
    console.log(val);
  }
  const columns = [
    { title: "Branch", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Radius", dataIndex: "radius", key: "radius" },
    { title: "Primary Phone", dataIndex: "primary_phone", key: "primary_phone" },
    {
      title: "Secondary Phone",
      dataIndex: "secondary_phone",
      key: "secondary_phone",
    },
    { title: "Created Date", dataIndex: "created_at", key: "created_at" },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (val) => (
        <div className="btn-group" role="group">
          <a onClick={()=>log_data(val)} style={{marginRight:10}} className="btn icon btn-primary btn-sm">
            <i className="bi bi-file-text"></i>
          </a>
          <a href="#0" className="btn icon btn-danger btn-sm">
            <i className="bi bi-trash"></i>
          </a>
        </div>
      ),
    },
  ];
  const action = [
    <Link
      to="/master-data/branch/create"
      className="btn icon icon-left btn-primary"
    >
      <i className="bi bi-plus" /> Tambah
    </Link>,
  ];
  return (
    <AdminDashboard label="">
      <DataTablePagination
        fetchDataFunc={branch_providers.getData}
        columns={columns}
        title="Cabang"
        action={action}
      />
    </AdminDashboard>
  );
};

export default Branch;
