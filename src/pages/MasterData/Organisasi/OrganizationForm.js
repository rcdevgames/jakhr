import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/organizationModel";
import * as providers from "../../../providers/master/organization";
import {  showToast } from "../../../utils/global_store";
const OrganizationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOforganizationModel({}));
  const title = "Organization " + (id ? "Edit Form" : "Form");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    if (id) {
      // console.log(id);
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
    try {
      const resp = await providers.insertData({
        name: data.name,
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
          name: data.name,
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
                    <div className="form-group">
                      <label>Organization Name:</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <button
                  onClick={()=>
                    data.id ? handleUpdate() : handleSubmit()
                  }
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

export default OrganizationForm;
