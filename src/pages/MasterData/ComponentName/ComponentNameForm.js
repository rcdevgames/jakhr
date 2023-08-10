import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import DatePicker from "../../../components/DatePicker";
import convert from "../../../model/component_nameModel";
import * as providers from "../../../providers/config/component_name";
import { SysDateTransform, showToast } from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
import {useLoadingContext} from "../../../components/Loading"
const ComponentNameForm = ({readOnly=false}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const{showLoading,hideLoading}=useLoadingContext();
  // console.log("KESINI",id);
  const [data, setData] = useState(convert.objectOfcomponent_nameModel({}));
  const title = `${id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM} ${
    sys_labels.menus.ALLOWANCE
  }`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    if (id) {
      handleDetail(id);
    }
  }, []);
  const handleDetail = async (id) => {
    showLoading();
    try {
      const resp = await providers.getDetail(id);
      setData(resp.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
    hideLoading();
  };
  const handleSubmit = async () => {
    showLoading();
    try {
      const resp = await providers.insertData({
        type: "allowance",
        name: data.name,
        description: data.description,
      });
      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
    hideLoading();
  };

  const handleUpdate = async () => {
    
    showLoading();
    try {
      const resp = await providers.updateData(
        {
          type: "allowance",
          name: data.name,
          description: data.description,
        },
        data.id
        );
      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
    hideLoading();
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
                      <label>Nama Tunjangan:</label>
                      <input
                        className="form-control"
                        type="text"
                        disabled={readOnly}
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Deskripsi:</label>
                      <input
                        className="form-control"
                        type="text"
                        disabled={readOnly}
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                {readOnly?null:
                <button
                onClick={() => (data.id ? handleUpdate() : handleSubmit())}
                className="btn btn-primary"
                >
                  {data.id ? "Update" : "Submit"}
                </button>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminDashboard>
  );
};

export default ComponentNameForm;
