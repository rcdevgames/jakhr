import {useState} from "react";
import AdminDashboard from "../../../AdminDashboard"
import './style.css'
const CreateKpi = () => {
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
                        <h2>Tambah KPI</h2>

                    </div>
                    <div className="card-body">
                        <form className="form-horizontal">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-highlight">
                                    <thead>
                                        <th>Nama</th>
                                        <th>Group</th>
                                        <th>Bobot(%)</th>
                                        <th>Target</th>
                                        <th></th>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, index) => (
                                            <tr key={index}>
                                                <td><input
                                                    type="text"
                                                    className="form-control"
                                                    value={row.name}
                                                    name="name"
                                                    onChange={(e) => handleChange(e, index)}/></td>
                                                <td>
                                                    <select
                                                        className="form-control"
                                                        value={row.group}
                                                        name="group"
                                                        onChange={(e) => handleChange(e, index)}>
                                                        <option ></option>
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={row.weight}
                                                        name="weight"
                                                        onChange={(e) => handleChange(e, index)}/>
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={row.target}
                                                        name="target"
                                                        onChange={(e) => handleChange(e, index)}/></td>
                                                <td >
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
                                +
                            </button>

                        </div>
                    </div>
                </div>
            </section>
        </AdminDashboard>
    );
}

export default CreateKpi;