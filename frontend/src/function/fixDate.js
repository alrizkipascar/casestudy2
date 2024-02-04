const fixDate = (date) => {
  console.log("datesss", date);
  let str = date.slice(0, -4);
  // let dateLocal = new Date(date);
  // let newDate = new Date(
  //   dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000
  // );
  return str;
};
export default fixDate;
