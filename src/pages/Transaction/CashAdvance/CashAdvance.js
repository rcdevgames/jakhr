import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/payroll/cash_advance";
import DataTablePagination from "../../../components/DataTable";
import ActionModal from "../../../components/ActionModal";
import { SysCurrencyTransform, SysDateTransform, showToast } from "../../../utils/global_store";
import { useNavigate } from "react-router-dom";
import { sys_labels } from "../../../utils/constants";
import { routes_name } from "../../../route/static_route";

const Schedule = () => {
  const navigate = useNavigate();
  const [message, set_message] = useState("");
  const [id, set_id] = useState("");
  // SysDateTransform
  const [modal, set_modal] = useState(false);
  const columns = [
    { title: "Karyawan", dataIndex: "employee", key: "employee",render:(val,record)=>record.employee.name,sortable:true },
    { title: "Title", dataIndex: "title", key: "title",sortable:true },
    { title: "Deskripsi", dataIndex: "description", key: "description",sortable:true},
    { title: "Nominal", dataIndex: "amount", key: "amount",render:(val,record)=>SysCurrencyTransform({num:record.amount,currency:""}) },
    { title: "Tanggal Cash Advance", dataIndex: "cash_date", key: "cash_date",sortable: true,render:(val)=>SysDateTransform({date:val,checkIsToDay:true,withTime:false,type:'long',lang:'in'}) },
    { title: "Tanggal Bayar", dataIndex: "due_date", key: "due_date",sortable: true,render:(val)=>SysDateTransform({date:val,checkIsToDay:true,withTime:false,type:'long',lang:'in'}) },
    { title: "Status Pembayaran", dataIndex: "is_paid", key: "is_paid",render:(val,record)=>record.is_paid?'LUNAS':"BELUM" },
    {
      title: "Aksi",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() => navigate(`${routes_name.TRANSAC_CASH_ADVANCE_SHOW}${val}`)}
            style={{ marginRight: 10 }}
            className="btn icon btn-primary btn-sm"
          >
            <i className="bi bi-file-text"></i>
          </a>
          
          <a
            onClick={() => navigate(`${routes_name.TRANSAC_CASH_ADVANCE_DETAIL}${val}`)}
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
        title={sys_labels.menus.CASH_ADVANCE}
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
