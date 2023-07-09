import AdminDashboard from "../../AdminDashboard"
import DataTable from "../../../components/DataTable"
import { Link } from "react-router-dom";

const headers = ['ID', 'Nama', 'Tanggal', 'KPI','Realisasi', 'App', 'Val', 'Actions']
const data = [];  
const TransactionKpi = () => {
    return ( 
      <AdminDashboard label="">
        <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>KPI</h2>
                <Link to="/transaction/kpi/create" className="btn icon icon-left btn-primary"><i className="bi bi-plus"/> Tambah</Link>
              </div>
              <div className="card-body">
              <DataTable headers={headers} data={data} type="transaction_kpi" showTrash={false} />
              </div>
            </div>
        </section>
      </AdminDashboard>
     );
}
 
export default TransactionKpi;