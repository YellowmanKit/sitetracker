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

var _Course = require('../../models/Course.js');

var _Course2 = _interopRequireDefault(_Course);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CourseRouter = function (_Router) {
  _inherits(CourseRouter, _Router);

  function CourseRouter(app) {
    _classCallCheck(this, CourseRouter);

    var _this = _possibleConstructorReturn(this, (CourseRouter.__proto__ || Object.getPrototypeOf(CourseRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(CourseRouter, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var app = this.app;
      _mongoose2.default.connect('mongodb://localhost/sitetracker');
      var db = _mongoose2.default.connection;

      app.post('/course/getAllOfTeacher', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
          var profile, err, course, subject, project, studentProject, courses, teachingCourses, _ref2, _ref3, i;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  profile = req.body.data;
                  //console.log(data)

                  err = void 0, course = void 0, subject = void 0, project = void 0, studentProject = void 0;
                  courses = [];
                  teachingCourses = [];
                  _context.next = 6;
                  return (0, _to2.default)(_Course2.default.find({ teacher: profile.belongTo }, null, { sort: { createdAt: 'descending' } }));

                case 6:
                  _ref2 = _context.sent;
                  _ref3 = _slicedToArray(_ref2, 2);
                  err = _ref3[0];
                  courses = _ref3[1];

                  if (!(err || courses === null)) {
                    _context.next = 13;
                    break;
                  }

                  console.log('failed to getcourses');return _context.abrupt('return', res.json({ result: 'failed' }));

                case 13:
                  //console.log(courses);
                  for (i = 0; i < courses.length; i++) {
                    teachingCourses.push(courses[i]._id);
                  }
                  profile['teachingCourses'] = teachingCourses;

                  return _context.abrupt('return', res.json({
                    result: 'success',
                    courses: courses,
                    profile: profile
                  }));

                case 16:
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

      app.post('/course/leave', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
          var data;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data)

                  _Course2.default.leaveCourse(data, function (result, leavedCourse, updatedProfile) {
                    return res.json({
                      result: result,
                      leavedCourse: leavedCourse,
                      updatedProfile: updatedProfile
                    });
                  });

                case 2:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x4, _x5, _x6) {
          return _ref4.apply(this, arguments);
        };
      }());

      app.post('/course/join', function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
          var data;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data)

                  _Course2.default.joinCourse(data, function (result, joinedCourse, updatedProfile) {
                    return res.json({
                      result: result,
                      joinedCourse: joinedCourse,
                      updatedProfile: updatedProfile
                    });
                  });

                case 2:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2);
        }));

        return function (_x7, _x8, _x9) {
          return _ref5.apply(this, arguments);
        };
      }());

      app.post('/course/edit', function () {
        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
          var course, err, editedCourse, _ref7, _ref8;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  course = req.body.data;
                  //console.log(data)

                  err = void 0, editedCourse = void 0;
                  _context4.next = 4;
                  return (0, _to2.default)(_Course2.default.findOneAndUpdate({ _id: course._id }, { $set: {
                      icon: course.icon,
                      title: course.title,
                      endDate: course.endDate
                    } }, { new: true }));

                case 4:
                  _ref7 = _context4.sent;
                  _ref8 = _slicedToArray(_ref7, 2);
                  err = _ref8[0];
                  editedCourse = _ref8[1];
                  return _context4.abrupt('return', res.json({
                    result: err ? 'failed' : 'success',
                    editedCourse: editedCourse
                  }));

                case 9:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this2);
        }));

        return function (_x10, _x11, _x12) {
          return _ref6.apply(this, arguments);
        };
      }());

      app.post('/course/add', function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
          var data;
          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data)

                  _Course2.default.addCourse(data, function (result, newCourse) {
                    return res.json({
                      result: result,
                      newCourse: newCourse
                    });
                  });

                case 2:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this2);
        }));

        return function (_x13, _x14, _x15) {
          return _ref9.apply(this, arguments);
        };
      }());
    }
  }]);

  return CourseRouter;
}(_Router3.default);

exports.default = CourseRouter;
//# sourceMappingURL=course.js.map