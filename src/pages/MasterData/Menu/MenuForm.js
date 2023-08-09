import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/menuModel";
import * as providers from "../../../providers/master/menu";
import { SysGenValueOption, showToast } from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
import Select from "react-select";
import {useLoadingContext}from "../../../components/Loading"

const MenuForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfmenuModel({}));
  const [parent, set_parent] = useState(convert.listOfmenuModel([]));
  const {showLoading,hideLoading} =useLoadingContext();
  const getParent = async () => {
    showLoading();
    try {
      const resp = await providers.getDataMax();
      set_parent(resp.data.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
    }
    hideLoading();
  };
  
  const title = `${id?sys_labels.action.EDIT_FORM:sys_labels.action.FORM} Menu`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    getParent();
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
        description: data.description,
        title: data.title,
        route: data.route,
        parent_id: data.parent_id,
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
          description: data.description,
          title: data.title,
          route: data.route,
          parent_id: data.parent_id,
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
                      <label>Parent:</label>{" "}
                      <Select
                        onChange={handleChange}
                        value={SysGenValueOption(
                          parent,
                          data.parent_id,
                          "id"
                        )}
                        formatOptionLabel={(val) => `${val.title}`}
                        options={parent.map((option, index) => ({
                          value: option.id,
                          label: `${option.title}`,
                          title:option.title,
                          target: {
                            value: option.id,
                            name: "parent_id",
                          },
                        }))}
                        placeholder="Select Parent"
                        aria-label="Nama"
                        required
                        isSearchable
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Title:</label>
                      <input
                        className="form-control"
                        type="text"
                        name="title"
                        value={data.title}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Description:</label>
                      <input
                        className="form-control"
                        type="text"
                        name="description"
                        value={data.description}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Route:</label>
                      <input
                        className="form-control"
                        type="text"
                        name="route"
                        value={data.route}
                        onChange={handleChange}
                      />
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

export default MenuForm;
