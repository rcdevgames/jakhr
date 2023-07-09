import AdminDashboard from "../../AdminDashboard"
import DataTable from "../../../components/DataTable"

import {Link} from 'react-router-dom'

const headers = ['ID', 'Nama', 'Masuk', 'Keluar', 'Actions']
const data = [];  
const Attendance = () => {
    return ( 
      <AdminDashboard label="">
        <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Kehadiran</h2>
                <Link to="/transaction/attendance/create" className="btn icon icon-left btn-primary"><i className="bi bi-plus"/> Tambah</Link>
              </div>
              <div className="card-body">
              <DataTable headers={headers} data={data} type="attendance" />
              </div>
            </div>
        </section>
      </AdminDashboard>
     );
}
 
export default Attendance;