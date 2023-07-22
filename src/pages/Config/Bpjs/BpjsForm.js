import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/bpjs_configModel";
import * as providers from "../../../providers/config/bpjs";
import { showToast } from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
const BpjsForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(convert.objectOfbpjs_configModel({}));
  const title = `${sys_labels.menus.BPJS} ${sys_labels.action.FORM}`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    handleDetail();
  }, []);
  const handleDetail = async () => {
    try {
      const resp = await providers.getData();
      setData(resp.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
  };
  const handleSubmit = async () => {
    try {
      const resp = await providers.updateData(
        {
          jht: data.jht,
          kesehatan: data.kesehatan,
          jp: data.jp,
          jkm: data.jkm,
          jkk: data.jkk,
          other_insurance: data.other_insurance,
        },
        data.id
      );
      showToast({ message: resp.message, type: "success" });
      // navigate(-1);
      window.location.reload();
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
                      <label>Jaminan Hari Tua:</label>
                      <input
                        className="form-control"
                        type="number"
                        name="jht"
                        value={data.jht}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>kesehatan:</label>
                      <input
                        className="form-control"
                        type="number"
                        name="kesehatan"
                        value={data.kesehatan}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Jaminan Keselamatan Kerja:</label>
                      <input
                        className="form-control"
                        type="number"
                        name="jkk"
                        value={data.jkk}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Jaminan Kematian:</label>
                      <input
                        className="form-control"
                        type="number"
                        name="jkm"
                        value={data.jkm}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Jaminan Pensiun:</label>
                      <input
                        className="form-control"
                        type="number"
                        name="jp"
                        value={data.jp}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Asuransi Lain:</label>
                      <input
                        className="form-control"
                        type="number"
                        name="other_insurance"
                        value={data.other_insurance}
                        onChange={handleChange}
                      />
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

export default BpjsForm;
