import AdminDashboard from "../../AdminDashboard"
import DataTable from "../../../components/DataTable"
import { Link } from "react-router-dom"

const headers = ['ID', 'Nama', 'Cabang', 'Departement', 'Jabatan', 'Actions']

const data = [];  
const Vacancy = () => {
    return ( 
      <AdminDashboard label="">
        <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Pelamar</h2>
                <Link to="/master-data/applicant/create" className="btn icon icon-left btn-primary"><i className="bi bi-plus"/> Tambah</Link>
              </div>
              <div className="card-body">
              <DataTable headers={headers} data={data} type="employee" />
              </div>
            </div>
        </section>
      </AdminDashboard>
     );
}
 
export default Vacancy;