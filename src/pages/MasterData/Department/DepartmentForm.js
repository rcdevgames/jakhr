import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert_organization from "../../../model/organizationModel";
import convert from "../../../model/departmentModel";
import * as providers_organization from "../../../providers/master/organization";
import * as providers from "../../../providers/master/department";
import {
  SysGenValueOption,
  showToast,
  SysValidateForm,
} from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
import { useLoadingContext } from "../../../components/Loading";

import Select from "react-select";

const DepartmentForm = ({ readOnly = false }) => {
  const navigate = useNavigate();
  const required_field = ["name as department", "description as deskripsi"];
  const { id } = useParams();
  const [data, setData] = useState(convert.objectOfdepartmentModel({}));
  const [parent, set_parent] = useState(
    convert_organization.listOforganizationModel([])
  );
  const { showLoading, hideLoading } = useLoadingContext();
  const getParent = async () => {
    showLoading();
    try {
      const resp = await providers_organization.getDataMax();
      set_parent(resp.data.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
    }
    hideLoading();
  };
  const title = `${
    readOnly
      ? sys_labels.action.DETAIL
      : id
      ? sys_labels.action.EDIT_FORM
      : sys_labels.action.FORM
  } ${sys_labels.menus.DEPARTMENT}`;
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
      SysValidateForm(required_field, data);
      const resp = await providers.insertData({
        name: data.name,
        description: data.description,
        organization_id: data.organization_id,
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
      SysValidateForm(required_field, data);
      const resp = await providers.updateData(
        {
          name: data.name,
          description: data.description,
          organization_id: data.organization_id,
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
                      <label>Divisi:</label>{" "}
                      <Select
                        onChange={handleChange}
                        isDisabled={readOnly}
                        value={SysGenValueOption(
                          parent,
                          data.organization_id,
                          "id",
                          "name"
                        )}
                        formatOptionLabel={(val) => `${val.label}`}
                        options={parent.map((option, index) => ({
                          value: option.id,
                          label: `${option.name}`,
                          target: {
                            name: "organization_id",
                            value: option.id,
                          },
                        }))}
                        placeholder="Pilih Divisi"
                        aria-label="Nama"
                        required
                        isSearchable
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Department:</label>
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
                {readOnly ? null : (
                  <button
                    onClick={() => (data.id ? handleUpdate() : handleSubmit())}
                    className="btn btn-primary"
                  >
                    {data.id ? "Update" : "Submit"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminDashboard>
  );
};

export default DepartmentForm;
