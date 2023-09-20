import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/bpjs_configModel";
import * as providers from "../../../providers/config/company";
import * as providers_company from "../../../providers/master/company";
import { showToast,SysJWTDecoder } from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
import { useLoadingContext } from "../../../components/Loading";
import UploadFile from "../../../components/UploadFile";
import { onlyNumber, onlyNumberDotAndDash } from "../../../utils/validation";
const ConfigCompanyForm = () => {
  const { showLoading, hideLoading } = useLoadingContext();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [data_company, set_data_company] = useState([]);
  const [is_loading, set_loading] = useState(true);
  const title = `${sys_labels.menus.COMPANY} ${sys_labels.action.FORM}`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    let prev = data;
    // console.log(prev);
    let index = prev.findIndex((val) => val.name == name);
    prev[index]["value"] = value;
    setData([...prev]);
  };
  useEffect(() => {
    handleDetail();
    handleDetailCompany();
  }, []);
  const handleDetail = async () => {
    showLoading();
    try {
      const resp = await providers.getData();
      let resp_data = resp.data.data;
      const index = resp_data.findIndex((val) => val.name == "COMPANY_LOGO");
      resp_data[index]["value"] = resp_data[index].value
        ? { source: resp_data[index]["value"] }
        : null;
      setData(resp_data);
      set_loading(false);
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
  };
  const handleDetailCompany = async () => {
    try {
      const token = SysJWTDecoder();
      const resp = await providers_company.getDetail(token.companyId);
      let resp_data = resp.data;
      set_data_company(resp_data);
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
    hideLoading();
  };
  const handleSubmit = async () => {
    showLoading();
    try {
      for (let index = 0; index < data.length; index++) {
        const resp = await providers.updateData(
          {
            value: data[index].value,
          },
          data[index].id
        );
      }
      showToast({ message: "Data Succesfully Update", type: "success" });
      // navigate(-1);
      // window.location.reload();
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
    hideLoading();
  };

  const handleUpload = (value) => {
    handleChange({ target: { name: "COMPANY_LOGO", value: value } });
    // let prev = data;
    // let index = prev.findIndex((val) => val.name == "COMPANY_LOGO");
    // // console.log(prev[index]);
    // prev[index]["value"] = value;
    // setData([...prev]);
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
                    <div className="col-md-12">
                      <label>Logo:</label>
                      {is_loading ? null : (
                        <UploadFile
                          onImageUpload={handleUpload}
                          file={
                            data.length <= 0
                              ? null
                              : data.find((val) => val.name == "COMPANY_LOGO")
                                  .value
                          }
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                  <div className="col-md-12">
                      <div className="form-group">
                        <label>Perusahaan:</label>
                        <input
                          className="form-control"
                          type="text"
                          readOnly={true}
                          value={data_company?.name??""}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Alias:</label>
                        <input
                          className="form-control"
                          type="text"
                          readOnly={true}
                          value={data_company?.alias??""}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Alamat:</label>
                        <input
                          className="form-control"
                          type="textarea"
                          readOnly={true}
                          value={data_company?.address??""}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>NPWP:</label>
                        <input
                          className="form-control"
                          type="text"
                          onKeyDown={onlyNumberDotAndDash}
                          name="COMPANY_NPWP"
                          value={
                            data.length <= 0
                              ? null
                              : data.find((val) => val.name == "COMPANY_NPWP")
                                  .value
                          }
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Level Approval:</label>
                        <input
                          className="form-control"
                          type="text"
                          onKeyDown={onlyNumber}
                          name="APPROVAL_LEVEL"
                          value={
                            data.length <= 0
                              ? null
                              : data.find((val) => val.name == "APPROVAL_LEVEL")
                                  .value
                          }
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Tanggal Tutup Buku:</label>
                        <input
                          className="form-control"
                          type="text"
                          onKeyDown={onlyNumber}
                          name="CLOSE_BOOK_DATE"
                          value={
                            data.length <= 0
                              ? null
                              : data.find(
                                  (val) => val.name == "CLOSE_BOOK_DATE"
                                ).value
                          }
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <label>Tipe Pajak:</label>{" "}
                        <select
                          className="form-select"
                          id="TIPE_PAJAK"
                          name="TIPE_PAJAK"
                          value={
                            data.length <= 0
                              ? null
                              : data.find((val) => val.name == "TIPE_PAJAK")
                                  .value
                          }
                          onChange={handleChange}
                          aria-label="Tipe Pajak"
                        >
                          <option value={null}>Pilih Tipe Pajak</option>
                          <option key="gross_up" value="gross_up">
                            Gross Up
                          </option>
                          <option key="gross" value="gross">
                            Gross
                          </option>
                          <option key="net" value="net">
                            Net
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleSubmit()}
                  className="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminDashboard>
  );
};

export default ConfigCompanyForm;
