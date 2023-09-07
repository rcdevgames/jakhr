import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";

import AdminDashboard from "../../AdminDashboard";
import * as provider_direktorat from "../../../providers/master/direktorat";
import * as organization_providers from "../../../providers/master/organization";
import DataTablePagination from "../../../components/DataTable";
import ActionModal from "../../../components/ActionModal";
import { SysDateTransform, showToast } from "../../../utils/global_store";
import { useNavigate } from "react-router-dom";
import { routes_name } from "../../../route/static_route";
import { sys_labels } from "../../../utils/constants";

const Organization = () => {
  const navigate = useNavigate();
  const [direktorat, set_direktorat] = useState([]);
  const [message, set_message] = useState("");
  const [id, set_id] = useState("");
  const [modal, set_modal] = useState(false);
  const columns = [
    {
      title: "Direktorat",
      dataIndex: "direktorat",
      key: "direktorat",
      render: (val) => val.name,
    },
    { title: "Divisi", dataIndex: "name", key: "name", sortable: true },
    {
      title: "Perusahaan",
      dataIndex: "company",
      key: "company",
      render: (val) => val.company_name,
    },
    {
      title: "Tanggal Buat",
      dataIndex: "created_at",
      sortable: true,
      key: "created_at",
      render: (val, record) =>
        SysDateTransform({
          date: val,
          type: "long",
          checkIsToDay: true,
          lang: "in",
          withTime: true,
        }),
    },

    {
      title: "Aksi",
      dataIndex: "id",
      key: "id",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() => navigate(`${routes_name.M_ORGANIZATION_SHOW}${val}`)}
            style={{ marginRight: 10 }}
            className="btn icon btn-primary btn-sm"
          >
            <i className="bi bi-file-text"></i>
          </a>

          <a
            onClick={() =>
              navigate(`${routes_name.M_ORGANIZATION_DETAIL}${val}`)
            }
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
      to={routes_name.M_ORGANIZATION_CREATE}
      className="btn icon icon-left btn-primary"
    >
      <i className="bi bi-plus" /> {sys_labels.action.ADD}
    </Link>,
  ];
  const handleDelete = async () => {
    set_modal(false);
    try {
      const resp = await organization_providers.deleteData(id);
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

  const getDirektorat = async () => {
    try {
      const resp = await provider_direktorat.getDataMax();
      set_direktorat(resp.data.data);
    } catch (error) {}
  };
  useEffect(() => {
    getDirektorat();
  }, []);
  return (
    <AdminDashboard label="">
      <DataTablePagination
        fetchDataFunc={organization_providers.getData}
        columns={columns}
        title={sys_labels.menus.DIVISION}
        action={action}
        filters={[
          {
            data: direktorat,
            index: "direktorat_id",
            title: "Direktorat",
            label: "name",
            data_id: "id",
          },
        ]}
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

export default Organization;
