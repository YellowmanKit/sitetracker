'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

var _to = require('../to');

var _to2 = _interopRequireDefault(_to);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var subjectSchema = _mongoose2.default.Schema({
  course: {
    type: ObjectId,
    required: true
  },
  projects: {
    type: [ObjectId]
  },
  icon: {
    type: String
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

var Subject = module.exports = _mongoose2.default.model('subject', subjectSchema);

module.exports.getByCourses = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(courses, all) {
    var err, subject, subjectsId, subjects, i, _ref2, _ref3;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            err = void 0, subject = void 0;
            subjectsId = [];
            subjects = [];
            i = 0;

          case 4:
            if (!(i < courses.length)) {
              _context.next = 11;
              break;
            }

            if (!(!all && _Model2.default.outDated(courses[i].endDate))) {
              _context.next = 7;
              break;
            }

            return _context.abrupt('continue', 8);

          case 7:
            subjectsId = [].concat(_toConsumableArray(subjectsId), _toConsumableArray(courses[i].subjects));

          case 8:
            i++;
            _context.next = 4;
            break;

          case 11:
            i = 0;

          case 12:
            if (!(i < subjectsId.length)) {
              _context.next = 23;
              break;
            }

            _context.next = 15;
            return (0, _to2.default)(Subject.findById(subjectsId[i]));

          case 15:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            subject = _ref3[1];

            subjects.push(subject);

          case 20:
            i++;
            _context.next = 12;
            break;

          case 23:
            return _context.abrupt('return', [err, subjects, subjectsId]);

          case 24:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=Subject.js.map