'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Router2 = require('./Router');

var _Router3 = _interopRequireDefault(_Router2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _to = require('../../to');

var _to2 = _interopRequireDefault(_to);

var _User = require('../../models/User.js');

var _User2 = _interopRequireDefault(_User);

var _School = require('../../models/School.js');

var _School2 = _interopRequireDefault(_School);

var _Query = require('../../models/Query.js');

var _Query2 = _interopRequireDefault(_Query);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SchoolRouter = function (_Router) {
  _inherits(SchoolRouter, _Router);

  function SchoolRouter(app) {
    _classCallCheck(this, SchoolRouter);

    var _this = _possibleConstructorReturn(this, (SchoolRouter.__proto__ || Object.getPrototypeOf(SchoolRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(SchoolRouter, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var app = this.app;
      _mongoose2.default.connect('mongodb://localhost/sitetracker');
      var db = _mongoose2.default.connection;

      app.post('/school/getStatistics', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
          var schoolId, err, statistics, _ref2, _ref3;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  schoolId = req.body.data;
                  //console.log(schoolId)

                  err = void 0, statistics = void 0;
                  _context.next = 4;
                  return _Query2.default.getStatistics(schoolId);

                case 4:
                  _ref2 = _context.sent;
                  _ref3 = _slicedToArray(_ref2, 2);
                  err = _ref3[0];
                  statistics = _ref3[1];

                  if (!err) {
                    _context.next = 10;
                    break;
                  }

                  return _context.abrupt('return', res.json({ result: 'failed' }));

                case 10:
                  return _context.abrupt('return', res.json({ result: 'success', statistics: statistics }));

                case 11:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function (_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }());

      app.post('/school/getMultiple', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
          var list, err, school, schools, i, _ref5, _ref6;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  list = req.body.data;
                  //console.log(list);

                  err = void 0, school = void 0;
                  schools = [];
                  i = 0;

                case 4:
                  if (!(i < list.length)) {
                    _context2.next = 17;
                    break;
                  }

                  _context2.next = 7;
                  return (0, _to2.default)(_School2.default.findById(list[i]));

                case 7:
                  _ref5 = _context2.sent;
                  _ref6 = _slicedToArray(_ref5, 2);
                  err = _ref6[0];
                  school = _ref6[1];

                  if (!err) {
                    _context2.next = 13;
                    break;
                  }

                  return _context2.abrupt('return', res.json({ result: 'failed' }));

                case 13:
                  schools.splice(0, 0, school);

                case 14:
                  i++;
                  _context2.next = 4;
                  break;

                case 17:
                  return _context2.abrupt('return', res.json({
                    result: 'success',
                    schools: schools
                  }));

                case 18:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x4, _x5) {
          return _ref4.apply(this, arguments);
        };
      }());

      app.post('/school/leave', function () {
        var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
          var data;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data)

                  _School2.default.leaveSchool(data, function (result, leavedSchool, updatedProfile, updatedUser) {
                    return res.json({
                      result: result,
                      leavedSchool: leavedSchool,
                      updatedProfile: updatedProfile,
                      updatedUser: updatedUser
                    });
                  });

                case 2:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2);
        }));

        return function (_x6, _x7, _x8) {
          return _ref7.apply(this, arguments);
        };
      }());

      app.post('/school/join', function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
          var data;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data)

                  _School2.default.joinSchool(data, function (result, joinedSchool, updatedProfile) {
                    return res.json({
                      result: result,
                      joinedSchool: joinedSchool,
                      updatedProfile: updatedProfile
                    });
                  });

                case 2:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this2);
        }));

        return function (_x9, _x10, _x11) {
          return _ref8.apply(this, arguments);
        };
      }());

      app.post('/school/edit', function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
          var school, err, editedSchool, _ref10, _ref11;

          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  school = req.body.data;
                  //console.log(data)

                  err = void 0, editedSchool = void 0;
                  _context5.next = 4;
                  return (0, _to2.default)(_School2.default.findOneAndUpdate({ _id: school._id }, { $set: school }, { new: true }));

                case 4:
                  _ref10 = _context5.sent;
                  _ref11 = _slicedToArray(_ref10, 2);
                  err = _ref11[0];
                  editedSchool = _ref11[1];
                  return _context5.abrupt('return', res.json({
                    result: err ? 'failed' : 'success',
                    editedSchool: editedSchool
                  }));

                case 9:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this2);
        }));

        return function (_x12, _x13, _x14) {
          return _ref9.apply(this, arguments);
        };
      }());

      app.post('/school/add', function () {
        var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
          var data;
          return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
              switch (_context6.prev = _context6.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data)

                  _School2.default.addSchool(data, function (result, newSchool) {
                    return res.json({
                      result: result,
                      newSchool: newSchool
                    });
                  });

                case 2:
                case 'end':
                  return _context6.stop();
              }
            }
          }, _callee6, _this2);
        }));

        return function (_x15, _x16, _x17) {
          return _ref12.apply(this, arguments);
        };
      }());
    }
  }]);

  return SchoolRouter;
}(_Router3.default);

exports.default = SchoolRouter;
//# sourceMappingURL=school.js.map