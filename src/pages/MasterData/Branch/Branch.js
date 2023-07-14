import { Link } from "react-router-dom";
import React,{useEffect,useState} from "react";
import AdminDashboard from "../../AdminDashboard"
import DataTable from "../../../components/DataTable"
import * as branch_providers from "../../../providers/branch"
// import convert from "../../../model/branchModel"
import { showToast } from "../../../utils/global_store";

const headers = ['ID', 'Nama', 'Alamat', 'Action']
const branches = [];
const Branch = () => {
  const [data,setData]=useState([]);
  const [page,setPage]=useState(1);
  const getData=async()=>{
    try {
      const resp= await branch_providers.getData({page});
      setData(resp.data);
      console.log(resp.data);
    } catch (error) {
      showToast({message:error.message,type:"error"})
    }
  }
  useEffect(()=>{
    getData();
  },[])
    return ( 
		  <AdminDashboard label="">
       <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Cabang</h2>
                <Link to="/master-data/branch/create" className="btn icon icon-left btn-primary"><i className="bi bi-plus"/> Tambah</Link>
              </div>
              <div className="card-body">
               <DataTable headers={headers} data={branches} type="branch" />
              </div>
            </div>
        </section>
      </AdminDashboard>
     );
}
 
export default Branch;