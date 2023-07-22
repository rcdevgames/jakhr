import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table, Select, Modal } from "antd";
import "./styles.css";
import {
  file_template,
  sys_labels,
  sys_path_data,
} from "../../../utils/constants";
import * as XLSX from "xlsx";
import * as providers from "../../../providers/payroll/allowance";
import { SysReadData, showToast } from "../../../utils/global_store";
import convert from "../../../model/allowanceModel";
const AllowanceForm = (props) => {
  const { employee_id, is_salary, handleSubmitSalary } = props;
  const [data, setData] = useState([]);
  const fileInputRef = useRef(null);
  const [count, setCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(
    convert.objectOfallowanceModel({})
  );
  const allowance = SysReadData(sys_path_data.allowance_type_data);

  useEffect(() => {
    if (employee_id) {
      getAllowance();
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditingRecord((prevState) => ({ ...prevState, [name]: value }));
  };
  const getAllowance = async () => {
    try {
      const resp = await providers.getData(employee_id);
      setData(resp.data.data);
    } catch (error) {
      showToast({ message: error.message });
    }
  };
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord({
      id: null,
      ammount: 0,
      name: "",
      is_taxable: false,
      allowance_type: "tetap",
      is_final_tax: false,
    });
  };

  const handleDelete = async (id) => {
    const newData = [...data];
    const index = newData.findIndex(val=>val.id==id);
    newData.splice(index,1);
    setData(newData)
    // try {
    //   await axios.delete(`your-api-endpoint/${id}`);
    //   fetchData();
    // } catch (error) {
    //   console.error("Error deleting data:", error);
    // }
  };

  const handleDeleteExist = async (id) => {
    try {
      const resp = await providers.deleteData(employee_id, id);
      showToast({ message: resp.message });
    } catch (error) {
      showToast({ message: error.message });
    }
    await getAllowance();
  };

  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      jsonData.map((val) => handleAddFromImport(val));
    };
    reader.readAsArrayBuffer(file);
  };

  const handleImportExist = (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      handleAddExist(jsonData);
    };
    reader.readAsArrayBuffer(file);
  };

  const handleAddFromImport = (importedData) => {
    const newData = {
      id: count,
      allowance_type: importedData["Tipe"] ?? "tetap",
      name: importedData["Nama Tunjangan"] ?? "",
      ammount: importedData["Nominal"] ?? 0,
      is_taxable: importedData["Kena Pajak"].toLowerCase() == "yes" ?? false,
      is_final_tax: importedData["Pajak Final"].toLowerCase() == "yes" ?? false,
    };
    let prevData =[]
    if(data){
      prevData=[...data]
    }
    prevData.push(newData)
    setData(prevData);
    setCount(count + 1);
  };
  const handleAddExist = async (array_data = []) => {
    console.log(array_data);
    array_data.map(async (data) => {
      try {
        const resp = await providers.insertData(
          {
            allowance_type: data["Tipe"] ?? "tetap",
            name: data["Nama Tunjangan"] ?? "",
            ammount: data["Nominal"] ?? 0,
            is_taxable: data["Kena Pajak"].toLowerCase() == "yes" ?? false,
            is_final_tax: data["Pajak Final"].toLowerCase() == "yes" ?? false,
          },
          employee_id
        );
        showToast({ message: resp.message });
      } catch (error) {
        showToast({ message: error.message });
      }
      await getAllowance();
    });
  };
  const columns = [
    {
      title: "Tipe Tunjangan",
      dataIndex: "allowance_type",
      editable: true,
    },
    {
      title: "Nama Tunjangan",
      dataIndex: "name",
    },
    {
      title: "Nominal",
      dataIndex: "ammount",
    },
    {
      title: "Kena Pajak",
      dataIndex: "is_taxable",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <div className="btn-group" role="group">
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() =>
              is_salary ? handleDeleteExist(record.id) : handleDelete(record.id)
            }
          >
            <a className="btn icon btn-danger btn-sm">
              <i className="bi bi-trash"></i>
            </a>
          </Popconfirm>
          {is_salary ? (
            <a
              className="btn icon btn-primary btn-sm"
              style={{ marginLeft: 10 }}
              onClick={() => {
                setEditingRecord(record);
                setIsModalVisible(true);
              }}
            >
              <i className="bi bi-file-text"></i>{" "}
            </a>
          ) : null}
        </div>
      ),
    },
  ];
  const downloadTemplates = async () => {
    try {
      const response = await fetch(file_template.ALLOWANCE);
      const blob = await response.blob();
      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      element.download = "Template Allowance.xlsx";
      document.body.appendChild(element);
      element.click();
    } catch (error) {}
  };
  const handleOkExist = async () => {
    try {
      if (editingRecord.id) {
        await providers.updateData(
          {
            allowance_type: editingRecord.allowance_type,
            name: editingRecord.name,
            ammount: editingRecord.ammount,
            is_taxable: editingRecord.is_taxable,
            is_final_tax: editingRecord.is_final_tax,
          },
          employee_id,
          editingRecord.id
        );
      } else {
        await providers.insertData(
          {
            allowance_type: editingRecord.allowance_type,
            name: editingRecord.name,
            ammount: editingRecord.ammount,
            is_taxable: editingRecord.is_taxable,
            is_final_tax: editingRecord.is_final_tax,
          },
          employee_id
        );
      }
    } catch (error) {
      showToast({ message: error.message });
    }
    setIsModalVisible(false);
    await getAllowance();
  };
  const handleOk = () => {
    if (editingRecord.id) {
      let newData = [];
      if (data) {
        newData = [...data];
      }
      const index = newData.findIndex((item) => editingRecord.id === item.id);
      newData[index].allowance_type = editingRecord.allowance_type;
      newData[index].ammount = editingRecord.ammount;
      newData[index].name = editingRecord.name;
      newData[index].is_final_tax = editingRecord.is_final_tax;
      newData[index].is_taxable = editingRecord.is_taxable;
      setData(newData);
    } else {
      let newData = [];
      if (data) {
        newData = [...data];
      }
      setData([...newData, { ...editingRecord, id: count }]);
      setCount(count + 1);
    }
    setIsModalVisible(false);
  };
  const handleClickImport = () => {
    fileInputRef.current.click();
  };
  return (
    <div>
      <div
        style={{
          flexDirection: "row",
          width: "100%",
          marginBottom: 15,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            flexDirection: "row",
            width: "30%",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Button onClick={downloadTemplates} type="primary">
            Download Templates
          </Button>

          <Button
            onClick={handleClickImport}
            type="primary"
            style={{
              marginLeft: 10,
            }}
          >
            Import File
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={is_salary ? handleImportExist : handleImport}
          ></input>
        </div>
      </div>

      <Table pagination={false} dataSource={data} columns={columns} />
      <Button
        onClick={() => {
          setEditingRecord({
            id: null,
            ammount: 0,
            name: "",
            is_taxable: false,
            allowance_type: "tetap",
            is_final_tax: false,
          });
          setIsModalVisible(true);
        }}
        type="primary"
        style={{
          marginBottom: 16,
          borderRadius: 100,
        }}
      >
        +
      </Button>

      <Modal
        title="Tunjangan"
        open={isModalVisible}
        onOk={is_salary ? handleOkExist : handleOk}
        onCancel={handleCancel}
      >
        <div className="col-md-12">
          <div className="form-group">
            <label>Tipe :</label>{" "}
            <select
              className="form-select"
              id="allowance_type"
              name="allowance_type"
              value={editingRecord.allowance_type}
              onChange={handleChange}
              aria-label="Tipe"
            >
              <option value={null}>Select</option>
              {allowance.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Tunjangan:</label>
            <input
              className="form-control"
              type="text"
              name="name"
              value={editingRecord.name}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Nominal:</label>
            <input
              className="form-control"
              type="text"
              name="ammount"
              value={editingRecord.ammount}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group">
            <label>Pajak :</label>{" "}
            <select
              className="form-select"
              id="is_taxable"
              name="is_taxable"
              value={editingRecord.is_taxable}
              onChange={handleChange}
              aria-label="Tipe"
            >
              <option value={null}>Select</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>

        <div className="col-md-12">
          <div className="form-group">
            <label>Pajak Final :</label>{" "}
            <select
              className="form-select"
              id="is_final_tax"
              name="is_final_tax"
              value={editingRecord.is_final_tax}
              onChange={handleChange}
              aria-label="Tipe"
            >
              <option value={null}>Select</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllowanceForm;
