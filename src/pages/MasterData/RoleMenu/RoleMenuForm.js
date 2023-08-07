import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import convert from "../../../model/job_levelModel";
import * as providers from "../../../providers/master/role";
import * as providers_menu from "../../../providers/master/menu";
import {
  SysGenMenu,
  SysGenRouting,
  showToast,
} from "../../../utils/global_store";
import { sys_labels } from "../../../utils/constants";
import { Checkbox } from "antd";
import { useLoadingContext } from "../../../components/Loading";
const RoleMenuForm = () => {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoadingContext();
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [menu, setMenu] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const handleItemToggle = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const title = `${
    id ? sys_labels.action.EDIT_FORM : sys_labels.action.FORM
  } Role Menu`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  useEffect(() => {
    if (id) {
      // console.log(id);
      handleDetail(id);
    }
  }, []);
  const handleDetail = async (id) => {
    showLoading();
    try {
      const all_sys_menu = SysGenRouting();
      const all_menu = await getMenu();
      const resp = await providers.getRoleMenu(id);
      const datas = resp.data.data;
      console.log("INI DATA", datas);
      let my_menu = [];
      if (datas !=undefined&& datas.length > 0) {
        datas.map((val) => {
          const id_menu = all_menu.find(
            (val_menu) => val.menu.route == val_menu.route
          );
          if (id_menu) {
            my_menu.push(id_menu.id);
          }
        });
      }
      setSelectedItems(my_menu);
      let sys_menu = [];
      all_sys_menu.map((val) => {
        const obj_menu = all_menu.find(
          (val_menu) => val_menu.route == val.route
        );
        if (obj_menu) {
          sys_menu.push({
            ...val,
            id: obj_menu.id,
          });
        }
      });
      setMenu(sys_menu);
      setData(resp.data.data);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: error });
      // navigate(-1);
    }
    hideLoading();
  };
  const handleSubmit = async () => {
    try {
      // const resp = await providers.insertData({
      //   name: data.name,
      //   parent_id: data.parent_id,
      // });
      // showToast({ message: resp.message, type: "success" });
      // navigate(-1);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message, type: "error" });
    }
  };
  const getMenu = async () => {
    let menus = [];
    try {
      const resp = await providers_menu.getData(1, 999999999, "");
      menus = resp.data.data;
    } catch (error) {}
    return menus;
  };
  const handleUpdate = async () => {
    showLoading();
    // console.log(data);
    if (data != undefined) {
      for (let index = 0; index < data.length; index++) {
        try {
          const resp = await providers.deleteRoleMenu(id, data[index].id);
        } catch (error) {}
      }
    }
    for (let index = 0; index < selectedItems.length; index++) {
      // const element = array[index];
      try {
        const resp = await providers.insertData(id, {
          menu_id: selectedItems[index],
        });
      } catch (error) {}
    }
    hideLoading();
    navigate(-1);
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
                  {menu.length > 0 &&
                    menu.map((val) => {
                      const len = val.route.split("/");
                      // console.log(len);
                      const ml = len.length > 2 ? { marginLeft: 25 } : {};
                      // console.log(val);
                      return (
                        <div className="col-md-12 mb-2">
                          <Checkbox
                            key={val.id}
                            // className={ml}
                            // className="form-control"
                            style={{ ...ml, fontSize: 16 }}
                            checked={selectedItems.includes(val.id)}
                            onChange={() => handleItemToggle(val.id)}
                          >
                            {val.name}
                          </Checkbox>
                        </div>
                      );
                    })}
                  {/* <div className="col-md-6">
                    <div className="form-group">
                      <label>Parent:</label>{" "}
                      <select
                        className="form-select"
                        id="parent_id"
                        name="parent_id"
                        value={data.parent_id}
                        onChange={handleChange}
                        aria-label="Parent"
                      >
                        <option value={null}>Select Parent</option>
                        {parent.map((option, index) =>
                          option.id == data.id ? null : (
                            <option key={index} value={option.id}>
                              {option.name}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Job Level:</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div> */}
                </div>
                <button
                  onClick={() => handleUpdate()}
                  className="btn btn-primary mt-3"
                >
                  Submit
                  {/* {data.id ? "Update" : "Submit"} */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AdminDashboard>
  );
};

export default RoleMenuForm;
