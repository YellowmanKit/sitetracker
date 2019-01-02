'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _to = require('../to');

var _to2 = _interopRequireDefault(_to);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var profileSchema = _mongoose2.default.Schema({
  belongTo: {
    type: ObjectId,
    required: true
  },
  icon: {
    type: String
  },
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  joinedSchools: [ObjectId],
  joinedCourses: [ObjectId],

  cardCount: {
    type: Number,
    default: 0
  },
  featuredCount: {
    type: Number,
    default: 0
  }
});

var Profile = module.exports = _mongoose2.default.model('profile', profileSchema);

module.exports.getByStudentProjects = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(studentProjects) {
    var err, profile, usersId, profilesId, profiles, i, _ref2, _ref3;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            err = void 0, profile = void 0;
            usersId = [];
            profilesId = [];
            profiles = [];


            for (i = 0; i < studentProjects.length; i++) {
              usersId = [].concat(_toConsumableArray(usersId), [studentProjects[i].student]);
            }

            i = 0;

          case 6:
            if (!(i < usersId.length)) {
              _context.next = 18;
              break;
            }

            _context.next = 9;
            return (0, _to2.default)(Profile.findOne({ belongTo: usersId[i] }));

          case 9:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            profile = _ref3[1];

            profiles.push(profile);
            profilesId.push(profile._id);

          case 15:
            i++;
            _context.next = 6;
            break;

          case 18:
            return _context.abrupt('return', [err, profiles, profilesId]);

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.getStudents = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(coursesId) {
    var err, profiles, profilesId, _ref5, _ref6, i;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            err = void 0;
            profiles = [];
            profilesId = [];
            _context2.next = 5;
            return (0, _to2.default)(Profile.find({ joinedCourses: { $in: coursesId } }));

          case 5:
            _ref5 = _context2.sent;
            _ref6 = _slicedToArray(_ref5, 2);
            err = _ref6[0];
            profiles = _ref6[1];

            for (i = 0; i < profiles.length; i++) {
              profilesId = [].concat(_toConsumableArray(profilesId), [profiles[i]._id]);
            }

            return _context2.abrupt('return', [err, profiles, profilesId]);

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x2) {
    return _ref4.apply(this, arguments);
  };
}();

module.exports.getTeachers = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(schoolId) {
    var err, profiles, profilesId, _ref8, _ref9, i;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            err = void 0;
            profiles = [];
            profilesId = [];
            _context3.next = 5;
            return (0, _to2.default)(Profile.find({ joinedSchools: schoolId }));

          case 5:
            _ref8 = _context3.sent;
            _ref9 = _slicedToArray(_ref8, 2);
            err = _ref9[0];
            profiles = _ref9[1];

            for (i = 0; i < profiles.length; i++) {
              profilesId = [].concat(_toConsumableArray(profilesId), [profiles[i]._id]);
            }

            return _context3.abrupt('return', [err, profiles, profilesId]);

          case 11:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x3) {
    return _ref7.apply(this, arguments);
  };
}();
//# sourceMappingURL=Profile.js.map