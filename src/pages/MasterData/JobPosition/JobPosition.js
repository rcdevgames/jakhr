import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import AdminDashboard from "../../AdminDashboard";
import * as job_position_provider from "../../../providers/master/job_position";
import DataTablePagination from "../../../components/DataTable";
import ActionModal from "../../../components/ActionModal";
import { SysDateTransform, showToast } from "../../../utils/global_store";
import { useNavigate } from "react-router-dom";
import { routes_name } from "../../../route/static_route";
import { sys_labels } from "../../../utils/constants";

const JobPosition = () => {
  const navigate = useNavigate();
  const [message, set_message] = useState("");
  const [id, set_id] = useState("");
  const [modal, set_modal] = useState(false);
  const columns = [
    { title: "Name", dataIndex: "name", key: "name", sortable: true },
    { title: "Company", dataIndex: "company", key: "company",render:(val)=>val.company_name, sortable: true },
    { title: "Job Level", dataIndex: "job_level", sortable: true, key: "job_level",render:(val)=>val.job_level_name },
    // { title: "Created Date", dataIndex: "created_at", key: "created_at" },
    { title: "Created Date", dataIndex: "created_at", sortable: true, key: "created_at",render:(val,record)=>SysDateTransform({date:val,type:'long',checkIsToDay:true,lang:'in',withTime:true}) },
    // SysDateTransform
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() => navigate(`${routes_name.M_JOB_POSITION_SHOW}${val}`)}
            style={{ marginRight: 10 }}
            className="btn icon btn-primary btn-sm"
          >
            <i className="bi bi-file-text"></i>
          </a>
          
          <a
            onClick={() => navigate(`${routes_name.M_JOB_POSITION_DETAIL}${val}`)}
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
      to={routes_name.M_JOB_POSITION_CREATE}
      className="btn icon icon-left btn-primary"
    >
      <i className="bi bi-plus" /> {sys_labels.action.ADD}
    </Link>,
  ];
  const handleDelete = async () => {
    set_modal(false);
    try {
      const resp = await job_position_provider.deleteData(id);
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
        fetchDataFunc={job_position_provider.getData}
        columns={columns}
        title={sys_labels.menus.JOB_POSITION}
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

export default JobPosition;
