import AdminDashboard from "../../AdminDashboard"
import DataTable from "../../../components/DataTable"
import { Link } from "react-router-dom";

const headers = ['ID', 'Nama', 'Tanggal', 'Tipe','Keterangan', 'App', 'Val', 'Actions']
const data = [];  
const Leave = () => {
    return ( 
      <AdminDashboard label="">
        <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Cuti / Izin </h2>
                <Link to="/transaction/leave/create" className="btn icon icon-left btn-primary"><i className="bi bi-plus"/> Tambah</Link>
              </div>
              <div className="card-body">
              <DataTable headers={headers} data={data} type="leave" showTrash={false} />
              </div>
            </div>
        </section>
      </AdminDashboard>
     );
}
 
export default Leave;