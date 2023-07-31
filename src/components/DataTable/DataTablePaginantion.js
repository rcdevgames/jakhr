import React, { useState, useEffect } from "react";
import { Table, Pagination, Input, Button } from "antd";
import { showToast } from "../../utils/global_store";
// import "antd/dist/antd.css";

const { Search } = Input;

const DataTablePagination = ({
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

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize, searchQuery]);

  const fetchData = () => {
    // console.log("KESINI");
    fetchDataFunc(currentPage, pageSize, searchQuery)
      .then((data) => {
        console.log(data);
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
    setSearchQuery(value);
  };

  return (
    <section className="section">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3>{title}</h3>
          <div style={{flexDirection:"row",justifyContent:"flex-end",alignItems:"center"}}>{action}</div>
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
            <Search
              placeholder="Search..."
              allowClear
              onSearch={handleSearch}
              style={{ width: 200, marginBottom: 16 }}
            />

            <Table
              dataSource={tableData}
              pagination={false}
              columns={columns}
              style={{marginBottom:30}}
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
