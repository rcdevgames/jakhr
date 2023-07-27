import React, { useState, useEffect } from "react";
import { Button } from "react-mazer-ui";
import { useNavigate, useParams } from "react-router-dom";
import { routes_name } from "../../route/static_route";
import { clearSession, setSession } from "../../utils/session";
import { showToast } from "../../utils/global_store";
import * as providers from "../../providers/master/employee";
import { SESSION } from "../../utils/constants";
import { PacmanLoader } from "react-spinners";

function Authentication() {
  const navigate = useNavigate();
  const [is_valid, set_valid] = useState(false);
  const [is_loading, set_loading] = useState(true);
  const { token } = useParams();
  const handleAuthentication = async () => {
    try {
      setSession(SESSION.ACCESS_TOKEN, token);
      const resp = await providers.getData(1, 1, "");
      setTimeout(() => {  
        set_loading(false);
      }, 1000)
      set_valid(true);
      setTimeout(() => {
        navigate(routes_name.DASHBOARD);
      }, 1000);
    } catch (error) {
      setTimeout(() => {  
        set_loading(false);
      }, 1000)
      setTimeout(() => {  
        set_valid(false);
      }, 1000)
    }
  };
  useEffect(() => {
    handleAuthentication();
  }, []);
  return is_loading ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <PacmanLoader color="red" size={50} />
    </div>
  ) : is_valid ? (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h4>Auth complete and redirecting.....</h4>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h4>Unauthorized!</h4>
    </div>
  );
}

export default Authentication;
