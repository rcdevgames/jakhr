import AdminDashboard from "../../AdminDashboard"
import DataTable from "../../../components/DataTable/DataTable"
import {Link} from 'react-router-dom'

const headers = ['ID','Nama', 'Tanggal', 'Link', 'Data']
const data = [];  
const SystemLog = () => {
    return ( 
      <AdminDashboard label="">
        <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>System Log</h2>
        
              </div>
              <div className="card-body">
              <DataTable headers={headers} data={data} type="system_log" />
              </div>
            </div>
        </section>
      </AdminDashboard>
     );
}
 
export default SystemLog;