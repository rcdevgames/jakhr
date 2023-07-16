import { Link } from "react-router-dom";
import React from "react";
import AdminDashboard from "../../AdminDashboard";
import * as company_providers from "../../../providers/master/company";
import DataTablePagination from "../../../components/DataTable";
import { useNavigate } from "react-router-dom";
import { routes_name } from "../../../route/static_route";

const Company = () => {
  const navigate = useNavigate();
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
         
        </div>
      ),
    },
  ];
  const action = [
    <Link
      to={routes_name.M_COMPANY_CREATE}
      className="btn icon icon-left btn-primary"
    >
      <i className="bi bi-plus" /> Tambah
    </Link>,
  ];
 
  return (
    <AdminDashboard label="">
      <DataTablePagination
        fetchDataFunc={company_providers.getData}
        columns={columns}
        title="Company"
        action={action}
      />
    </AdminDashboard>
  );
};

export default Company;
