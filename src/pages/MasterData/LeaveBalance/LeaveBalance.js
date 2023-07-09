import {useState} from 'react'
import AdminDashboard from "../../AdminDashboard"
import DatePicker from "../../../components/DatePicker"
import Modal from "../../../components/Modal"

const LeaveBalance = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [modalLeave, setModalLeave] = useState(false);
    const [rows,
      setRows] = useState([
      {
          name: "",
          description: ""
      }
    ]);
    const addRow = () => {
        setRows([
            ...rows, {
                name: "",
                description: ""
            }
        ]);
    };
    
    const toggleCollapse = () => {
      setIsCollapsed(!isCollapsed);
    };

    const handleOpenModal= () => {
      setModalLeave(true);
    };
  
    const handleCloseModal= () => {
      setModalLeave(false);
    };

  
    const removeRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);
    };

    const handleForm = (e) => {
        e.preventDefault();

        // Buat array kosong untuk menampung data yang telah diproses
        const processedRows = [];

        // Loop through setiap baris pada tabel
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];

            // Lakukan proses validasi disini ... Jika proses validasi sukses, masukkan data
            // ke array yang telah diproses
            processedRows.push(row);
        }

        console.table(rows)

    };

    const handleChange = (e, index) => {
        const {name, value} = e.target;
        const newRows = [...rows];
        newRows[index] = {
            ...newRows[index],
            [name]: value
        };
        setRows(newRows);
    }

    return ( 
      <AdminDashboard label="">
        <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Form Saldo &amp; Cuti Bersama</h2>
                <button onClick={toggleCollapse} className="btn icon icon-left btn-primary shadow"><i className="bi bi-plus"></i> Generator</button>
              </div>
              <div className="card-body">
                <div className="row">
                  {!isCollapsed && (
                    <>
                     <div className="col-md-6 col-12">
                     <div className="card shadow">
                       <div className="card-header">
                         <h4>Rubah Saldo</h4>
                       </div>
                       <div className="card-body">
                        
                        <form>
                          <div className="form-group">
                            <label>Karyawan: </label>
                            <select className="form-select">
                              <option></option>
                              <option>All</option>
                              <option>00001 - Karyawan</option>
                            </select>
                          </div>

                          <div className="form-group">
                            <label>Tambah Saldo (+): </label>
                            <input type="number" className="form-control" />
                          </div>

                          <div className="form-group">
                            <label>Kurangi Saldo (-): </label>
                            <input type="number" className="form-control" />
                          </div>

                        
                        </form>
                     
 
                        <button className="btn btn-primary shadow mt-3">Submit</button>

                       </div>
                     </div>
                   </div>
                   <div className="col-md-6 col-12">
                     <div className="card shadow">
                       <div className="card-header">
                         <h4>Reset Saldo</h4>
                       </div>
                       <div className="card-body">
                        <form>
                            <div className="form-group">
                              <label>Karyawan: </label>
                              <select className="form-select">
                                <option></option>
                                <option>All</option>
                                <option>00001 - Karyawan</option>
                              </select>
                            </div>

                            <div className="form-group">
                              <label>Jika Saldo >= : </label>
                              <input type="number" className="form-control" />
                            </div>

                            <div className="form-group">
                              <label>Atur Saldo Menjadi : </label>
                              <input type="number" className="form-control" />
                            </div>

                           
                          </form>
                          <button className="btn btn-primary shadow mt-3">Submit</button>
                       </div>
                     </div>
                   </div> 
                   </>
                  )}
                  <div className="col-md-6 col-12">
                    <div className="card shadow">
                      <div className="card-header">
                        <h4>Cuti Bersama</h4>
                      </div>
                      <div className="card-body">
                          <div className="table-responsive">
                              <table className="table mb-0">
                                <thead>
                                  <th>Tanggal: </th>
                                  <th>Keterangan: </th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                    <DatePicker disabled={true}/>
                                    </td>
                                    <td>
                                      <input type="text" className="form-control" disabled/>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                          </div>

                          <button onClick={handleOpenModal} className="btn icon btn-light shadow mt-3"><i style={{color: '#039BE5' }} className="bi bi-plus"></i></button>
                          { modalLeave && (
                            <Modal 
                            title="Cuti Bersama" 
                            closeModal={ handleCloseModal }
                            show={modalLeave}>
                            <form action="#">
                              <div className="modal-body">
                              <form className="form-horizontal">
                                  <div className="table-responsive">
                                      <table className="table table-bordered table-striped table-highlight">
                                          <thead>
                                              <th>Tanggal:</th>
                                              <th>Keterangan:</th>
                                              <th></th>
                                          </thead>
                                          <tbody>
                                              {rows.map((row, index) => (
                                                  <tr key={index}>
                                                  
                                                      <td>
                                                          <DatePicker onChange={(e) => handleChange(e, index)}/>
                                                      </td>

                                                      <td>
                                                        <input
                                                          type="text"
                                                          className="form-control"
                                                          value={row.description}
                                                          name="description"
                                                          onChange={(e) => handleChange(e, index)}/></td>
                                                      <td>
                                                          <button
                                                              type="button"
                                                              className="btn btn-sm btn-icon btn-danger shadow"
                                                              onClick={() => removeRow(index)}>-</button>
                                                      </td>
                                                  </tr>
                                              ))}
                                          </tbody>

                                      </table>

                                  </div>
                              </form>
                              </div>
                              <div className="modal-footer">
                          
                                <button onClick={addRow} type="button" className="btn btn-light-secondary shadow">
                                  +
                                </button>
                                <button type="button" className="btn btn-primary ms-1 shadow">
                                  <i className="bx bx-check d-block d-sm-none"></i>
                                  <span className="d-none d-sm-block">Submit</span>
                                </button>
                              </div>
                            </form>
                          </Modal>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-12">
                    <div className="card shadow">
                      <div className="card-header">
                        <h4>Atur Saldo per Karyawan</h4>
                      </div>
                      <div className="card-body">
                          <div className="table-responsive">
                              <table className="table mb-0">
                                <thead>
                                  <th>Tanggal: </th>
                                  <th>Keterangan: </th>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>
                                    <select className="form-select">
                                      <option></option>
                                      <option value="00001">0001 - Karyawan</option>
                                    </select>
                                    </td>
                                    <td>
                                      <input type="number" className="form-control" />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                          </div>

                          <button className="btn btn-primary shadow mt-3">Submit</button>
                      </div>
                    </div>
                  </div>  
                </div>
              </div>
            </div>
           
           
        </section>
      </AdminDashboard>
     );
}
 
export default LeaveBalance;