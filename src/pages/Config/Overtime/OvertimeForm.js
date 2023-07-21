import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/overtimeModel";
import * as providers from "../../../providers/config/overtime";
import { showToast } from "../../../utils/global_store";
import { Input, Switch } from "antd";
const OvertimeForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(convert.objectOfovertimeModel({}));
  const calc_base_data = [
    { val: "custom", text: "Custom" },
    { val: "gaji_pokok", text: "Gaji Pokok" },
    { val: "tunjangan_tetap", text: "Tunjangan Tetap" },
    { val: "gaji_pokok_tunjangan", text: "Gaji Pokok Tunjangan" },
  ];
  const calc_mode_date = [
    { val: "undang_undang", text: "Undang-Undang" },
    { val: "Kelipatan Rata Upah", text: "Kelipatan Rata Upah" },
  ];
  const title = "Overtime Form";
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
      handleChangeActive(resp.data.is_approval)
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
  };

  const handleChangeActive = (value) => {
    setData((prevState) => ({ ...prevState, is_approval: value }));
  };
  const handleSubmit = async () => {
    try {
      const resp = await providers.updateData(
        {
          calc_base: data.calc_base,
          calc_mode: data.calc_mode,
          total_custom: data.total_custom,
          work_pattern: data.work_pattern,
          is_approval: data.is_approval,
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
                      <div
                        style={{
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      ></div>
                      <label style={{ marginRight: 15 }}>Approval</label>
                      <Switch
                        name="is_approval"
                        checked={data.is_approval}
                        onChange={handleChangeActive}
                      />
                    </div>
                  </div>

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
                          <option key={index} value={option.val}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Calc Mode:</label>{" "}
                      <select
                        className="form-select"
                        id="calc_mode"
                        name="calc_mode"
                        value={data.calc_mode}
                        onChange={handleChange}
                        aria-label="Calc Mode"
                      >
                        <option value={null}>Select Calc Mode</option>
                        {calc_mode_date.map((option, index) => (
                          <option key={index} value={option.val}>
                            {option.text}
                          </option>
                        ))}
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
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Work Patern:</label>
                      <input
                        className="form-control"
                        type="number"
                        name="work_pattern"
                        value={data.work_pattern}
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

export default OvertimeForm;
