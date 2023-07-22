import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/payroll/salary";
import DataTablePagination from "../../../components/DataTable";
import ActionModal from "../../../components/ActionModal";
import { showToast } from "../../../utils/global_store";
import { useNavigate } from "react-router-dom";
import { sys_labels } from "../../../utils/constants";
import { routes_name } from "../../../route/static_route";

const Salary = () => {
  const navigate = useNavigate();
  const [message, set_message] = useState("");
  const [id, set_id] = useState("");
  const [modal, set_modal] = useState(false);
  const columns = [
    { title: "Employee", dataIndex: "employee", key: "employee",render:(val)=>val.name },
    { title: "Basic Salary", dataIndex: "basic_salary", key: "basic_salary" },
    { title: "Overtime", dataIndex: "overtime", key: "overtime" },
    { title: "Late Deduction", dataIndex: "late_deduction", key: "late_deduction" },
    { title: "Working Day", dataIndex: "working_days", key: "working_days" },
    { title: "Incentive", dataIndex: "leave_balance_incentive", key: "leave_balance_incentive" },
    { title: "JHT", dataIndex: "jht", key: "jht" },
    { title: "Kesehatan", dataIndex: "kesehatan", key: "kesehatan" },
    { title: "JP", dataIndex: "jp", key: "jp" },
    { title: "Other Insurance", dataIndex: "other_insurance", key: "other_insurance" },
    { title: "JHT Company", dataIndex: "jht_company", key: "jht_company" },
    { title: "JKM Company", dataIndex: "jkm_company", key: "jkm_company" },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            // onClick={() => navigate(`${routes_name.PAYROLL_SALARY_DETAIL}${val}`)}
            // onClick={() => navigate(`${routes_name.PAYROLL_SALARY_DETAIL}${val}`)}
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
        fetchDataFunc={providers.getData}
        columns={columns}
        title={sys_labels.menus.SALARY}
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

export default Salary;
