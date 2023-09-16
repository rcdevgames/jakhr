import { useEffect, useState } from "react";
import { SysDateTransform, SysJWTDecoder, SysMonthTransform, showToast } from "../../utils/global_store";
import AdminDashboard from "../AdminDashboard";
import LineChart from "./LineChart";
import * as providers from "../../providers/dashboard";
import LoadingComponent from "../../components/LoadingComponent";
import EmptyComponent from "../../components/EmptyComponent";

const data1 = {
  labels: [
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
  ],
  datasets: [
    {
      label: "Menit",
      data: [
        0, 20, 1449, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      backgroundColor: "rgba(67, 94, 190, 1)",
      borderColor: "rgba(67, 94, 190, 0.9)",
    },
  ],
};
const data2 = {
  labels: [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
    "April",
    "May",
  ],
  datasets: [
    {
      label: "Jumlah",
      data: [
        5000000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ],
      backgroundColor: "rgba(67, 94, 190, 1)",
      borderColor: "rgba(67, 94, 190, 0.9)",
    },
  ],
};

const data3 = {
  labels: [
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
    "January",
    "February",
    "March",
    "April",
    "May",
  ],
  datasets: [
    {
      label: "Skor",
      data: [
        40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
      ],
      backgroundColor: "rgba(67, 94, 190, 1)",
      borderColor: "rgba(67, 94, 190, 0.9)",
    },
  ],
};
function Dashboard() {
  const [loading_out, set_loading_out] = useState(true);
  const [loading_absent, set_loading_absent] = useState(true);
  const [loading_contratc, set_loading_contratc] = useState(true);
  const [loading_chart_late, set_loading_chart_late] = useState(true);
  const [loading_chart_payroll, set_loading_chart_payroll] = useState(true);
  const [data_out, set_data_out] = useState(null);
  const [data_absent, set_data_absent] = useState(null);
  const [data_contract, set_data_contract] = useState(null);
  const [data_chart_late, set_data_chart_late] = useState(null);
  const [data_chart_payroll, set_data_chart_payroll] = useState(null);

  const getOutEarlyEmployee = async () => {
    set_loading_out(true);
    try {
      const resp = await providers.getOutEarlyEmployee();
      let the_datas = resp.data;
      if(the_datas.data){
        let data = [];
        the_datas.data.map(val=>{
          if(val.is_early.toLowerCase() =='yes'){
            data.push(val);
          }
        });
        the_datas.data = data;
      }
      set_data_out(the_datas);
    } catch (error) {
      showToast({ message: error.message });
    }
    set_loading_out(false);
  };

  const getAbsentEmployee = async () => {
    set_loading_absent(true);
    try {
      const resp = await providers.getAbsentEmployee();
      set_data_absent(resp.data);
    } catch (error) {
      showToast({ message: error.message });
    }
    set_loading_absent(false);
  };
  const getContractEmployee = async () => {
    set_loading_contratc(true);
    try {
      const resp = await providers.getContractStatus();
      set_data_contract(resp.data);
    } catch (error) {
      showToast({ message: error.message });
    }
    set_loading_contratc(false);
  };
  const getChartLate = async () => {
    set_loading_chart_late(true);
    try {
      const resp = await providers.getTotalLatePerMonth();
      let labels = [];
      let datas = [];
      let the_datas = resp.data;
      if(the_datas.series){
        the_datas.series.map(val=>{
          let data = val.value;
          let label = val.date;
          label = label.substring(8,10);
          if(label=='01'){
            label = SysMonthTransform(parseInt(val.date.substring(5,7)),'long','in') + ' '+label
          }
          labels.push(
            label
          );
          datas.push(data);
        });
      }
      set_data_chart_late({
        labels:labels,
        datasets: [
          {
            label: "Menit",
            data: datas,
            backgroundColor: "rgba(67, 94, 190, 1)",
            borderColor: "rgba(67, 94, 190, 0.9)",
          },
        ],
      });
    } catch (error) {
      showToast({ message: error.message });
    }
    set_loading_chart_late(false);
  };
  const getChartPayroll = async () => {
    set_loading_chart_payroll(true);
    try { const resp = await providers.getTotalPayroll();
      let labels = [];
      let datas = [];
      let the_datas = resp.data;
      if(the_datas.series){
        the_datas.series.map(val=>{
          let data = val.value;
          let label = SysMonthTransform(parseInt(val.periode.substring(5,7)),'long','in');
          labels.push(
            label
          );
          datas.push(data);
        });
      }
      set_data_chart_payroll({
        labels:labels,
        datasets: [
          {
            label: "Jumlah",
            data: datas,
            backgroundColor: "rgba(67, 94, 190, 1)",
            borderColor: "rgba(67, 94, 190, 0.9)",
          },
        ],
      });
    } catch (error) {
      showToast({ message: error.message });
    }
    set_loading_chart_payroll(false);
  };

  useEffect(() => {
    SysJWTDecoder();
    getAbsentEmployee();
    getChartLate();
    getChartPayroll();
    getContractEmployee();
    getOutEarlyEmployee();
    // console.log(window.location.protocol);
  }, []);
  return (
    <AdminDashboard label="">
      <section className="section mt-0">
        <div className="row ">
          <div className="col-md-12">
            {/* <div className="card">
								<div className="card-header">
									<h5 className="card-title">Dashboard</h5>
								</div>
								<div className="card-body"> */}
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  href="#home"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  <i className="bi bi-clock-history"></i> Kehadiran
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  href="#profile"
                  role="tab"
                  aria-controls="profile"
                  aria-selected="false"
                >
                  <i className="bi bi-speedometer"></i> Keterlambatan
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  href="#contact"
                  role="tab"
                  aria-controls="contact"
                  aria-selected="false"
                >
                  <i className="bi bi-cash"></i> Gaji &amp; Kontrak
                </a>
              </li>
            </ul>
            <div className="tab-content" id="myTabContent">
              <div
                className="tab-pane fade show active"
                id="home"
                role="tabpanel"
                aria-labelledby="home-tab"
              >
                <div className="row mt-3">
                  <div className="col-md-6" style={{ height: "450px" }}>
                    <div className="card shadow">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h4 className="card-title">Tidak Masuk Hari Ini</h4>
                            <b className="card-text">
                              Total: {data_absent?.data?.length ?? 0}
                            </b>
                          </div>
                          <hr />
                          <div
                            className="overflow-auto"
                            style={{ height: "350px" }}
                            >
                            {loading_absent && <LoadingComponent />}
                            {!loading_absent && !data_absent?.data?.length > 0 && <EmptyComponent />}
                            {data_absent?.data?.length > 0 &&
                              data_absent.data.map((val) => {
                                return (
                                  <div className="card shadow">
                                    <div className="card-content">
                                      <div className="card-body d-flex align-items-center">
                                        <div className="ms-2">
                                          <h5 className="mb-0">
                                            {val.full_name}
                                          </h5>
                                          <div className="d-flex align-items-center">
                                            <p className="me-2 mb-0">
                                              {val.employee_id}
                                            </p>
                                            <span className="badge bg-light-primary">
                                              {val.job_level_name}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6" style={{ height: "450px" }}>
                    <div className="card shadow">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h4 className="card-title">Pulang Cepat</h4>
                            <b className="card-text">
                              Total: {data_out?.data?.length ?? 0}
                            </b>
                          </div>
                          <hr />
                          <div
                            className="overflow-auto"
                            style={{ height: "350px" }}
                            >
                            {loading_out && <LoadingComponent />}
                            {!loading_out && !data_out?.data?.length > 0 && <EmptyComponent />}
                            {data_out?.data?.length > 0 &&
                              data_out.data.map((val) => {
                                return (
                                  <div className="card shadow">
                                    <div className="card-content">
                                      <div className="card-body d-flex align-items-center">
                                        
                                        <div className="ms-2">
                                          <h5 className="mb-0">
                                            {val.full_name} ({val.attendance_today_out})
                                          </h5>
                                          <div className="d-flex align-items-center">
                                            <p className="me-2 mb-0">
                                              {val.employee_id}
                                            </p>
                                            <span className="badge bg-light-primary">
                                              {val.job_level_name}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
              
              <div
                className="tab-pane fade"
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="card shadow">
                      {loading_chart_late&&<LoadingComponent/>}
                      
                      <div className="card-body">
                      {!loading_chart_late && !data_chart_late?.labels?.length > 0 && <EmptyComponent />}
                      {!loading_chart_late && data_chart_late?.labels?.length > 0 && <LineChart data={data_chart_late} />}
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6" style={{ height: "550px" }}>
                    <div className="card shadow">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h4 className="card-title">Tidak Masuk Hari Ini</h4>
                            <b className="card-text">
                              Total: {data_absent?.data?.length ?? 0}
                            </b>
                          </div>
                          <hr />
                          <div
                            className="overflow-auto"
                            style={{ height: "450px" }}
                            >
                            {loading_absent && <LoadingComponent />}
                            {!loading_absent && !data_absent?.data?.length > 0 && <EmptyComponent />}
                            {data_absent?.data?.length > 0 &&
                              data_absent.data.map((val) => {
                                return (
                                  <div className="card shadow">
                                    <div className="card-content">
                                      <div className="card-body d-flex align-items-center">
                                        <div className="ms-2">
                                          <h5 className="mb-0">
                                            {val.full_name}
                                          </h5>
                                          <div className="d-flex align-items-center">
                                            <p className="me-2 mb-0">
                                              {val.employee_id}
                                            </p>
                                            <span className="badge bg-light-primary">
                                              {val.job_level_name}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <div className="row mt-3">
                <div className="col-md-6">
                    <div className="card shadow">
                      {loading_chart_payroll&&<LoadingComponent/>}
                      
                      <div className="card-body">
                      {!loading_chart_payroll && !data_chart_payroll?.labels?.length > 0 && <EmptyComponent />}
                      {!loading_chart_payroll && data_chart_payroll?.labels?.length > 0 && <LineChart data={data_chart_payroll} />}
                        
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6" style={{ height: "550px" }}>
                    <div className="card shadow">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h4 className="card-title">Kontrak Berakhir</h4>
                            <b className="card-text">
                              Total: {data_contract?.data?.length ?? 0}
                            </b>
                          </div>
                          <hr />
                          <div
                            className="overflow-auto"
                            style={{ height: "450px" }}
                            >
                            {loading_contratc && <LoadingComponent />}
                            {!loading_contratc && !data_contract?.data?.length > 0 && <EmptyComponent />}
                            {data_contract?.data?.length > 0 &&
                              data_contract.data.map((val) => {
                                return (
                                  <div className="card shadow">
                                    <div className="card-content">
                                      <div className="card-body d-flex align-items-center">
                                        <div className="ms-2">
                                          <h5 className="mb-0">
                                            {val.full_name} ({val.employee_id})
                                          </h5>
                                          <div className="d-flex align-items-center">
                                            <p className="me-2 mb-0">
                                              {val.days_left} Hari
                                            </p>
                                            <span className="badge bg-light-primary">
                                              {SysDateTransform({date:val.employee_expired_date,type:'short',lang:'in',withTime:false})}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-6">
                    <div className="card shadow">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h5 className="card-title">Kontrak Berakhir</h5>
                            <div className="card-text">
                              <>Karyawan Aktif: 10</>
                              <br />
                              <>Karyawan Non Aktif: 2</>
                            </div>
                          </div>
                          <hr />
                          <div className="card shadow">
                            <div className="card-content">
                              <div className="card-body d-flex align-items-center">
                                <div className="avatar">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/faces/2.jpg"
                                    }
                                    alt="Avatar"
                                  />
                                </div>
                                <div className="ms-2">
                                  <h5 className="mb-0">Karyawan</h5>
                                  <div className="d-flex align-items-center">
                                    <p className="me-2 mb-0">00001</p>
                                    <span className="badge bg-light-primary">
                                      2023-01-12
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card shadow">
                            <div className="card-content">
                              <div className="card-body d-flex align-items-center">
                                <div className="avatar">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/faces/2.jpg"
                                    }
                                    alt="Avatar"
                                  />
                                </div>
                                <div className="ms-2">
                                  <h5 className="mb-0">Karyawan</h5>
                                  <div className="d-flex align-items-center">
                                    <p className="me-2 mb-0">00001</p>
                                    <span className="badge bg-light-primary">
                                      2023-02-12
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer d-flex justify-content-between">
                        <button className="btn btn-block btn-light-primary">
                          Lihat Lebih Banyak
                        </button>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="kpi"
                role="tabpanel"
                aria-labelledby="kpi-tab"
              >
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="card shadow">
                      <div className="card-body">
                        <LineChart data={data3} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card shadow">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h5 className="card-title">KPI Karyawan</h5>
                          </div>
                          <hr />
                          <div className="card shadow">
                            <div className="card-content">
                              <div className="card-body d-flex align-items-center">
                                <div className="avatar">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/faces/2.jpg"
                                    }
                                    alt="Avatar"
                                  />
                                </div>
                                <div className="ms-2">
                                  <h5 className="mb-0">Karyawan 1</h5>
                                  <div className="d-flex align-items-center">
                                    <p className="me-2 mb-0">00001</p>
                                    <span className="badge bg-light-primary">
                                      20
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="card shadow">
                            <div className="card-content">
                              <div className="card-body d-flex align-items-center">
                                <div className="avatar">
                                  <img
                                    src={
                                      process.env.PUBLIC_URL +
                                      "/assets/images/faces/2.jpg"
                                    }
                                    alt="Avatar"
                                  />
                                </div>
                                <div className="ms-2">
                                  <h5 className="mb-0">Karyawan 2</h5>
                                  <div className="d-flex align-items-center">
                                    <p className="me-2 mb-0">00002</p>
                                    <span className="badge bg-light-primary">
                                      20
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer d-flex justify-content-between">
                        <button className="btn btn-block btn-light-primary">
                          Lihat Lebih Banyak
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="ppd"
                role="tabpanel"
                aria-labelledby="ppd-tab"
              >
                <div className="row mt-3">
                  <div className="row mt-3">
                    <div className="col-md-12">
                      <div className="card shadow">
                        <div className="card-content">
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <h5 className="card-title">
                                Pengajuan Perubahan Data
                              </h5>
                              <b className="card-text">Total: 0</b>
                            </div>
                            <hr />
                          </div>
                        </div>
                        {/* <div className="card-footer d-flex justify-content-between">
																
																<button className="btn btn-block btn-light-primary">Lihat Lebih Banyak</button>
															</div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div>
							</div> */}
          </div>
        </div>
      </section>
    </AdminDashboard>
  );
}

export default Dashboard;
