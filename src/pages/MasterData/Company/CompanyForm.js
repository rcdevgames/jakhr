import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Input, Switch } from "antd";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/companyModel";
import * as providers from "../../../providers/master/company";
import { showToast } from "../../../utils/global_store";
import UploadFile from "../../../components/UploadFile";
const CompanyForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfcompanyModel({}));
  const title = "Company " + (id ? "Edit Form" : "Form");
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeActive = (value) => {
    setData((prevState) => ({ ...prevState, is_active: value }));
  };
  useEffect(() => {
    // setData((val) => ({
    //   ...val,
    //   logo: {
    //     source:
    //       "http://45.77.245.25:3006/public/uploads/companies/06zsnnrfnyqw.jpeg",
    //   },
    // }));
    if (id) {
      handleDetail(id);
    }
  }, []);
  const handleDetail = async (id) => {
    try {
      const resp = await providers.getDetail(id);
      setData({
        ...resp.data,
        logo: {
          source:resp.data.logo,
        },
      });
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
  };
  const handleSubmit = async () => {
    try {
      const resp = await providers.insertData({
        name: data.name,
        alias: data.alias,
        address: data.address,
        is_active: data?.is_active ?? false,
        logo: data.logo,
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
          alias: data.alias,
          address: data.address,
          is_active: data.is_active,
          logo: data.logo,
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
    setData((val) => ({ ...val, logo: value }));
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
                      <label>Logo:</label>
                      <UploadFile
                        onImageUpload={handleUpload}
                        file={data.logo}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="col-md-6">
                      <div className="form-group">
                        <div
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                          }}
                        ></div>
                        <label style={{ marginRight: 15 }}>Active</label>
                        <Switch
                          name="is_active"
                          value={data.is_active}
                          onChange={handleChangeActive}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Company Name:</label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          value={data.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Alias:</label>
                        <input
                          className="form-control"
                          type="text"
                          name="alias"
                          value={data.alias}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Address:</label>
                        <Input.TextArea
                          rows={4}
                          className="form-control"
                          type="text"
                          name="address"
                          value={data.address}
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

export default CompanyForm;
