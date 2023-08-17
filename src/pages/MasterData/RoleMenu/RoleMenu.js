import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/master/role";
import DataTablePagination from "../../../components/DataTable";
import { SysDateTransform, SysValidateForm, showToast } from "../../../utils/global_store";
import { useNavigate } from "react-router-dom";
import { routes_name } from "../../../route/static_route";
import { sys_labels } from "../../../utils/constants";
import ActionModal from "../../../components/ActionModal";

const RoleMenu = () => {
  const navigate = useNavigate();
  const [message, set_message] = useState("");
  const [id, set_id] = useState("");
  const [modal, set_modal] = useState(false);
  const [modal_add, set_modal_add] = useState(false);
  const [role_name,set_role_name]= useState("");
  const columns = [
    { title: "Role", dataIndex: "name", key: "name", sortable: true },
    { title: "Tanggal Buat", dataIndex: "created_at", sortable: true, key: "created_at",render:(val,record)=>SysDateTransform({date:val,type:'long',checkIsToDay:true,lang:'in',withTime:true}) },
    {
      title: "Aksi",
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
          <a
            onClick={() => openModal(record)}
            className="btn icon btn-danger btn-sm"
          >
            <i className="bi bi-trash"></i>
          </a>
        
        </div>
      ),
    },
  ];
  const action = [
    <a
      // to={routes_name.M_ORGANIZATION_CREATE}
      onClick={()=>openModalAdd()}
      className="btn icon icon-left btn-primary"
    >
      <i className="bi bi-plus" /> {sys_labels.action.ADD}
    </a>
  ];
  const handleDelete = async () => {
    set_modal(false);
    try {
      const resp = await providers.deleteRole(id);
      showToast({ message: resp.message, type: "info" });
      window.location.reload();
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
  };
  const openModal = async (val) => {
    set_message(val.name);
    set_id(val.id);
    set_modal(true);
  };
  
  const openModalAdd = async (val) => {
    set_role_name(val?.name??null);
    set_id(val?.id??null);
    set_modal_add(true);
  };
  
  const handleSubmit = async () => {
    set_modal_add(false);
    try {
      SysValidateForm(["role_name"],{role_name})
      const resp = await providers.insertRole({name:role_name});
      showToast({ message: resp.message, type: "info" });
      window.location.reload();
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
  };
  return (
    <AdminDashboard label="">
      <DataTablePagination
        fetchDataFunc={providers.getData}
        columns={columns}
        title="Role Menu"
        action={action}
      />
      <ActionModal
        onOk={handleDelete}
        onCancel={() => set_modal(false)}
        title="Confirmation"
        content={`Are you sure to delete ${message}?`}
        visible={modal}
      />
      
      <ActionModal
        onOk={() => handleSubmit()}
        onCancel={() => set_modal_add(false)}
        title="Role Name"
        content={
          <input
            value={role_name}
            name="role_name"
            className="form-control"
            onChange={(event) => set_role_name(event.target.value)}
          ></input>
        }
        visible={modal_add}
      />
    </AdminDashboard>
  );
};

export default RoleMenu;
