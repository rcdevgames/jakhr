import {useState} from "react";
import AdminDashboard from "../../../AdminDashboard"
import './style.css'
const CreateSalary = () => {
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
                        <h2>Form Gaji</h2>

                    </div>
                    <div className="card-body">
                        <form className="form-horizontal">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-highlight">
                                    <thead>
                                        <th>Nama Karyawan
                                        </th>
                                        <th>Gaji Pokok
                                        </th>
                                        <th>Tunjangan Tetap
                                        </th>
                                        <th>Tunjangan Lainnya
                                        </th>
                                        <th>Tunjangan Harian
                                        </th>
                                        <th>Asuransi oleh Karyawan :</th>
                                        <th>BPJS JHT (%)
                                        </th>
                                        <th>BPJS Kesehatan (%)
                                        </th>
                                        <th>BPJS JP (%)
                                        </th>
                                        <th>Lainnya (%)
                                        </th>
                                        <th>Asuransi oleh Perusahaan :</th>
                                        <th>BPJS JHT (%)
                                        </th>
                                        <th>BPJS Kesehatan (%)
                                        </th>
                                        <th>BPJS JP (%)
                                        </th>
                                        <th>Lainnya (%)
                                        </th>
                                        <th>BPJS JKM (%)
                                        </th>
                                        <th>BPJS JKK (%)
                                        </th>
                                        <th></th>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, index) => (
                                            <tr key={index}>
                                                <td style={{minWidth:'200px'}}>
                                                    <select className="form-select" name="emp_id[]" id="emp_id" on="" required>
                                                        <option value="00001">00001 - Karyawan</option>
                                                    </select>
                                                </td>
                                                <td style={{minWidth:'150px'}}>
                                                    <input
                                                        required
                                                        maxlength="25"
                                                        className="form-control"
                                                        id="emp_basicsalary" />
                                                </td>
                                                <td style={{minWidth:'150px'}}>
                                                    <input
                                                        required
                                                        maxlength="25"
                                                        className="form-control"
                                                        id="emp_fixedallowance" />
                                                    
                                                </td>
                                                <td style={{minWidth:'150px'}}>
                                                    <input
                                                        required
                                                        maxlength="25"
                                                        className="form-control"
                                                        id="emp_otherallowance"/>
                                                </td>
                                                <td style={{minWidth:'150px'}}>
                                                    <input
                                                        required
                                                        maxlength="25"
                                                        className="form-control"
                                                        name="emp_dailyallowance[]"
                                                        id="emp_dailyallowance"/>
                                                </td>
                                                <td style={{minWidth:'150px'}}></td>
                                                <td style={{minWidth:'110px'}}>
                                                    <input
                                                        required
                                                        type="number"
                                                        step="0.01"
                                                        className="form-control"
                                                        name="emp_ins_employment[]"
                                                        id="emp_ins_employment"/>
                                                </td>
                                                <td style={{minWidth:'110px'}}>
                                                        <input
                                                            required
                                                            type="number"
                                                            step="0.01"
                                                            className="form-control"
                                                            name="emp_ins_health[]"
                                                            id="emp_ins_health"/>
                                                </td>
                                                <td style={{minWidth:'110px'}}>
                                                    <input
                                                        required
                                                        type="number"
                                                        step="0.01"
                                                        className="form-control"
                                                        name="emp_ins_pension[]"
                                                        id="emp_ins_pension"/>
                                                </td>
                                                <td style={{minWidth:'110px'}}>
                                                    <input
                                                        required
                                                        type="number"
                                                        step="0.01"
                                                        className="form-control"
                                                        name="emp_ins_other[]"
                                                        id="emp_ins_other"/>
                                                </td>
                                                <td style={{minWidth:'150px'}}></td>
                                                <td style={{minWidth:'110px'}}>
                                                    <input
                                                        required
                                                        type="number"
                                                        step="0.01"
                                                        className="form-control"
                                                        name="emp_ins_employment2[]"
                                                        id="emp_ins_employment2"/>
                                                </td>
                                                <td style={{minWidth:'110px'}}>
                                                    <input
                                                        required
                                                        type="number"
                                                        step="0.01"
                                                        className="form-control"
                                                        name="emp_ins_health2[]"
                                                        id="emp_ins_health2"/>
                                                </td>
                                                <td style={{minWidth:'110px'}}>
                                                    <input
                                                        required
                                                        type="number"
                                                        step="0.01"
                                                        className="form-control"
                                                        name="emp_ins_pension2[]"
                                                        id="emp_ins_pension2"/>
                                                </td>
                                                <td style={{minWidth:'110px'}}>
                                                    <input
                                                        required
                                                        type="number"
                                                        step="0.01"
                                                        className="form-control"
                                                        name="emp_ins_other2[]"
                                                        id="emp_ins_other2"/>
                                                </td>
                                                <td style={{minWidth:'110px'}}>
                                                    <input
                                                        required
                                                        type="number"
                                                        step="0.01"
                                                        className="form-control"
                                                        name="emp_ins_jk2[]"
                                                        id="emp_ins_jk2"/>
                                                </td>
                                                <td style={{minWidth:'110px'}}>
                                                    <input
                                                        required
                                                        type="number"
                                                        step="0.01"
                                                        className="form-control"
                                                        name="emp_ins_jkk2[]"
                                                        id="emp_ins_jkk2"/>
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

export default CreateSalary;