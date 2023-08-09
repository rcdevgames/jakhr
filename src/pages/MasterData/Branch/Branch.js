import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as branch_providers from "../../../providers/master/branch";
import DataTablePagination from "../../../components/DataTable";
import ActionModal from "../../../components/ActionModal";
import { SysDateTransform, showToast } from "../../../utils/global_store";
import { useNavigate } from "react-router-dom";
import { sys_labels } from "../../../utils/constants";

const Branch = () => {
  const navigate = useNavigate();
  const [message, set_message] = useState("");
  const [id_branch, set_branch] = useState("");
  const [modal, set_modal] = useState(false);
  const columns = [
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (val) => val.company_name,
    },
    { title: "Branch", dataIndex: "name", key: "name" },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Radius", dataIndex: "radius", key: "radius" },
    {
      title: "Primary Phone",
      dataIndex: "primary_phone",
      key: "primary_phone",
    },
    {
      title: "Secondary Phone",
      dataIndex: "secondary_phone",
      key: "secondary_phone",
    },
    { title: "Created Date", dataIndex: "created_at", key: "created_at",render:(val,record)=>SysDateTransform({date:val,type:'long',checkIsToDay:true,lang:'in',withTime:true}) },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() => navigate(`/master-data/branch/detail/${val}`)}
            style={{ marginRight: 10 }}
            className="btn icon btn-primary btn-sm"
          >
            <i className="bi bi-file-text"></i>
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
    <Link
      to="/master-data/branch/create"
      className="btn icon icon-left btn-primary"
    >
      <i className="bi bi-plus" /> {sys_labels.action.ADD}
    </Link>,
  ];
  const handleDelete = async () => {
    set_modal(false);
    try {
      const resp = await branch_providers.deleteData(id_branch);
      showToast({ message: resp.message, type: "info" });
      window.location.reload();
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
  };
  const openModal = async (val) => {
    set_message(val.name);
    set_branch(val.id);
    set_modal(true);
  };
  return (
    <AdminDashboard label="">
      <DataTablePagination
        fetchDataFunc={branch_providers.getData}
        columns={columns}
        title={`${sys_labels.menus.BRANCH}`}
        action={action}
      />
        <ActionModal
          onOk={handleDelete}
          onCancel={() => set_modal(false)}
          title="Confirmation"
          content={`Are you sure to delete ${message}?`}
          visible={modal}
        />
    </AdminDashboard>
  );
};

export default Branch;
