import React, { useState, useEffect } from "react";
import { Button } from "react-mazer-ui";
import { useNavigate } from "react-router-dom";
import { changePassword, doLogin, resendCode } from "../../providers/auth";
import { routes_name } from "../../route/static_route";
import { clearSession, getSession, setSession } from "../../utils/session";
import { SysGenMenuByRole, SysValidateForm, showToast } from "../../utils/global_store";
import * as providers_menu from "../../providers/master/menu";
import { SESSION } from "../../utils/constants";
import { useLoadingContext } from "../../components/Loading";
import { onlyNumber } from "../../utils/validation";
function ChangePassword() {
  const { showLoading, hideLoading } = useLoadingContext();
  const navigate = useNavigate();
  const [data, set_data] = useState({
    password: "",
    new_password: "",
    code: "",
  });
  const [showDialog, setShowDialog] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    set_data((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangePassword = async () => {
    try {
      showLoading();
      SysValidateForm(["password",'new_password','code'],data);
      const resp = await changePassword(data);
      showToast({ message: resp.message });
      navigate(routes_name.DASHBOARD);
    } catch (error) {
      showToast({ message: error.message, type: "error" });
      console.log(error);
    }
    hideLoading();
  };
  const handleResendCode = async () => {
    try {
      showLoading();
      const resp = await resendCode();
      showToast({ message: resp.message });
    } catch (error) {
      showToast({ message: error.message, type: "error" });
      console.log(error);
    }
    hideLoading();
  };
  return (
    <div id="auth">
      <div className="row h-100 justify-content-center align-item-center">
        <div className="col-lg-4 col-4">
          <div id="auth-left">
          
            <h3>Change Password</h3>

            <div className="form-group position-relative has-icon-left mb-4">
              <input
                type="text"
                className="form-control form-control-xl"
                placeholder="Code"
                onKeyDown={onlyNumber}
                value={data.code}
                name="code"
                onChange={handleChange}
              />
            </div>
            <div className="form-group position-relative has-icon-left mb-4">
              <input
                type="password"
                className="form-control form-control-xl"
                placeholder="Password"
                value={data.password}
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="form-group position-relative has-icon-left mb-4">
              <input
                type="password"
                className="form-control form-control-xl"
                placeholder="New Password"
                value={data.new_password}
                name="new_password"
                onChange={handleChange}
              />
            </div>

            <Button
              status="primary"
              size="large"
              className="btn-block shadow-lg mt-5"
              label="Change Password"
              onClick={handleChangePassword}
            />
            <Button
              status="secondary"
              size="large"
              className="btn-block shadow-lg mt-5"
              label="Resend Code..."
              onClick={handleResendCode}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
