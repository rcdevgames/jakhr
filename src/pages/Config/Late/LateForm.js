import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/lateModel";
import * as providers from "../../../providers/config/late";
import { SysReadData, showToast } from "../../../utils/global_store";
import { sys_labels, sys_path_data } from "../../../utils/constants";
const LateForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(convert.objectOflateModel({}));
  const calc_base_data = SysReadData(sys_path_data.calc_base_data);
  const title = `${sys_labels.menus.LATE} ${sys_labels.action.FORM}`;
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
          calc_base: data.calc_base,
          total_custom: data.total_custom,
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
                      <label>Calc Base:</label>{" "}
                      <select
                        className="form-select"
                        id="calc_base"
                        name="calc_base"
                        value={data.calc_base}
                        onChange={handleChange}
                        aria-label="Calc Base"
                      >
                        <option value={null}>Select Calc Base</option>
                        {calc_base_data.map((option, index) => (
                            <option key={index} value={option.value}>
                              {option.name}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Total Custom:</label>
                      <input
                        className="form-control"
                        type="number"
                        name="total_custom"
                        value={data.total_custom}
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

export default LateForm;
