import clsx from "clsx";
import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import isEmpty from "../../utils/is-empty";
import HeroIcon from "../../components/HeroIcon";
import { sys_labels } from "../../utils/constants";
import { SysJWTDecoder, showToast } from "../../utils/global_store";
import GlobalLoadingBlock, {
  useLoadingContext,
} from "../../components/Loading";

const navItems = [
  {
    icon: "HomeIcon",
    iconType: "outline",
    label: sys_labels.menus.DASHBOARD,
    link: "/dashboard",
  },
  {
    icon: "DesktopComputerIcon",
    iconType: "outline",
    label: sys_labels.menus.MASTER,
    dir: "/master-data",
    subMenu: [
      // {
      //   icon: "DesktopComputerIcon",
      //   iconType: "outline",
      //   label: sys_labels.menus.MASTER,
      //   dir: "/master-data",
      //   subMenu: [
      //     {
      //       label: sys_labels.menus.COMPANY,
      //       link: "/master-data/company",
      //     },
      //     {
      //       label: sys_labels.menus.BRANCH,
      //       link: "/master-data/branch",
      //     },
      //   ],
      // },
      {
        label: sys_labels.menus.COMPANY,
        link: "/master-data/company",
      },
      {
        label: sys_labels.menus.BRANCH,
        link: "/master-data/branch",
      },
      {
        label: sys_labels.menus.EMPLOYEE,
        link: "/master-data/employee",
      },
      {
        label: sys_labels.menus.LEAVE,
        link: "/master-data/leave_mass",
      },

      {
        label: sys_labels.menus.SCHEDULE,
        link: "/master-data/schedule",
      },
      {
        label: "Menu",
        link: "/master-data/menu",
      },
      {
        label: "Role Menu",
        link: "/master-data/role_menu",
      },
    ],
  },
  {
    icon: "DesktopComputerIcon",
    iconType: "outline",
    label: "Master Organisasi",
    dir: "/master-organisasi",
    subMenu: [
      {
        label: sys_labels.menus.DIVISION,
        link: "/master-data/organization",
      },
      {
        label: sys_labels.menus.JOB_LEVEL,
        link: "/master-data/job_level",
      },
      {
        label: sys_labels.menus.JOB_POSITION,
        link: "/master-data/job_position",
      },
    ],
  },
  {
    icon: "DesktopComputerIcon",
    iconType: "outline",
    label: "Master Payroll",
    dir: "/master-gaji",
    subMenu: [
      {
        label: sys_labels.menus.ALLOWANCE,
        link: "/master-data/component_name/allowance",
      },
      {
        label: sys_labels.menus.ALLOWANCE + " Harian",
        link: "/master-data/component_name/allowance_daily",
      },
      {
        label: sys_labels.menus.ALLOWANCE + " Lainnya",
        link: "/master-data/component_name/allowance_ex",
      },
      {
        label: sys_labels.menus.DEDUCTION,
        link: "/master-data/component_name/deduction",
      },
      {
        label: sys_labels.menus.SALARY_COMPONENT,
        link: "/master-data/salary_component",
      },
    ],
  },
  {
    icon: "DesktopComputerIcon",
    iconType: "outline",
    label: sys_labels.menus.PAYROLL,
    dir: "/payroll",
    subMenu: [
      {
        label: sys_labels.menus.SALARY,
        link: "/payroll/salary",
      },
    ],
  },
  {
    icon: "TableIcon",
    iconType: "solid",

    label: sys_labels.menus.TRANSACTION,
    dir: "/transaction",
    subMenu: [
      {
        label: sys_labels.menus.ATTENDANCE,
        link: "/transaction/attendance",
      },
      {
        label: sys_labels.menus.CASH_ADVANCE,
        link: "/transaction/cash_advance",
      },
      {
        label: sys_labels.menus.LEAVE,
        link: "/transaction/leave",
      },
      {
        label: sys_labels.menus.REIMBURS,
        link: "/transaction/reimburst",
      },
      {
        label: sys_labels.menus.OVERTIME,
        link: "/transaction/overtime",
      },
    ],
  },
  {
    icon: "PresentationChartBarIcon",
    iconType: "outline",
    label: sys_labels.menus.REPORT,
    dir: "/report",
    subMenu: [
      {
        label: sys_labels.menus.EMPLOYEE,
        link: "/report/employee",
      },
      {
        label: sys_labels.menus.ATTENDANCE,
        link: "/report/attendance",
      },
      {
        label: sys_labels.menus.LEAVE,
        link: "/report/leave",
      },
      {
        label: sys_labels.menus.OVERTIME,
        link: "/report/overtime",
      },
      {
        label: sys_labels.menus.INSENTIV,
        link: "/report/additional",
      },
      {
        label: sys_labels.menus.DEDUCTION,
        link: "/report/reduction",
      },
      {
        label: sys_labels.menus.CASH_ADVANCE,
        link: "/report/cash",
      },
      {
        label: sys_labels.menus.REIMBURS,
        link: "/report/imbursement",
      },
      {
        label: sys_labels.menus.SALARY,
        link: "/report/salary",
      },
      {
        label: sys_labels.menus.TAX,
        link: "/report/tax",
      },
    ],
  },
  {
    icon: "ViewGridIcon",
    iconType: "solid",
    label: sys_labels.menus.CONFIG,
    dir: "/tool",
    subMenu: [
      {
        label: sys_labels.menus.BPJS,
        link: "/tool/bpjs",
      },

      // {
      //   label: sys_labels.menus.LATE,
      //   link: "/tool/late",
      // },

      // {
      //   label: sys_labels.menus.OVERTIME,
      //   link: "/tool/overtime",
      // },
    ],
  },
];

const AdminDashboardLayout = () => {
  const location = useLocation();

  const { isLoading } = useLoadingContext();
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
  const sys_token = SysJWTDecoder();
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // showToast({message:'success get location'})
        },
        (error) => {
          showToast({ message: "please enable location permission!" });
        }
      );
    } else {
      showToast({ message: "location service not supported!" });
    }
  }, []);
  return (
    <div id="app">
      <Helmet>
        <script src="/assets/js/initTheme.js"></script>
        <script src="/assets/js/bootstrap.js"></script>
        <script src="/assets/js/mazer.js"></script>
        <script src="/assets/js/app.js"></script>
      </Helmet>
      {isLoading && <GlobalLoadingBlock />}
      <div id="sidebar" className="active">
        <div className="sidebar-wrapper active">
          <div className="sidebar-header position-relative">
            <div className="d-flex justify-content-between">
              <Link to="/">
                <img
                  src={process.env.PUBLIC_URL + "/assets/images/logo/Jakhr.png"}
                  alt="Logo"
                />
              </Link>

              <div className="sidebar-toggler x">
                <a href="#" className="sidebar-hide d-xl-none d-block">
                  <i className="bi bi-x bi-middle"></i>
                </a>
              </div>
            </div>
            <h5>{sys_token.company}</h5>
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
