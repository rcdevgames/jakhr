import AdminDashboard from "../../AdminDashboard"
import DataTable from "../../../components/DataTable/DataTable"
import {Link} from 'react-router-dom'

const headers = ['ID', 'NIK', 'Nama', 'Status', 'Cabang', 'Departemen', 'Jabatan', 'Actions']
const data = [];  
const Applicant = () => {
    return ( 
      <AdminDashboard label="">
        <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Laporan Pelamar</h2>
        
              </div>
              <div className="card-body">
              <DataTable headers={headers} data={data} type="report_applicant" />
              </div>
            </div>
        </section>
      </AdminDashboard>
     );
}
 
export default Applicant;