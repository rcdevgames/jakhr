import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/master/menu";
import DataTablePagination from "../../../components/DataTable";
import { useNavigate } from "react-router-dom";
import { routes_name } from "../../../route/static_route";
import { sys_labels } from "../../../utils/constants";
import { SysDateTransform } from "../../../utils/global_store";

const Menu = () => {
  const navigate = useNavigate();
  const columns = [
    { title: "Title", dataIndex: "title", key: "title" , sortable: true},
    { title: "Route", dataIndex: "route", key: "route", sortable: true },
    // { title: "Created Date", dataIndex: "created_at", key: "created_at" },
// SysDateTransform
{ title: "Created Date", sortable: true, dataIndex: "created_at", key: "created_at",render:(val,record)=>SysDateTransform({date:val,type:'long',checkIsToDay:true,lang:'in',withTime:true}) },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() => navigate(`${routes_name.M_MENU_SHOW}${val}`)}
            style={{ marginRight: 10 }}
            className="btn icon btn-primary btn-sm"
          >
            <i className="bi bi-file-text"></i>
          </a>
          <a
            onClick={() => navigate(`${routes_name.M_MENU_DETAIL}${val}`)}
            className="btn icon btn-warning btn-sm"
            style={{ marginRight: 10 }}
          >
            <i className="bi bi-pencil"></i>
          </a>
        </div>
      ),
    },
  ];
  const action = [
    <Link
      to={routes_name.M_MENU_CREATE}
      className="btn icon icon-left btn-primary"
    >
      <i className="bi bi-plus" /> {sys_labels.action.ADD}
    </Link>,
  ];
  return (
    <AdminDashboard label="">
      <DataTablePagination
        fetchDataFunc={providers.getData}
        columns={columns}
        title="Menu"
        action={action}
      />
    </AdminDashboard>
  );
};

export default Menu;
