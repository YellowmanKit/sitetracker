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

var _Project = require('../../models/Project.js');

var _Project2 = _interopRequireDefault(_Project);

var _Subject = require('../../models/Subject.js');

var _Subject2 = _interopRequireDefault(_Subject);

var _StudentProject = require('../../models/StudentProject.js');

var _StudentProject2 = _interopRequireDefault(_StudentProject);

var _Card = require('../../models/Card.js');

var _Card2 = _interopRequireDefault(_Card);

var _Log = require('../../models/Log.js');

var _Log2 = _interopRequireDefault(_Log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SubjectRouter = function (_Router) {
  _inherits(SubjectRouter, _Router);

  function SubjectRouter(app) {
    _classCallCheck(this, SubjectRouter);

    var _this = _possibleConstructorReturn(this, (SubjectRouter.__proto__ || Object.getPrototypeOf(SubjectRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(SubjectRouter, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var app = this.app;
      _mongoose2.default.connect('mongodb://localhost/sitetracker');
      var db = _mongoose2.default.connection;

      app.post('/subject/getAllOfUser', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
          var profile, err, studentProjects, project, subject, card, projects, subjects, _ref2, _ref3, studentProjectsList, subjectsList, i, cards, skip, j, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9, updatedProfile;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  profile = req.body.data;
                  //console.log(profile);

                  err = void 0, studentProjects = void 0, project = void 0, subject = void 0, card = void 0;
                  projects = [];
                  subjects = [];
                  _context.next = 6;
                  return (0, _to2.default)(_StudentProject2.default.find({ student: profile.belongTo }));

                case 6:
                  _ref2 = _context.sent;
                  _ref3 = _slicedToArray(_ref2, 2);
                  err = _ref3[0];
                  studentProjects = _ref3[1];

                  if (!(err || studentProjects === null)) {
                    _context.next = 13;
                    break;
                  }

                  console.log('failed to get student project');return _context.abrupt('return', res.json({ result: 'failed' }));

                case 13:
                  //console.log(studentProjects);
                  studentProjectsList = [];
                  subjectsList = [];
                  i = 0;

                case 16:
                  if (!(i < studentProjects.length)) {
                    _context.next = 64;
                    break;
                  }

                  cards = studentProjects[i].cards;

                  if (!(cards.length === 0)) {
                    _context.next = 20;
                    break;
                  }

                  return _context.abrupt('continue', 61);

                case 20:
                  skip = false;
                  j = 0;

                case 22:
                  if (!(j < cards.length)) {
                    _context.next = 37;
                    break;
                  }

                  _context.next = 25;
                  return (0, _to2.default)(_Card2.default.findById(cards[j]._id));

                case 25:
                  _ref4 = _context.sent;
                  _ref5 = _slicedToArray(_ref4, 2);
                  err = _ref5[0];
                  card = _ref5[1];

                  if (!(err || !card)) {
                    _context.next = 31;
                    break;
                  }

                  return _context.abrupt('continue', 34);

                case 31:
                  if (!(card.grade === 'featured')) {
                    _context.next = 33;
                    break;
                  }

                  return _context.abrupt('break', 37);

                case 33:
                  if (j === cards.length - 1) {
                    skip = true;
                  }

                case 34:
                  j++;
                  _context.next = 22;
                  break;

                case 37:
                  if (!skip) {
                    _context.next = 39;
                    break;
                  }

                  return _context.abrupt('continue', 61);

                case 39:

                  studentProjectsList.push(studentProjects[i]._id);

                  _context.next = 42;
                  return (0, _to2.default)(_Project2.default.findById(studentProjects[i].project));

                case 42:
                  _ref6 = _context.sent;
                  _ref7 = _slicedToArray(_ref6, 2);
                  err = _ref7[0];
                  project = _ref7[1];

                  if (!(err || project === null)) {
                    _context.next = 49;
                    break;
                  }

                  console.log('failed to get project');return _context.abrupt('return', res.json({ result: 'failed' }));

                case 49:
                  projects.push(project);

                  _context.next = 52;
                  return (0, _to2.default)(_Subject2.default.findById(project.subject));

                case 52:
                  _ref8 = _context.sent;
                  _ref9 = _slicedToArray(_ref8, 2);
                  err = _ref9[0];
                  subject = _ref9[1];

                  if (!(err || subject === null)) {
                    _context.next = 59;
                    break;
                  }

                  console.log('failed to get subject');
                  return _context.abrupt('continue', 61);

                case 59:
                  subjects.push(subject);
                  if (!(subjectsList.indexOf('' + subject._id) > -1)) {
                    subjectsList.push('' + subject._id);
                  }

                case 61:
                  i++;
                  _context.next = 16;
                  break;

                case 64:
                  updatedProfile = profile;

                  updatedProfile.subjects = subjectsList;
                  updatedProfile.studentProjects = studentProjectsList;

                  return _context.abrupt('return', res.json({
                    result: 'success',
                    subjects: subjects,
                    projects: projects,
                    studentProjects: studentProjects,
                    profile: updatedProfile
                  }));

                case 68:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function (_x, _x2) {
          return _ref.apply(this, arguments);
        };
      }());

      app.post('/subject/getMultiple', function () {
        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
          var list, err, subject, subjects, i, _ref11, _ref12;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  list = req.body.data;
                  //console.log(list);

                  err = void 0, subject = void 0;
                  subjects = [];
                  i = 0;

                case 4:
                  if (!(i < list.length)) {
                    _context2.next = 17;
                    break;
                  }

                  _context2.next = 7;
                  return (0, _to2.default)(_Subject2.default.findById(list[i]));

                case 7:
                  _ref11 = _context2.sent;
                  _ref12 = _slicedToArray(_ref11, 2);
                  err = _ref12[0];
                  subject = _ref12[1];

                  if (!err) {
                    _context2.next = 13;
                    break;
                  }

                  return _context2.abrupt('return', res.json({ result: 'failed' }));

                case 13:
                  subjects.splice(0, 0, subject);

                case 14:
                  i++;
                  _context2.next = 4;
                  break;

                case 17:
                  return _context2.abrupt('return', res.json({
                    result: 'success',
                    subjects: subjects
                  }));

                case 18:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x3, _x4) {
          return _ref10.apply(this, arguments);
        };
      }());

      app.post('/subject/edit', function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
          var subject, err, editedSubject, _ref14, _ref15;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  subject = req.body.data;
                  //console.log(data)

                  err = void 0, editedSubject = void 0;
                  _context3.next = 4;
                  return (0, _to2.default)(_Subject2.default.findOneAndUpdate({ _id: subject._id }, { $set: subject }, { new: true }));

                case 4:
                  _ref14 = _context3.sent;
                  _ref15 = _slicedToArray(_ref14, 2);
                  err = _ref15[0];
                  editedSubject = _ref15[1];
                  return _context3.abrupt('return', res.json({
                    result: err ? 'failed' : 'success',
                    editedSubject: editedSubject
                  }));

                case 9:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2);
        }));

        return function (_x5, _x6, _x7) {
          return _ref13.apply(this, arguments);
        };
      }());

      app.post('/subject/add', function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
          var subject, err, newSubject, updatedCourse, _ref17, _ref18, _ref19, _ref20;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  subject = req.body.data.subject;
                  //console.log(subject);

                  err = void 0, newSubject = void 0, updatedCourse = void 0;
                  _context4.next = 4;
                  return (0, _to2.default)(_Subject2.default.create(subject));

                case 4:
                  _ref17 = _context4.sent;
                  _ref18 = _slicedToArray(_ref17, 2);
                  err = _ref18[0];
                  newSubject = _ref18[1];

                  if (!err) {
                    _context4.next = 10;
                    break;
                  }

                  return _context4.abrupt('return', res.json({ result: 'failed' }));

                case 10:
                  _context4.next = 12;
                  return (0, _to2.default)(_Course2.default.findOneAndUpdate({ _id: subject.course }, { $push: {
                      subjects: newSubject._id
                    } }, { new: true }));

                case 12:
                  _ref19 = _context4.sent;
                  _ref20 = _slicedToArray(_ref19, 2);
                  err = _ref20[0];
                  updatedCourse = _ref20[1];

                  if (err || updatedCourse === null) {
                    cb('failed');
                  };

                  //Log.create({ user: data.userId, type: 'addSubject' });

                  return _context4.abrupt('return', res.json({
                    result: 'success',
                    newSubject: newSubject,
                    updatedCourse: updatedCourse
                  }));

                case 19:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this2);
        }));

        return function (_x8, _x9) {
          return _ref16.apply(this, arguments);
        };
      }());
    }
  }]);

  return SubjectRouter;
}(_Router3.default);

exports.default = SubjectRouter;
//# sourceMappingURL=subject.js.map