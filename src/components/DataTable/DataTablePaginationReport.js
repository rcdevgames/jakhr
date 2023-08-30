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

const DataTablePaginationReport = ({
  fetchDataFunc,
  columns,
  pageSizeOptions = ["10", "20", "30"],
  defaultPageSize = 10,
  withPeriode = false,
  title = "",
  filters = [],
  action = [],
  withExport = true,
}) => {
  const { showLoading, hideLoading } = useLoadingContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [totalItems, setTotalItems] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filter, setFilters] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
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
  }, [currentPage, pageSize, searchQuery, filter]);

  const fetchData = () => {
    // let sort = `${sortField}:${sortOrder == "ascend" ? "asc" : "desc"}`;
    // if (sortField == "" || sortField == null || sortField == undefined) {
    let sort = "";
    // }
    const my_filter = genFilter();
    fetchDataFunc(currentPage, pageSize, searchQuery, sort, my_filter)
      .then((data) => {
        let my_data = data.data;
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
        setTotalItems(data.totalData * pageSize);
      })
      .catch((error) => {
        console.log(error);
        showToast({ message: error.message, type: "error" });
        console.error("Error fetching data:", error);
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (current, size) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  const handleSearch = (value) => {
    setCurrentPage(1);

    setSearchQuery(value);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    const { field, order } = sorter;
    setSortField(field);
    setSortOrder(order);
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
            <div className="form-group col-auto mr-2">
              <label>{val?.title ?? ""}</label>
              <Select
                styles={{
                  menu: (provide, state) => ({
                    ...provide,
                    zIndex: 3,
                  }),
                }}
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
          );
        })}

        {withPeriode && (
          <div className="form-group col-2 mr-2">
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
        )}
        {withPeriode && (
          <div className="form-group col-2 mr-2">
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
        )}

        <Search
          placeholder="Search..."
          allowClear
          onSearch={handleSearch}
          style={{ width: 200, marginTop: 10 }}
        />
      </div>
    );
  };
  const handleExport = async () => {
    showLoading();
    try {
      let sort = `${sortField}:${sortOrder == "ascend" ? "asc" : "desc"}`;
      if (sortField == "" || sortField == null || sortField == undefined) {
        sort = "";
      }
      const resp = await fetchDataFunc(1, 99999999, searchQuery, sort, filter);
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
      let my_data = resp.data;
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
              // console.log(clean_data_structure);
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
            if (col_value.val_props) {
              obj_data[col_value.title] =
                col_value.val_props[val[col_value.key]];
            }
          }
        });
        clean_data.push(obj_data);
      });
      const ws = XLSX.utils.json_to_sheet(clean_data, { origin: "A5" });
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
        // console.log(colIndex);
        const cellRef = XLSX.utils.encode_cell({ r: 4, c: colIndex }); // Row 5 is index 4
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
        v: `Laporan ${title}`,
      };
      ws["A1"].s = {
        alignment: { horizontal: "center", vertical: "center" },
        font: { sz: 20, bold: true },
      };
      const token = SysJWTDecoder();
      ws["A2"] = { t: "s", v: "Exported Date: " };
      ws["A3"] = { t: "s", v: "Exported By: " };
      ws["B3"] = { t: "s", v: token.full_name };
      ws["A4"] = { t: "s", v: "Filtered: " };
      ws["B4"] = { t: "s", v: str_filter };
      ws["B2"] = {
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
        sys_labels.menus.REPORT + " " + title + ".xlsx"
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
            {action}
            {withExport && (
              <Button onClick={handleExport} className="btn btn-primary">
                {sys_labels.action.EXPORT_EXCEL}
              </Button>
            )}
          </div>
        </div>
        <div className="card-body">
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
              onChange={handleTableChange}
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

            <Pagination
              style={{ position: "absolute", bottom: 15, right: 15 }}
              current={currentPage}
              total={totalItems}
              pageSize={pageSize}
              onChange={handlePageChange}
              showSizeChanger
              onShowSizeChange={handlePageSizeChange}
              pageSizeOptions={pageSizeOptions}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataTablePaginationReport;
