import React, { useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import { DataTablePaginantionFilterApproval } from "../../../components/DataTable";

const Approval = () => {
  return (
    <AdminDashboard label="">
      <DataTablePaginantionFilterApproval title="Approval" />
    </AdminDashboard>
  );
};

export default Approval;
