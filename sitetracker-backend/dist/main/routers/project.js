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

var _Profile = require('../../models/Profile.js');

var _Profile2 = _interopRequireDefault(_Profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProjectRouter = function (_Router) {
  _inherits(ProjectRouter, _Router);

  function ProjectRouter(app) {
    _classCallCheck(this, ProjectRouter);

    var _this = _possibleConstructorReturn(this, (ProjectRouter.__proto__ || Object.getPrototypeOf(ProjectRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(ProjectRouter, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var app = this.app;
      _mongoose2.default.connect('mongodb://localhost/sitetracker');
      var db = _mongoose2.default.connection;

      app.post('/project/getRanking', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
          var projectId, err, project, studentProjects, card, profile, profiles, rankings, _ref2, _ref3, i, student, cards, total, featured, j, _ref4, _ref5, _ref6, _ref7;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  projectId = req.body.data;

                  console.log(projectId);
                  err = void 0, project = void 0, studentProjects = void 0, card = void 0, profile = void 0;
                  profiles = [];
                  rankings = [];
                  _context.next = 7;
                  return (0, _to2.default)(_StudentProject2.default.find({ project: projectId }));

                case 7:
                  _ref2 = _context.sent;
                  _ref3 = _slicedToArray(_ref2, 2);
                  err = _ref3[0];
                  studentProjects = _ref3[1];

                  if (!(err || !studentProjects)) {
                    _context.next = 13;
                    break;
                  }

                  return _context.abrupt('return', res.json({ result: 'failed' }));

                case 13:
                  i = 0;

                case 14:
                  if (!(i < studentProjects.length)) {
                    _context.next = 48;
                    break;
                  }

                  student = studentProjects[i].student;
                  cards = studentProjects[i].cards;
                  total = 0;
                  featured = 0;
                  j = 0;

                case 20:
                  if (!(j < cards.length)) {
                    _context.next = 35;
                    break;
                  }

                  _context.next = 23;
                  return (0, _to2.default)(_Card2.default.findById(cards[j]._id));

                case 23:
                  _ref4 = _context.sent;
                  _ref5 = _slicedToArray(_ref4, 2);
                  err = _ref5[0];
                  card = _ref5[1];

                  if (!(err || !card)) {
                    _context.next = 29;
                    break;
                  }

                  return _context.abrupt('return', res.json({ result: 'failed' }));

                case 29:
                  total += card.grade === 'passed' ? 1 : 0;
                  total += card.grade === 'featured' ? 1 : 0;
                  featured += card.grade === 'featured' ? 1 : 0;

                case 32:
                  j++;
                  _context.next = 20;
                  break;

                case 35:
                  _context.next = 37;
                  return (0, _to2.default)(_Profile2.default.findOne({ belongTo: student }));

                case 37:
                  _ref6 = _context.sent;
                  _ref7 = _slicedToArray(_ref6, 2);
                  err = _ref7[0];
                  profile = _ref7[1];

                  if (!(err || !profile)) {
                    _context.next = 43;
                    break;
                  }

                  return _context.abrupt('return', res.json({ result: 'failed' }));

                case 43:

                  profiles.push(profile);

                  rankings.push({
                    student: student,
                    total: total,
                    featured: featured,
                    score: total + featured * 2
                  });

                case 45:
                  i++;
                  _context.next = 14;
                  break;

                case 48:

                  rankings.sort(function (a, b) {
                    return b.score - a.score;
                  });

                  //console.log(rankings);

                  return _context.abrupt('return', res.json({
                    result: 'success',
                    ranking: rankings,
                    profiles: profiles
                  }));

                case 50:
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

      app.post('/project/getMultiple', function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
          var list, err, project, _projects, i, _ref9, _ref10;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  list = req.body.data;
                  //console.log(list);

                  err = void 0, project = void 0;
                  _projects = [];
                  i = 0;

                case 4:
                  if (!(i < list.length)) {
                    _context2.next = 17;
                    break;
                  }

                  _context2.next = 7;
                  return (0, _to2.default)(_Project2.default.findById(list[i]));

                case 7:
                  _ref9 = _context2.sent;
                  _ref10 = _slicedToArray(_ref9, 2);
                  err = _ref10[0];
                  project = _ref10[1];

                  if (!err) {
                    _context2.next = 13;
                    break;
                  }

                  return _context2.abrupt('return', res.json({ result: 'failed' }));

                case 13:
                  _projects.splice(0, 0, project);

                case 14:
                  i++;
                  _context2.next = 4;
                  break;

                case 17:
                  return _context2.abrupt('return', res.json({
                    result: 'success',
                    projects: _projects
                  }));

                case 18:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x3, _x4) {
          return _ref8.apply(this, arguments);
        };
      }());

      app.post('/project/edit', function () {
        var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
          var project, err, editedProject, _ref12, _ref13;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  project = req.body.data;
                  //console.log(data)

                  err = void 0, editedProject = void 0;
                  _context3.next = 4;
                  return (0, _to2.default)(_Project2.default.findOneAndUpdate({ _id: project._id }, { $set: project }, { new: true }));

                case 4:
                  _ref12 = _context3.sent;
                  _ref13 = _slicedToArray(_ref12, 2);
                  err = _ref13[0];
                  editedProject = _ref13[1];
                  return _context3.abrupt('return', res.json({
                    result: err ? 'failed' : 'success',
                    editedProject: editedProject
                  }));

                case 9:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2);
        }));

        return function (_x5, _x6, _x7) {
          return _ref11.apply(this, arguments);
        };
      }());

      app.post('/project/add', function () {
        var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
          var project, err, newProject, updatedSubject, _ref15, _ref16, _ref17, _ref18;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  project = req.body.data;

                  console.log(project);
                  err = void 0, newProject = void 0, updatedSubject = void 0;
                  _context4.next = 5;
                  return (0, _to2.default)(_Project2.default.create(project));

                case 5:
                  _ref15 = _context4.sent;
                  _ref16 = _slicedToArray(_ref15, 2);
                  err = _ref16[0];
                  newProject = _ref16[1];

                  if (!err) {
                    _context4.next = 11;
                    break;
                  }

                  return _context4.abrupt('return', res.json({ result: 'failed' }));

                case 11:
                  _context4.next = 13;
                  return (0, _to2.default)(_Subject2.default.findOneAndUpdate({ _id: project.subject }, { $push: {
                      projects: newProject._id
                    } }, { new: true }));

                case 13:
                  _ref17 = _context4.sent;
                  _ref18 = _slicedToArray(_ref17, 2);
                  err = _ref18[0];
                  updatedSubject = _ref18[1];

                  if (err || updatedSubject === null) {
                    cb('failed');
                  };

                  //Log.create({ user: data.userId, type: 'addProject' });

                  return _context4.abrupt('return', res.json({
                    result: 'success',
                    newProject: newProject,
                    updatedSubject: updatedSubject
                  }));

                case 20:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this2);
        }));

        return function (_x8, _x9) {
          return _ref14.apply(this, arguments);
        };
      }());
    }
  }]);

  return ProjectRouter;
}(_Router3.default);

exports.default = ProjectRouter;
//# sourceMappingURL=project.js.map