import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AdminDashboard from "../../AdminDashboard";
import { Button, Form, Input, Popconfirm, Table, Select, Modal } from "antd";
import convert from "../../../model/salaryModel";
import convert_employee from "../../../model/employeeModel";
import convert_overtime from "../../../model/overtimeModel";
import convert_late from "../../../model/lateModel";
import convert_allowance from "../../../model/allowanceModel";
import convert_deduction from "../../../model/deductionModel";
import convert_component from "../../../model/component_nameModel";
import * as providers from "../../../providers/payroll/salary";
import * as providers_employee from "../../../providers/master/employee";
import * as providers_component from "../../../providers/config/component_name";
import * as providers_late from "../../../providers/payroll/late";
import * as providers_overtime from "../../../providers/payroll/overtime";
import * as providers_allowance from "../../../providers/payroll/allowance";
import * as providers_deduction from "../../../providers/payroll/deduction";
import {
  SysCurrencyTransform,
  SysDateTransform,
  SysReadData,
  showToast,
} from "../../../utils/global_store";
import { sys_labels, sys_path_data } from "../../../utils/constants";
import { Switch } from "antd";
import {
  disablePaste,
  onlyNumber,
  onlyNumberAndDot,
} from "../../../utils/validation";

const SalaryComponentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [is_salary, set_is_salary] = useState(false);
  const [data_allowance, set_data_allowance] = useState(
    convert_allowance.listOfallowanceModel([])
  );
  const [data_component, set_data_component] = useState(
    convert_component.listOfcomponent_nameModel([])
  );

  const [data_component_daily, set_data_component_daily] = useState(
    convert_component.listOfcomponent_nameModel([])
  );

  const [data_component_deduction, set_data_component_deduction] = useState(
    convert_component.listOfcomponent_nameModel([])
  );
  const [data_allowance_daily, set_data_allowance_daily] = useState(
    convert_allowance.listOfallowanceModel([])
  );
  const [data_deduction, set_data_deduction] = useState(
    convert_deduction.listOfdeductionModel([])
  );
  const [allowance_total, set_allowance_total] = useState(0);
  const [allowance_total_daily, set_allowance_total_daily] = useState(0);
  const [deduction_total, set_deduction_total] = useState(0);
  const [data, setData] = useState(convert.objectOfsalaryModel({}));
  const [late_data, set_late_data] = useState(
    convert_late.objectOflateModel({})
  );

  const [allowance_editing_key, set_allowance_editing_key] = useState("");
  const [new_row_allowance, set_new_row_allowance] = useState(null);
  const [show_modal_allowance, set_show_modal_allowance] = useState(false);
  const is_editing_allowance = (record) => record.id === allowance_editing_key;
  const handleInputChangeAllowance = (e, key, dataIndex) => {
    if (key == "new") {
      if (dataIndex == "component_name_id") {
        const data = data_component.find((val) => val.id == e.target.value);
        set_new_row_allowance((prev) => ({
          ...prev,
          component_name: {
            id: data.id,
            name: data.name,
          },
        }));
      }
      set_new_row_allowance((prev) => ({
        ...prev,
        [dataIndex]: e.target.value,
      }));
    } else {
      let updatedData = null;
      if (dataIndex == "component_name_id") {
        const data = data_component.find((val) => val.id == e.target.value);
        updatedData = data_allowance.map((item) =>
          item.id === key
            ? { ...item, component_name: { id: data.id, name: data.name } }
            : item
        );
      } else {
        updatedData = data_allowance.map((item) =>
          item.id === key ? { ...item, [dataIndex]: e.target.value } : item
        );
      }
      set_data_allowance(updatedData);
    }
  };
  const columns_allowance = [
    {
      title: "Nama Tunjangan",
      dataIndex: "component_name_id",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_allowance(record);
        return !is_edit ? (
          record.component_name.name
        ) : (
          <select
            className="form-select"
            id="component_name_id"
            name="component_name_id"
            value={record.component_name.id}
            onChange={(e) =>
              handleInputChangeAllowance(e, record.id, "component_name_id")
            }
            aria-label="Nama Tunjangan"
            required
          >
            {data_component.map((option, index) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      title: "Nominal",
      dataIndex: "ammount",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_allowance(record);
        return !is_edit ? (
          SysCurrencyTransform({ num: record.ammount })
        ) : (
          <Input
            value={val}
            onKeyDown={onlyNumber}
            onPaste={disablePaste}
            onChange={(e) =>
              handleInputChangeAllowance(e, record.id, "ammount")
            }
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const editable = is_editing_allowance(record);
        return editable ? (
          <div className="btn-group" role="group">
            <a
              onClick={() => handleSaveEditingAllowance(record.id)}
              className="btn icon btn-success btn-sm"
            >
              <i className="bi bi-check"></i>
            </a>
            <a
              onClick={() => handleCancelEditAllowance()}
              className="btn icon btn-info btn-sm"
            >
              <i className="bi bi-x"></i>
            </a>
          </div>
        ) : (
          <div className="btn-group" role="group">
            <a
              onClick={() => handleEditRowAllowance(record)}
              className="btn icon btn-info btn-sm"
            >
              <i className="bi bi-pencil"></i>
            </a>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDeleteAllowance(record.id)}
            >
              <a className="btn icon btn-danger btn-sm">
                <i className="bi bi-trash"></i>
              </a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const handleAddRowAllowance = () => {
    const newKey = "new";
    set_new_row_allowance({
      id: newKey,
      component_name_id: "",
      component_name: {
        id: "",
        name: "",
      },
      ammount: "",
    });
    set_allowance_editing_key("new");
  };
  const handleEditRowAllowance = (record) => {
    set_allowance_editing_key(record.id);
  };
  const handleCloseModalAllowance = () => {
    set_show_modal_allowance(false);
    set_allowance_editing_key("");
    set_new_row_allowance(null);
    getAllowance(employee_data.id);
  };

  const handleCancelEditAllowance = () => {
    set_allowance_editing_key("");
    set_new_row_allowance(null);
    getAllowance(employee_data.id);
  };
  const handleSaveEditingAllowance = async (id) => {
    try {
      if (id == "new") {
        await providers_allowance.insertData(
          {
            allowance_type: "tetap",
            component_name_id: new_row_allowance.component_name.id,
            ammount: new_row_allowance.ammount,
            is_taxable: false,
            is_final_tax: false,
          },
          employee_data.id
        );
      } else {
        const data = data_allowance.find((item) => item.id === id);
        if (data) {
          await providers_allowance.updateData(
            {
              allowance_type: "tetap",
              component_name_id: data.component_name.id,
              ammount: data.ammount,
              is_taxable: data.is_taxable,
              is_final_tax: false,
            },
            employee_data.id,
            data.id
          );
        }
      }
      await getAllowance(employee_data.id);
      set_allowance_editing_key("");
      set_new_row_allowance(null);
    } catch (error) {
      set_allowance_editing_key("");
      set_new_row_allowance(null);
    }
  };
  const handleDeleteAllowance = async (id) => {
    try {
      if (allowance_editing_key != "new") {
        const resp = await providers_allowance.deleteData(data.employee_id, id);
        await getAllowance(employee_data.id);
        showToast({ message: resp.message });
      }
      set_allowance_editing_key("");
    } catch (error) {}
  };

  const [deduction_editing_key, set_deduction_editing_key] = useState("");
  const [new_row_deduction, set_new_row_deduction] = useState(null);
  const [show_modal_deduction, set_show_modal_deduction] = useState(false);
  const is_editing_deduction = (record) => record.id === deduction_editing_key;
  const handleInputChangeDeduction = (e, key, dataIndex) => {
    if (key == "new") {
      if (dataIndex == "component_name_id") {
        const data = data_component_deduction.find(
          (val) => val.id == e.target.value
        );
        set_new_row_deduction((prev) => ({
          ...prev,
          component_name: {
            id: data.id,
            name: data.name,
          },
        }));
      }
      set_new_row_deduction((prev) => ({
        ...prev,
        [dataIndex]: e.target.value,
      }));
    } else {
      let updatedData = null;
      if (dataIndex == "component_name_id") {
        const data = data_component_deduction.find(
          (val) => val.id == e.target.value
        );
        updatedData = data_deduction.map((item) =>
          item.id === key
            ? { ...item, component_name: { id: data.id, name: data.name } }
            : item
        );
      } else {
        updatedData = data_deduction.map((item) =>
          item.id === key ? { ...item, [dataIndex]: e.target.value } : item
        );
      }
      set_data_deduction(updatedData);
    }
  };
  const columns_deduction = [
    {
      title: "Nama Potongan",
      dataIndex: "component_name_id",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_deduction(record);
        return !is_edit ? (
          record.component_name.name
        ) : (
          <select
            className="form-select"
            id="component_name_id"
            name="component_name_id"
            value={record.component_name.id}
            onChange={(e) =>
              handleInputChangeDeduction(e, record.id, "component_name_id")
            }
            aria-label="Nama Potongan"
            required
          >
            {data_component_deduction.map((option, index) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        );
      },
    },

    {
      title: "Deskripsi",
      dataIndex: "description",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_deduction(record);
        return !is_edit ? (
          record.description
        ) : (
          <Input
            value={val}
            onChange={(e) =>
              handleInputChangeDeduction(e, record.id, "description")
            }
          />
        );
      },
    },
    {
      title: "Nominal",
      dataIndex: "amount",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_deduction(record);
        return !is_edit ? (
          SysCurrencyTransform({ num: record.amount })
        ) : (
          <Input
            value={val}
            onKeyDown={onlyNumber}
            onPaste={disablePaste}
            onChange={(e) => handleInputChangeDeduction(e, record.id, "amount")}
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const editable = is_editing_deduction(record);
        return editable ? (
          <div className="btn-group" role="group">
            <a
              onClick={() => handleSaveEditingDeduction(record.id)}
              className="btn icon btn-success btn-sm"
            >
              <i className="bi bi-check"></i>
            </a>
            <a
              onClick={() => handleCancelEditDeduction()}
              className="btn icon btn-info btn-sm"
            >
              <i className="bi bi-x"></i>
            </a>
          </div>
        ) : (
          <div className="btn-group" role="group">
            <a
              onClick={() => handleEditRowDeduction(record)}
              className="btn icon btn-info btn-sm"
            >
              <i className="bi bi-pencil"></i>
            </a>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDeleteDeduction(record.id)}
            >
              <a className="btn icon btn-danger btn-sm">
                <i className="bi bi-trash"></i>
              </a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const handleAddRowDeduction = () => {
    const newKey = "new";
    set_new_row_deduction({
      id: newKey,
      component_name_id: "",
      description: "",
      component_name: {
        id: "",
        name: "",
      },
      amount: "",
    });
    set_deduction_editing_key("new");
  };
  const handleEditRowDeduction = (record) => {
    set_deduction_editing_key(record.id);
  };
  const handleCloseModalDeduction = () => {
    set_show_modal_deduction(false);
    set_deduction_editing_key("");
    set_new_row_deduction(null);
    getDeduction(employee_data.id);
  };

  const handleCancelEditDeduction = () => {
    set_deduction_editing_key("");
    set_new_row_deduction(null);
    getDeduction(employee_data.id);
  };
  const handleSaveEditingDeduction = async (id) => {
    try {
      if (id == "new") {
        console.log("INSERT BARU");
        await providers_deduction.insertData({
          component_name_id: new_row_deduction.component_name.id,
          amount: new_row_deduction.amount,
          description: new_row_deduction.description,
          employee_id: employee_data.id,
        });
      } else {
        const data = data_deduction.find((item) => item.id === id);
        if (data) {
          await providers_deduction.updateData(
            {
              component_name_id: data.component_name.id,
              amount: data.amount,
              description: data.description,
              employee_id: employee_data.id,
            },
            data.id
          );
        }
      }
      await getDeduction(employee_data.id);
      set_deduction_editing_key("");
      set_new_row_deduction(null);
    } catch (error) {
      set_deduction_editing_key("");
      set_new_row_deduction(null);
    }
  };
  const handleDeleteDeduction = async (id) => {
    try {
      if (deduction_editing_key != "new") {
        const resp = await providers_deduction.deleteData(id);
        await getDeduction(employee_data.id);
        showToast({ message: "Delete success" });
      }
      set_deduction_editing_key("");
    } catch (error) {}
  };

  const [allowance_daily_editing_key, set_allowance_daily_editing_key] =
    useState("");
  const [new_row_allowance_daily, set_new_row_allowance_daily] = useState(null);
  const [show_modal_allowance_daily, set_show_modal_allowance_daily] =
    useState(false);
  const is_editing_allowance_daily = (record) =>
    record.id === allowance_daily_editing_key;
  const handleInputChangeAllowanceDaily = (e, key, dataIndex) => {
    if (key == "new") {
      if (dataIndex == "component_name_id") {
        const data = data_component_daily.find(
          (val) => val.id == e.target.value
        );
        set_new_row_allowance_daily((prev) => ({
          ...prev,
          component_name: {
            id: data.id,
            name: data.name,
          },
        }));
      }
      set_new_row_allowance_daily((prev) => ({
        ...prev,
        [dataIndex]: e.target.value,
      }));
    } else {
      let updatedData = null;
      if (dataIndex == "component_name_id") {
        const data = data_component_daily.find(
          (val) => val.id == e.target.value
        );
        updatedData = data_allowance_daily.map((item) =>
          item.id === key
            ? { ...item, component_name: { id: data.id, name: data.name } }
            : item
        );
      } else {
        updatedData = data_allowance_daily.map((item) =>
          item.id === key ? { ...item, [dataIndex]: e.target.value } : item
        );
      }
      set_data_allowance_daily(updatedData);
    }
  };
  const columns_allowance_daily = [
    {
      title: "Tunjangan Harian",
      dataIndex: "component_name_id",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_allowance_daily(record);
        return !is_edit ? (
          record.component_name.name
        ) : (
          <select
            className="form-select"
            id="component_name_id"
            name="component_name_id"
            value={record.component_name.id}
            onChange={(e) =>
              handleInputChangeAllowanceDaily(e, record.id, "component_name_id")
            }
            aria-label="Nama Tunjangan"
            required
          >
            {data_component_daily.map((option, index) => (
              <option key={index} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        );
      },
    },
    {
      title: "Nominal",
      dataIndex: "ammount",
      editable: true,
      render: (val, record) => {
        const is_edit = is_editing_allowance_daily(record);
        return !is_edit ? (
          SysCurrencyTransform({ num: record.ammount })
        ) : (
          <Input
            value={val}
            onKeyDown={onlyNumber}
            onPaste={disablePaste}
            onChange={(e) =>
              handleInputChangeAllowanceDaily(e, record.id, "ammount")
            }
          />
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => {
        const editable = is_editing_allowance_daily(record);
        return editable ? (
          <div className="btn-group" role="group">
            <a
              onClick={() => handleSaveEditingAllowanceDaily(record.id)}
              className="btn icon btn-success btn-sm"
            >
              <i className="bi bi-check"></i>
            </a>
            <a
              onClick={() => handleCancelEditAllowanceDaily()}
              className="btn icon btn-info btn-sm"
            >
              <i className="bi bi-x"></i>
            </a>
          </div>
        ) : (
          <div className="btn-group" role="group">
            <a
              onClick={() => handleEditRowAllowanceDaily(record)}
              className="btn icon btn-info btn-sm"
            >
              <i className="bi bi-pencil"></i>
            </a>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDeleteAllowanceDaily(record.id)}
            >
              <a className="btn icon btn-danger btn-sm">
                <i className="bi bi-trash"></i>
              </a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  const handleAddRowAllowanceDaily = () => {
    const newKey = "new";
    set_new_row_allowance_daily({
      id: newKey,
      component_name_id: "",
      component_name: {
        id: "",
        name: "",
      },
      ammount: "",
    });
    set_allowance_daily_editing_key("new");
  };
  const handleEditRowAllowanceDaily = (record) => {
    set_allowance_daily_editing_key(record.id);
  };
  const handleCloseModalAllowanceDaily = () => {
    set_show_modal_allowance_daily(false);
    set_allowance_daily_editing_key("");
    set_new_row_allowance_daily(null);
    getAllowanceDaily(employee_data.id);
  };

  const handleCancelEditAllowanceDaily = () => {
    set_allowance_daily_editing_key("");
    set_new_row_allowance_daily(null);
    getAllowanceDaily(employee_data.id);
  };
  const handleSaveEditingAllowanceDaily = async (id) => {
    try {
      if (id == "new") {
        console.log("KESINI");
        await providers_allowance.insertData(
          {
            allowance_type: "harian",
            component_name_id: new_row_allowance_daily.component_name.id,
            ammount: new_row_allowance_daily.ammount,
            is_taxable: false,
            is_final_tax: false,
          },
          employee_data.id
        );
      } else {
        const data = data_allowance_daily.find((item) => item.id === id);
        if (data) {
          await providers_allowance.updateData(
            {
              allowance_type: "harian",
              component_name_id: data.component_name.id,
              ammount: data.ammount,
              is_taxable: data.is_taxable,
              is_final_tax: false,
            },
            employee_data.id,
            data.id
          );
        }
      }
      await getAllowanceDaily(employee_data.id);
      set_allowance_daily_editing_key("");
      set_new_row_allowance_daily(null);
    } catch (error) {
      console.log(error);
      set_allowance_daily_editing_key("");
      set_new_row_allowance_daily(null);
    }
  };
  const handleDeleteAllowanceDaily = async (id) => {
    try {
      if (allowance_daily_editing_key != "new") {
        const resp = await providers_allowance.deleteData(data.employee_id, id);
        await getAllowanceDaily(employee_data.id);
        showToast({ message: resp.message });
      }
      set_allowance_daily_editing_key("");
    } catch (error) {}
  };
  const bank_data = SysReadData(sys_path_data.bank_data);
  const calc_base = SysReadData(sys_path_data.calc_base_data);
  const calc_mode = SysReadData(sys_path_data.calc_mode_data);
  const work_pateren = SysReadData(sys_path_data.work_patern_data);
  const [overtime_date, set_overtime_date] = useState(
    convert_overtime.objectOfovertimeModel({})
  );
  const [employee_data, set_employee_data] = useState(
    convert_employee.objectOfemployeeModel([])
  );

  useEffect(() => {
    getEmployee(id);
    getLateConfig(id);
    getOvertimeConfig(id);
    getComponent();
    getComponentDaily();
    getComponentDeduction();
  }, []);
  const title = `${sys_labels.action.EDIT_FORM} ${sys_labels.menus.SALARY}`;
  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleChangeOvertime = (event) => {
    const { name, value } = event.target;
    const the_name = name.replace("_overtime", "");
    set_overtime_date((prevState) => ({ ...prevState, [the_name]: value }));
  };
  const handleChangeLate = (event) => {
    const { name, value } = event.target;
    const the_name = name.replace("_late", "");

    set_late_data((prevState) => ({ ...prevState, [the_name]: value }));
  };

  const handleChangeActive = (value) => {
    set_overtime_date((prevState) => ({ ...prevState, is_approval: value }));
  };
  const handleDetail = async (id) => {
    try {
      const resp = await providers.getDetail(id);
      setData(resp.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
  };

  const getEmployee = async (id) => {
    try {
      const resp = await providers_employee.getDetail(id);
      set_employee_data(resp.data);
      await checkEmployeeHaveConfig(id);
      await getDeduction(id);
      await getAllowance(id);
      await getAllowanceDaily(id);
    } catch (error) {
      showToast({ message: error.message, type: error });
      navigate(-1);
    }
  };

  const getComponentDeduction = async () => {
    try {
      const resp = await providers_component.getDataDeductionMax();
      set_data_component_deduction(resp.data.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
    }
  };

  const getComponent = async () => {
    try {
      const resp = await providers_component.getDataAllowanceMax();
      set_data_component(resp.data.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
    }
  };
  const getComponentDaily = async () => {
    try {
      const resp = await providers_component.getDataAllowanceDailyMax();
      set_data_component_daily(resp.data.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
    }
  };
  const getLateConfig = async (id) => {
    try {
      const resp = await providers_late.getData(id);
      set_late_data(resp.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
    }
  };
  const getOvertimeConfig = async (id) => {
    try {
      const resp = await providers_overtime.getData(id);
      set_overtime_date(resp.data);
    } catch (error) {
      showToast({ message: error.message, type: error });
    }
  };

  const getDeduction = async (id) => {
    try {
      const resp = await providers_deduction.getData(id);
      if (resp.data.data) {
        set_data_deduction(resp.data.data);
      } else {
        set_data_deduction([]);
      }
      calculateDeduction(resp.data.data);
    } catch (error) {
      // showToast({ message: error.message, type: error });
    }
  };
  const getAllowance = async (id) => {
    try {
      const resp = await providers_allowance.getData(id);
      console.log(resp.data);
      if (resp.data.data) {
        set_data_allowance(resp.data.data);
      } else {
        set_data_allowance([]);
      }
      calculateAllowance(resp.data.data);
    } catch (error) {
      // showToast({ message: error.message, type: error });
    }
  };

  const getAllowanceDaily = async (id) => {
    try {
      const resp = await providers_allowance.getData(id, "harian");
      // console.log(resp);
      console.log(resp.data);
      if (resp.data.data) {
        set_data_allowance_daily(resp.data.data);
      } else {
        set_data_allowance_daily([]);
      }
      calculateAllowanceDaily(resp.data.data);
    } catch (error) {
      // showToast({ message: error.message, type: error });
    }
  };
  const calculateAllowanceDaily = (data) => {
    set_allowance_total_daily(0);
    let new_total_daily = 0;
    if (data) {
      data.map((val) => {
        new_total_daily += parseInt(val.ammount);
      });
    }
    set_allowance_total_daily(new_total_daily);
  };
  const calculateAllowance = (data) => {
    set_allowance_total(0);
    let new_total = 0;
    if (data) {
      data.map((val) => {
        new_total += parseInt(val.ammount);
      });
    }
    set_allowance_total(new_total);
  };

  const calculateDeduction = (data) => {
    set_deduction_total(0);
    let new_total = 0;
    if (data) {
      data.map((val) => {
        new_total += parseInt(val.amount);
      });
      set_deduction_total(new_total);
    }
  };
  const checkEmployeeHaveConfig = async (id) => {
    try {
      const resp = await providers.getData(1, 1, "", id);
      if (resp.data.data.length > 0) {
        await handleDetail(resp.data.data[0].id);
        set_is_salary(true);
      }
    } catch (error) {}
  };
  const handleSubmit = async () => {
    const resp_overtime = await providers_overtime.updateData(
      {
        calc_base: overtime_date.calc_base,
        calc_mode: overtime_date.calc_mode,
        total_custom: overtime_date.total_custom,
        work_pattern: data.working_days,
        is_approval: overtime_date.is_approval,
      },
      employee_data.id,
      overtime_date.id
    );
    const resp_late = await providers_late.updateData(
      {
        calc_base: late_data.calc_base,
        total_custom: late_data.total_custom,
      },
      employee_data.id,
      late_data.id
    );
    try {
      const resp = await providers.insertData({
        employee_id: employee_data.id,
        basic_salary: data.basic_salary,
        overtime_config: "config-1",
        overtime: overtime_date.total_custom ?? 0,
        late_deduction_config: "config-1",
        late_deduction: late_data.total_custom ?? 0,
        working_days: data.working_days,
        leave_balance_incentive: data.leave_balance_incentive,
        jht: data.jht,
        kesehatan: data.kesehatan,
        jp: data.jp,
        other_insurance: data.other_insurance,
        jht_company: data.jht_company,
        kesehatan_company: data.kesehatan_company,
        jp_company: data.jp_company,
        jkm_company: data.jkm_company,
        jkk_company: data.jkk_company,
        other_insurance_company: data.other_insurance_company,
        bank_name: data.bank_name,
        bank_account: data.bank_account.toString(),
      });

      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
  };

  const handleUpdate = async () => {
    const resp_overtime = await providers_overtime.updateData(
      {
        calc_base: overtime_date.calc_base,
        calc_mode: overtime_date.calc_mode,
        total_custom: overtime_date.total_custom,
        work_pattern: data.working_days,
        is_approval: overtime_date.is_approval,
      },
      employee_data.id,
      overtime_date.id
    );
    const resp_late = await providers_late.updateData(
      {
        calc_base: late_data.calc_base,
        total_custom: late_data.total_custom,
      },
      employee_data.id,
      late_data.id
    );
    try {
      const resp = await providers.updateData(
        {
          employee_id: employee_data.id,
          basic_salary: data.basic_salary,
          overtime_config: "config-1",
          overtime: overtime_date.total_custom ?? 0,
          late_deduction_config: "config-1",
          late_deduction: late_data.total_custom ?? 0,
          working_days: data.working_days,
          leave_balance_incentive: data.leave_balance_incentive,
          jht: data.jht,
          kesehatan: data.kesehatan,
          jp: data.jp,
          other_insurance: data.other_insurance,
          jht_company: data.jht_company,
          kesehatan_company: data.kesehatan_company,
          jp_company: data.jp_company,
          jkm_company: data.jkm_company,
          jkk_company: data.jkk_company,
          other_insurance_company: data.other_insurance_company,
          bank_name: data.bank_name,
          bank_account: data.bank_account.toString(),
        },
        data.id
      );

      showToast({ message: resp.message, type: "success" });
      navigate(-1);
    } catch (error) {
      showToast({ message: error.message, type: "error" });
    }
  };
  return (
    <AdminDashboard label="">
      <section className="section">
        <div className="card">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h3>
              {title} {employee_data.full_name}
            </h3>
          </div>
          <div className="card-body">
            <div className="form form-horizontal">
              <div className="form-body">
                <div className="row mt-3">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Nama:</label>
                      <input
                        className="form-control"
                        type="text"
                        readOnly
                        value={employee_data.full_name}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>
                        Gaji Pokok:{" "}
                        {SysCurrencyTransform({
                          num: data.basic_salary,
                          currency: "Rp",
                        })}
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        onKeyDown={onlyNumber}
                        onPaste={disablePaste}
                        name="basic_salary"
                        value={data.basic_salary}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Nama Bank:</label>{" "}
                      <select
                        className="form-select"
                        id="bank_name"
                        name="bank_name"
                        value={data.bank_name}
                        onChange={handleChange}
                        aria-label="Nama Bank"
                      >
                        <option value={null}>Select Bank</option>
                        {bank_data.map((option, index) => (
                          <option key={index} value={option.value}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Rekening:</label>
                      <input
                        className="form-control"
                        type="text"
                        onKeyDown={onlyNumber}
                        onPaste={disablePaste}
                        name="bank_account"
                        value={data.bank_account}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-10">
                        <div className="form-group">
                          <label>Tunjangan Tetap:</label>
                          <input
                            className="form-control"
                            type="text"
                            readOnly
                            value={SysCurrencyTransform({
                              num: allowance_total,
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <button
                          onClick={() => set_show_modal_allowance(true)}
                          className="btn btn-primary mt-4"
                        >
                          Rincian
                        </button>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-10">
                        <div className="form-group">
                          <label>Tunjangan Harian:</label>
                          <input
                            className="form-control"
                            type="text"
                            readOnly
                            value={SysCurrencyTransform({
                              num: allowance_total_daily,
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <button
                          onClick={() => set_show_modal_allowance_daily(true)}
                          className="btn btn-primary mt-4"
                        >
                          Rincian
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-10">
                        <div className="form-group">
                          <label>Potongan Tetap:</label>
                          <input
                            className="form-control"
                            type="text"
                            readOnly
                            value={SysCurrencyTransform({
                              num: deduction_total,
                            })}
                          />
                        </div>
                      </div>
                      <div className="col-md-2">
                        <button
                          onClick={() => set_show_modal_deduction(true)}
                          className="btn btn-primary mt-4"
                        >
                          Rincian
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="row">
                      <div className="col-md-2">
                        <div className="form-group">
                          <label>Hari Kerja:</label>{" "}
                          <input
                            className="form-control"
                            type="text"
                            onKeyDown={onlyNumber}
                            onPaste={disablePaste}
                            name="working_days"
                            value={data.working_days}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Total:</label>{" "}
                          <input
                            className="form-control"
                            type="text"
                            readOnly
                            value={SysCurrencyTransform({
                              num:
                                allowance_total_daily *
                                parseInt(data.working_days),
                            })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4 mb-5">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="col-md-12 text-center form-group mb-4">
                          <label className="text-center">
                            Upah per Jam untuk Lembur
                          </label>
                        </div>
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>Berdasarkan:</label>{" "}
                              <select
                                className="form-select"
                                id="calc_base_overtime"
                                name="calc_base_overtime"
                                value={overtime_date.calc_base}
                                onChange={handleChangeOvertime}
                                aria-label="Calc Base"
                              >
                                <option value={null}>Select Calc Base</option>
                                {calc_base.map((option, index) => (
                                  <option key={index} value={option.value}>
                                    {option.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="form-group">
                              <label>
                                Total:{" "}
                                {overtime_date.calc_base == "custom"
                                  ? SysCurrencyTransform({
                                      num: overtime_date.total_custom,
                                      currency: "Rp",
                                    })
                                  : ""}
                              </label>
                              <input
                                className="form-control"
                                type="text"
                                onKeyDown={onlyNumber}
                                onPaste={disablePaste}
                                name="total_custom_overtime"
                                value={overtime_date.total_custom}
                                onChange={handleChangeOvertime}
                                readOnly={
                                  overtime_date.calc_base == "custom"
                                    ? false
                                    : true
                                }
                              />
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Lembur Harus Disertai Persetujuan:</label>{" "}
                              <select
                                className="form-select"
                                id="is_approval_overtime"
                                name="is_approval_overtime"
                                value={overtime_date.is_approval}
                                onChange={handleChangeOvertime}
                                aria-label="Calc Mode"
                              >
                                <option value={null}>Select Type</option>
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Mode Perhitungan Lembur:</label>{" "}
                              <select
                                className="form-select"
                                id="calc_mode_overtime"
                                name="calc_mode_overtime"
                                value={overtime_date.calc_mode}
                                onChange={handleChangeOvertime}
                                aria-label="Calc Mode"
                              >
                                <option value={null}>Select Calc Mode</option>
                                {calc_mode.map((option, index) => (
                                  <option key={index} value={option.value}>
                                    {option.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <label>Pola Hari Kerja:</label>{" "}
                              <select
                                className="form-select"
                                id="work_pattern_overtime"
                                name="work_pattern_overtime"
                                value={overtime_date.work_pattern}
                                onChange={handleChangeOvertime}
                                aria-label="Calc Mode"
                              >
                                <option value={null}>Pilih Pola</option>
                                {work_pateren.map((option, index) => (
                                  <option key={index} value={option.value}>
                                    {option.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="col-md-12 text-center form-group mb-4">
                          <label className="text-center">
                            Potongan per Jam untuk Keterlambatan
                          </label>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Berdasarkan:</label>{" "}
                            <select
                              className="form-select"
                              id="calc_base_late"
                              name="calc_base_late"
                              value={late_data.calc_base}
                              onChange={handleChangeLate}
                              aria-label="Calc Base"
                            >
                              <option value={null}>Select Calc Base</option>
                              {calc_base.map((option, index) => (
                                <option key={index} value={option.value}>
                                  {option.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label>
                              Total:{" "}
                              {SysCurrencyTransform({
                                num: late_data.total_custom,
                              })}
                            </label>
                            <input
                              className="form-control"
                              type="text"
                              onKeyDown={onlyNumber}
                              onPaste={disablePaste}
                              name="total_custom_late"
                              value={late_data.total_custom}
                              onChange={handleChangeLate}
                            />
                          </div>
                        </div>

                        <div className="col-md-12 text-center form-group mt-4 mb-4">
                          <label className="text-center">
                            Insentif per Hari jika Saldo Cuti Diuangkan
                          </label>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Insentif Saldo Cuti:</label>
                            <input
                              className="form-control"
                              type="text"
                              onKeyDown={onlyNumber}
                              onPaste={disablePaste}
                              name="leave_balance_incentive"
                              value={data.leave_balance_incentive}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 mt-4">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="col-md-12 text-center form-group mb-4">
                          <label className="text-center">
                            Asuransi Oleh Karyawan
                          </label>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>BPJS JHT (%):</label>
                            <input
                              className="form-control"
                              type="text"
                              onKeyDown={onlyNumberAndDot}
                              onPaste={disablePaste}
                              name="jht"
                              value={data.jht}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>BPJS Kesehatan (%):</label>
                            <input
                              className="form-control"
                              type="text"
                              onKeyDown={onlyNumberAndDot}
                              onPaste={disablePaste}
                              name="kesehatan"
                              value={data.kesehatan}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label>BPJS JP(%):</label>
                            <input
                              className="form-control"
                              type="text"
                              onKeyDown={onlyNumberAndDot}
                              onPaste={disablePaste}
                              name="jp"
                              value={data.jp}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Lainnya (%):</label>
                            <input
                              className="form-control"
                              type="text"
                              onKeyDown={onlyNumberAndDot}
                              onPaste={disablePaste}
                              name="other_insurance"
                              value={data.other_insurance}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="col-md-12 text-center form-group mb-4">
                          <label className="text-center">
                            Asuransi Oleh Perusahaan
                          </label>
                        </div>
                        <div className="col-md-12">
                          <div className="form-group">
                            <label>BPJS JHT (%):</label>
                            <input
                              className="form-control"
                              type="text"
                              onKeyDown={onlyNumberAndDot}
                              onPaste={disablePaste}
                              name="jht_company"
                              value={data.jht_company}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label>BPJS Kesehatan (%):</label>
                            <input
                              className="form-control"
                              type="text"
                              onKeyDown={onlyNumberAndDot}
                              onPaste={disablePaste}
                              name="kesehatan_company"
                              value={data.kesehatan_company}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label>BPJS JP (%):</label>
                            <input
                              className="form-control"
                              type="text"
                              onKeyDown={onlyNumberAndDot}
                              onPaste={disablePaste}
                              name="jp_company"
                              value={data.jp_company}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label>BPJS JKM (%):</label>
                            <input
                              className="form-control"
                              type="text"
                              onKeyDown={onlyNumberAndDot}
                              onPaste={disablePaste}
                              name="jkm_company"
                              value={data.jkm_company}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label>BPJS JKK (%):</label>
                            <input
                              className="form-control"
                              type="text"
                              onKeyDown={onlyNumberAndDot}
                              onPaste={disablePaste}
                              name="jkk_company"
                              value={data.jkk_company}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <label>Lainnya (%):</label>
                            <input
                              className="form-control"
                              type="text"
                              onKeyDown={onlyNumberAndDot}
                              onPaste={disablePaste}
                              name="other_insurance_company"
                              value={data.other_insurance_company}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => (is_salary ? handleUpdate() : handleSubmit())}
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </div>
        <Modal
          title="Tunjangan"
          open={show_modal_allowance}
          onOk={() => handleCloseModalAllowance()}
          onCancel={() => handleCloseModalAllowance()}
          width={1000}
        >
          <Table
            pagination={false}
            dataSource={
              new_row_allowance
                ? [...data_allowance, new_row_allowance]
                : data_allowance
            }
            columns={columns_allowance}
          />
          <Button
            onClick={handleAddRowAllowance}
            className="btn btn-sm btn-primary mt-4"
            style={{ borderRadius: 100 }}
          >
            <i className="bi bi-plus"></i>
          </Button>
        </Modal>
        <Modal
          title="Tunjangan Harian"
          open={show_modal_allowance_daily}
          onOk={() => handleCloseModalAllowanceDaily()}
          onCancel={() => handleCloseModalAllowanceDaily()}
          width={1000}
        >
          <Table
            pagination={false}
            dataSource={
              new_row_allowance_daily
                ? [...data_allowance_daily, new_row_allowance_daily]
                : data_allowance_daily
            }
            columns={columns_allowance_daily}
          />
          <Button
            onClick={handleAddRowAllowanceDaily}
            className="btn btn-sm btn-primary mt-4"
            style={{ borderRadius: 100 }}
          >
            <i className="bi bi-plus"></i>
          </Button>
        </Modal>
        <Modal
          title="Potongan"
          open={show_modal_deduction}
          onOk={() => handleCloseModalDeduction()}
          onCancel={() => handleCloseModalDeduction()}
          width={1000}
        >
          <Table
            pagination={false}
            dataSource={
              new_row_deduction
                ? [...data_deduction, new_row_deduction]
                : data_deduction
            }
            columns={columns_deduction}
          />
          <Button
            onClick={handleAddRowDeduction}
            className="btn btn-sm btn-primary mt-4"
            style={{ borderRadius: 100 }}
          >
            <i className="bi bi-plus"></i>
          </Button>
        </Modal>
      </section>
    </AdminDashboard>
  );
};

export default SalaryComponentForm;
