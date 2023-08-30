import { useEffect } from "react";
import { SysJWTDecoder } from "../../utils/global_store";
import AdminDashboard from "../AdminDashboard";
import LineChart from "./LineChart";

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
  useEffect(() => {
    SysJWTDecoder();
    console.log(window.location.protocol);
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
                  <div className="col-md-6">
                    <div className="card shadow">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h4 className="card-title">Tidak Masuk Hari Ini</h4>
                            <b className="card-text">Total: 2</b>
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
                                      Kantor Pusat
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
                                      Kantor Pusat
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
                  <div className="col-md-6">
                    <div className="card shadow">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h4 className="card-title">Kehadiran Hari Ini</h4>
                            <b className="card-text">Total: 2</b>
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
                                      Kantor Pusat
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
                                      Kantor Pusat
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
                  <div className="col-md-6">
                    <div className="card shadow">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h4 className="card-title">Tidak Absen Pulang</h4>
                            <b className="card-text">Total: 2</b>
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
                                      Kantor Pusat
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
                                      Kantor Pusat
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
                  <div className="col-md-6">
                    <div className="card shadow">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h4 className="card-title">Pulang Cepat</h4>
                            <b className="card-text">Total: 2</b>
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
                                      Kantor Pusat
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
                                      Kantor Pusat
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
                  <div className="col-md-6">
                    <div className="card shadow">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h4 className="card-title">
                              Kehadiran Mencurigakan
                            </h4>
                            <b className="card-text">Total: 2</b>
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
                                      Kantor Pusat
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
                                      Kantor Pusat
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
                  <div className="col-md-6">
                    <div className="card shadow">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h4 className="card-title">Kondisi Mencurigakan</h4>
                            <b className="card-text">Total: 2</b>
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
                                      Kantor Pusat
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
                                      Kantor Pusat
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
                id="profile"
                role="tabpanel"
                aria-labelledby="profile-tab"
              >
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="card shadow">
                      <div className="card-body">
                        <LineChart data={data1} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card shadow">
                      <div className="card-content">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <h5 className="card-title">Tidak Masuk Hari Ini</h5>
                            <b className="card-text">Total: 2</b>
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
                                      2000 menit
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
                                      2000 menit
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
                id="contact"
                role="tabpanel"
                aria-labelledby="contact-tab"
              >
                <div className="row mt-3">
                  <div className="col-md-6">
                    <div className="card shadow">
                      <div className="card-body">
                        <LineChart data={data2} />
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
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
                  </div>
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
