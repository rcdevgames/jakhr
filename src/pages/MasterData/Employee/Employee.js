import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as employee_providers from "../../../providers/master/employee";
import DataTablePagination from "../../../components/DataTable";
import ActionModal from "../../../components/ActionModal";
import { showToast } from "../../../utils/global_store";
import { useNavigate } from "react-router-dom";

const Branch = () => {
  const navigate = useNavigate();
  const [message, set_message] = useState("");
  const [id_branch, set_branch] = useState("");
  const [modal, set_modal] = useState(false);
  const columns = [
    {
      title: "Fullname",
      dataIndex: "full_name",
      key: "full_name",
    },
    
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
      render: (val) => val.name,
    },
    
    {
      title: "Company",
      dataIndex: "branch",
      key: "company",
      render: (val) => val.company.name,
    },
    { title: "Division", dataIndex: "division", key: "division" },
    { title: "Position", dataIndex: "position", key: "position" },
    { title: "Job", dataIndex: "job_level", key: "job_level" },
    // {
    //   title: "Primary Phone",
    //   dataIndex: "primary_phone",
    //   key: "primary_phone",
    // },
    // {
    //   title: "Secondary Phone",
    //   dataIndex: "secondary_phone",
    //   key: "secondary_phone",
    // },
    // { title: "Created Date", dataIndex: "created_at", key: "created_at" },
    // {
    //   title: "Action",
    //   dataIndex: "id",
    //   key: "id",
    //   render: (val, record) => (
    //     <div className="btn-group" role="group">
    //       <a
    //         onClick={() => navigate(`/master-data/branch/detail/${val}`)}
    //         style={{ marginRight: 10 }}
    //         className="btn icon btn-primary btn-sm"
    //       >
    //         <i className="bi bi-file-text"></i>
    //       </a>
    //       <a
    //         onClick={() => openModal(record)}
    //         className="btn icon btn-danger btn-sm"
    //       >
    //         <i className="bi bi-trash"></i>
    //       </a>
    //     </div>
    //   ),
    // },
  ];
  const action = [
    // <Link to="/master-data/employee/create" className="btn icon icon-left btn-primary"><i className="bi bi-plus"/> Tambah</Link>
    // ,
  ];
  const handleDelete = async () => {
    set_modal(false);
    try {
      const resp = await employee_providers.deleteData(id_branch);
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
    console.log(val);
  };
  return (
    <AdminDashboard label="">
      <DataTablePagination
        fetchDataFunc={employee_providers.getData}
        columns={columns}
        title="Employee"
        action={action}
      />
      {
        <ActionModal
          onOk={handleDelete}
          onCancel={() => set_modal(false)}
          title="Confirmation"
          content={`Are you sure to delete ${message}?`}
          visible={modal}
        />
      }
    </AdminDashboard>
  );
};

export default Branch;
