import {useState} from "react";
import AdminDashboard from "../../../AdminDashboard"
import './style.css'
import DatePicker from "../../../../components/DatePicker"
import RichText from "../../../../components/RichText"

const CreateAnnouncement = () => {
    const [date, setDate] = useState("")
    const [content, setContent] = useState("");

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleContentChange = (data) => {
        setContent(data);
    };


    return (
        <AdminDashboard label="">
            <section className="section">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h2>Form Pengumuman</h2>

                    </div>
                    <div className="card-body">
                       <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Tanggal: </label>
                                    <DatePicker value={date} onChange={handleDateChange}/>
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label>Subject: </label>
                                    <input type="text" className="form-control" />
                                </div>
                            </div>
                            <RichText content={content} onContentChange={handleContentChange} showingTemplate={false}/>
                       </div>
                        <button className="btn btn-primary shadow mt-3">Submit </button>

                    </div>
                </div>
            </section>
        </AdminDashboard>
    );
}

export default CreateAnnouncement;