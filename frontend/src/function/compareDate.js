const compareDate = (date) => {
  console.log(
    "datesss",
    new Date(date) > new Date(),
    new Date(date),
    new Date()
  );
  let str = new Date(date) > new Date();
  // let dateLocal = new Date(date);
  // let newDate = new Date(
  //   dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000
  // );
  return str;
};
export default compareDate;
