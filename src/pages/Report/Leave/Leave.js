import { Link,useNavigate } from "react-router-dom";
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
import { routes_name } from "../../../route/static_route";

const ReportLeave = () => {
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
      title: "Cuti",
      dataIndex: "totalLeaves",
      key: "totalLeaves",
    },{
      title: "Aksi",
      dataIndex: "id",
      key: "action",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <a
            onClick={() => navigate(`${routes_name.REPORT_LEAVE_DETAIL}${val}`)}
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
        fetchDataFunc={providers.leaves_reports}
        columns={columns}
        withPeriode={true}
        title={sys_labels.menus.LEAVE}
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

export default ReportLeave;
