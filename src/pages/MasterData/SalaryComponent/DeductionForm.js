import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Popconfirm, Table, Select, Modal } from "antd";
import "./styles.css";
import {
  file_template,
  sys_labels,
  sys_path_data,
} from "../../../utils/constants";
import * as XLSX from "xlsx";
import * as providers from "../../../providers/payroll/deduction";
import { SysReadData, showToast } from "../../../utils/global_store";
import convert from "../../../model/deductionModel";
const DeductionForm = (props) => {
  const { employee_id, is_salary, handleSubmitSalary } = props;
  const [data, setData] = useState([]);
  const fileInputRef = useRef(null);
  const [count, setCount] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState(
    convert.objectOfdeductionModel({})
  );
  const allowance = SysReadData(sys_path_data.allowance_type_data);

  useEffect(() => {
    if (employee_id) {
      getDeduction();
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditingRecord((prevState) => ({ ...prevState, [name]: value }));
  };
  const getDeduction = async () => {
    try {
      const resp = await providers.getData(employee_id);
      setData(resp.data.data);
    } catch (error) {
      showToast({ message: error.message });
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingRecord({
      id: null,
      amount: 0,
      title: "",
      description: "",
      employee_id: employee_id,
    });
  };

  const handleDelete = async (id) => {
    const newData = [...data];
    const index = newData.findIndex((val) => val.id == id);
    newData.splice(index, 1);
    setData(newData);
  };

  const handleDeleteExist = async (id) => {
    try {
      const resp = await providers.deleteData(id);
      showToast({ message: resp.message });
    } catch (error) {
      showToast({ message: error.message });
    }
    await getDeduction();
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
      title: importedData["Nama Potongan"] ?? "",
      description: importedData["Deskripsi"] ?? "",
      amount: importedData["Nominal"] ?? 0,
      employee_id,
    };
    let prevData = [];
    if (data) {
      prevData = [...data];
    }
    prevData.push(newData);
    setData(prevData);
    setCount(count + 1);
  };
  const handleAddExist = async (array_data = []) => {
    console.log(array_data);
    array_data.map(async (data) => {
      try {
        const resp = await providers.insertData({
          title: data["Nama Potongan"] ?? "",
          description: data["Deskripsi"] ?? "",
          amount: data["Nominal"] ?? 0,
          employee_id,
        });
        showToast({ message: resp.message });
      } catch (error) {
        showToast({ message: error.message });
      }
      await getDeduction();
    });
  };
  const columns = [
    {
      title: "Nama Potongan",
      dataIndex: "title",
      editable: true,
    },
    {
      title: "Deskripsi",
      dataIndex: "description",
    },
    {
      title: "Nominal",
      dataIndex: "amount",
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
      const response = await fetch(file_template.DEDUCTION);
      const blob = await response.blob();
      const element = document.createElement("a");
      element.href = URL.createObjectURL(blob);
      element.download = "Template Deduction.xlsx";
      document.body.appendChild(element);
      element.click();
    } catch (error) {}
  };
  const handleOkExist = async () => {
    try {
      if (editingRecord.id) {
        await providers.updateData(
          {
            id: editingRecord.id,
            title: editingRecord.title,
            description: editingRecord.description,
            amount: editingRecord.amount,
            employee_id
          },
          editingRecord.id
        );
      } else {
        await providers.insertData(
          {
            title: editingRecord.title,
            description: editingRecord.description,
            amount: editingRecord.amount,
            employee_id
          }
        );
      }
    } catch (error) {
      showToast({ message: error.message });
    }
    setIsModalVisible(false);
    await getDeduction();
  };
  const handleOk = () => {
    if (editingRecord.id) {
      let newData = [];
      if (data) {
        newData = [...data];
      }
      const index = newData.findIndex((item) => editingRecord.id === item.id);
      newData[index].allowance_type = editingRecord.allowance_type;
      newData[index].amount = editingRecord.amount;
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
            amount: 0,
            title: "",
            description:"",
            employee_id
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
        title="Potongan"
        open={isModalVisible}
        onOk={is_salary ? handleOkExist : handleOk}
        onCancel={handleCancel}
      >
       
        <div className="col-md-12">
          <div className="form-group">
            <label>Potongan:</label>
            <input
              className="form-control"
              type="text"
              name="title"
              value={editingRecord.title}
              onChange={handleChange}
            />
          </div>
        </div>
        
        <div className="col-md-12">
          <div className="form-group">
            <label>Deskripsi:</label>
            <input
              className="form-control"
              type="text"
              name="description"
              value={editingRecord.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-md-12">
          <div className="form-group">
            <label>Nominal:</label>
            <input
              className="form-control"
              type="number"
              name="amount"
              value={editingRecord.amount}
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeductionForm;
