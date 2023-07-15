import AdminDashboard from "../../AdminDashboard"
import DataTable from "../../../components/DataTable/DataTable"
import {Link} from 'react-router-dom'

const headers = ['Periode', 'ID','Nama', 'Cabang', 'Dept', 'Jabatan', 'Kasbon']
const data = [];  
const Cash = () => {
    return ( 
      <AdminDashboard label="">
        <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Laporan Kasbon</h2>
        
              </div>
              <div className="card-body">
              <DataTable headers={headers} data={data} type="report_applicant" />
              </div>
            </div>
        </section>
      </AdminDashboard>
     );
}
 
export default Cash;