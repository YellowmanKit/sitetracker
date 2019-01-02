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

var _StudentProject = require('../../models/StudentProject.js');

var _StudentProject2 = _interopRequireDefault(_StudentProject);

var _Project = require('../../models/Project.js');

var _Project2 = _interopRequireDefault(_Project);

var _Profile = require('../../models/Profile.js');

var _Profile2 = _interopRequireDefault(_Profile);

var _Card = require('../../models/Card.js');

var _Card2 = _interopRequireDefault(_Card);

var _Lang = require('../../models/Lang.js');

var _Lang2 = _interopRequireDefault(_Lang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectId = require('mongoose').Types.ObjectId;

var StudentProjectRouter = function (_Router) {
  _inherits(StudentProjectRouter, _Router);

  function StudentProjectRouter(app) {
    _classCallCheck(this, StudentProjectRouter);

    var _this = _possibleConstructorReturn(this, (StudentProjectRouter.__proto__ || Object.getPrototypeOf(StudentProjectRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(StudentProjectRouter, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var app = this.app;
      _mongoose2.default.connect('mongodb://localhost/sitetracker');
      var db = _mongoose2.default.connection;

      app.post('/studentProject/update', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
          var data, err, studentProject, _ref2, _ref3;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data);

                  err = void 0, studentProject = void 0;
                  _context.next = 4;
                  return (0, _to2.default)(_StudentProject2.default.findOneAndUpdate({ _id: data._id }, { $set: data }, { new: true }));

                case 4:
                  _ref2 = _context.sent;
                  _ref3 = _slicedToArray(_ref2, 2);
                  err = _ref3[0];
                  studentProject = _ref3[1];

                  if (!(err || studentProject === null)) {
                    _context.next = 10;
                    break;
                  }

                  return _context.abrupt('return', res.json({ result: 'failed' }));

                case 10:
                  return _context.abrupt('return', res.json({
                    result: 'success',
                    updatedStudentProject: studentProject
                  }));

                case 11:
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

      app.post('/studentProject/getMultiple', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
          var list, err, studentProject, profile, card, lang, _studentProjects, _studentProfiles, _cards, _langs, i, _ref5, _ref6, _ref7, _ref8, cardsId, j, _ref9, _ref10, langsId, k, _ref11, _ref12;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  list = req.body.data;
                  //console.log(list);

                  err = void 0, studentProject = void 0, profile = void 0, card = void 0, lang = void 0;
                  _studentProjects = [];
                  _studentProfiles = [];
                  _cards = [];
                  _langs = [];
                  i = 0;

                case 7:
                  if (!(i < list.length)) {
                    _context2.next = 59;
                    break;
                  }

                  _context2.next = 10;
                  return (0, _to2.default)(_StudentProject2.default.findById(list[i]));

                case 10:
                  _ref5 = _context2.sent;
                  _ref6 = _slicedToArray(_ref5, 2);
                  err = _ref6[0];
                  studentProject = _ref6[1];

                  if (!err) {
                    _context2.next = 16;
                    break;
                  }

                  return _context2.abrupt('return', res.json({ result: 'failed' }));

                case 16:
                  _studentProjects.splice(0, 0, studentProject);

                  _context2.next = 19;
                  return (0, _to2.default)(_Profile2.default.findOne({ belongTo: studentProject.student }));

                case 19:
                  _ref7 = _context2.sent;
                  _ref8 = _slicedToArray(_ref7, 2);
                  err = _ref8[0];
                  profile = _ref8[1];

                  if (!(err || profile === null)) {
                    _context2.next = 25;
                    break;
                  }

                  return _context2.abrupt('return', res.json({ result: 'failed' }));

                case 25:
                  _studentProfiles.splice(0, 0, profile);

                  cardsId = studentProject.cards;
                  j = 0;

                case 28:
                  if (!(j < cardsId.length)) {
                    _context2.next = 56;
                    break;
                  }

                  _context2.next = 31;
                  return (0, _to2.default)(_Card2.default.findById(cardsId[j]));

                case 31:
                  _ref9 = _context2.sent;
                  _ref10 = _slicedToArray(_ref9, 2);
                  err = _ref10[0];
                  card = _ref10[1];

                  if (!(err || card === null)) {
                    _context2.next = 37;
                    break;
                  }

                  return _context2.abrupt('return', res.json({ result: 'failed' }));

                case 37:
                  _cards.splice(0, 0, card);

                  langsId = card.langs;
                  k = 0;

                case 40:
                  if (!(k < langsId.length)) {
                    _context2.next = 53;
                    break;
                  }

                  _context2.next = 43;
                  return (0, _to2.default)(_Lang2.default.findById(langsId[k]));

                case 43:
                  _ref11 = _context2.sent;
                  _ref12 = _slicedToArray(_ref11, 2);
                  err = _ref12[0];
                  lang = _ref12[1];

                  if (!(err || lang === null)) {
                    _context2.next = 49;
                    break;
                  }

                  return _context2.abrupt('return', res.json({ result: 'failed' }));

                case 49:
                  _langs.splice(0, 0, lang);

                case 50:
                  k++;
                  _context2.next = 40;
                  break;

                case 53:
                  j++;
                  _context2.next = 28;
                  break;

                case 56:
                  i++;
                  _context2.next = 7;
                  break;

                case 59:
                  return _context2.abrupt('return', res.json({
                    result: 'success',
                    studentProjects: _studentProjects,
                    profiles: _studentProfiles,
                    cards: _cards,
                    langs: _langs
                  }));

                case 60:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x3, _x4) {
          return _ref4.apply(this, arguments);
        };
      }());

      app.get('/studentProject/get/', function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
          var studentId, projectId, err, _studentProject, _project, _ref14, _ref15, _ref16, _ref17, _ref18, _ref19;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  studentId = req.headers.student;
                  projectId = req.headers.project;
                  //console.log(studentId)
                  //console.log(projectId)

                  err = void 0, _studentProject = void 0, _project = void 0;
                  _context3.next = 5;
                  return (0, _to2.default)(_StudentProject2.default.findOneAndUpdate({ student: studentId, project: projectId }, {}, { upsert: true, new: true }));

                case 5:
                  _ref14 = _context3.sent;
                  _ref15 = _slicedToArray(_ref14, 2);
                  err = _ref15[0];
                  _studentProject = _ref15[1];

                  if (!(err || _studentProject === null)) {
                    _context3.next = 11;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: "failed" }));

                case 11:
                  _context3.next = 13;
                  return (0, _to2.default)(_Project2.default.findById(projectId));

                case 13:
                  _ref16 = _context3.sent;
                  _ref17 = _slicedToArray(_ref16, 2);
                  err = _ref17[0];
                  _project = _ref17[1];

                  if (!(err || _project === null)) {
                    _context3.next = 19;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: "failed" }));

                case 19:
                  if (_project.studentProjects.some(function (sp) {
                    return sp.equals(_studentProject._id);
                  })) {
                    _context3.next = 28;
                    break;
                  }

                  _context3.next = 22;
                  return (0, _to2.default)(_Project2.default.findOneAndUpdate({ _id: projectId }, { $push: {
                      studentProjects: _studentProject._id
                    } }, { new: true }));

                case 22:
                  _ref18 = _context3.sent;
                  _ref19 = _slicedToArray(_ref18, 2);
                  err = _ref19[0];
                  _project = _ref19[1];

                  if (!(err || _project === null)) {
                    _context3.next = 28;
                    break;
                  }

                  return _context3.abrupt('return', res.json({ result: "failed" }));

                case 28:
                  return _context3.abrupt('return', res.json({
                    result: 'success',
                    updatedProject: _project,
                    studentProject: _studentProject
                  }));

                case 29:
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
    }
  }]);

  return StudentProjectRouter;
}(_Router3.default);

exports.default = StudentProjectRouter;
//# sourceMappingURL=studentProject.js.map