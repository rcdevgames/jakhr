import React, { useState, useEffect } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/transaction/attendace";
import { DataTablePaginantionFilter } from "../../../components/DataTable";
import { sys_labels } from "../../../utils/constants";
import ActionModal from "../../../components/ActionModal";
import { SysDateTransform, showToast } from "../../../utils/global_store";
import { routes_name } from "../../../route/static_route";
import { useNavigate } from "react-router-dom";
const Attendance = () => {
  const navigate = useNavigate();
  const [message, set_message] = useState("");
  const [id, set_id] = useState("");
  const [selected_attendance, set_selected_attendance] = useState({});
  const [modal, set_modal] = useState(false);
  const [start_date, set_start_date] = useState(null);
  const [end_date, set_end_date] = useState(null);
  const [modal_image, set_modal_image] = useState(false);
  const openModalImage = async (val) => {
    set_selected_attendance(val);
    set_modal_image(true);
  };
  const columns = [
    {
      title: "Karyawan",
      dataIndex: "employee",
      key: "employee",
      render: (val) => val.name,
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
      key: "description",
      sortable: true,
    },
    {
      title: "Tanggal Masuk",
      dataIndex: "date_in",
      key: "date_in",
      render: (val) =>
        SysDateTransform({
          date: val,
          checkIsToDay: true,
          withTime: false,
          type: "long",
          lang: "in",
        }),
      sortable: true,
    },
    { title: "Jam Masuk", dataIndex: "time_in", key: "time_in", sortable: true },
    {
      title: "Tanggal Keluar",
      dataIndex: "date_out",
      key: "date_out",
      sortable: true,
      render: (val) =>
        SysDateTransform({
          date: val,
          checkIsToDay: true,
          withTime: false,
          type: "long",
          lang: "in",
        }),
    },
    {
      title: "Jam Keluar",
      dataIndex: "time_out",
      key: "time_out",
      sortable: true,
    },
    {
      title: "Aksi",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() => openModal(record)}
            className="btn icon btn-danger btn-sm"
            style={{ marginRight: 10 }}
          >
            <i className="bi bi-trash"></i>
          </a>

          <a
            onClick={() =>
              navigate(`${routes_name.TRANSAC_ATTENDANCE_DETAIL}${val}`)
            }
            className="btn icon btn-warning btn-sm"
            style={{ marginRight: 10 }}
          >
            <i className="bi bi-pencil"></i>
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
      <ActionModal
        onOk={() => set_modal_image(false)}
        onCancel={() => set_modal_image(false)}
        title=""
        content={
          <>
            <label>Lokasi Masuk:</label>
            <br />
            <label>
              Lat: {selected_attendance?.location?.in?.lat ?? ""}, Lng:
              {selected_attendance?.location?.in?.lng ?? ""}
            </label>
            <br />
            <label>Foto Masuk:</label>
            <br />
            <img
              src={selected_attendance?.photos?.in ?? null}
              style={{ objectFit: "contain", width: "100%", marginBottom: 20 }}
            />
            <br />

            <label>Lokasi Keluar:</label>
            <br />
            <label>
              Lat: {selected_attendance?.location?.out?.lat ?? ""}, Lng:
              {selected_attendance?.location?.out?.lng ?? ""}
            </label>
            <br />
            <label>Foto Keluar:</label>
            <br />
            <img
              src={selected_attendance?.photos?.out ?? null}
              style={{ objectFit: "contain", width: "100%" }}
            />
          </>
        }
        visible={modal_image}
      />
    </AdminDashboard>
  );
};

export default Attendance;
