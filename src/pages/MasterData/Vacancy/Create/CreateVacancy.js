import { useState } from "react"
import AdminDashboard from "../../../AdminDashboard"
import DatePicker from "../../../../components/DatePicker"
import RichText from "../../../../components/RichText"

const CreateVacancy = () => {
    const [data, setData] = useState({
        status: '',
    });
    const [content, setContent] = useState("")
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(prevState => ({ ...prevState, [name]: value }));
    }
    const handleContentChange = (data) => {
        setContent(data);
    };

    return ( 
	 <AdminDashboard label="">
       <section className="section">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h2>Form Lowongan Pekerjaan</h2>
              </div>
              <div className="card-body">
                <div className="row">
                    <div className="col-md-6 col-12">
                        <div className="form-group">
                            <label>Cabang</label>
                            <select className="form-select">
                                <option></option>
                                <option>Kantor Pusat</option>
                                <option>Kantor Cabang</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="form-group">
                            <label>Tanggal Mulai</label>
                            <DatePicker />
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="form-group">
                            <label>Departemen</label>
                            <select className="form-select">
                                <option></option>
                                <option>HRD</option>
                                <option>Technology</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="form-group">
                            <label>Tanggal Berakhir</label>
                            <DatePicker />
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="form-group">
                            <label>Jabatan</label>
                            <select className="form-select">
                                <option></option>
                                <option>Manager</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-md-6 col-12">
                        <div className="form-group">
                            <label>Status</label>
                            <select className="form-select" name="status" onChange={handleChange}>
                                <option></option>
                                <option value="permanent">Permanen/Tetap</option>
                                <option value="contract">Kontrak</option>
                                <option value="all">Lainnya</option>
                            </select>
                        </div>
                    </div>

                    {
                      data.status == 'contract' && (<div className="col-md-6 col-12">
                        <div className="form-group">
                            <label>Periode Kontrak</label>
                            <select className="form-select">
                                <option></option>
                                <option>Permanen/Tetap</option>
                                <option>Kontrak</option>
                                <option>Lainnya</option>
                            </select>
                        </div>
                    </div>
                    )
                    }

                    <div className="col-12">
                    <RichText content={content} onContentChange={handleContentChange} showingTemplate={false}/>
                    
                    </div>

                    
                </div>
                <button className="btn btn-primary shadow mt-3">Submit</button>

              </div>
            </div>
        </section>
      </AdminDashboard>
     );
}
 
export default CreateVacancy;