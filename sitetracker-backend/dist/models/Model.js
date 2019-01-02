"use strict";

module.exports.outDated = function (date) {
  var today = new Date();
  var endDate = new Date(date);
  return date < today;
};

module.exports.deltaMinute = function (startDate, endDate) {
  var diffMs = startDate - endDate;
  //var diffDays = Math.floor(diffMs / 86400000); // days
  //var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
  var diffMins = Math.floor(diffMs % 86400000 % 3600000 / 60000);
  //console.log(diffMins);
  return diffMins;
};
//# sourceMappingURL=Model.js.map