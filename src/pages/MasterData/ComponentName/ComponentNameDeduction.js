import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";

import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/config/component_name";
import DataTablePagination from "../../../components/DataTable";
import ActionModal from "../../../components/ActionModal";
import { showToast } from "../../../utils/global_store";
import { useNavigate } from "react-router-dom";
import { routes_name } from "../../../route/static_route";
import { sys_labels } from "../../../utils/constants";

const ComponentName = () => {
  const navigate = useNavigate();
  const [message, set_message] = useState("");
  const [id, set_id] = useState("");
  const [modal, set_modal] = useState(false);
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Created Date", dataIndex: "created_at", key: "created_at" },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() =>
              navigate(`${routes_name.M_COMPONENT_NAME_DEDUCTION_DETAIL}${val}`)
            }
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
      to={routes_name.M_COMPONENT_NAME_DEDUCTION_CREATE}
      className="btn icon icon-left btn-primary"
    >
      <i className="bi bi-plus" /> {sys_labels.action.ADD}
    </Link>,
  ];
  const handleDelete = async () => {
    set_modal(false);
    try {
      const resp = await providers.deleteData(id);
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

  return (
    <AdminDashboard label="">
      <DataTablePagination
        fetchDataFunc={providers.getDataDeduction}
        columns={columns}
        title={sys_labels.menus.DEDUCTION}
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

export default ComponentName;
