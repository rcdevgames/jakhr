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

const ReportEmployee = () => {
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
      title: "Fullname",
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
      title: "Branch",
      dataIndex: "branch_name",
      key: "branch_name",
    },
    {
      title: "Division",
      dataIndex: "organization_name",
      key: "organization_name",
    },
    { title: "Job Level", dataIndex: "job_level_name", key: "job_level_name" },
    {
      title: "Job Position",
      dataIndex: "job_position_name",
      key: "job_position_name",
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
            title: "Cabang",
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
            title: "Job Level",
            label: "name",
            data_id: "id",
          },
          {
            data: data_job_position,
            index: "job_position_id",
            title: "Job Position",
            label: "name",
            data_id: "id",
          },
        ]}
      />
    </AdminDashboard>
  );
};

export default ReportEmployee;
