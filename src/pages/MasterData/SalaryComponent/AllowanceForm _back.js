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

const EditableContext = React.createContext(null);
const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const allowance = SysReadData(sys_path_data.allowance_type_data);

  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };
  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({
        ...record,
        ...values,
      });
    } catch (errInfo) {
      console.log("Save failed:", errInfo);
    }
  };
  let childNode = children;
  if (editable) {
    childNode = editing ? (
      dataIndex == "allowance_type" ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select
            ref={inputRef}
            onBlur={save}
            onPressEnter={save}
            onChange={save}
            style={{ minWidth: "150px" }}
          >
            {allowance.map((val) => (
              <option value={val.value} style={{ minWidth: "150px" }}>
                {val.name}
              </option>
            ))}
          </Select>
        </Form.Item>
      ) : dataIndex == "is_taxable" ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select
            ref={inputRef}
            onBlur={save}
            onPressEnter={save}
            onChange={save}
            style={{ minWidth: "150px" }}
            // style={{ width: "100%" }}
          >
            <option value={"Yes"} style={{ minWidth: "150px" }}>
              Yes
            </option>
            <option value={"No"} style={{ minWidth: "150px" }}>
              No
            </option>
          </Select>
        </Form.Item>
      ) : dataIndex == "is_final_tax" ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Select
            ref={inputRef}
            onBlur={save}
            onPressEnter={save}
            onChange={save}
            style={{ minWidth: "150px" }}
          >
            <option value={"Yes"} style={{ minWidth: "150px" }}>
              Yes
            </option>
            <option value={"No"} style={{ minWidth: "150px" }}>
              No
            </option>
          </Select>
        </Form.Item>
      ) : (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      )
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
          minWidth: "150px",
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};
const AllowanceForm = (props) => {
  const { employee_id, handleSubmitSalary } = props;
  const fileInputRef = useRef(null);
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (employee_id) {
      getAllowance();
    }
  }, []);
  const getAllowance = async () => {
    try {
      const resp = await providers.getData(employee_id);
      setDataSource(resp.data.data);
    } catch (error) {
      showToast({ message: error.message });
    }
  };
  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: "Tipe Tunjangan",
      dataIndex: "allowance_type",
      editable: true,
    },
    {
      title: "Nama Tunjangan",
      dataIndex: "name",
      editable: true,
    },
    {
      title: "Nominal",
      dataIndex: "ammount",
      editable: true,
    },
    {
      title: "Kena Pajak",
      dataIndex: "is_taxable",
      editable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });
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

  const handleAddFromImport = (data) => {
    const newData = {
      id: count,
      allowance_type: data["Tipe"] ?? "tetap",
      name: data["Nama Tunjangan"] ?? "",
      ammount: data["Nominal"] ?? 0,
      is_taxable: data["Kena Pajak"] ?? "No",
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
  };
  const handleAddExist = async (array_data = []) => {
    array_data.map(async (data) => {
      try {
        const is_taxable = data["Kena Pajak"] ?? "No";
        const bool_taxable = is_taxable.toLowerCase() == "yes" ?? false;
        await providers.insertData(
          {
            allowance_type: data["Tipe"] ?? "tetap",
            name: data["Nama Tunjangan"] ?? "",
            ammount: data["Nominal"] ?? 0,
            is_final_tax: true,
            is_taxable: bool_taxable,
          },
          employee_id
        );
      } catch (error) {
        showToast({ message: error.message });
      }
    });
    await getAllowance();
  };
  const handleUpdateExist = async (data) => {
    try {
      await providers.updateData(
        {
          allowance_type: data.allowance_type ?? "tetap",
          name: data.name ?? "",
          ammount: data.ammount ?? 0,
          is_final_tax: true,
          is_taxable: data.is_taxable ?? false,
        },
        employee_id,
        data.id
      );
      await getAllowance();
    } catch (error) {
      showToast({ message: error.message });
    }
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
            onChange={employee_id ? handleImportExist : handleImport}
          ></input>
        </div>
        {/*
        <Button type="primary" onClick={handleSubmit}>
          Submit
        </Button> */}
      </div>

      <Table
        style={{ overflowX: "scroll" }}
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        pagination={false}
        dataSource={dataSource}
        columns={columns}
      />

      <Button
        onClick={handleAddFromImport}
        type="primary"
        style={{
          marginBottom: 16,
          borderRadius: 100,
        }}
      >
        +
      </Button>
    </div>
  );
};
export default AllowanceForm;