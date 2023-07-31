import React, { useState, useEffect } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/transaction/attendace";
import {DataTablePaginantionFilter} from "../../../components/DataTable";
import { sys_labels } from "../../../utils/constants";
import ActionModal from "../../../components/ActionModal";
import { showToast } from "../../../utils/global_store";

const Attendance = () => {
  const [message, set_message] = useState("");
  const [id, set_id] = useState("");
  const [modal, set_modal] = useState(false);
  const [start_date, set_start_date] = useState(null);
  const [end_date, set_end_date] = useState(null);
  const columns = [
    {
      title: "Employee",
      dataIndex: "employee",
      key: "employee",
      render: (val) => val.name,
    },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Date In", dataIndex: "date_in", key: "date_in" },
    { title: "Time In", dataIndex: "time_in", key: "time_in" },
    { title: "Date Out", dataIndex: "date_out", key: "date_out" },
    { title: "Time Out", dataIndex: "time_out", key: "time_out" },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
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
  const action = [];
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
    set_message(
      val.description + " for " + val.employee.name + " on " + val.date_in
    );
    set_id(val.id);
    set_modal(true);
  };
  useEffect(() => {
    const date = new Date();
    set_end_date(date);
    set_start_date(date.setDate(date.getDate() - 7));
  }, []);

  return (
    <AdminDashboard label="">
     
      <DataTablePaginantionFilter
        fetchDataFunc={providers.getData}
        columns={columns}
        title={sys_labels.menus.ATTENDANCE}
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

export default Attendance;
