import { Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard"
import DataTable from "../../../components/DataTable"


const headers = ['ID', 'Nama', 'Alamat', 'Action']
const branches = [];
const Branch = () => {
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