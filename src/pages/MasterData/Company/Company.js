import { Link } from "react-router-dom";
import React,{useState} from "react";
import AdminDashboard from "../../AdminDashboard";
import * as company_providers from "../../../providers/master/company";
import DataTablePagination from "../../../components/DataTable";
import { useNavigate } from "react-router-dom";
import { routes_name } from "../../../route/static_route";
import ActionModal from "../../../components/ActionModal";
import { showToast } from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";

const Company = () => {
  const navigate = useNavigate();
  const [message, set_message] = useState("");
  const [id, set_id] = useState("");
  const [modal, set_modal] = useState(false);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    { title: "Address", dataIndex: "address", key: "address" },
    { title: "Alias", dataIndex: "alias", key: "alias" },

    { title: "Created Date", dataIndex: "created_at", key: "created_at" },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() => navigate(`${routes_name.M_COMPANY_DETAIL}${val}`)}
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
      to={routes_name.M_COMPANY_CREATE}
      className="btn icon icon-left btn-primary"
    >
      <i className="bi bi-plus" /> {sys_labels.action.ADD}
    </Link>,
  ];

  const handleDelete = async () => {
    set_modal(false);
    try {
      const resp = await company_providers.deleteData(id);
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
        fetchDataFunc={company_providers.getData}
        columns={columns}
        title={`${sys_labels.menus.COMPANY}`}
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

export default Company;
