import React,{useState} from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { BellIcon, MagnifyingGlassIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { SysJWTDecoder } from "../utils/global_store";

const AdminDashboard = ({ label, subHeading, children }) => {
  const [user,set_user]=useState(SysJWTDecoder())
  return (
    <div id="main" className="layout-navbar navbar-fixed">
     <header>
          <nav className="navbar navbar-expand navbar-light navbar-top">
            <div className="container-fluid  justify-content-center">
              <a href="#" className="burger-btn d-block" style={{color: '#828282'}}>
                <Bars3Icon className="fs-3"  width="30" height="30" />
              </a>

              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
           
              <div className="mx-3 form-group position-relative mb-0 mt-0 has-icon-left">
                <input 
                  type="text" 
                  className="form-control form-control-sm form-control-lg" 
                  style={{background: '#F5F5F5', borderRadius: '6px'}} 
                  placeholder="Cari.." 
                />
                <div className="form-control-icon">
                  <MagnifyingGlassIcon width="30" height="30" />
                </div>
              </div>
                            
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-lg-0">
                 
                  <li className="nav-item dropdown me-3">
                    <a
                      className="nav-link active dropdown-toggle text-gray-600"
                      href="#"
                      data-bs-toggle="dropdown"
                      data-bs-display="static"
                      aria-expanded="false"
                    >
                      <BellIcon  width="30" height="30" />
                      <span className="badge badge-notification bg-danger rounded-circle" style={{width: '13px', height: '13px'}}> <span className="visually-hidden">unread messages</span></span>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end notification-dropdown"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li className="dropdown-header">
                        <h6>Notifications</h6>
                      </li>
                 
                      <li className="dropdown-item notification-item">
                        <a className="d-flex align-items-center" href="#">
                          <div className="notification-icon bg-success">
                            <i className="bi bi-file-earmark-check"></i>
                          </div>
                          <div className="notification-text ms-4">
                            <p className="notification-title font-bold">
                              Homework submitted
                            </p>
                            <p className="notification-subtitle font-thin text-sm">
                              Algebra math homework
                            </p>
                          </div>
                        </a>
                      </li>
                      <li>
                        <p className="text-center py-2 mb-0">
                          <a href="#">See all notification</a>
                        </p>
                      </li>
                    </ul>
                  </li>
                </ul>
                <div className="dropdown">
                  <a href="#" data-bs-toggle="dropdown" aria-expanded="false">
                    <div className="user-menu d-flex">
                      <div className="user-name text-end me-3">
                        <h6 className="mb-0 text-gray-600">{user.full_name}</h6>
                        <p className="mb-0 text-sm text-gray-600">{user.role}</p>
                      </div>
                      <div className="user-img d-flex align-items-center">
                        <div className="avatar avatar-md">
                          <img src={process.env.PUBLIC_URL + '/assets/images/faces/1.jpg'} />
                        </div>
                      </div>
                    </div>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownMenuButton"
                    style={{'minWidth': '11rem'}}
                  >
                    <li>
                      <h6 className="dropdown-header">Hello, {user.full_name}!</h6>
                    </li>
                
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                   <Link to="/authentication/log/out/back_to_prev" className="dropdown-item" 
                        ><i className="icon-mid bi bi-box-arrow-left me-2"></i>
                        Logout</Link>
                      
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>
      </header>
      <div id="main-content">
      {/* <div className="page-heading">
        <div className="d-flex justify-content-between">
          <h3 className="main-page-title">{label}</h3>
        </div>
        {subHeading && <p className="text-subtitle text-muted">{subHeading}</p>}
      </div> */}
      <div className="page-content">{children}</div>
      </div>

      <Footer />

    </div>
  );
};

export default AdminDashboard;
