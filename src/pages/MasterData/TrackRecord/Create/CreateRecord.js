import {useState, useEffect, useRef} from "react";
import AdminDashboard from "../../../AdminDashboard"
import RichText from "../../../../components/RichText"
import DatePicker from "../../../../components/DatePicker"
import Choices from "choices.js";
import "choices.js/public/assets/styles/choices.min.css";

const options = [
    {
        value: "001",
        label: "John Doe"
    }, {
        value: "002",
        label: "Jane Smith"
    }, {
        value: "003",
        label: "Bob Johnson"
    }
];
const CreateRecord = () => {
    const [date,
        setDate] = useState("");
    const [content,
        setContent] = useState("");
    const [selectedEmployee,
        setSelectedEmployee] = useState("");
    const choicesRef = useRef(null);
    const choicesInstance = useRef(null);
		const editorRef = useRef(null);
			

    const handleDateChange = (date) => {
        setDate(date);
    };

    const handleContentChange = (data) => {
        setContent(data);
    };

    const handleEmployeeChange = (value) => {
        setSelectedEmployee(value);
    };

    useEffect(() => {
        const choices = new Choices(choicesRef.current, {
            searchEnabled: true,
            choices: options
        });

        const selectElement = choicesRef
            .current
            .parentNode
            .querySelector(".choices__input");
        let changed = false;

        const handleChoiceChange = () => {
            if (!changed) {
                changed = true;
                setSelectedEmployee(choices.getValue());
            }
        };

        selectElement.addEventListener("change", handleChoiceChange);

        return () => {
            selectElement.removeEventListener("change", handleChoiceChange);
            choices.destroy();
        };
    }, []);

    return (
        <AdminDashboard label="">
            <section className="section">
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h2>Form Record Karyawan</h2>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Nama</label>
                                    <select ref={choicesRef} className="choices form-control"/>

                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Tanggal</label>
                                    <DatePicker value={date} onChange={handleDateChange}/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Nomor</label>
                                    <input type="text" className="form-control" placeholder=""/>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Keterangan</label>
                                    <input type="text" className="form-control" placeholder=""/>
                                </div>
                            </div>

												
                            <div className="col-md-12 mt-3">
                                <RichText content={content} onContentChange={handleContentChange}/>
																
                            </div>
                        </div>
                        <button className="mt-3 btn btn-primary shadow">Submit</button>

                    </div>
                </div>
            </section>
        </AdminDashboard>
    );
}

export default CreateRecord;