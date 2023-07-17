import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import DatePicker from "../../../components/DatePicker";
import UploadFile from "../../../components/UploadFile";
import convert from "../../../model/employeeModel";
import * as providers from "../../../providers/master/employee";
import { SysDateTransform, showToast } from "../../../utils/global_store";
const EmployeeForm = () => {
  const gender = ["Laki-laki", "Perempuan"];
  const religion = ["Islam", "Kristen", "Hindu", "Budha", "Konghucu"];
  const marital_status = ["Lajang", "Suami", "Istri", "Duda", "Janda"];
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfemployeeModel({}));
  const title = "Employee " + (id ? "Edit Form" : "Form");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleDateChange = (val) => {
    setData((prevState) => ({ ...prevState, dob: val }));
  };
  useEffect(() => {
    if (id) {
      handleDetail(id);
    }
  }, []);
  const handleDetail = async (id) => {
    try {
      const resp = await providers.getDetail(id);
      setData(resp.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
  };
  const handleSubmit = async () => {
    // SysDateTransform({date:data.leave_date,withTime:false,forSql:true})
    try {
      const resp = await providers.insertData({
        full_name: data.full_name,
        phone_number: data.phone_number,
        email: data.email,
        gender: data.gender,
        marital_status: data.marital_status,
        religion: data.religion,
        pob: data.pob,
        dob: SysDateTransform({
          date: data.dob,
          withTime: false,
          forSql: true,
        }),
        blood_type: data.blood_type,
        id_type: "KTP",
        id_number: data.id_number,
        citizen_address: data.citizien_address,
        residential_address: data.address,
        employee_id: "004.2015.013",
        employee_join_date: SysDateTransform({
          date: new Date(),
          withTime: false,
          forSql: true,
        }),
        employee_expired_date: "2060-06-15",
        tax_config: 1,
        tax_number: data.tax_number,
        branch_id: "9d1c10f8-e4b1-40e9-b052-8a77b44d4bba",
        organization_id: "23e58943-f119-4e71-ae3f-322ed246457c",
        job_level_id: "79c8bdde-a0c8-4771-b956-1f92721ec254",
        job_position_id: "65d51728-c86f-44e7-a5a2-5a8c48f3b406",
        employee_status_id: "9587f366-7308-4670-9a40-09ec291a4738",
        create_user: false,
        emergency_contact_name: null,
        emergency_contact_relationship: null,
        emergency_contact_phone_number: null,
        is_payroll: true,
        user: {
          password: "test123",
        },
        photo: data.photo,
      });
      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
  };

  const handleUpdate = async () => {
    try {
      const resp = await providers.updateData(
        {
          leave_name: data.leave_name,
          leave_date: SysDateTransform({
            date: data.leave_date,
            withTime: false,
            forSql: true,
          }),
        },
        data.id
      );
      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
  };
  const handleUpload = (value) => {
    setData((val) => ({ ...val, photo: value }));
  };
  return (
    <AdminDashboard label="">
      <section className="section">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3>{title}</h3>
          </div>
          <div className="card-body">
            <div className="form form-horizontal">
              <div className="form-body">
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="col-md-6">
                      <label>Logo:</label>
                      <UploadFile
                        onImageUpload={handleUpload}
                        file={data.photo}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-12">
                      <h4>Employee Information</h4>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Fullname:</label>
                        <input
                          className="form-control"
                          type="text"
                          name="full_name"
                          value={data.full_name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>NIK:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="id_number"
                            value={data.id_number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>NPWP:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="tax_number"
                            value={data.tax_number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Religion:</label>
                          <select
                            className="form-select"
                            id="religion"
                            name="religion"
                            value={data.religion}
                            onChange={handleChange}
                            aria-label="Religion"
                          >
                            <option value="" disabled>
                              Select Religion
                            </option>
                            {religion.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Place of Birth:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="pob"
                            value={data.pob}
                            onChange={handleChange}
                          />
                        </div>
                      </div>  <div className="col-md-6">
                        <div className="form-group">
                          <label>Phone Number:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="phone_number"
                            value={data.phone_number}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Date of Birth:</label>
                          <DatePicker
                            name="dob"
                            onChange={handleDateChange}
                            value={data.dob}
                            placeholder={"Date of Birth"}
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Gender:</label>
                          <select
                            className="form-select"
                            id="gender"
                            name="gender"
                            value={data.gender}
                            onChange={handleChange}
                            aria-label="gender"
                          >
                            <option value="" disabled>
                              Select Gender
                            </option>
                            {gender.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Marital Status:</label>
                          <select
                            className="form-select"
                            id="marital_status"
                            name="marital_status"
                            value={data.marital_status}
                            onChange={handleChange}
                            aria-label="marital_status"
                          >
                            <option value="" disabled>
                              Select Marital Status
                            </option>
                            {marital_status.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <label>Blood Type:</label>
                          <input
                            className="form-control"
                            type="text"
                            name="blood_type"
                            value={data.blood_type}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-group">
                          <label>Email</label>
                          <input
                            className="form-control"
                            type="text"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Address</label>
                        <input
                          className="form-control"
                          type="text"
                          name="address"
                          value={data.address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Citizen Address</label>
                        <input
                          className="form-control"
                          type="text"
                          name="citizien_address"
                          value={data.citizien_address}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => (data.id ? handleUpdate() : handleSubmit())}
                  className="btn btn-primary"
                >
                  {data.id ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminDashboard>
  );
};

export default EmployeeForm;
