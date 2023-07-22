import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/organizationModel";
import * as providers from "../../../providers/master/organization";
import { showToast } from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
const OrganizationForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOforganizationModel({}));
  const [parent, set_parent] = useState(convert.listOforganizationModel([]));

  const getParent = async () => {
    try {
      const resp = await providers.getDataMax();
      set_parent(resp.data.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
    }
  };
  const title = `${id?sys_labels.action.EDIT_FORM:sys_labels.action.FORM} ${sys_labels.menus.DIVISION}`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    getParent();
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
        parent_id: data.parent_id,
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
                      <select
                        className="form-select"
                        id="parent_id"
                        name="parent_id"
                        value={data.parent_id}
                        onChange={handleChange}
                        aria-label="Parent"
                      >
                        <option value={null}>Select Parent</option>
                        {parent.map((option, index) =>
                          option.id == data.id ? null : (
                            <option key={index} value={option.id}>
                              {option.name}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
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

export default OrganizationForm;
