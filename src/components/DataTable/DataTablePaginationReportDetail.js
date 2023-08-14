import React, { useState, useEffect } from "react";
import { Table, Pagination, Input, Button } from "antd";
import {
  SysDateTransform,
  SysGenValueOption,
  SysJWTDecoder,
  SysMonthTransform,
  addZero,
  showToast,
} from "../../utils/global_store";
import Select from "react-select";
import { sys_labels } from "../../utils/constants";
import { useLoadingContext } from "../Loading";
import * as XLSX from "xlsx-js-style";
// import "xlsx/dist/"
const { Search } = Input;

const DataTablePaginationReportDetail = ({
  fetchDataFunc,
  columns,
  withPeriode = false,
  title = "",
  filters = [],
  employee_id = "",
}) => {
  const { showLoading, hideLoading } = useLoadingContext();
  const [tableData, setTableData] = useState([]);
  const [filter, setFilters] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const [employee, set_employee] = useState({
    id: "",
    full_name: "",
    employee_id: "",
    email: "",
    phone_number: "",
    id_type: "",
    id_number: "",
    npwp: "",
    ptkp: "",
    marital_status: "",
    gender: "",
    citizen_address: "",
    residential_address: "",
    religion: "",
  });
  const date = new Date();
  const [periode, set_periode] = useState({
    month: date.getMonth(),
    year: date.getFullYear(),
  });
  const month_data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let year_data = [];
  for (
    let index = date.getFullYear();
    index > date.getFullYear() - 5;
    index--
  ) {
    year_data.push(index);
  }

  useEffect(() => {
    fetchData();
    // }, [currentPage, pageSize, searchQuery, sortField, sortOrder, filter]);
  }, [filter]);

  const fetchData = () => {
    const my_filter = genFilter();
    fetchDataFunc(my_filter)
      .then((data) => {
        let my_data = data.data.details;
        let my_employee = data.data.employee;
        set_employee({
          id: my_employee?.id ?? "",
          full_name: my_employee?.full_name ?? "",
          employee_id: my_employee?.employee_id ?? "",
          email: my_employee?.email ?? "",
          phone_number: my_employee?.phone_number ?? "",
          id_type: my_employee?.id_type ?? "",
          id_number: my_employee?.id_number ?? "",
          npwp: my_employee?.npwp ?? "",
          ptkp: my_employee?.ptkp ?? "",
          marital_status: my_employee?.marital_status ?? "",
          gender: my_employee?.gender ?? "",
          citizen_address: my_employee?.citizen_address ?? "",
          residential_address: my_employee?.residential_address ?? "",
          religion: my_employee?.religion ?? "",
        });
        let the_datas = [];
        for (let index = 0; index < my_data.length; index++) {
          let clean_data = {};
          Object.keys(my_data[index]).map((key) => {
            if (
              typeof my_data[index][key] === "object" &&
              my_data[index][key] != null
            ) {
              Object.keys(my_data[index][key]).map((key_child) => {
                clean_data[`${key}_${key_child}`] =
                  my_data[index][key][key_child] ?? "";
              });
            } else {
              clean_data[key] = my_data[index][key] ?? "";
            }
          });
          the_datas.push(clean_data);
        }
        setTableData(the_datas);
      })
      .catch((error) => {
        // console.log(error);
        showToast({ message: error.message, type: "error" });
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (value, index) => {
    let my_filter = selectedFilters;
    let my_filter_str = "";
    my_filter[index] = value.value;
    Object.keys(my_filter).map((val) => {
      if (my_filter[val] != "all") {
        my_filter_str += `&${val}=${my_filter[val]}`;
      }
    });
    if (withPeriode) {
      my_filter_str += `&periode=${periode.year}-${addZero({
        num: parseInt(periode.month) + 1,
      })}`;
    }

    if (value.value == "all") {
      delete my_filter[index];
    }
    setSelectedFilters(my_filter);
    setFilters(my_filter_str);
  };

  const handleChangePeriode = (event) => {
    let my_filter = selectedFilters;
    const { name, value } = event.target;
    let my_filter_str = "";
    let my_periode = periode;
    my_periode[name] = value;
    Object.keys(my_filter).map((val) => {
      if (my_filter[val] != "all") {
        my_filter_str += `&${val}=${my_filter[val]}`;
      }
    });
    my_filter_str += `&periode=${my_periode.year}-${addZero({
      num: parseInt(my_periode.month) + 1,
    })}`;
    setFilters(my_filter_str);
  };
  const genFilter = () => {
    let my_filter = selectedFilters;
    let my_filter_str = "";
    let my_periode = periode;
    Object.keys(my_filter).map((val) => {
      if (my_filter[val] != "all") {
        my_filter_str += `&${val}=${my_filter[val]}`;
      }
    });
    my_filter_str += `&periode=${my_periode.year}-${addZero({
      num: parseInt(my_periode.month) + 1,
    })}`;
    my_filter_str += `&employee_id=${employee_id}`;
    setFilters(my_filter_str);
    return my_filter_str;
  };
  const FilterComponent = () => {
    return (
      <div className="row" style={{ alignItems: "center" }}>
        {filters.map((val) => {
          let data = [
            {
              value: "all",
              label: `Semua ${val?.title ?? ""}`,
            },
          ];
          if (val.data && val.data.length > 0) {
            val.data.map((value) => {
              data.push({
                value: value[val.data_id],
                label: value[val.label],
              });
            });
          }
          return (
            <div style={{ marginRight: 10, width: 250 }}>
              <div className="form-group">
                <label>{val?.title ?? ""}</label>
                <Select
                  onChange={(value) => handleChange(value, val.index)}
                  value={SysGenValueOption(
                    val.data,
                    selectedFilters[val.index],
                    val.data_id,
                    val.label
                  )}
                  options={data}
                  formatOptionLabel={(val) => `${val.label}`}
                  placeholder={`Select ${val?.title ?? ""}`}
                  aria-label="Nama"
                  isSearchable
                />
              </div>
            </div>
          );
        })}

        {withPeriode && (
          <div style={{ marginRight: 10, width: 200 }}>
            <div className="form-group">
              <label>Periode Tahun:</label>{" "}
              <select
                className="form-select"
                id="year"
                name="year"
                value={periode.year}
                onChange={handleChangePeriode}
                aria-label="year"
              >
                <option value={null}>Pilih Periode Tahun</option>
                {year_data.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {withPeriode && (
          <div style={{ marginRight: 10, width: 200 }}>
            <div className="form-group">
              <label>Periode Bulan</label>{" "}
              <select
                className="form-select"
                id="month"
                name="month"
                value={periode.month}
                onChange={handleChangePeriode}
                aria-label="Month"
              >
                <option value={null}>Pilih Periode Bulan</option>
                {month_data.map((option, index) => (
                  <option key={index} value={option}>
                    {SysMonthTransform(option, "long", "in")}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
    );
  };
  const handleExport = async () => {
    showLoading();
    try {
      const resp = await fetchDataFunc(filter);
      let str_filter = "";

      if (withPeriode) {
        str_filter += `Periode: ${SysMonthTransform(periode.month, "in")} ${
          periode.year
        }, `;
      }
      Object.keys(selectedFilters).map((value) => {
        const obj = filters.find((val) => val.index == value);
        const data_selected = obj.data.find(
          (val) => val[obj.data_id] == selectedFilters[value]
        );
        str_filter += `${obj.title}: ${data_selected[obj.label]}, `;
      });
      let my_data = resp.data.details;
      let the_datas = [];
      for (let index = 0; index < my_data.length; index++) {
        let clean_data_structure = {};
        Object.keys(my_data[index]).map((key) => {
          if (
            typeof my_data[index][key] === "object" &&
            my_data[index][key] != null
          ) {
            Object.keys(my_data[index][key]).map((key_child) => {
              clean_data_structure[`${key}_${key_child}`] =
                my_data[index][key][key_child];
            });
          } else {
            clean_data_structure[key] = my_data[index][key];
          }
        });
        the_datas.push(clean_data_structure);
      }
      let clean_data = [];
      // let col_length=0;
      the_datas.map((val) => {
        let obj_data = {};
        columns.map((col_value) => {
          if (col_value.key != "action") {
            obj_data[col_value.title] = val[col_value.key] ?? "";
            // col_length++;
          }
        });
        clean_data.push(obj_data);
      });
      const ws = XLSX.utils.json_to_sheet(clean_data, { origin: "A9" });
      const wb = XLSX.utils.book_new();
      const headerStyle = {
        alignment: { horizontal: "center", vertical: "center" },
        font: { sz: 12, bold: true },
      };
      for (
        let colIndex = 0;
        colIndex < columns.filter((val) => val.key != "action").length;
        colIndex++
      ) {
        const cellRef = XLSX.utils.encode_cell({ r: 8, c: colIndex }); // Row 5 is index 4
        ws[cellRef].s = headerStyle; // Apply the style to the cell
      }
      ws["!merges"] = [
        {
          s: { r: 0, c: 0 },
          e: {
            r: 0,
            c: columns.filter((val) => val.key != "action").length - 1,
          },
        },
      ];
      ws["A1"] = {
        t: "s",
        v: `Laporan ${title} Employee`,
      };
      ws["A1"].s = {
        alignment: { horizontal: "center", vertical: "center" },
        font: { sz: 20, bold: true },
      };
      const token = SysJWTDecoder();

      ws["A2"] = { t: "s", v: "Employee Name: " };
      ws["A3"] = { t: "s", v: "NIP: " };
      ws["A4"] = { t: "s", v: "Email: " };
      ws["A5"] = { t: "s", v: "Phone: " };
      ws["A6"] = { t: "s", v: "Exported Date: " };
      ws["A7"] = { t: "s", v: "Exported By: " };
      ws["A8"] = { t: "s", v: "Filtered: " };
      ws["B2"] = { t: "s", v: employee.full_name };
      ws["B3"] = { t: "s", v: employee.employee_id };
      ws["B4"] = { t: "s", v: employee.email };
      ws["B5"] = { t: "s", v: employee.phone_number };
      ws["B7"] = { t: "s", v: token.full_name };
      ws["B8"] = { t: "s", v: str_filter };
      ws["B6"] = {
        t: "s",
        v: SysDateTransform({
          date: date,
          type: "long",
          lang: "in",
          withTime: true,
        }),
      };
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
      const blob = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        sys_labels.menus.REPORT + " " + title + " Employee.xlsx"
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
      showToast({ message: error.message });
    }
    hideLoading();
  };
  return (
    <section className="section">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3>{title}</h3>

          <div
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Button onClick={handleExport} className="btn btn-primary">
              {sys_labels.action.EXPORT_EXCEL}
            </Button>
          </div>
        </div>

        <div className="card-body">
          <div className="form form-horizontal">
            <div className="form-body">
              <div className="col-md-12">
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Fullname</label>
                      <input
                        className="form-control"
                        readOnly={true}
                        type="text"
                        name="full_name"
                        value={employee.full_name}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>NIP</label>
                      <input
                        className="form-control"
                        readOnly={true}
                        type="text"
                        name="employee_id"
                        value={employee.employee_id}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        className="form-control"
                        readOnly={true}
                        type="text"
                        name="email"
                        value={employee.email}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Phone</label>
                      <input
                        className="form-control"
                        readOnly={true}
                        type="text"
                        name="phone_number"
                        value={employee.phone_number}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              overflow: "hidden",
              minHeight: "450px",
            }}
          >
            <div className="col-md-12" style={{ marginBottom: 16 }}>
              <FilterComponent />
            </div>

            <Table
              dataSource={tableData}
              pagination={false}
              className="table-responsive"
              columns={columns
                .filter((val) => val.type != "hidden")
                .map((col) => ({
                  ...col,
                  sorter:
                    col.key === "action"
                      ? false
                      : (a, b) => a[col["key"]].localeCompare(b[col["key"]]),
                }))}
              style={{ marginBottom: 30 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataTablePaginationReportDetail;
