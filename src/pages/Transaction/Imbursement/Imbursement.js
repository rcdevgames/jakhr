import AdminDashboard from "../../AdminDashboard"
import DataTable from "../../../components/DataTable/DataTable"
import { Link } from "react-router-dom";

const headers = ['ID', 'Nama', 'Tanggal', 'Jumlah','Keterangan', 'App', 'Paid', 'Actions']
const data = [];  
const Imbursement = () => {
    return ( 
      <AdminDashboard label="">
        <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Reimbursement</h2>
                <Link to="/transaction/imbursement/create" className="btn icon icon-left btn-primary"><i className="bi bi-plus"/> Tambah</Link>
              </div>
              <div className="card-body">
              <DataTable headers={headers} data={data} type="imbursement" showTrash={false} />
              </div>
            </div>
        </section>
      </AdminDashboard>
     );
}
 
export default Imbursement;