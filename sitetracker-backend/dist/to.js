"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.default = to;
function to(promise) {
   return promise.then(function (data) {
      return [null, data];
   }).catch(function (err) {
      return [err];
   });
}
//# sourceMappingURL=to.js.map