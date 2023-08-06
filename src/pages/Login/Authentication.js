import React, { useState, useEffect } from "react";
import { Button } from "react-mazer-ui";
import { json, useNavigate, useParams } from "react-router-dom";
import { routes_name } from "../../route/static_route";
import { clearSession, setSession } from "../../utils/session";
import { SysGenMenuByRole, showToast } from "../../utils/global_store";
import * as providers from "../../providers/master/employee";
import * as providers_menu from "../../providers/master/menu";
import { SESSION, sys_images } from "../../utils/constants";
import Unauthorized from "../Unauthorized";
// import { PacmanLoader } from "react-spinners";

function Authentication() {
  const navigate = useNavigate();
  const [is_valid, set_valid] = useState(false);
  const [is_loading, set_loading] = useState(true);
  const { token } = useParams();
  const handleAuthentication = async () => {
    try {
      setSession(SESSION.ACCESS_TOKEN, token);
      const resp = await providers.getData(1, 1, "");
      const menus = await providers_menu.getMenu();
      const menu = SysGenMenuByRole(menus.data);
      setSession(SESSION.MENUS,JSON.stringify(menu))
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
        width:"100vw",
      }}
    >
      <img src={sys_images.img_waiting} />
      <h4>Waiting for authentication.....</h4>
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
   <Unauthorized/>
  );
}

export default Authentication;
