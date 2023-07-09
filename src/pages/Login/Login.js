import React, { useState } from "react";
import { Button } from "react-mazer-ui";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const handleLogin = () => {
		navigate('/')
  }

  return (
    <div id="auth">

    <div className="row h-100">
        <div className="col-lg-5 col-12">
            <div id="auth-left">
                <div className="auth-logo">
                    <a href="index.html">
                        {/* <img src="assets/images/logo/logo.png" alt="Logo"/> */}
                       {/* Logo */}
                    </a>
                </div>
                <h1 className="auth-title">Log in.</h1>
        
            
                    <div className="form-group position-relative has-icon-left mb-4">
                        <input type="email" className="form-control form-control-xl" placeholder="Email"/>
                        <div className="form-control-icon">
                            <i className="bi bi-envelope"></i>
                        </div>
                    </div>
                    <div className="form-group position-relative has-icon-left mb-4">
                        <input type="password" className="form-control form-control-xl" placeholder="Password"/>
                        <div className="form-control-icon">
                            <i className="bi bi-shield-lock"></i>
                        </div>
                    </div>
                 
                    <Button 
                    status="primary" 
                    size="large" 
                    className="btn-block shadow-lg mt-5"
                    label="Login"
                    onClick={handleLogin}/>
            </div>
        </div>
        <div className="col-lg-7 d-none d-lg-block">
            <div id="auth-right">
						
            </div>
        </div>
    </div>

</div>
  );
}

export default Login;