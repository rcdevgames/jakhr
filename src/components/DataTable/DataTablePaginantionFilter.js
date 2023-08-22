import React, { useState, useEffect } from "react";
import { Table, Pagination, Input, Button } from "antd";
import { SysDateTransform, showToast } from "../../utils/global_store";
import DatePicker from "../DatePicker";
// import "antd/dist/antd.css";

const { Search } = Input;

const DataTablePaginantionFilter = ({
  fetchDataFunc,
  columns,
  pageSizeOptions = ["10", "20", "30"],
  defaultPageSize = 10,
  title = "",
  action = [],
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const [totalItems, setTotalItems] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  let date = new Date();
  date.setDate(1);
  const [startDate, setStartDate] = useState(date);
  const [endDate, setendDate] = useState(new Date());
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    fetchData();
  }, [
    currentPage,
    pageSize,
    searchQuery,
    startDate,
    endDate,
    sortField,
    sortOrder,
  ]);
  // }, [currentPage, pageSize, searchQuery]);

  const fetchData = () => {
    let sort = `${sortField}:${sortOrder == "ascend" ? "asc" : "desc"}`;
    if (sortField == "" || sortField == null || sortField == undefined) {
      sort = "";
    }
    fetchDataFunc(
      currentPage,
      pageSize,
      searchQuery,
      SysDateTransform({ date: startDate, withTime: false, forSql: true }),
      SysDateTransform({ date: endDate, withTime: false, forSql: true }),
      sort
    )
      .then((data) => {
        // console.log(data);
        setTableData(data.data.data);
        setTotalItems(data.data.totalData);
      })
      .catch((error) => {
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
              // borderRadius: "10px",
              // border: "1px solid #039BE5",
              overflow: "hidden",
              minHeight: "450px",
            }}
          >
            <div className="row">
              <div className="col-md-3 mr-2" style={{ marginBottom: 16 }}>
                <div className="form-group">
                  <label>Start Date:</label>
                  <DatePicker
                    name="start_date"
                    onChange={(val) => setStartDate(val)}
                    value={startDate}
                    placeholder={"Start Date"}
                  />
                </div>
              </div>

              <div className="col-md-3 mr-2">
                <div className="form-group">
                  <label>End Date:</label>
                  <DatePicker
                    name="end_date"
                    onChange={(val) => setendDate(val)}
                    value={endDate}
                    placeholder={"End Date"}
                  />
                </div>
              </div>
              <Search
                placeholder="Search..."
                allowClear
                onSearch={handleSearch}
                style={{ width: 200, marginTop: 25 }}
              />
            </div>

            <Table
              dataSource={tableData}
              pagination={false}
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

export default DataTablePaginantionFilter;
