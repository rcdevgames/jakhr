import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/payroll/cash_advance";
import DataTablePagination from "../../../components/DataTable";
import ActionModal from "../../../components/ActionModal";
import { SysCurrencyTransform, showToast } from "../../../utils/global_store";
import { useNavigate } from "react-router-dom";
import { sys_labels } from "../../../utils/constants";
import { routes_name } from "../../../route/static_route";

const Schedule = () => {
  const navigate = useNavigate();
  const [message, set_message] = useState("");
  const [id, set_id] = useState("");
  const [modal, set_modal] = useState(false);
  const columns = [
    { title: "Name", dataIndex: "employee", key: "employee",render:(val,record)=>record.employee.name },
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Amount", dataIndex: "amount", key: "amount",render:(val,record)=>SysCurrencyTransform({num:record.amount,currency:""}) },
    { title: "Cash Date", dataIndex: "cash_date", key: "cash_date" },
    { title: "Due Date", dataIndex: "due_date", key: "due_date" },
    { title: "Paid Status", dataIndex: "is_paid", key: "is_paid",render:(val,record)=>record.is_paid?'LUNAS':"BELUM" },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() => navigate(`${routes_name.TRANSAC_CASH_ADVANCE_DETAIL}${val}`)}
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
      to={routes_name.TRANSAC_CASH_ADVANCE_CREATE}
      className="btn icon icon-left btn-primary"
    >
      <i className="bi bi-plus" /> Tambah
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
    set_message(val.description);
    set_id(val.id);
    set_modal(true);
  };

  return (
    <AdminDashboard label="">
      <DataTablePagination
        fetchDataFunc={providers.getData}
        columns={columns}
        title="Jadwaal"
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

export default Schedule;
