function getWeekdayString(date) {
  /**
   * Converts Date object to weekday string
   * @param  {Date}   date
   * @return {String} weekday name
   */

  //Create an array containing each day, starting with Sunday.
  var weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  //Use the getDay() method to get the day.
  var day = date.getDay();
  //Return the element that corresponds to that index.
  return weekdays[day];
}

export default getWeekdayString;
