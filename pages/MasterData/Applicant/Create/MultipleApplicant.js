import {useState} from "react";
import AdminDashboard from "../../../AdminDashboard"
import DatePicker from "../../../../components/DatePicker"

const MultipleApplicant = () => {
    const [rows,
        setRows] = useState([
        {
            name: "",
            group: "",
            weight: "",
            target: ""
        }
    ]);
    const [files, setFiles] = useState([])

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
                        <h2>Form Multiple Pelamar</h2>

                    </div>
                    <div className="card-body">
                        <form className="form-horizontal">
                            <div className="table-responsive">
                                <table className="table table-bordered table-striped table-highlight">
                                    <thead>
                                        <th>Cabang </th>
                                        <th>Departemen </th>
                                        <th>Jabatan </th>
                                        <th>Nama </th>
                                        <th>NIK Khusus (optional) </th>
                                        <th>Agama </th>
                                        <th>Tempat lahir </th>
                                        <th>Tanggal lahir </th>
                                        <th>Jenis Kelamin </th>
                                        <th>No. Handphone </th>
                                        <th>Email </th>
                                        <th>Alamat </th>
                                        <th>Domisili (optional) </th>
                                        <th>Pendidikan Terakhir </th>
                                        <th>No Identitas (KTP) </th>
                                        <th>NPWP </th>
                                        <th>Tipe Pajak </th>
                                        <th>Nama Bank </th>
                                        <th>No. Akun Bank </th>
                                        <th>No. Kartu Asuransi Ketenagakerjaan </th>
                                        <th>No. Asuransi Kesehatan </th>
                                        <th>Tanggal masuk </th>
                                        <th>Status </th>
                                        <th>Periode Kontrak </th>
                                    </thead>
                                    <tbody>
                                        {rows.map((row, index) => (
                                            <tr key={index}>
                                                <td style={{minWidth:'160px'}}>
                                                    <select
                                                        className="form-select"
                                                        
                                                        name="group"
                                                        onChange={(e) => handleChange(e, index)}>
                                                        <option ></option>
                                                        <option value="1">1 - Kantor Pusat</option>
                                                        <option value="2">2 - Cabang 1</option>
                                                    </select>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <select
                                                        className="form-select"
                                                        name="group"
                                                        onChange={(e) => handleChange(e, index)}>
                                                        <option ></option>
                                                        <option value="1">1 - HRD</option>
                                                        <option value="2">2 - Technology</option>
                                                    </select>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <select
                                                        className="form-select"
                                                        name="group"
                                                        onChange={(e) => handleChange(e, index)}>
                                                        <option ></option>
                                                        <option value="1">1 - Manager</option>
                                                        
                                                    </select>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="target"
                                                        onChange={(e) => handleChange(e, index)}/>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="target"
                                                        onChange={(e) => handleChange(e, index)}/>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <select
                                                        className="form-select"
                                                        name="group"
                                                        onChange={(e) => handleChange(e, index)}>
                                                        <option></option>
                                                        <option value="1">Islam</option>
                                                        <option value="2">Kristen Protestan</option>
                                                        <option value="3">Kristen Katholik</option>
                                                        <option value="4">Hindu</option>
                                                        <option value="5">Budha</option>
                                                        <option value="6">Konghucu</option>
                                                        
                                                    </select>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="target"
                                                        onChange={(e) => handleChange(e, index)}/>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <DatePicker />
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <select
                                                        className="form-select"
                                                        name="group"
                                                        onChange={(e) => handleChange(e, index)}>
                                                        <option ></option>
                                                        <option value="M">Laki-laki</option>
                                                        <option value="F">Perempuan</option>
                                                    </select>
                                                </td>

                                                <td style={{minWidth:'160px'}}>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="target"
                                                        onChange={(e) => handleChange(e, index)}/>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="target"
                                                        onChange={(e) => handleChange(e, index)}/>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="target"
                                                        onChange={(e) => handleChange(e, index)}/>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="target"
                                                        onChange={(e) => handleChange(e, index)}/>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <select
                                                        className="form-select"
                                                        name="group"
                                                        onChange={(e) => handleChange(e, index)}>
                                                        <option></option>
                                                        <option value="0">Belum Tersedia</option>
                                                        <option value="SD">SD atau sederajat</option>
                                                        <option value="SMP">SMP atau sederajat</option>
                                                        <option value="SMA">SMA/SMK atau sederajat</option>
                                                        <option value="D3">D3 (Ahli Madya)</option>
                                                        <option value="D4">D4 (Sarjana Terapan)</option>
                                                        <option value="S1">S1 (Sarjana)</option>
                                                        <option value="S2">S2 (Magister)</option>
                                                        <option value="S3">S3 (Doktor)</option>
                                                    </select>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="target"
                                                        onChange={(e) => handleChange(e, index)}/>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="target"
                                                        onChange={(e) => handleChange(e, index)}/>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <select
                                                        className="form-select"
                                                        name="group"
                                                        onChange={(e) => handleChange(e, index)}>
                                                        <option></option>
                                                        <option value="K/0">K/0 - KAWIN TANPA TANGGUNGAN</option>
                                                        <option value="K/1">K/1 - KAWIN DENGAN 1 TANGGUNGAN</option>
                                                        <option value="K/2">K/2 - KAWIN DENGAN 2 TANGGUNGAN</option>
                                                        <option value="K/3">K/3 - KAWIN DENGAN 3 TANGGUNGAN</option>
                                                        <option value="TK/0">TK/0 - TIDAK KAWIN TANPA TANGGUNGAN</option>
                                                        <option value="TK/1">TK/1 - TIDAK KAWIN DENGAN 1 TANGGUNGAN</option>
                                                        <option value="TK/2">TK/2 - TIDAK KAWIN DENGAN 2 TANGGUNGAN</option>
                                                        <option value="TK/3">TK/3 - TIDAK KAWIN DENGAN 3 TANGGUNGAN</option>
                                                    </select>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <select
                                                        className="form-select"
                                                        name="group"
                                                        onChange={(e) => handleChange(e, index)}>
                                                        
                                                        <option value="ALLO">ALLO</option>
                                                        <option value="ANGLOMAS">ANGLOMAS</option>
                                                        <option value="BANGKOK">BANGKOK</option>
                                                        <option value="AGRIS">AGRIS</option>
                                                        <option value="ALADIN">ALADIN</option>
                                                        <option value="AMAR">AMAR</option>
                                                        <option value="ANDARA">ANDARA</option>
                                                        <option value="ANZ">ANZ</option>
                                                        <option value="ARTA_NIAGA_KENCANA">ARTA_NIAGA_KENCANA</option>
                                                        <option value="ARTHA">ARTHA</option>
                                                        <option value="ARTOS">ARTOS</option>
                                                        <option value="BISNIS_INTERNASIONAL">BISNIS_INTERNASIONAL</option>
                                                        <option value="BJB">BJB</option>
                                                        <option value="BJB_SYR">BJB_SYR</option>
                                                        <option value="BNI_SYR">BNI_SYR</option>
                                                        <option value="BNP_PARIBAS">BNP_PARIBAS</option>
                                                        <option value="AGRONIAGA">AGRONIAGA</option>
                                                        <option value="BUKOPIN">BUKOPIN</option>
                                                        <option value="BUMI_ARTA">BUMI_ARTA</option>
                                                        <option value="CAPITAL">CAPITAL</option>
                                                        <option value="BCA">BCA</option>
                                                        <option value="BCA_SYR">BCA_SYR</option>
                                                        <option value="CHINATRUST">CHINATRUST</option>
                                                        <option value="CIMB">CIMB</option>
                                                        <option value="CIMB_UUS">CIMB_UUS</option>
                                                        <option value="COMMONWEALTH">COMMONWEALTH</option>
                                                        <option value="DANAMON">DANAMON</option>
                                                        <option value="DANAMON_UUS">DANAMON_UUS</option>
                                                        <option value="DBS">DBS</option>
                                                        <option value="DINAR_INDONESIA">DINAR_INDONESIA</option>
                                                        <option value="DKI">DKI</option>
                                                        <option value="DKI_UUS">DKI_UUS</option>
                                                        <option value="FAMA">FAMA</option>
                                                        <option value="GANESHA">GANESHA</option>
                                                        <option value="HANA">HANA</option>
                                                        <option value="HARDA_INTERNASIONAL">HARDA_INTERNASIONAL</option>
                                                        <option value="HIMPUNAN_SAUDARA">HIMPUNAN_SAUDARA</option>
                                                        <option value="IBK">IBK</option>
                                                        <option value="ICBC">ICBC</option>
                                                        <option value="INA_PERDANA">INA_PERDANA</option>
                                                        <option value="INDEX_SELINDO">INDEX_SELINDO</option>
                                                        <option value="JAGO">JAGO</option>
                                                        <option value="JASA_JAKARTA">JASA_JAKARTA</option>
                                                        <option value="JTRUST">JTRUST</option>
                                                        <option value="KESEJAHTERAAN_EKONOMI">KESEJAHTERAAN_EKONOMI</option>
                                                        <option value="MANDIRI">MANDIRI</option>
                                                        <option value="MASPION">MASPION</option>
                                                        <option value="MAYAPADA">MAYAPADA</option>
                                                        <option value="MAYBANK">MAYBANK</option>
                                                        <option value="MAYBANK_SYR">MAYBANK_SYR</option>
                                                        <option value="MAYORA">MAYORA</option>
                                                        <option value="MEGA">MEGA</option>
                                                        <option value="MESTIKA_DHARMA">MESTIKA_DHARMA</option>
                                                        <option value="MITRA_NIAGA">MITRA_NIAGA</option>
                                                        <option value="MIZUHO">MIZUHO</option>
                                                        <option value="MNC_INTERNASIONAL">MNC_INTERNASIONAL</option>
                                                        <option value="MUAMALAT">MUAMALAT</option>
                                                        <option value="MULTI_ARTA_SENTOSA">MULTI_ARTA_SENTOSA</option>
                                                        <option value="NATIONALNOBU">NATIONALNOBU</option>
                                                        <option value="BNI">BNI</option>
                                                        <option value="BNC">BNC</option>
                                                        <option value="NUSANTARA_PARAHYANGAN">NUSANTARA_PARAHYANGAN</option>
                                                        <option value="OCBC">OCBC</option>
                                                        <option value="OCBC_UUS">OCBC_UUS</option>
                                                        <option value="BAML">BAML</option>
                                                        <option value="BOC">BOC</option>
                                                        <option value="INDIA">INDIA</option>
                                                        <option value="TOKYO">TOKYO</option>
                                                        <option value="OKE">OKE</option>
                                                        <option value="PANIN">PANIN</option>
                                                        <option value="PANIN_SYR">PANIN_SYR</option>
                                                        <option value="PERMATA">PERMATA</option>
                                                        <option value="PERMATA_UUS">PERMATA_UUS</option>
                                                        <option value="QNB_INDONESIA">QNB_INDONESIA</option>
                                                        <option value="RABOBANK">RABOBANK</option>
                                                        <option value="BRI">BRI</option>
                                                        <option value="RESONA">RESONA</option>
                                                        <option value="ROYAL">ROYAL</option>
                                                        <option value="SAHABAT_SAMPOERNA">SAHABAT_SAMPOERNA</option>
                                                        <option value="SBI_INDONESIA">SBI_INDONESIA</option>
                                                        <option value="SEABANK">SEABANK</option>
                                                        <option value="SHINHAN">SHINHAN</option>
                                                        <option value="SINARMAS">SINARMAS</option>
                                                        <option value="SINARMAS_UUS">SINARMAS_UUS</option>
                                                        <option value="MITSUI">MITSUI</option>
                                                        <option value="BRI_SYR">BRI_SYR</option>
                                                        <option value="BUKOPIN_SYR">BUKOPIN_SYR</option>
                                                        <option value="BSI">BSI</option>
                                                        <option value="MANDIRI_SYR">MANDIRI_SYR</option>
                                                        <option value="MEGA_SYR">MEGA_SYR</option>
                                                        <option value="BTN">BTN</option>
                                                        <option value="BTN_UUS">BTN_UUS</option>
                                                        <option value="TABUNGAN_PENSIUNAN_NASIONAL">TABUNGAN_PENSIUNAN_NASIONAL</option>
                                                        <option value="UOB">UOB</option>
                                                        <option value="VICTORIA_INTERNASIONAL">VICTORIA_INTERNASIONAL</option>
                                                        <option value="VICTORIA_SYR">VICTORIA_SYR</option>
                                                        <option value="WOORI">WOORI</option>
                                                        <option value="WOORI_SAUDARA">WOORI_SAUDARA</option>
                                                        <option value="YUDHA_BHAKTI">YUDHA_BHAKTI</option>
                                                        <option value="ACEH">ACEH</option>
                                                        <option value="ACEH_UUS">ACEH_UUS</option>
                                                        <option value="BALI">BALI</option>
                                                        <option value="BANTEN">BANTEN</option>
                                                        <option value="BENGKULU">BENGKULU</option>
                                                        <option value="DAERAH_ISTIMEWA">DAERAH_ISTIMEWA</option>
                                                        <option value="DAERAH_ISTIMEWA_UUS">DAERAH_ISTIMEWA_UUS</option>
                                                        <option value="JAMBI">JAMBI</option>
                                                        <option value="JAMBI_UUS">JAMBI_UUS</option>
                                                        <option value="JAWA_TENGAH">JAWA_TENGAH</option>
                                                        <option value="JAWA_TENGAH_UUS">JAWA_TENGAH_UUS</option>
                                                        <option value="JAWA_TIMUR">JAWA_TIMUR</option>
                                                        <option value="JAWA_TIMUR_UUS">JAWA_TIMUR_UUS</option>
                                                        <option value="KALIMANTAN_BARAT">KALIMANTAN_BARAT</option>
                                                        <option value="KALIMANTAN_BARAT_UUS">KALIMANTAN_BARAT_UUS</option>
                                                        <option value="KALIMANTAN_SELATAN">KALIMANTAN_SELATAN</option>
                                                        <option value="KALIMANTAN_SELATAN_UUS">KALIMANTAN_SELATAN_UUS</option>
                                                        <option value="KALIMANTAN_TENGAH">KALIMANTAN_TENGAH</option>
                                                        <option value="KALIMANTAN_TIMUR">KALIMANTAN_TIMUR</option>
                                                        <option value="KALIMANTAN_TIMUR_UUS">KALIMANTAN_TIMUR_UUS</option>
                                                        <option value="LAMPUNG">LAMPUNG</option>
                                                        <option value="MALUKU">MALUKU</option>
                                                        <option value="NUSA_TENGGARA_BARAT">NUSA_TENGGARA_BARAT</option>
                                                        <option value="NUSA_TENGGARA_BARAT_UUS">NUSA_TENGGARA_BARAT_UUS</option>
                                                        <option value="NUSA_TENGGARA_TIMUR">NUSA_TENGGARA_TIMUR</option>
                                                        <option value="PAPUA">PAPUA</option>
                                                        <option value="RIAU_DAN_KEPRI">RIAU_DAN_KEPRI</option>
                                                        <option value="RIAU_DAN_KEPRI_UUS">RIAU_DAN_KEPRI_UUS</option>
                                                        <option value="SULAWESI">SULAWESI</option>
                                                        <option value="SULAWESI_TENGGARA">SULAWESI_TENGGARA</option>
                                                        <option value="SULSELBAR">SULSELBAR</option>
                                                        <option value="SULSELBAR_UUS">SULSELBAR_UUS</option>
                                                        <option value="SULUT">SULUT</option>
                                                        <option value="SUMATERA_BARAT">SUMATERA_BARAT</option>
                                                        <option value="SUMATERA_BARAT_UUS">SUMATERA_BARAT_UUS</option>
                                                        <option value="SUMSEL_DAN_BABEL">SUMSEL_DAN_BABEL</option>
                                                        <option value="SUMSEL_DAN_BABEL_UUS">SUMSEL_DAN_BABEL_UUS</option>
                                                        <option value="SUMUT">SUMUT</option>
                                                        <option value="SUMUT_UUS">SUMUT_UUS</option>
                                                        <option value="BTPN_SYARIAH">BTPN_SYARIAH</option>
                                                        <option value="CENTRATAMA">CENTRATAMA</option>
                                                        <option value="CCB">CCB</option>
                                                        <option value="CITIBANK">CITIBANK</option>
                                                        <option value="DEUTSCHE">DEUTSCHE</option>
                                                        <option value="HSBC_UUS">HSBC_UUS</option>
                                                        <option value="HSBC">HSBC</option>
                                                        <option value="EXIMBANK">EXIMBANK</option>
                                                        <option value="JPMORGAN">JPMORGAN</option>
                                                        <option value="MANDIRI_TASPEN">MANDIRI_TASPEN</option>
                                                        <option value="PRIMA_MASTER">PRIMA_MASTER</option>
                                                        <option value="RBS">RBS</option>
                                                        <option value="STANDARD_CHARTERED">STANDARD_CHARTERED</option>
                                                    </select>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        name="target"
                                                        onChange={(e) => handleChange(e, index)}/>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="target"
                                                        onChange={(e) => handleChange(e, index)}/>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="target"
                                                        onChange={(e) => handleChange(e, index)}/>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <DatePicker />
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <select
                                                        className="form-select"
                                                        name="group"
                                                        onChange={(e) => handleChange(e, index)}>
                                                        <option></option>
                                                        <option value="C">Kontrak</option>
                                                        <option value="P">Permanen/Tetap</option>
                                                        <option value="O">Lainnya</option>
                                                    </select>
                                                </td>
                                                <td style={{minWidth:'160px'}}>
                                                    <select
                                                        className="form-select"
                                                        name="group"
                                                        onChange={(e) => handleChange(e, index)}>
                                                        <option></option>
                                                        <option value='0'>0 Bulan</option>
                                                        <option value='1'>1 Bulan</option>
                                                        <option value='2'>2 Bulan</option>
                                                        <option value='3'>3 Bulan</option>
                                                        <option value='4'>4 Bulan</option>
                                                        <option value='5'>5 Bulan</option>
                                                        <option value='6'>6 Bulan</option>
                                                        <option value='7'>7 Bulan</option>
                                                        <option value='8'>8 Bulan</option>
                                                        <option value='9'>9 Bulan</option>
                                                        <option value='10'>10 Bulan</option>
                                                        <option value='11'>11 Bulan</option>
                                                        <option value='12'>12 Bulan</option>
                                                        <option value='13'>13 Bulan</option>
                                                        <option value='14'>14 Bulan</option>
                                                        <option value='15'>15 Bulan</option>
                                                        <option value='16'>16 Bulan</option>
                                                        <option value='17'>17 Bulan</option>
                                                        <option value='18'>18 Bulan</option>
                                                        <option value='19'>19 Bulan</option>
                                                        <option value='20'>20 Bulan</option>
                                                        <option value='21'>21 Bulan</option>
                                                        <option value='22'>22 Bulan</option>
                                                        <option value='23'>23 Bulan</option>
                                                        <option value='24'>24 Bulan</option>
                                                    </select>
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
                        <div className="d-flex justify-content-between mt-4">
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

export default MultipleApplicant;