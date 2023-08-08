import Moment from "moment";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { getToken } from "./session";
import { sys_labels } from "./constants";
import convert from "../model/role_menuModel";
export function SysCurrencyTransform({ num = 0, currency = "IDR" }) {
  num = parseInt(num ?? 0);
  if (isNaN(num)) {
    num = 0;
  }
  return (
    currency + " " + num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
  );
}
export function SysGetCurrentTime({ lang = "en", type = "long" }) {
  const date = new Date();
  return {
    time: `${addZero({ num: date.getHours() })}:${addZero({
      num: date.getMinutes(),
    })}:${addZero({ num: date.getSeconds() })}`,
    day: SysDay({ date: date, lang: lang }),
    date: SysDateTransform({ date: date, type: type, lang: lang }),
  };
}
export function addZero({ num = 0 }) {
  if (num < 10) {
    return `0${num}`;
  }
  return `${num}`;
}
export function SysDay({ date = "", lang = "en" }) {
  var days = [
    "Sunday",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dateFormat = new Date(date);
  if (lang != "en") {
    days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  }
  return days[dateFormat.getDay()];
}
export function SysDateTransform({
  date = "",
  type = "long",
  checkIsToDay = false,
  lang = "en",
  withTime = false,
  forSql = false,
}) {
  if (date == "") {
    return "";
  }
  const current = new Date();
  const dateFormat = new Date(date);
  const month = dateFormat.getMonth() + 1;
  const year = dateFormat.getFullYear();
  const day = dateFormat.getDate();
  const hour = dateFormat.getHours();
  const minutes = dateFormat.getMinutes();
  const seconds = dateFormat.getSeconds();
  const mili = dateFormat.getMilliseconds();
  let fullOfdate = "";
  if (checkIsToDay) {
    if (
      Moment(current).format("yyyy-MM-DD") ==
      Moment(dateFormat).format("yyyy-MM-DD")
    ) {
      fullOfdate =
        addZero({ num: hour }) +
        ":" +
        addZero({ num: minutes }) +
        ":" +
        addZero({ num: seconds });
    } else {
      fullOfdate =
        addZero({ num: day }) +
        " " +
        SysMonthTransform(month, type, lang) +
        " " +
        year;
    }
  } else {
    fullOfdate =
      addZero({ num: day }) +
      " " +
      SysMonthTransform(month, type, lang) +
      " " +
      year;
  }
  if (withTime) {
    fullOfdate +=
      " (" +
      addZero({ num: hour }) +
      ":" +
      addZero({ num: minutes }) +
      ":" +
      addZero({ num: seconds }) +
      ")";
  }
  if (forSql) {
    fullOfdate = `${addZero({ num: year })}-${addZero({
      num: month,
    })}-${addZero({
      num: day,
    })}`;
    if (withTime) {
      fullOfdate += ` ${addZero({ num: hour })}:${addZero({
        num: minutes,
      })}:${addZero({ num: seconds })}.${addZero({ num: mili })}`;
    }
  }
  return fullOfdate;
}
export function SysMonthTransform(val, type = "long", lang = "en") {
  var longMonth = [
    "January",
    "February",
    "March",
    "April",
    "Mei",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var shortMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (lang == "in") {
    longMonth = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "July",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    shortMonth = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "Mei",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Okt",
      "Nov",
      "Des",
    ];
  }
  if (type == "long") {
    return longMonth[val];
  } else {
    return shortMonth[val];
  }
}

export function showToast({
  message = "",
  type = "success",
  autoClose = 2000,
}) {
  switch (type) {
    case "error":
      toast.error(message, {
        position: "top-center",
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      break;

    case "error":
      toast.info(message, {
        position: "top-center",
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      break;
    default:
      toast(message, {
        position: "top-center",
        autoClose: autoClose,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      break;
  }
}
export function SysReadData(file) {
  try {
    let rawData = [{ value: "", name: "" }];
    rawData = [];
    rawData = file;
    return rawData;
  } catch (err) {
    console.error("Error reading data:", err);
    return [];
  }
}

export function SysJWTDecoder(token = null) {
  let my_jwt = {
    id: "",
    email: "",
    employee_id: "",
    full_name: "",
    role: "",
    company: "",
    branchId: "",
    companyId: "",
    division: "",
    job_level: "",
    position: "",
    iat: "",
    exp: "",
  };
  if (token) {
    my_jwt = jwt_decode(token);
  } else {
    my_jwt = jwt_decode(getToken());
  }

  // console.log(my_jwt);
  return {
    id: my_jwt?.id ?? "",
    email: my_jwt?.email ?? "",
    employee_id: my_jwt?.employee_id ?? "",
    full_name: my_jwt?.full_name ?? "",
    role: my_jwt?.role ?? "",
    company: my_jwt?.company ?? "",
    branchId: my_jwt?.branchId ?? "",
    companyId: my_jwt?.companyId ?? "",
    division: my_jwt?.division ?? "",
    job_level: my_jwt?.job_level ?? "",
    position: my_jwt?.position ?? "",
    iat: my_jwt?.iat ?? "",
    exp: my_jwt?.exp ?? "",
  };
  // console.log(my_jwt);
}

export function SystoCamelCase(text = "") {
  let str = text.replace("id_", "");
  str = str.replace("_id", "");
  return str.replace(/_([a-z])/g, (match, char) => " " + char);
}
export function SysValidateForm(required_field = [], data = []) {
  let message = "field ";
  let is_valid = true;
  required_field.map((val, index) => {
    const alises = val.split(" as ");
    const named = alises.length > 1 ? alises[1] : alises[0];
    if (
      data[alises[0]] == null ||
      data[alises[0]] == "" ||
      data[alises[0]] == undefined
    ) {
      if (index == required_field.length - 1 || required_field.length == 0) {
        message += SystoCamelCase(named) + " ";
      } else {
        message += SystoCamelCase(named) + ", ";
      }
      is_valid = false;
    }
  });
  message += "is required!";
  return {
    is_valid,
    message,
  };
}

export function SysGenValueOption(
  data = [],
  value = null,
  id_index = "value",
  index = "name"
) {
  var obj = data.find((val) => val[id_index] === value);
  console.log(obj);
  if (!obj) return null;
  return {
    value,
    label: obj[index],
    ...obj,
  };
}
export function SysGenMenu() {
  const dashboard = {
    icon: "HomeIcon",
    iconType: "outline",
    label: sys_labels.menus.DASHBOARD,
    link: "/dashboard",
  };
  const master_data = {
    icon: "DesktopComputerIcon",
    iconType: "outline",
    label: sys_labels.menus.MASTER,
    dir: "/master-data",
    subMenu: [
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
        label: sys_labels.menus.LEAVE_MASS,
        link: "/master-data/leave_mass",
      },
      {
        label: sys_labels.menus.LEAVE_TYPE,
        link: "/master-data/leave_type",
      },
      {
        label: sys_labels.menus.LEAVE_BALLANCE,
        link: "/master-data/leave_ballance",
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
  };
  const master_organization = {
    icon: "UsersIcon",
    iconType: "outline",
    label: "Master Organisasi",
    dir: "/master-organization",
    subMenu: [
      {
        label: sys_labels.menus.DIVISION,
        link: "/master-organization/organization",
      },
      {
        label: sys_labels.menus.JOB_LEVEL,
        link: "/master-organization/job_level",
      },
      {
        label: sys_labels.menus.JOB_POSITION,
        link: "/master-organization/job_position",
      },
    ],
  };
  const master_payroll = {
    icon: "CreditCardIcon",
    iconType: "outline",
    label: "Master Payroll",
    dir: "/master-payroll",
    subMenu: [
      {
        label: sys_labels.menus.ALLOWANCE,
        link: "/master-payroll/component_name/allowance",
      },
      {
        label: sys_labels.menus.ALLOWANCE + " Harian",
        link: "/master-payroll/component_name/allowance_daily",
      },
      {
        label: sys_labels.menus.ALLOWANCE + " Lainnya",
        link: "/master-payroll/component_name/allowance_ex",
      },
      {
        label: sys_labels.menus.DEDUCTION,
        link: "/master-payroll/component_name/deduction",
      },
      {
        label: sys_labels.menus.SALARY_COMPONENT,
        link: "/master-payroll/salary_component",
      },
    ],
  };
  const payroll = {
    icon: "CurrencyDollarIcon",
    iconType: "outline",
    label: sys_labels.menus.PAYROLL,
    dir: "/payroll",
    subMenu: [
      {
        label: sys_labels.menus.SALARY,
        link: "/payroll/salary",
      },
    ],
  };
  const transaction = {
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
  };
  const report = {
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
  };
  const tool = {
    icon: "ViewGridIcon",
    iconType: "solid",
    label: sys_labels.menus.CONFIG,
    dir: "/tool",
    subMenu: [
      {
        label: sys_labels.menus.BPJS,
        link: "/tool/bpjs",
      },
    ],
  };
  return {
    "/dasboard": dashboard,
    "/master-data": master_data,
    "/master-organization": master_organization,
    "/master-payroll": master_payroll,
    "/payroll": payroll,
    "/transaction": transaction,
    "/report": report,
    "/tool": tool,
    all_menus: [
      dashboard,
      master_data,
      master_organization,
      master_payroll,
      payroll,
      transaction,
      report,
      tool,
    ],
  };
}
export function SysGenRouting() {
  return [
    {
      route: "/dashboard",
      name: "Dashboard",
    },
    {
      route: "/master-data",
      name: "Master Data",
    },
    {
      route: "/master-data/company",
      name: "Perusahaan",
    },
    {
      route: "/master-data/branch",
      name: "Kantor",
    },
    {
      route: "/master-data/employee",
      name: "Karyawan",
    },
    {
      route: "/master-data/leave_mass",
      name: "Cuti Bersama",
    },
    {
      route: "/master-data/leave_type",
      name: "Tipe Cuti",
    },
    {
      route: "/master-data/leave_ballance",
      name: "Saldo Cuti",
    },
    {
      route: "/master-data/schedule",
      name: "Jadwal",
    },
    {
      route: "/master-data/menu",
      name: "Menu",
    },
    {
      route: "/master-data/role_menu",
      name: "Role Menu",
    },
    {
      route: "/master-organization",
      name: "Master Organisasi",
    },

    {
      route: "/master-organization/organization",
      name: "Divisi",
    },

    {
      route: "/master-organization/job_level",
      name: "Level Jabatan",
    },
    {
      route: "/master-organization/job_position",
      name: "Posisi Jabatan",
    },
    {
      route: "/master-payroll",
      name: "Master Payroll",
    },
    {
      route: "/master-payroll/component_name/allowance",
      name: "Tunjangan Tetap",
    },
    {
      route: "/master-payroll/component_name/allowance_daily",
      name: "Tunjangan Harian",
    },
    {
      route: "/master-payroll/component_name/allowance_ex",
      name: "Tunjangan Lain",
    },
    {
      route: "/master-payroll/component_name/deduction",
      name: "Potongan",
    },
    {
      route: "/master-payroll/salary_component",
      name: "Komponen Gaji",
    },
    {
      route: "/payroll",
      name: "Payroll",
    },
    {
      route: "/payroll/salary",
      name: "Gaji",
    },
    {
      route: "/transaction",
      name: "Transaksi",
    },
    {
      route: "/transaction/attendance",
      name: "Kehadiran",
    },
    {
      route: "/transaction/cash_advance",
      name: "Cash Advance",
    },
    {
      route: "/transaction/leave",
      name: "Cuti",
    },
    {
      route: "/transaction/reimburst",
      name: "Reimburstment",
    },
    {
      route: "/transaction/overtime",
      name: "Lembur",
    },
    {
      route: "/report",
      name: "Laporan",
    },

    {
      route: "/report/employee",
      name: "Karyawan",
    },
    {
      route: "/report/attendance",
      name: "Kehadiran",
    },
    {
      route: "/report/leave",
      name: "Cuti",
    },
    {
      route: "/report/overtime",
      name: "Lembur",
    },
    {
      route: "/report/additional",
      name: "Insentif",
    },
    {
      route: "/report/reduction",
      name: "Potongan",
    },
    {
      route: "/report/cash",
      name: "Cash Advance",
    },
    {
      route: "/report/imbursement",
      name: "Reimbursment",
    },
    {
      route: "/report/salary",
      name: "Gaji",
    },
    {
      route: "/report/tax",
      name: "Pajak",
    },
    {
      route: "/tool",
      name: "Pengaturan",
    },

    {
      route: "/tool/bpjs",
      name: "BPJS",
    },
  ];
}
export function SysGenMenuByRole(role_menu = []) {
  const menus = convert.listOfrole_menuModel(role_menu);
  console.log(role_menu);
  const my_menus = SysGenMenu();
  let menu_route = [];
  Object.keys(my_menus).map((val) => {
    // console.log(val);
    const route = menus.find(m_val=>m_val.route==val);
    console.log(route);
    if (val != "/dashboard" && route) {
      let relate_menu = {
        ...my_menus[val],
        subMenu: [],
      };
      my_menus[val].subMenu.map((child_menu) => {
        const find_child = route.children.find(
          (val_child) => val_child.route == child_menu.link
        );
        if (find_child) {
          relate_menu.subMenu.push({
            label: find_child.title,
            link: find_child.route,
          });
        }
      });
      menu_route.push(relate_menu);
    }
  });
  // menus.map((val) => {
  //   const route = my_menus[val.route];
  //   if (val.route != "/dashboard") {
  //     // return;
  //     let relate_menu = {
  //       ...route,
  //       subMenu: [],
  //     };
  //     val.children.map((child) => {
  //       relate_menu.subMenu.push({
  //         label: child.title,
  //         link:child.route,
  //       });
  //     });
  //     if(relate_menu.dir){
  //       menu_route.push(relate_menu);
  //     }
  //   }
  // });
  return [my_menus["/dasboard"], ...menu_route];
}
