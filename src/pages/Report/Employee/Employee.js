import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/report/global";
import * as providers_job_level from "../../../providers/master/job_level";
import * as providers_job_position from "../../../providers/master/job_position";
import * as providers_branch from "../../../providers/master/branch";
import * as providers_organization from "../../../providers/master/organization";
import DataTablePagination, {
  DataTablePaginationReport,
} from "../../../components/DataTable";
import { sys_labels } from "../../../utils/constants";
import { routes_name } from "../../../route/static_route";
import {Badge} from "antd"

import { useNavigate } from "react-router-dom";
const ReportEmployee = () => {
  const navigate = useNavigate();
  const [data_branch, set_data_branch] = useState([]);
  const [data_organization, set_data_organization] = useState([]);
  const [data_job_level, set_data_job_level] = useState([]);
  const [data_job_position, set_data_job_position] = useState([]);
  useEffect(() => {
    getBranch();
    getOrganization();
    getJobLevel();
    getJobPosition();
  }, []);
  const columns = [
    {
      title: "Nama Lengkap",
      dataIndex: "full_name",
      key: "full_name",
      sortable: true,
    },

    {
      title: "NIP",
      dataIndex: "employee_id",
      key: "employee_id",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      type:"hidden"
    },
    {
      title: "Phone",
      dataIndex: "phone_number",
      key: "phone_number",
      type:"hidden"
    },
    {
      title: "Tipe ID",
      dataIndex: "id_type",
      key: "id_type",
      type:"hidden"
    },
    {
      title: "NIK",
      dataIndex: "id_number",
      key: "id_number",
      type:"hidden"
    },
    {
      title: "Status Pernikahan",
      dataIndex: "marital_status",
      key: "marital_status",
      type:"hidden"
    },
    {
      title: "Agama",
      dataIndex: "religion",
      key: "religion",
      type:"hidden"
    },
    {
      title: "Jenis Kelamin",
      dataIndex: "gender",
      key: "gender",
      type:"hidden"
    },
    {
      title: "NPWP",
      dataIndex: "npwp",
      key: "npwp",
      type:"hidden"
    },
    {
      title: "PTKP",
      dataIndex: "ptkp",
      key: "ptkp",
      type:"hidden"
    },
    {
      title: "Alamat KTP",
      dataIndex: "citizen_address",
      key: "citizen_address",
      type:"hidden"
    },
    {
      title: "Alamat",
      dataIndex: "residential_address",
      key: "residential_address",
      type:"hidden"
    },
    {
      title: "Kantor/Cabang",
      dataIndex: "branch_name",
      key: "branch_name",
      width:150,
    },
    {
      title: "Divisi",
      dataIndex: "organization_name",
      key: "organization_name",
    },
    { title: "Level Jabatan", dataIndex: "job_level_name", key: "job_level_name" },
    {
      title: "Posisi Jabatan",
      dataIndex: "job_position_name",
      width:200,
      key: "job_position_name",
    },{
      title: "Status",
      dataIndex: "is_active",
      key: "is_active",
      val_props:{
       true:"Aktif",
       false:"Tidak Aktif" 
      },
      render: (val) => (
        <Badge
          status={val ? "success" : "warning"}
          text={val ? "Aktif" : "Tidak Aktif"}
          showZero
        ></Badge>
      ),
    },
    {
      title: "Aksi",
      dataIndex: "id",
      key: "action",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() =>
              navigate(`${routes_name.M_EMPLOYEE_SHOW}${record.id}`)
            }
            style={{ marginRight: 10 }}
            className="btn icon btn-primary btn-sm"
          >
            <i className="bi bi-file-text"></i>
          </a>
        </div>
      ),
    },
  ];
  const getBranch = async () => {
    try {
      const resp = await providers_branch.getDataMax();
      set_data_branch(resp.data.data);
    } catch (error) {}
  };

  const getOrganization = async () => {
    try {
      const resp = await providers_organization.getDataMax();
      set_data_organization(resp.data.data);
    } catch (error) {}
  };

  const getJobLevel = async () => {
    try {
      const resp = await providers_job_level.getDataMax();
      set_data_job_level(resp.data.data);
    } catch (error) {}
  };

  const getJobPosition = async () => {
    try {
      const resp = await providers_job_position.getDataMax();
      set_data_job_position(resp.data.data);
    } catch (error) {}
  };
  return (
    <AdminDashboard label="">
      <DataTablePaginationReport
        fetchDataFunc={providers.employee_reports}
        columns={columns}
        // withPeriode={true}
        title={sys_labels.menus.EMPLOYEE}
        filters={[
          {
            data: data_branch,
            index: "branch_id",
            title: "Kantor/Cabang",
            label: "name",
            data_id: "id",
          },

          {
            data: data_organization,
            index: "organization_id",
            title: "Divisi",
            label: "name",
            data_id: "id",
          },
          {
            data: data_job_level,
            index: "job_level_id",
            title: "Level Jabatan",
            label: "name",
            data_id: "id",
          },
          {
            data: data_job_position,
            index: "job_position_id",
            title: "Posisi Jabatan",
            label: "name",
            data_id: "id",
          },
        ]}
      />
    </AdminDashboard>
  );
};

export default ReportEmployee;
