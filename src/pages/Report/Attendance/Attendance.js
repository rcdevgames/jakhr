import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import * as providers from "../../../providers/report/global";
import * as providers_job_level from "../../../providers/master/job_level";
import * as providers_job_position from "../../../providers/master/job_position";
import * as providers_branch from "../../../providers/master/branch";
import * as providers_organization from "../../../providers/master/organization";
import DataTablePagination, { DataTablePaginationReport } from "../../../components/DataTable";
import { sys_labels } from "../../../utils/constants";
import { SysCurrencyTransform } from "../../../utils/global_store";

const ReportAttendance = () => {
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
      title: "Karyawan",
      dataIndex: "full_name",
      key: "full_name",
      sortable: true,
    },

    {
      title: "NIP",
      dataIndex: "employee_id",
      key: "employee_id",
      sortable:true
    },
    {
      title: "Kantor/Cabang",
      dataIndex: "branch_name",
      key: "branch_name",
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
      key: "job_position_name",
    },
    {
      title: "Masuk",
      dataIndex: "attendance_visit",
      key: "attendance_visit"
    },
    
    // {
    //   title: "Tidak Valid",
    //   dataIndex: "attendance_invalid",
    //   key: "attendance_invalid"
    // },
    {
      title: "Terlambat",
      dataIndex: "attendance_late",
      key: "attendance_late"
    },
    
    {
      title: "Pulang Cepat",
      dataIndex: "attendance_out_early",
      key: "attendance_out_early"
    },
    // {
    //   title: "Lembur",
    //   dataIndex: "attendance_overtimes",
    //   key: "attendance_overtimes"
    // },
    // {
    //   title: "Cuti",
    //   dataIndex: "attendance_leaves",
    //   key: "attendance_leaves"
    // },
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
        fetchDataFunc={providers.attendance_reports}
        columns={columns}
        withPeriode={true}
        title={sys_labels.menus.ATTENDANCE}
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

export default ReportAttendance;
