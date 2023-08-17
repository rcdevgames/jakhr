import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/transaction/reimburs";
import {DataTablePaginantionFilter} from "../../../components/DataTable";
import { sys_labels } from "../../../utils/constants";
import { routes_name } from "../../../route/static_route";
import { SysCurrencyTransform, SysDateTransform, showToast } from "../../../utils/global_store";
import {useNavigate} from "react-router-dom"
import ActionModal from "../../../components/ActionModal";

const Reimburst = () => {
  const navigate = useNavigate();
  const [message, set_message] = useState("");
  const [image, set_image] = useState("");
  const [id, set_id] = useState("");
  const [modal, set_modal] = useState(false);
  const [modal_image, set_modal_image] = useState(false);
  // SysDateTransform
  const columns = [
    { title: "Karyawan", dataIndex: "employee", key: "employee",render:(val,record)=>record.employee.name },
    { title: "Deskripsi", dataIndex: "description", key: "description",sortable:true },
    { title: "Tanggal", dataIndex: "date", key: "date" ,render:(val)=>SysDateTransform({date:val,checkIsToDay:true,withTime:false,type:'long',lang:'in'})},
    { title: "Nominal", dataIndex: "amount", key: "amount",render:(val,record)=>SysCurrencyTransform({num:val}),sortable:true },
    { title: "Status", dataIndex: "is_paid", key: "is_paid",render:(val,record)=>val?'PAID':'NO PAID',sortable:true },
    {
      title: "Aksi",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() =>
              navigate(
                `${routes_name.TRANSAC_REIMBURST_SHOW}${val}`
              )
            }
            style={{ marginRight: 10 }}
            className="btn icon btn-primary btn-sm"
            >
            <i className="bi bi-file-text"></i>
          </a>
          
          <a
            onClick={() => navigate(`${routes_name.TRANSAC_REIMBURST_DETAIL}${val}`)}
            className="btn icon btn-warning btn-sm"
            style={{ marginRight: 10 }}
          >
            <i className="bi bi-pencil"></i>
          </a>
          <a
            style={{ marginRight: 10 }}
            onClick={() => openModal(record)}
            className="btn icon btn-danger btn-sm"
          >
            <i className="bi bi-trash"></i>
          </a>
          <a
            onClick={() => openModalImage(record)}
            className="btn icon btn-info btn-sm"
          >
            <i className="bi bi-image-alt"></i>
          </a>
        </div>
      ),
    },
  ];
  const action = [
    <Link
      to={routes_name.TRANSAC_REIMBURST_CREATE}
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
  
  const openModalImage = async (val) => {
    set_image(val.payment_files[0]);
    set_modal_image(true);
  };
  return (
    <AdminDashboard label="">
      <DataTablePaginantionFilter
        fetchDataFunc={providers.getData}
        columns={columns}
        title={sys_labels.menus.REIMBURS}
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
        onOk={()=>set_modal_image(false)}
        onCancel={() => set_modal_image(false)}
        title=""
        content={<img src={image} style={{objectFit:'contain',width:'100%'}} />}
        visible={modal_image}
      />
    </AdminDashboard>
  );
};

export default Reimburst;
