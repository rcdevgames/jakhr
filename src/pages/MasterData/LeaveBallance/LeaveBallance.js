import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/master/leave_ballance";
import DataTablePagination from "../../../components/DataTable";
import ActionModal from "../../../components/ActionModal";
import { SysDateTransform, showToast } from "../../../utils/global_store";
import { useNavigate } from "react-router-dom";
import { routes_name } from "../../../route/static_route";
import { sys_labels } from "../../../utils/constants";

const LeaveBallance = () => {
  const navigate = useNavigate();
  const [message, set_message] = useState("");
  const [id, set_id] = useState("");
  const [modal, set_modal] = useState(false);
  const columns = [
    { title: "Tipe Cuti", dataIndex: "leave_type", key: "leave_type",render:(val,record)=>record.leave_type.name },
    { title: "Karyawan", dataIndex: "employee", key: "employee",render:(val,record)=>record.employee.full_name },
    { title: "Periode", dataIndex: "periode", key: "periode", sortable: true },
    { title: "Saldo", dataIndex: "balance", key: "balance", sortable: true },
    // { title: "Created Date", dataIndex: "created_at", key: "created_at" },
    // SysDateTransform
    { title: "Tanggal Buat", sortable: true, dataIndex: "created_at", key: "created_at",render:(val,record)=>SysDateTransform({date:val,type:'long',checkIsToDay:true,lang:'in',withTime:true}) },

    {
      title: "Aksi",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() => navigate(`${routes_name.M_LEAVE_BALLANCE_SHOW}${val}`)}
            style={{ marginRight: 10 }}
            className="btn icon btn-primary btn-sm"
          >
            <i className="bi bi-file-text"></i>
          </a>
          <a
            onClick={() => navigate(`${routes_name.M_LEAVE_BALLANCE_DETAIL}${val}`)}
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
    <Link
      to={routes_name.M_LEAVE_BALLANCE_CREATE}
      className="btn icon icon-left btn-primary"
    >
      <i className="bi bi-plus" /> {sys_labels.action.ADD}
    </Link>,
    <Link
      to={routes_name.M_LEAVE_BALLANCE_GENERATE}
      className="btn icon icon-left btn-primary"
      style={{marginLeft:15}}
    >
     Generate All Employee
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
    set_message(`${val.leave_type.name} for ${val.employee.name}`);
    set_id(val.id);
    set_modal(true);
  };

  return (
    <AdminDashboard label="">
      <DataTablePagination
        fetchDataFunc={providers.getData}
        columns={columns}
        title={sys_labels.menus.LEAVE_BALLANCE}
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

export default LeaveBallance;
