import Moment from "moment";
import { toast } from "react-toastify";

export function SysCurrencyTransform({ num = 0, currency = "IDR" }) {
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
  const dateFormat = new Date(Moment(date, "YYYY-MM-DD hh:mm:s.SSS"));
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

export function showToast({ message = "", type = "success",autoClose=2000 }) {
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