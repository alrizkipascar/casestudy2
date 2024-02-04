const fixDateTimeTable = (date) => {
  let newDate = new Date(date);
  let Dates = newDate.toDateString();
  let Time = newDate.toLocaleTimeString();

  return Dates + " " + Time;
};
export default fixDateTimeTable;
