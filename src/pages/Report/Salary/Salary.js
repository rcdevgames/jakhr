import {useState} from "react";

import AdminDashboard from "../../AdminDashboard"
import DataTable from "../../../components/DataTable/DataTable"
import DatePicker from "../../../components/DatePicker"

const headers = ['Periode', 'ID','Nama', 'Gaji', 'Terhutang', 'Terbayar', 'Actions']
const data = [];  
const Salary = () => {
    const [date,setDate] = useState("");
    const handleDateChange = (date) => {
        setDate(date);
    };


    return ( 
      <AdminDashboard label="">
        <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Laporan Gaji</h2>
        
              </div>
              <div className="card-body">
                <form>
                  <div className="row d-flex align-items-end">
                    <div className="col-md-7">
                      <div className="form-group">
                        <label>Keyword</label>
                        <input type="text" className="form-control" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label>Periode</label>
                        <DatePicker dateFormat="Y-m" value={date} onChange={handleDateChange} placeholder=""/>
                      </div>
                    </div>
                    <div className="col-md-1">
                      <div className="form-group">
                        <button className="btn icon btn-primary"><i className="bi bi-search"></i></button>
                      </div>
                    </div>
                  </div>
                </form>
              
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-highlight">
                        <thead>
                            <th>Periode</th>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Bank</th>
                            <th>Hari Kerja</th>
                            <th>Gaji</th>
                            <th>Action</th>
                            <th></th>
                        </thead>
                        <tbody>
                          <tr>
                            <td>April 2023</td>
                            <td>0001</td>
                            <td>Karyawan 1</td>
                            <td>BCA - 0</td>
                            <td>2 Hari</td>
                            <td>213,430	</td>
                            <td><button className="btn icon btn-primary"><i className="bi bi-eye"></i></button></td>
                          </tr>
                          <tr>
                            <td>Total: </td>
                            <td>213,430 </td>
                          </tr>
                        </tbody>
                        
                    </table>
                </div>
              </div>
            </div>
        </section>
      </AdminDashboard>
     );
}
 
export default Salary;