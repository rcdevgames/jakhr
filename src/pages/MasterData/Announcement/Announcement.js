import AdminDashboard from "../../AdminDashboard"
import DataTable from "../../../components/DataTable"
import { Link } from "react-router-dom";

const headers = ['Tanggal', 'Keterangan', 'Actions']
const data = [];  
const Announcement = () => {
    return ( 
      <AdminDashboard label="">
        <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Pengumuman</h2>
                <Link to="/master-data/announcement/create" className="btn icon icon-left btn-primary"><i className="bi bi-plus"/> Tambah</Link>
              </div>
              <div className="card-body">
              <DataTable headers={headers} data={data} type="announcement" showTrash={false} />
              </div>
            </div>
        </section>
      </AdminDashboard>
     );
}
 
export default Announcement;