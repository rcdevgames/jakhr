import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { sys_images } from "../utils/constants";

function Unauthorized() {
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
      <img src={sys_images.img_unauthorized} />
      <h4>Sorry you doesn't have access</h4>
      {/* <PacmanLoader color="red" size={50} /> */}
    </div>
  )
}

export default Unauthorized;
