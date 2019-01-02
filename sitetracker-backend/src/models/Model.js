module.exports.outDated = (date) =>{
  const today = new Date();
  const endDate = new Date(date);
  return date < today;
}

module.exports.deltaMinute = (startDate, endDate) =>{
  var diffMs = (startDate - endDate);
  //var diffDays = Math.floor(diffMs / 86400000); // days
  //var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.floor(((diffMs % 86400000) % 3600000) / 60000);
  //console.log(diffMins);
  return diffMins;
}
