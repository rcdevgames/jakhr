import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as employee_providers from "../../../providers/master/employee";
import DataTablePagination from "../../../components/DataTable";
import ActionModal from "../../../components/ActionModal";
import { showToast } from "../../../utils/global_store";
import { useNavigate } from "react-router-dom";
import { routes_name } from "../../../route/static_route";

const Employee = () => {
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
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() => navigate(`${routes_name.M_EMPLOYEE_DETAIL}${val}`)}
            style={{ marginRight: 10 }}
            className="btn icon btn-primary btn-sm"
          >
            <i className="bi bi-file-text"></i>
          </a>
        </div>
      ),
    },
  ];
  const action = [
    <Link to={routes_name.M_EMPLOYEE_CREATE} className="btn icon icon-left btn-primary"><i className="bi bi-plus"/> Tambah</Link>
    // ,
  ];
  return (
    <AdminDashboard label="">
      <DataTablePagination
        fetchDataFunc={employee_providers.getData}
        columns={columns}
        title="Employee"
        action={action}
      />
    </AdminDashboard>
  );
};

export default Employee;
