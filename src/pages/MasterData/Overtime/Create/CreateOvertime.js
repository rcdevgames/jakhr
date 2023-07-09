import {useState} from "react";
import AdminDashboard from "../../../AdminDashboard"
import './style.css'
import DatePicker from "../../../../components/DatePicker"
import TimeInput from '../../../../components/TimeInput';

const CreateOvertime = () => {
    const [date,setDate] = useState("");
    const [scheduleIn,setScheduleIn] = useState("");
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [rows,
        setRows] = useState([
        {
            name: "",
            group: "",
            weight: "",
            target: ""
        }
    ]);
    const addRow = () => {
        setRows([
            ...rows, {
                name: "",
                group: "",
                weight: "",
                target: ""
            }
        ]);
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
    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleScheduleIn = (date) => {
        setScheduleIn(date);
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

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed);
      };

    return (
        <AdminDashboard label="">
            <section className="section">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h2>Form Lembur</h2>
                        <button onClick={toggleCollapse} className="btn btn-primary shadow"><b>+</b> Generator</button>
                    </div>
                    <div className="card-body">
                    {!isCollapsed && (
                        <form className="form mb-3">
                            <div className="row">
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <select className="form-select" required>
                                            <option value="00001">00001 - Karyawan</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <DatePicker value={date} onChange={handleDateChange} placeholder="Dari Tanggal"/>
                                    </div>
                                </div>
                              
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <DatePicker value={date} onChange={handleDateChange} placeholder="Sampai Tanggal"/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <TimeInput
                                        className="form-control"
                                        value={scheduleIn}
                                        onChange={handleScheduleIn}
                                        placeholder="Mulai Jam"/>
                                    </div>
                                </div>
                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <TimeInput
                                        className="form-control"
                                        value={scheduleIn}
                                        onChange={handleScheduleIn}
                                        placeholder="Selesai Jam"/>
                                    </div>
                                </div>

                                <div className="col-md-6 col-12">
                                    <div className="form-group">
                                        <input type="text" className="form-control" placeholder="Keterangan"/>
                                    </div>
                                </div>

                                <div className="col-md-6 col-12">
                                    <button className="btn btn-primary shadow">Generate</button>
                                </div>
                            </div>
                        </form>
                    )}
                        <form className="form-horizontal">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-highlight">
                                    <thead>
                                        <th>Nama</th>
                                        <th>Tipe: </th>
                                        <th>Mulai Tanggal :</th>
                                        <th>Jam :</th> 
                                        <th>Selesai Tanggal :</th>
                                        <th>Jam :</th> 
                                        <th>Keterangan: </th> 
                                        <th>App</th> 
                                        <th>Val</th> 
                                        <th></th>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <select className="form-select" required>
                                                        <option value="00001">00001 - Karyawan</option>
                                                    </select>
                                                </td>
                                                <td>
                                               
                                                    <select className="form-select" required>
                                                        <option></option>
                                                        <option value="regular">Regular</option>
                                                        <option value="special">Special</option>
                                                    </select>
                                            
                                                </td>
                                                <td>
                                                    <DatePicker value={date} onChange={handleDateChange}/>
                                                </td>
                                                <td style={{minWidth: '170px'}}>
                                                    <TimeInput
                                                    className="form-control"
                                                    value={scheduleIn}
                                                    onChange={handleScheduleIn}/>
                                                </td>
                                                <td>
                                                    <DatePicker value={date} onChange={handleDateChange}/>
                                                </td>
                                                <td style={{minWidth: '170px'}}>
                                                    <TimeInput
                                                    className="form-control"
                                                    value={scheduleIn}
                                                    onChange={handleScheduleIn}/>
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={row.target}
                                                        name="target"
                                                        onChange={(e) => handleChange(e, index)}/></td>
                                                <td>
                                                    <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input form-check-primary form-check-glow"
                                                        
                                                        name="customCheck"
                                                        id="checkboxGlow1"
                                                    />
                                                    
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="custom-control custom-checkbox">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input form-check-primary form-check-glow"
                                                        name="customCheck"
                                                        id="checkboxGlow1"
                                                    />
                                                    
                                                    </div>
                                                </td>
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
                        <div className="d-flex justify-content-between">
                            <button type="button" className="btn btn-primary shadow" onClick={handleForm}>Submit</button>
                            <button type="button" className="btn btn-secondary shadow" onClick={addRow}>
                                <i className="bi bi-plus"></i>
                            </button>

                        </div>
                    </div>
                </div>
            </section>
        </AdminDashboard>
    );
}

export default CreateOvertime;