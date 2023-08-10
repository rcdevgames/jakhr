import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/master/role";
import DataTablePagination from "../../../components/DataTable";
import { SysDateTransform, showToast } from "../../../utils/global_store";
import { useNavigate } from "react-router-dom";
import { routes_name } from "../../../route/static_route";
import { sys_labels } from "../../../utils/constants";

const RoleMenu = () => {
  const navigate = useNavigate();
  const [message, set_message] = useState("");
  const [id, set_id] = useState("");
  const [modal, set_modal] = useState(false);
  const columns = [
    { title: "Name", dataIndex: "name", key: "name", sortable: true },
// SysDateTransform    { title: "Created Date", dataIndex: "created_at", key: "created_at" },
    { title: "Created Date", dataIndex: "created_at", sortable: true, key: "created_at",render:(val,record)=>SysDateTransform({date:val,type:'long',checkIsToDay:true,lang:'in',withTime:true}) },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() => navigate(`${routes_name.M_ROLE_MENU_SHOW}${val}`)}
            style={{ marginRight: 10 }}
            className="btn icon btn-primary btn-sm"
          >
            <i className="bi bi-file-text"></i>
          </a>
          
          <a
            onClick={() => navigate(`${routes_name.M_ROLE_MENU_DETAIL}${val}`)}
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
    
  ];
  return (
    <AdminDashboard label="">
      <DataTablePagination
        fetchDataFunc={providers.getData}
        columns={columns}
        title="Role Menu"
        action={action}
      />
    </AdminDashboard>
  );
};

export default RoleMenu;
