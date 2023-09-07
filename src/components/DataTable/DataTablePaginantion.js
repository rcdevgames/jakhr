import React, { useState, useEffect } from "react";
import { Table, Pagination, Input, Button } from "antd";
import { SysGenValueOption, showToast } from "../../utils/global_store";
import Select from "react-select";

const { Search } = Input;

const DataTablePagination = ({
  fetchDataFunc,
  columns,
  pageSizeOptions = ["10", "20", "30"],
  defaultPageSize = 10,
  title = "",
  action = [],
  filters = [],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [totalItems, setTotalItems] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [filter, setFilters] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, searchQuery, sortField, sortOrder, filter]);

  const fetchData = () => {
    // console.log("KESINI");
    // console.log(sortOrder);
    let sort = `${sortField}:${sortOrder == "ascend" ? "asc" : "desc"}`;
    if (sortField == "" || sortField == null || sortField == undefined) {
      sort = "";
    }
    const my_filter = genFilter();
    // console.log(filter);
    fetchDataFunc(currentPage, pageSize, searchQuery, sort, my_filter)
      .then((data) => {
        // console.log(data);
        setTableData(data.data.data);
        setTotalItems(data.data.totalData);
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
  const genFilter = () => {
    let my_filter = selectedFilters;
    let my_filter_str = "";
    Object.keys(my_filter).map((val) => {
      if (my_filter[val] != "all") {
        my_filter_str += `&${val}=${my_filter[val]}`;
      }
    });
    setFilters(my_filter_str);
    return my_filter_str;
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

    if (value.value == "all") {
      delete my_filter[index];
    }
    setSelectedFilters(my_filter);
    setFilters(my_filter_str);
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
            <div className="form-group  col-auto mr-2">
              <label>{val?.title ?? ""}</label>
              <Select
                styles={{
                  menu: (provide, state) => ({
                    ...provide,
                    zIndex: 3,
                  }),
                }}
                onChange={(value) => handleChange(value, val.index)}
                options={data}
                
                value={SysGenValueOption(
                  val.data,
                  selectedFilters[val.index],
                  val.data_id,
                  val.label
                )}
                formatOptionLabel={(val) => `${val.label}`}
                placeholder={`Pilih ${val?.title ?? ""}`}
                aria-label="Nama"
                isSearchable
              />
            </div>
          );
        })}

        <Search
          placeholder="Search..."
          allowClear
          onSearch={handleSearch}
          style={{ width: 200, marginTop: 10 }}
        />
      </div>
    );
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
              columns={columns.map((col) => ({
                ...col,
                sorter: col.sortable ?? false,
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

export default DataTablePagination;
