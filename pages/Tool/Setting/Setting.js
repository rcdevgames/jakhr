import AdminDashboard from "../../AdminDashboard"
import UploadFile from "../../../components/UploadFile"

const Setting = () => {
    const closingDateOptions = [];

    for (let i = 0; i <= 27; i++) {
      const value = i < 10 ? `0${i}` : i;
      const label = i === 0 ? '00 (pergantian bulan)' : value;

      closingDateOptions.push(
        <option key={value} value={value}>
          {label}
        </option>
      );
    }

    return ( 
      <AdminDashboard label="">
        <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Pengaturan </h2>

              </div>
              <div className="card-body">
                <div className="form form-horizontal">
                  <div className="form-body">
                      <div className="form-group">
                          <label>Nama Perusahaan:</label>
                          <input type="text" className="form-control" />
                      </div>  
                      <div className="form-group">
                          <label>Email:</label>
                          <input type="email" className="form-control" />
                      </div> 
                      <div className="form-group">
                          <label>Alamat:</label>
                          <input type="text" className="form-control" />
                      </div>  
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Phone:</label>
                            <input type="number" className="form-control" />
                          </div>  
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>NPWP:</label>
                            <input type="text" className="form-control" />
                          </div>  
                        </div>
                        
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Logo:</label>
                            <UploadFile />

                          </div>  
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Potongan Pajak :</label>
                            <select className="form-select">
                              <option value="1">Yes</option>
                              <option value="0">No</option>
                            </select>
                          </div>  
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Tunjangan Pajak dalam % :</label>
                            <input type="number" className="form-control" />
                          </div>  
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Mode Perhitungan Keterlambatan :</label>
                            <select className="form-select">
                              <option value="1">Proporsional</option>
                              <option value="0">Pembulatan</option>
                            </select>
                          </div>  
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Tanggal Tutup Buku :</label>
                            <select className="form-select">
                              {closingDateOptions}
                            </select>
                          </div>  
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Pulang Cepat terhitung sebagai Terlambat :</label>
                            <select className="form-select">
                              <option value="0">No</option>
                              <option value="1">Yes</option>
                            </select>
                          </div>  
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>PIN saat Absensi :</label>
                            <select className="form-select">
                              <option value="0">No</option>
                              <option value="1">Yes</option>
                            </select>
                          </div>  
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Admin Cabang hanya bisa Akses Data Cabang :</label>
                            <select className="form-select">
                              <option value="0">No</option>
                              <option value="1">Yes</option>
                            </select>
                          </div>  
                        </div>
                        <div className="col-md-6">
                          <div className="form-group">
                            <label>Perbolehkan Absensi di Kantor Cabang Lain :</label>
                            <select className="form-select">
                              <option value="0">No</option>
                              <option value="1">Yes</option>
                            </select>
                          </div>  
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
 
export default Setting;