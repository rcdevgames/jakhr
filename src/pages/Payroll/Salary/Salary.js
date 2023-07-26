import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
// import * as providers from "../../../providers/payroll/salary";
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
    { title: "Employee", dataIndex: "employee", key: "employee" },
    {
      title: "Month Periode",
      dataIndex: "periode_bulan",
      key: "periode_bulan",
    },
    { title: "Year Periode", dataIndex: "periode_tahun", key: "periode_tahun" },
    { title: "Basic Salary", dataIndex: "basic_salary", key: "basic_salary" },
    { title: "Allowance", dataIndex: "allowance", key: "allowance" },
    { title: "Deduction", dataIndex: "deduction", key: "deduction" },
  ];
  const action = [
    <Link
      to={routes_name.PAYROLL_SALARY_GENERATE}
      className="btn icon icon-left btn-primary"
    >
      <i className="bi bi-plus" /> Generate
    </Link>,
  ];
  const handleDelete = async () => {
    set_modal(false);
    try {
      // const resp = await providers.deleteData(id);
      // showToast({ message: resp.message, type: "info" });
      // window.location.reload();
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
  };
  const openModal = async (val) => {
    set_message(val.name);
    set_id(val.id);
    set_modal(true);
  };
  const handleGet = async () => {
    return { data: { data: [] } };
  };

  return (
    <AdminDashboard label="">
      <DataTablePagination
        fetchDataFunc={handleGet}
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
