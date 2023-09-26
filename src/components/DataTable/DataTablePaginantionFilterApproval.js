import React, { useState, useEffect } from "react";
import { Table, Pagination, Input, Button, Tabs, Popconfirm } from "antd";
import * as providers from "../../providers/approval/approval";
import {
  SysDateTransform,
  SysValidateForm,
  showToast,
} from "../../utils/global_store";
import DatePicker from "../DatePicker";
import { useLoadingContext } from "../Loading";
import ActionModal from "../ActionModal";
const { TabPane } = Tabs;

const { Search } = Input;

const DataTablePaginantionFilterApproval = ({ title = "" }) => {
  const { showLoading, hideLoading } = useLoadingContext();
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  let date = new Date();
  date.setDate(1);
  const [startDate, setStartDate] = useState(date);
  const [reason, set_reason] = useState("");
  const [modal, set_modal] = useState(false);
  const [modal_detail, set_modal_detail] = useState(false);
  const [data_detail, set_data_detail] = useState(null);
  const [selected_id, set_selected_id] = useState("");
  const [endDate, setendDate] = useState(new Date());
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const openModal = (id) => {
    set_selected_id(id);
    set_reason("");
    set_modal(true);
  };
  const approval_column = [
    {
      title: "Title",
      dataIndex: "worklist_title",
      key: "worklist_title",
    },
    { title: "Status", dataIndex: "worklist_status", key: "worklist_status" },
    { title: "Ref", dataIndex: "doc_reff", key: "doc_reff" },
    { title: "Requester", dataIndex: "requester_name", key: "requester_name" },
    {
      title: "Requester NIP",
      dataIndex: "requester_id",
      key: "requester_id",
    },
    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      sortable: true,
      render: (val, record) =>
        SysDateTransform({
          date: val,
          type: "long",
          checkIsToDay: true,
          lang: "in",
          withTime: true,
        }),
    },
    {
      title: "Action",
      dataIndex: "worklist_journey_id",
      key: "action",
      render: (val, record) => (
        <div className="btn-group" role="group">
          <Popconfirm
            title="Sure to approve?"
            onConfirm={() => handleApprove(val)}
          >
            <a className="btn icon btn-primary btn-sm">
              <i className="bi bi-check-circle"></i>
            </a>
          </Popconfirm>
          <a
            className="btn icon btn-danger btn-sm"
            onClick={() => openModal(val)}
            style={{ marginLeft: 10 }}
          >
            <i className="bi bi-x-circle"></i>
          </a>

          <a
            onClick={() => loadDetail(val)}
            style={{ marginLeft: 10 }}
            className="btn icon btn-primary btn-sm"
          >
            <i className="bi bi-file-text"></i>
          </a>
        </div>
      ),
    },
  ];

  const submission_column = [
    {
      title: "Title",
      dataIndex: "worklist_title",
      key: "worklist_title",
    },
    { title: "Status", dataIndex: "worklist_status", key: "worklist_status" },
    { title: "Ref", dataIndex: "doc_reff", key: "doc_reff" },

    {
      title: "Created Date",
      dataIndex: "created_at",
      key: "created_at",
      sortable: true,
      render: (val, record) =>
        SysDateTransform({
          date: val,
          type: "long",
          checkIsToDay: true,
          lang: "in",
          withTime: true,
        }),
    },
  ];
  useEffect(() => {
    fetchData();
  }, [searchQuery, startDate, endDate]);
  const loadDetail = async (val) => {
    showLoading();
    try {
      const resp = await providers.getDetail(val.id);
      set_data_detail(JSON.parse(resp.data.data.payloads));
      set_modal_detail(true);
    } catch (error) {
      showToast({ message: error.message });
    }
    hideLoading();
  };
  const fetchData = () => {
    let sort = `${sortField}:${sortOrder == "ascend" ? "asc" : "desc"}`;
    if (sortField == "" || sortField == null || sortField == undefined) {
      sort = "";
    }
    providers
      .getData(
        1,
        9999999999,
        searchQuery,
        SysDateTransform({ date: startDate, withTime: false, forSql: true }),
        SysDateTransform({ date: endDate, withTime: false, forSql: true }),
        sort
      )
      .then((data) => {
        let the_datas = data.data;
        // the_datas["need_your_approval"].data = [
        //   {
        //     worklist_journey_id: "e9349184-8076-428a-96f0-1fef75fbd9e4",
        //     worklist_journey_status: "S1",
        //     reject_reason: null,
        //     current_position_id: "eaea5728-116d-4cf1-897c-d911836d1888",
        //     current_level_id: "13296d25-48d2-4d59-a602-ee738477439c",
        //     worklist_id: "0902f4c7-e86f-4c43-a843-5ee5f0362ff4",
        //     doc_reff: "OVT/2023/08/0010",
        //     config_reff:
        //       '{"tableName":"overtimes","fieldCondition":{"deleted":false,"overtime_no":"OVT/2023/08/0010"},"fieldUpdated":{"when_true":{"is_approved":true,"is_rejected":false},"when_false":{"is_approved":false,"is_rejected":true}}}',
        //     worklist_status: "Pending",
        //     worklist_no: "WF0021",
        //     created_at: "2023-08-06T15:04:00.285Z",
        //     current_level: "Software Development",
        //     current_position: "Staff",
        //     requester_name: "Hatake Ujang",
        //     requester_id: "2013310020",
        //     worklist_title: "Pengajuan Lembur",
        //   },
        //   {
        //     worklist_journey_id: "fbae5462-9562-4409-bc79-292506cec91a",
        //     worklist_journey_status: "S1",
        //     reject_reason: null,
        //     current_position_id: "eaea5728-116d-4cf1-897c-d911836d1888",
        //     current_level_id: "13296d25-48d2-4d59-a602-ee738477439c",
        //     worklist_id: "1440da2a-9f9c-4571-8349-a1371accc942",
        //     doc_reff: "OVT/2023/08/0010",
        //     config_reff:
        //       '{"tableName":"overtimes","fieldCondition":{"deleted":false,"overtime_no":"OVT/2023/08/0010"},"fieldUpdated":{"when_true":{"is_approved":true,"is_rejected":false},"when_false":{"is_approved":false,"is_rejected":true}}}',
        //     worklist_status: "Pending",
        //     worklist_no: "WF0020",
        //     created_at: "2023-08-06T15:00:42.935Z",
        //     current_level: "Software Development",
        //     current_position: "Staff",
        //     requester_name: "Hatake Ujang",
        //     requester_id: "2013310020",
        //     worklist_title: "Pengajuan Lembur",
        //   },
        //   {
        //     worklist_journey_id: "d94cb784-81eb-48f4-af40-167e55f102ec",
        //     worklist_journey_status: "S1",
        //     reject_reason: null,
        //     current_position_id: "eaea5728-116d-4cf1-897c-d911836d1888",
        //     current_level_id: "13296d25-48d2-4d59-a602-ee738477439c",
        //     worklist_id: "83d3a46a-19b2-48fd-9e14-c508e5607b3f",
        //     doc_reff: "OVT/2023/08/0010",
        //     config_reff:
        //       '{"tableName":"overtimes","fieldCondition":{"deleted":false,"overtime_no":"OVT/2023/08/0010"},"fieldUpdated":{"when_true":{"is_approved":true,"is_rejected":false},"when_false":{"is_approved":false,"is_rejected":true}}}',
        //     worklist_status: "Pending",
        //     worklist_no: "WF0019",
        //     created_at: "2023-08-06T13:07:54.271Z",
        //     current_level: "Software Development",
        //     current_position: "Staff",
        //     requester_name: "Hatake Ujang",
        //     requester_id: "2013310020",
        //     worklist_title: "Pengajuan Lembur",
        //   },
        // ];
        setTableData(the_datas);
      })
      .catch((error) => {
        showToast({ message: error.message, type: "error" });
        console.error("Error fetching data:", error);
      });
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };
  const handleApprove = async (id) => {
    showLoading();
    try {
      const resp = await providers.approve(id);
      showToast({ message: resp.message });
      fetchData();
    } catch (error) {
      showToast({ message: error.message });
    }
    hideLoading();
  };

  const handleReject = async () => {
    showLoading();
    try {
      SysValidateForm(["reason"], { reason });
      const resp = await providers.reject(selected_id, reason);
      showToast({ message: resp.message });
      set_modal(false);
      fetchData();
    } catch (error) {
      showToast({ message: error.message });
    }
    set_selected_id("");
    hideLoading();
  };
  return (
    <section className="section">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h3>{title}</h3>
        </div>
        <div className="card-body">
          <div
            style={{
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
            <Tabs defaultActiveKey="1">
              <TabPane tab="Need Approval" key="1">
                <Table
                  dataSource={tableData?.need_your_approval?.data ?? []}
                  pagination={false}
                  columns={approval_column.map((col) => ({
                    ...col,
                    sorter:
                      col.key === "action"
                        ? false
                        : (a, b) => a[col["key"]].localeCompare(b[col["key"]]),
                  }))}
                  style={{ marginBottom: 30 }}
                />
              </TabPane>
              <TabPane tab="Your Submission" key="2">
                <Table
                  dataSource={tableData?.your_submissions?.data ?? []}
                  pagination={false}
                  columns={submission_column.map((col) => ({
                    ...col,
                    sorter:
                      col.key === "action"
                        ? false
                        : (a, b) => a[col["key"]].localeCompare(b[col["key"]]),
                  }))}
                  style={{ marginBottom: 30 }}
                />
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>

      <ActionModal
        onOk={() => handleReject()}
        onCancel={() => set_modal(false)}
        title="Reason"
        content={
          <input
            value={reason}
            name="reason"
            className="form-control"
            onChange={(event) => set_reason(event.target.value)}
          ></input>
        }
        visible={modal}
      />

      <ActionModal
        onOk={() => set_modal_detail(false)}
        onCancel={() => set_modal_detail(false)}
        title="Detail"
        content={
          <>
            <label>Referensi:</label>
            <br />
            <label>
              {data_detail.overtime_no
                ? data_detail.overtime_no
                : data_detail.leave_no
                ? data_detail.leave_no
                : data_detail.reimbursment_no
                ? data_detail.reimbursment_no
                : ""}
            </label>
            <br />
            <label>Reason:</label>
            <br />
            {data_detail.amount && (
              <>
                <label>Total:</label>
                <br />
                <label>{data_detail.amount}</label>
                <br />
              </>
            )}
            {data_detail.leave_date && (
              <>
                <label>Tanggal Cuti:</label>
                <br />
                <label>
                  {SysDateTransform({
                    date: data_detail.leave_date,
                    type: "short",
                    lang: "in",
                    withDay: true,
                    withTime: false,
                  })}
                </label>
                <br />
              </>
            )}

            <label>Attachment:</label>
            {data_detail.details?.attachments &&
              data_detail.details?.attachments.map((val) => {
                return (
                  <>
                    <br />
                    <img
                      src={val}
                      style={{
                        objectFit: "contain",
                        width: "100%",
                        marginBottom: 20,
                      }}
                    />
                  </>
                );
              })}
          </>
        }
        visible={modal_detail}
      />
    </section>
  );
};

export default DataTablePaginantionFilterApproval;
