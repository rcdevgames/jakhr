import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import AdminDashboard from "../../AdminDashboard";
import DataTable from "../../../components/DataTable";
import * as branch_providers from "../../../providers/branch";
import convert from "../../../model/branchModel";
import { showToast } from "../../../utils/global_store";

const headers = ["Branch", "Address",'Radius',"Primary Phone","Secondary Phone", "Created Date","Action"];
const branches = [];
const Branch = () => {
  const [data, setData] = useState(convert.listOfbranchModel([]));
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    setLoading(true);
    try {
      const resp = await branch_providers.getData(page);
      setData(convert.listOfbranchModel(resp.data.data));
      console.log(resp.data.data);
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <AdminDashboard label="">
      <section className="section">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h2>Cabang</h2>
            <Link
              to="/master-data/branch/create"
              className="btn icon icon-left btn-primary"
            >
              <i className="bi bi-plus" /> Tambah
            </Link>
          </div>
          <div className="card-body">
            {loading ? null : (
              <DataTable headers={headers} data={data} type="branch" />
            )}
          </div>
        </div>
      </section>
    </AdminDashboard>
  );
};

export default Branch;
