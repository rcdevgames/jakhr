import React from "react";
import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/transaction/attendace";
import DataTablePagination from "../../../components/DataTable";
import { sys_labels } from "../../../utils/constants";

const Attendance = () => {
  const columns = [
    { title: "Employee", dataIndex: "employee", key: "employee",render:(val)=>val.name },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Date In", dataIndex: "date_in", key: "date_in" },
    { title: "Time In", dataIndex: "time_in", key: "time_in" },
    { title: "Date Out", dataIndex: "date_out", key: "date_out" },
    { title: "Time Out", dataIndex: "time_out", key: "time_out" },
  ];
  const action = [
  ];

  return (
    <AdminDashboard label="">
      <DataTablePagination
        fetchDataFunc={providers.getData}
        columns={columns}
        title={sys_labels.menus.ATTENDANCE}
        action={action}
      />
    </AdminDashboard>
  );
};

export default Attendance;
