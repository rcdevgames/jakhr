import clsx from "clsx";
import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import isEmpty from "../../utils/is-empty";
import HeroIcon from "../../components/HeroIcon";

const navItems = [
  {
    icon: "HomeIcon",
    iconType: "outline",
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    icon: "DesktopComputerIcon",
    iconType: "outline",
    label: "Master Data",
    dir: "/master-data",
    subMenu: [
      {
        label: "Company",
        link: "/master-data/company",
      },
      {
        label: "Branch",
        link: "/master-data/branch",
      },
      {
        label: "Division",
        link: "/master-data/organization",
      },
      {
        label: "Job Level",
        link: "/master-data/job_level",
      },
      {
        label: "Job Position",
        link: "/master-data/job_position",
      },
      {
        label: "Employee",
        link: "/master-data/employee",
      },
      {
        label: "Leave Mass",
        link: "/master-data/leave_mass",
      },
    ],
  },
  {
    icon: "TableIcon",
    iconType: "solid",

    label: "Transaksi",
    dir: "/transaction",
    subMenu: [
      {
        label: "Kehadiran",
        link: "/transaction/attendance",
      },
      {
        label: "Cuti / Izin",
        link: "/transaction/leave",
      },
      {
        label: "Insentif",
        link: "/transaction/additional",
      },
      {
        label: "Potongan",
        link: "/transaction/reduction",
      },
      {
        label: "Kasbon",
        link: "/transaction/cash",
      },
      {
        label: "Reimbursement",
        link: "/transaction/imbursement",
      },
    ],
  },
  {
    icon: "PresentationChartBarIcon",
    iconType: "outline",
    label: "Laporan",
    dir: "/report",
    subMenu: [
      {
        label: "Karyawan",
        link: "/report/employee",
      },
      {
        label: "Kehadiran",
        link: "/report/attendance",
      },
      {
        label: "Cuti / Izin",
        link: "/report/leave",
      },
      {
        label: "Lembur",
        link: "/report/overtime",
      },
      {
        label: "Insentif",
        link: "/report/additional",
      },
      {
        label: "Potongan",
        link: "/report/reduction",
      },
      {
        label: "Kasbon",
        link: "/report/cash",
      },
      {
        label: "Reimbursement",
        link: "/report/imbursement",
      },
      {
        label: "Gaji",
        link: "/report/salary",
      },
      {
        label: "Pajak",
        link: "/report/tax",
      },
    ],
  },
  {
    icon: "ViewGridIcon",
    iconType: "solid",
    label: "Config",
    dir: "/tool",
    subMenu: [
      {
        label: "BPJS",
        link: "/tool/bpjs",
      },

      {
        label: "Late",
        link: "/tool/late",
      },

      {
        label: "Overtime",
        link: "/tool/overtime",
      },
    ],
  },
];

const AdminDashboardLayout = () => {
  const location = useLocation();

  const addScript = (src, id) => {
    const el = document.getElementById(id);
    if (el) return;
    const script = document.createElement("script");
    script.src = src;
    script.charset = "utf-8";
    script.async = true;
    script.id = id;
    document.head.appendChild(script);
  };

  return (
    <div id="app">
      <Helmet>
        <script src="/assets/js/initTheme.js"></script>
        <script src="/assets/js/bootstrap.js"></script>
        <script src="/assets/js/mazer.js"></script>
        <script src="/assets/js/app.js"></script>
      </Helmet>
      <div id="sidebar" className="active">
        <div className="sidebar-wrapper active">
          <div className="sidebar-header position-relative">
            <div className="d-flex justify-content-between">
              {/* <div className="logo"> */}
              <Link to="/">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/logo/Jakhr.png"}
                  alt="Logo"
                />
              </Link>
              {/* </div> */}

              <div className="sidebar-toggler x">
                <a href="#" className="sidebar-hide d-xl-none d-block">
                  <i className="bi bi-x bi-middle"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="sidebar-menu">
            <ul className="menu">
              {navItems.map((el, idx) => {
                const link = "" + (el.link ? el.link : "");

                if (el.heading) {
                  return (
                    <li
                      key={"sidebar-nav-item" + idx}
                      className="sidebar-title"
                    >
                      {el.label}
                    </li>
                  );
                }

                return (
                  <li
                    key={"sidebar-nav-item" + idx}
                    className={clsx(
                      el.heading ? "sidebar-title" : "sidebar-item",
                      !isEmpty(el.subMenu) && "has-sub",
                      location.pathname.includes(el.link) && "active",
                      !isEmpty(el.subMenu) &&
                        el.dir &&
                        location.pathname.includes(el.dir) &&
                        "active"
                    )}
                  >
                    <Link to={link} className="sidebar-link">
                      <HeroIcon iconName={el.icon} iconType={el.iconType} />

                      <span>{el.label}</span>
                    </Link>
                    {!isEmpty(el.subMenu) && (
                      <ul className="submenu">
                        {el.subMenu.map((el2, idx2) => {
                          const link2 = "" + (el2.link ? el2.link : "");

                          return (
                            <li
                              key={"sub-menu" + idx + idx2}
                              className={clsx(
                                "submenu-item",
                                location.pathname === link2 && "active"
                              )}
                            >
                              <Link to={link2}>{el2.label}</Link>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <header id="hamburger" className="mb-3">
        <a href="#" className="burger-btn d-block d-xl-none">
          <i className="bi bi-justify fs-3"></i>
        </a>
      </header>
      <Outlet />
    </div>
  );
};

export default AdminDashboardLayout;
