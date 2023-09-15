export const onlyNumber = (event) => {
  if (
    !(
      (event.key >= "0" && event.key <= "9") ||
      event.key === "Backspace" ||
      event.key === "Delete"
    )
  ) {
    event.preventDefault();
  }
};
export const onlyNumberAndDot = (event) => {
  if (
    !(
      (event.key >= "0" && event.key <= "9") ||
      event.key === "Backspace" ||
      event.key === "Delete" ||
      event.key == "."
    )
  ) {
    event.preventDefault();
  }
};
export const onlyNumberDotAndDash = (event) => {
  if (
    !(
      (event.key >= "0" && event.key <= "9") ||
      event.key === "Backspace" ||
      event.key === "Delete" ||
      event.key == "." ||
      event.key == "-"
    )
  ) {
    event.preventDefault();
  }
};
export const disablePaste = (event) => {
  event.preventDefault();
};
// export const autoDash = (event,setInputValue) => {
//   if (
//     !(
//       (event.key >= "0" && event.key <= "9") ||
//       event.key === "Backspace" ||
//       event.key === "Delete" ||
//       event.key == "." ||
//       event.key == "-"
//     )
//   ) {
//     event.preventDefault();
//     return;
//   }
//   const value = event.target.value.replace(/-/g, ''); // Remove existing dashes
//   const formattedValue = value
//     .replace(/\D/g, '') // Remove non-numeric characters
//     .replace(/(\d{4})/g, '$1-') // Add dash every 4 characters
//   // event.target.value = formattedValue;
//   // console.log(event);
//   const ref = {
//     target:{
//       name:event.target.name,
//       value:formattedValue
//     }
//   }
//   setInputValue(ref);
//   // return formattedValue
// };