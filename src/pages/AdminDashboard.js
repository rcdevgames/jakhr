import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import {
  BellIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import * as providers from "../providers/approval/approval";
import {
  SysJWTDecoder,
  SysValidateForm,
  showToast,
} from "../utils/global_store";
import { useEffect } from "react";
import ActionModal from "../components/ActionModal";
import { Popconfirm } from "antd";

const AdminDashboard = ({ label, subHeading, children }) => {
  const [user, set_user] = useState(SysJWTDecoder());
  const [selected_id, set_selected_id] = useState("");
  const [is_notification, set_is_notification] = useState(false);
  const [reason, set_reason] = useState("");
  const [modal, set_modal] = useState(false);
  const [data, set_data] = useState([]);
  const getListApproval = () => {
    providers.getData(1, 5).then((data) => {
      const the_datas = data.data?.need_your_approval?.data ?? [];
      // const the_datas = [
      //   {
      //     "worklist_journey_id": "02e7d8bd-2cf6-4bb0-8644-ebc596938919",
      //     "worklist_journey_status": "S1",
      //     "reject_reason": null,
      //     "current_position_id": "eaea5728-116d-4cf1-897c-d911836d1888",
      //     "current_level_id": "13296d25-48d2-4d59-a602-ee738477439c",
      //     "worklist_id": "e5078d15-c330-41d2-b572-12ec025c10ec",
      //     "doc_reff": "OVT/2023/08/0010",
      //     "config_reff": "{\"tableName\":\"overtimes\",\"fieldCondition\":{\"deleted\":false,\"overtime_no\":\"OVT/2023/08/0010\"},\"fieldUpdated\":{\"when_true\":{\"is_approved\":true,\"is_rejected\":false},\"when_false\":{\"is_approved\":false,\"is_rejected\":true}}}",
      //     "worklist_status": "Pending",
      //     "worklist_no": "WF0023",
      //     "created_at": "2023-08-06T15:11:38.026Z",
      //     "current_level": "Software Development",
      //     "current_position": "Staff",
      //     "requester_name": "Hatake Ujang",
      //     "requester_id": "2013310020",
      //     "worklist_title": "Pengajuan Lembur"
      //   },
      //   {
      //     "worklist_journey_id": "9fde799d-70c0-4cd5-b11b-112b7f92ff4e",
      //     "worklist_journey_status": "S1",
      //     "reject_reason": null,
      //     "current_position_id": "eaea5728-116d-4cf1-897c-d911836d1888",
      //     "current_level_id": "13296d25-48d2-4d59-a602-ee738477439c",
      //     "worklist_id": "68ca8855-421b-45be-b652-6111f60cc7e4",
      //     "doc_reff": "OVT/2023/08/0010",
      //     "config_reff": "{\"tableName\":\"overtimes\",\"fieldCondition\":{\"deleted\":false,\"overtime_no\":\"OVT/2023/08/0010\"},\"fieldUpdated\":{\"when_true\":{\"is_approved\":true,\"is_rejected\":false},\"when_false\":{\"is_approved\":false,\"is_rejected\":true}}}",
      //     "worklist_status": "Pending",
      //     "worklist_no": "WF0022",
      //     "created_at": "2023-08-06T15:05:53.069Z",
      //     "current_level": "Software Development",
      //     "current_position": "Staff",
      //     "requester_name": "Hatake Ujang",
      //     "requester_id": "2013310020",
      //     "worklist_title": "Pengajuan Lembur"
      //   },
      //   {
      //     "worklist_journey_id": "e9349184-8076-428a-96f0-1fef75fbd9e4",
      //     "worklist_journey_status": "S1",
      //     "reject_reason": null,
      //     "current_position_id": "eaea5728-116d-4cf1-897c-d911836d1888",
      //     "current_level_id": "13296d25-48d2-4d59-a602-ee738477439c",
      //     "worklist_id": "0902f4c7-e86f-4c43-a843-5ee5f0362ff4",
      //     "doc_reff": "OVT/2023/08/0010",
      //     "config_reff": "{\"tableName\":\"overtimes\",\"fieldCondition\":{\"deleted\":false,\"overtime_no\":\"OVT/2023/08/0010\"},\"fieldUpdated\":{\"when_true\":{\"is_approved\":true,\"is_rejected\":false},\"when_false\":{\"is_approved\":false,\"is_rejected\":true}}}",
      //     "worklist_status": "Pending",
      //     "worklist_no": "WF0021",
      //     "created_at": "2023-08-06T15:04:00.285Z",
      //     "current_level": "Software Development",
      //     "current_position": "Staff",
      //     "requester_name": "Hatake Ujang",
      //     "requester_id": "2013310020",
      //     "worklist_title": "Pengajuan Lembur"
      //   },
      //   {
      //     "worklist_journey_id": "fbae5462-9562-4409-bc79-292506cec91a",
      //     "worklist_journey_status": "S1",
      //     "reject_reason": null,
      //     "current_position_id": "eaea5728-116d-4cf1-897c-d911836d1888",
      //     "current_level_id": "13296d25-48d2-4d59-a602-ee738477439c",
      //     "worklist_id": "1440da2a-9f9c-4571-8349-a1371accc942",
      //     "doc_reff": "OVT/2023/08/0010",
      //     "config_reff": "{\"tableName\":\"overtimes\",\"fieldCondition\":{\"deleted\":false,\"overtime_no\":\"OVT/2023/08/0010\"},\"fieldUpdated\":{\"when_true\":{\"is_approved\":true,\"is_rejected\":false},\"when_false\":{\"is_approved\":false,\"is_rejected\":true}}}",
      //     "worklist_status": "Pending",
      //     "worklist_no": "WF0020",
      //     "created_at": "2023-08-06T15:00:42.935Z",
      //     "current_level": "Software Development",
      //     "current_position": "Staff",
      //     "requester_name": "Hatake Ujang",
      //     "requester_id": "2013310020",
      //     "worklist_title": "Pengajuan Lembur"
      //   },
      //   {
      //     "worklist_journey_id": "d94cb784-81eb-48f4-af40-167e55f102ec",
      //     "worklist_journey_status": "S1",
      //     "reject_reason": null,
      //     "current_position_id": "eaea5728-116d-4cf1-897c-d911836d1888",
      //     "current_level_id": "13296d25-48d2-4d59-a602-ee738477439c",
      //     "worklist_id": "83d3a46a-19b2-48fd-9e14-c508e5607b3f",
      //     "doc_reff": "OVT/2023/08/0010",
      //     "config_reff": "{\"tableName\":\"overtimes\",\"fieldCondition\":{\"deleted\":false,\"overtime_no\":\"OVT/2023/08/0010\"},\"fieldUpdated\":{\"when_true\":{\"is_approved\":true,\"is_rejected\":false},\"when_false\":{\"is_approved\":false,\"is_rejected\":true}}}",
      //     "worklist_status": "Pending",
      //     "worklist_no": "WF0019",
      //     "created_at": "2023-08-06T13:07:54.271Z",
      //     "current_level": "Software Development",
      //     "current_position": "Staff",
      //     "requester_name": "Hatake Ujang",
      //     "requester_id": "2013310020",
      //     "worklist_title": "Pengajuan Lembur"
      //   }
      // ];
      set_data(the_datas);
      // console.log(the_datas);
      if (the_datas.length > 0) {
        set_is_notification(true);
      } else {
        set_is_notification(false);
      }
    });
  };

  const openModal = (id) => {
    set_selected_id(id);
    set_reason("");
    set_modal(true);
  };

  const handleApprove = async (id) => {
    // showLoading();
    try {
      const resp = await providers.approve(id);
      showToast({ message: resp.message });
      getListApproval();
    } catch (error) {
      showToast({ message: error.message });
    }
    // hideLoading();
  };

  const handleReject = async () => {
    try {
      SysValidateForm(["reason"], { reason });
      const resp = await providers.reject(selected_id, reason);
      showToast({ message: resp.message });
      set_modal(false);
      getListApproval();
    } catch (error) {
      showToast({ message: error.message });
    }
    set_selected_id("");
  };
  useEffect(() => {
    getListApproval();
  }, []);
  return (
    <div id="main" className="layout-navbar navbar-fixed">
      <header>
        <nav className="navbar navbar-expand navbar-light navbar-top">
          <div className="container-fluid  justify-content-center">
            <a
              href="#"
              className="burger-btn d-block"
              style={{ color: "#828282" }}
            >
              <Bars3Icon className="fs-3" width="30" height="30" />
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-lg-0">
                <li className="nav-item dropdown me-3">
                  <a
                    className="nav-link active dropdown-toggle text-gray-600"
                    href="#"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                  >
                    <BellIcon width="30" height="30" />
                    <span
                      className={`badge badge-notification ${
                        is_notification ? " bg-danger rounded-circle" : ""
                      }`}
                      style={{ width: "13px", height: "13px" }}
                    >
                      {" "}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end notification-dropdown"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li className="dropdown-header">
                      <h6>Approval</h6>
                    </li>
                    {data.length > 0 &&
                      data.map((val) => {
                        return (
                          <li className="dropdown-item notification-item">
                            <div className="d-flex align-items-center">
                              <div className="notification-icon bg-success">
                                <i className="bi bi-file-earmark-check"></i>
                              </div>
                              <div className="notification-text ms-4">
                                <p className="notification-title font-bold">
                                  {val?.worklist_title ?? ""}
                                </p>
                                <p className="notification-subtitle font-thin text-sm">
                                  {val?.requester_name ?? ""}
                                </p>
                                <div className="d-flex justify-content-between">
                                  <div className="btn-group" role="group">
                                    <a
                                      className="btn btn-sm btn-primary btn-icon text-white"
                                      onClick={() =>
                                        handleApprove(
                                          val?.worklist_journey_id ?? ""
                                        )
                                      }
                                    >
                                      Approve
                                    </a>
                                    <a
                                      className="btn btn-sm btn-danger btn-icon text-white"
                                      onClick={() =>
                                        openModal(
                                          val?.worklist_journey_id ?? ""
                                        )
                                      }
                                    >
                                      Reject
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        );
                      })}

                    <li>
                      <p className="text-center py-2 mb-0">
                        <Link to={"/transaction/approval"}>
                          See all approval
                        </Link>
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
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/faces/1.jpg"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="dropdownMenuButton"
                  style={{ minWidth: "11rem" }}
                >
                  <li>
                    <h6 className="dropdown-header">
                      Hello, {user.full_name}!
                    </h6>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      to="/authentication/log/out/back_to_prev"
                      className="dropdown-item"
                    >
                      <i className="icon-mid bi bi-box-arrow-left me-2"></i>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div id="main-content">
        <div className="page-content">{children}</div>
      </div>
      <Footer />

      <ActionModal
        onOk={() => handleReject()}
        onCancel={() => set_modal(false)}
        title="Reason"
        content={
          <input
            value={reason}
            name="reason"
            className="form-control"
            onChange={(event) => set_reason(event.target.value)}
          ></input>
        }
        visible={modal}
      />
    </div>
  );
};

export default AdminDashboard;
