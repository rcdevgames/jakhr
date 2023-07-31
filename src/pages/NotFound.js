import React from "react";
import { sys_images } from "../utils/constants";

function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width:"100vw",
        // backgroundImage:sys_images.img_waiting
      }}
    >
      <img src={sys_images.img_waiting_relax} />
      <h4>NotFound any page you want</h4>
      {/* <PacmanLoader color="red" size={50} /> */}
    </div>
  )
}

export default NotFound;
