function getMonthString(date){
  /**
   * Converts Date object to month string
   * @param  {Date}   date
   * @return {String} month name
   */
  
  //Create an array containing each day, starting with Sunday.
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  //Use the getMonth() method to get the month integer.
  var month = date.getMonth();
  //Return the element that corresponds to that index.
  return months[month];
}

export default getMonthString