import Moment from "moment";
import { useLoadingContext } from "../components/Loading";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { getToken } from "./session";
import { sys_labels } from "./constants";
import convert from "../model/role_menuModel";
import * as XLSX from "xlsx-js-style";

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
  const month = dateFormat.getMonth();
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
      fullOfdate = "Today ";
      // addZero({ num: hour }) +
      // ":" +
      // addZero({ num: minutes }) +
      // ":" +
      // addZero({ num: seconds });
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
      num: month + 1,
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


  console.log(my_jwt);
  return {
    id: my_jwt?.id ?? "",
    email: my_jwt?.email ?? "",
    employee_id: my_jwt?.employee_id ?? "",
    full_name: my_jwt?.full_name ?? "",
    // role:"pegawai",
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
  let msg_error = [];
  required_field.map((val, index) => {
    const alises = val.split(" as ");
    const named = alises.length > 1 ? alises[1] : alises[0];
    if (
      data[alises[0]] == null ||
      data[alises[0]] == "" ||
      data[alises[0]] == undefined
    ) {
      msg_error.push(SystoCamelCase(named))
      document.getElementsByName(alises[0]).forEach((val) => {
        val.classList.add("validate-error");
      });
      is_valid = false;
    } else {
      document.getElementsByName(alises[0]).forEach((val) => {
        val.classList.remove("validate-error");
      });
    }
  });
  message += msg_error.join(",");
  message += " is required!";
  if (!is_valid) throw { is_valid, message };
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
  // console.log(data,value);
  var obj = data.find((val) => val[id_index] === value);
  // console.log(obj);
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
        label: sys_labels.menus.DIREKTORAT,
        link: "/master-organization/direktorat",
      },
      {
        label: sys_labels.menus.DIVISION,
        link: "/master-organization/organization",
      },
      {
        label: sys_labels.menus.DEPARTMENT,
        link: "/master-organization/department",
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
        label: sys_labels.menus.APPROVAL,
        link: "/transaction/approval",
      },
      {
        label: sys_labels.menus.ATTENDANCE,
        link: "/transaction/attendance",
      },
      // {
      //   label: sys_labels.menus.CASH_ADVANCE,
      //   link: "/transaction/cash_advance",
      // },
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
      // {
      //   label: sys_labels.menus.CASH_ADVANCE,
      //   link: "/report/cash",
      // },
      {
        label: sys_labels.menus.REIMBURS,
        link: "/report/imbursement",
      },
      // {
      //   label: sys_labels.menus.SALARY,
      //   link: "/report/salary",
      // },
      // {
      //   label: sys_labels.menus.TAX,
      //   link: "/report/tax",
      // },
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
      {
        label: sys_labels.menus.COMPANY,
        link: "/tool/company",
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
      route: "/master-organization/direktorat",
      name: sys_labels.menus.DIREKTORAT,
    },
    {
      route: "/master-organization/department",
      name: sys_labels.menus.DEPARTMENT,
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
      route: "/transaction/approval",
      name: "Approval",
    },
    {
      route: "/transaction/attendance",
      name: "Kehadiran",
    },
    // {
    //   route: "/transaction/cash_advance",
    //   name: "Cash Advance",
    // },
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
    // {
    //   route: "/report/cash",
    //   name: "Cash Advance",
    // },
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
    {
      route: "/tool/company",
      name: "Perusahaan",
    },
  ];
}
export function SysGenMenuByRole(role_menu = []) {
  const menus = convert.listOfrole_menuModel(role_menu);
  const my_menus = SysGenMenu();
  let menu_route = [];
  Object.keys(my_menus).map((val) => {
    // console.log(val);
    const route = menus.find((m_val) => m_val.route == val);
    // console.log(route);
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
  return [my_menus["/dasboard"], ...menu_route];

  // "/dasboard": dashboard,
  // "/master-data": master_data,
  // "/master-organization": master_organization,
  // "/master-payroll": master_payroll,
  // "/payroll": payroll,
  // "/transaction": transaction,
  // "/report": report,
  // "/tool": tool,
  // return [
  //   my_menus["/dasboard"],
  //   my_menus["/master-data"],
  //   my_menus["/master-organization"],
  //   my_menus["/master-payroll"],
  //   my_menus["/payroll"],
  //   my_menus["/transaction"],
  //   my_menus["/report"],
  //   my_menus["/tool"],
  // ];
}
export async function SysExportData  (data=[],columns=[],filename='')  {
  // const {showLoading,hideLoading} = useLoadingContext()
  // showLoading();
  console.log(data,columns);
  try {
    if(!data)throw {message:"No Data!"};
    let my_data = data;
    // let columns =[];
    // Object.keys(my_data[0]).map(val=>{
    //   if(typeof my_data[0]==="object"&&my_data[0]!== null){
    //     Object.keys(my_data[0][val]).map(key_2=>{
    //       columns.push(`${val}_${key_2}`)
    //     })
    //   }else{
    //     columns.push(val)
    //   }
    // })
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
          obj_data[col_value.title] = val[col_value.key] ?? "";
          // if (col_value.val_props) {
          //   obj_data[col_value.title] =
          //     col_value.val_props[val[col_value.key]];
          // }
      });
      clean_data.push(obj_data);
    });
    const ws = XLSX.utils.json_to_sheet(clean_data, { origin: "A1" });
    const wb = XLSX.utils.book_new();
    const headerStyle = {
      alignment: { horizontal: "center", vertical: "center" },
      font: { sz: 12, bold: true },
    };
    for (
      let colIndex = 0;
      colIndex < columns.length;
      colIndex++
    ) {
      // console.log(colIndex);
      const cellRef = XLSX.utils.encode_cell({ r: 0, c: colIndex }); // Row 5 is index 4
      ws[cellRef].s = headerStyle; // Apply the style to the cell
    }
    
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute(
      "download", "Data " + filename + ".xlsx"
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    showToast({ message: error.message });
  }
  // hideLoading();
};