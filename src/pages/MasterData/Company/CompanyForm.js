import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Input, Switch } from "antd";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/companyModel";
import * as providers from "../../../providers/master/company";
import {
  SysGenValueOption,
  showToast,
  SysValidateForm,
} from "../../../utils/global_store";
import UploadFile from "../../../components/UploadFile";
import { sys_labels } from "../../../utils/constants";
import { useLoadingContext } from "../../../components/Loading";
import Select from "react-select";
const CompanyForm = ({ readOnly = false }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { showLoading, hideLoading } = useLoadingContext();
  const [parent, set_parent] = useState(convert.listOfcompanyModel([]));
  const [data, setData] = useState(convert.objectOfcompanyModel({}));
  const required_field = ["address as alamat", "alias", "name as nama_perusahaan","code as kode_perusahaan"];
  const title = `${id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM} ${
    sys_labels.menus.COMPANY
  }`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangeActive = (value) => {
    setData((prevState) => ({ ...prevState, is_active: value }));
  };
  useEffect(() => {
    getParent();
    if (id) {
      handleDetail(id);
    }
  }, []);
  const getParent = async () => {
    showLoading();
    try {
      const resp = await providers.getDataMaximum();
      set_parent(resp.data.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
    }
    hideLoading();
  };
  const handleDetail = async (id) => {
    showLoading();
    try {
      const resp = await providers.getDetail(id);
      setData({
        ...resp.data,
        logo: resp.data.logo
          ? {
              source: resp.data.logo,
            }
          : null,
      });
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
    hideLoading();
  };
  const handleSubmit = async () => {
    showLoading();
    try {
      const data_submit = {
        name: data.name,
        alias: data.alias,
        address: data.address,
        is_active: data?.is_active ?? false,
        logo: data.logo,
        // code: data.code,
        parent_id: data.parent_id,
      };
      SysValidateForm(required_field, data_submit);
      const resp = await providers.insertData(data_submit);
      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      hideLoading();
      showToast({ message: error.message, type: "error" });
    }
    hideLoading();
  };

  const handleUpdate = async () => {
    showLoading();
    try {
      const data_submit = {
        name: data.name,
        alias: data.alias,
        address: data.address,
        is_active: data?.is_active ?? false,
        logo: data.logo,
        // code: data.code,
        parent_id: data.parent_id,
      };
      SysValidateForm(required_field, data_submit);
      const resp = await providers.updateData(data_submit, data.id);
      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      hideLoading();
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
    // hideLoading();
    // console.log("LEWAT KGK DAH?");
    hideLoading();
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
                    <label>Logo:</label>
                    {readOnly ? (
                      <img
                        src={data.logo?.source ?? ""}
                        style={{ objectFit: "contain" }}
                        className="col-md-12"
                      ></img>
                    ) : (
                      <UploadFile
                        onImageUpload={handleUpload}
                        file={data.logo}
                      />
                    )}
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
                          disabled={readOnly}
                          checked={data.is_active}
                          onChange={handleChangeActive}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Induk:</label>
                        <Select
                          onChange={handleChange}
                          value={SysGenValueOption(
                            parent,
                            data.parent_id,
                            "id",
                            "name"
                          )}
                          isDisabled={readOnly}
                          formatOptionLabel={(val) => `${val.label}`}
                          options={parent.map((option, index) => ({
                            value: option.id,
                            label: `${option.name}`,
                            ext: index,
                            target: {
                              name: "parent_id",
                              value: option.id,
                            },
                          }))}
                          placeholder="Pilih Induk"
                          aria-label="Nama"
                          required
                          isSearchable
                        />
                      </div>
                    </div> 
                    {/* <div className="col-md-6">
                      <div className="form-group">
                        <label>Kode Perusahaan:</label>
                        <input
                          className="form-control"
                          type="text"
                          name="code"
                          value={data.code}
                          disabled={readOnly}
                          onChange={handleChange}
                        />
                      </div>
                    </div> */}
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Nama Perusahaan:</label>
                        <input
                          className="form-control"
                          type="text"
                          name="name"
                          value={data.name}
                          disabled={readOnly}
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
                          disabled={readOnly}
                          value={data.alias}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group">
                        <label>Alamat:</label>
                        <Input.TextArea
                          rows={4}
                          className="form-control"
                          disabled={readOnly}
                          type="text"
                          name="address"
                          value={data.address}
                          onChange={handleChange}
                        />
                      </div>
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

export default CompanyForm;
