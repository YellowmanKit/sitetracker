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

var _Query = require('../../models/Query.js');

var _Query2 = _interopRequireDefault(_Query);

var _User = require('../../models/User.js');

var _User2 = _interopRequireDefault(_User);

var _Profile = require('../../models/Profile.js');

var _Profile2 = _interopRequireDefault(_Profile);

var _School = require('../../models/School.js');

var _School2 = _interopRequireDefault(_School);

var _Course = require('../../models/Course.js');

var _Course2 = _interopRequireDefault(_Course);

var _Subject = require('../../models/Subject.js');

var _Subject2 = _interopRequireDefault(_Subject);

var _Project = require('../../models/Project.js');

var _Project2 = _interopRequireDefault(_Project);

var _StudentProject = require('../../models/StudentProject.js');

var _StudentProject2 = _interopRequireDefault(_StudentProject);

var _Group = require('../../models/Group.js');

var _Group2 = _interopRequireDefault(_Group);

var _Card = require('../../models/Card.js');

var _Card2 = _interopRequireDefault(_Card);

var _Lang = require('../../models/Lang.js');

var _Lang2 = _interopRequireDefault(_Lang);

var _Log = require('../../models/Log.js');

var _Log2 = _interopRequireDefault(_Log);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectId = require('mongoose').Types.ObjectId;

var UserRouter = function (_Router) {
      _inherits(UserRouter, _Router);

      function UserRouter(app, mlanghku) {
            _classCallCheck(this, UserRouter);

            var _this = _possibleConstructorReturn(this, (UserRouter.__proto__ || Object.getPrototypeOf(UserRouter)).call(this, app));

            _this.app = app;
            _this.mlanghku = mlanghku;
            _this.init();
            return _this;
      }

      _createClass(UserRouter, [{
            key: 'init',
            value: function init() {
                  var _this2 = this;

                  var app = this.app;
                  var mlanghku = this.mlanghku;
                  _mongoose2.default.connect('mongodb://localhost/sitetracker');
                  var db = _mongoose2.default.connection;

                  app.post('/user/addAdmin', function () {
                        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
                              var userId, err, updatedUser, _ref2, _ref3, profiles, admins, _ref4, _ref5;

                              return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                          switch (_context.prev = _context.next) {
                                                case 0:
                                                      userId = req.body.data.userId;
                                                      //console.log(userId);

                                                      err = void 0, updatedUser = void 0;
                                                      _context.next = 4;
                                                      return (0, _to2.default)(_User2.default.findOneAndUpdate({ id: userId }, { $set: { type: 'admin' } }, { new: true }));

                                                case 4:
                                                      _ref2 = _context.sent;
                                                      _ref3 = _slicedToArray(_ref2, 2);
                                                      err = _ref3[0];
                                                      updatedUser = _ref3[1];

                                                      if (!err) {
                                                            _context.next = 11;
                                                            break;
                                                      }

                                                      console.log(err);return _context.abrupt('return', res.json({ result: 'failed' }));

                                                case 11:
                                                      profiles = [];
                                                      admins = [];
                                                      _context.next = 15;
                                                      return _User2.default.getProfilesByUsers([updatedUser]);

                                                case 15:
                                                      _ref4 = _context.sent;
                                                      _ref5 = _slicedToArray(_ref4, 3);
                                                      err = _ref5[0];
                                                      profiles = _ref5[1];
                                                      admins = _ref5[2];

                                                      if (!err) {
                                                            _context.next = 23;
                                                            break;
                                                      }

                                                      console.log(err);return _context.abrupt('return', res.json({ result: 'failed' }));

                                                case 23:
                                                      return _context.abrupt('return', res.json({
                                                            result: 'success',
                                                            updatedUser: updatedUser,
                                                            profiles: profiles,
                                                            admins: admins
                                                      }));

                                                case 24:
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

                  app.post('/user/update', function () {
                        var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
                              var data, err, existedUser, _ref7, _ref8;

                              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                    while (1) {
                                          switch (_context2.prev = _context2.next) {
                                                case 0:
                                                      data = req.body.data;
                                                      err = void 0, existedUser = void 0;
                                                      _context2.next = 4;
                                                      return (0, _to2.default)(_User2.default.findOne({ id: data.id, pw: data.pw }));

                                                case 4:
                                                      _ref7 = _context2.sent;
                                                      _ref8 = _slicedToArray(_ref7, 2);
                                                      err = _ref8[0];
                                                      existedUser = _ref8[1];

                                                      if (!err) {
                                                            _context2.next = 11;
                                                            break;
                                                      }

                                                      console.log(err);return _context2.abrupt('return', res.json({ result: 'failed' }));

                                                case 11:
                                                      if (!(existedUser && existedUser._id.toString() !== data._id)) {
                                                            _context2.next = 14;
                                                            break;
                                                      }

                                                      console.log('user id/pw already used');return _context2.abrupt('return', res.json({ result: 'failed' }));

                                                case 14:

                                                      _User2.default.findOneAndUpdate({ _id: data._id }, { $set: data }, { new: true }, function (err, updatedUser) {
                                                            return res.json({
                                                                  result: err || !updatedUser ? 'failed' : 'success',
                                                                  updatedUser: updatedUser
                                                            });
                                                      });

                                                case 15:
                                                case 'end':
                                                      return _context2.stop();
                                          }
                                    }
                              }, _callee2, _this2);
                        }));

                        return function (_x4, _x5, _x6) {
                              return _ref6.apply(this, arguments);
                        };
                  }());

                  app.get('/user/resetPassword/', function () {
                        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
                              var email;
                              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                    while (1) {
                                          switch (_context3.prev = _context3.next) {
                                                case 0:
                                                      email = req.headers.email;


                                                      _User2.default.resetPassword(email, function (result) {
                                                            return res.json({ result: result });
                                                      });

                                                case 2:
                                                case 'end':
                                                      return _context3.stop();
                                          }
                                    }
                              }, _callee3, _this2);
                        }));

                        return function (_x7, _x8, _x9) {
                              return _ref9.apply(this, arguments);
                        };
                  }());

                  app.get('/user/getNewAccountByCode/', function (req, res, next) {
                        var code = req.headers.code;
                        var codeType = req.headers.type;

                        _User2.default.acquireNewAccountByCode(code, codeType, function (result, user) {
                              console.log(result);
                              if (result === 'failed') {
                                    return res.json({ result: result });
                              }
                              return res.json({ result: result, id: user.id, pw: user.pw });
                        });
                  });

                  app.get('/user/getNewAccount/', function (req, res, next) {
                        var email = req.headers.email;

                        _User2.default.acquireNewAccount(email, function (result) {
                              return res.json({ result: result });
                        });
                  });

                  app.get('/user/login/', function () {
                        var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
                              var id, pw, err, data, user, profile, appUser, _ref11, _ref12, _ref13, _ref14, _ref15, _ref16, profiles, schools, courses, subjects, projects, studentProjects, groups, cards, langs, teacherProfiles, _ref17, _ref18, joinedSubjects, _ref19, _ref20, joinedProjects, _ref21, _ref22, joinedStudentProjects, _ref23, _ref24, joinedCards, _ref25, _ref26, joinedGroups, _ref27, _ref28, teachingCourses, _ref29, _ref30, teachingSubjects, _ref31, _ref32, teachingProjects, _ref33, _ref34, teachingStudentProjects, _ref35, _ref36, teachingCards, _ref37, _ref38, teachingGroups, _ref39, _ref40, supervisingSchools, _ref41, _ref42, adminUsers, _ref43, _ref44, admins, _ref45, _ref46, profilesId, _ref47, _ref48, langsId, _ref49, _ref50;

                              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                    while (1) {
                                          switch (_context4.prev = _context4.next) {
                                                case 0:
                                                      id = req.headers.id;
                                                      pw = req.headers.pw;

                                                      //console.log(id + ' ' + pw);

                                                      err = void 0, data = void 0, user = void 0, profile = void 0, appUser = void 0;
                                                      _context4.next = 5;
                                                      return _User2.default.getUserAndProfile(id, pw);

                                                case 5:
                                                      _ref11 = _context4.sent;
                                                      _ref12 = _slicedToArray(_ref11, 3);
                                                      err = _ref12[0];
                                                      user = _ref12[1];
                                                      profile = _ref12[2];

                                                      if (!err) {
                                                            _context4.next = 27;
                                                            break;
                                                      }

                                                      _context4.next = 13;
                                                      return mlanghku.login(id, pw);

                                                case 13:
                                                      _ref13 = _context4.sent;
                                                      _ref14 = _slicedToArray(_ref13, 2);
                                                      err = _ref14[0];
                                                      appUser = _ref14[1];

                                                      if (!err) {
                                                            _context4.next = 20;
                                                            break;
                                                      }

                                                      console.log(err);return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 20:
                                                      _context4.next = 22;
                                                      return _User2.default.aquireNewAccountByAppAccount(appUser.attributes, pw);

                                                case 22:
                                                      _ref15 = _context4.sent;
                                                      _ref16 = _slicedToArray(_ref15, 3);
                                                      err = _ref16[0];
                                                      user = _ref16[1];
                                                      profile = _ref16[2];

                                                case 27:
                                                      //console.log(user);
                                                      //console.log(profile);

                                                      _Log2.default.createLoginLog(user._id);

                                                      profiles = [profile];

                                                      profiles = [];
                                                      schools = [];
                                                      courses = [];
                                                      subjects = [];
                                                      projects = [];
                                                      studentProjects = [];
                                                      groups = [];
                                                      cards = [];
                                                      langs = [];
                                                      teacherProfiles = void 0;
                                                      _context4.next = 41;
                                                      return _Course2.default.getJoined(profile.joinedCourses);

                                                case 41:
                                                      _ref17 = _context4.sent;
                                                      _ref18 = _slicedToArray(_ref17, 3);
                                                      err = _ref18[0];
                                                      data = _ref18[1];
                                                      teacherProfiles = _ref18[2];

                                                      if (!err) {
                                                            _context4.next = 48;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 48:

                                                      courses = [].concat(_toConsumableArray(courses), _toConsumableArray(data));
                                                      profiles = [].concat(_toConsumableArray(profiles), _toConsumableArray(teacherProfiles));

                                                      _context4.next = 52;
                                                      return _Subject2.default.getByCourses(data);

                                                case 52:
                                                      _ref19 = _context4.sent;
                                                      _ref20 = _slicedToArray(_ref19, 3);
                                                      err = _ref20[0];
                                                      data = _ref20[1];
                                                      joinedSubjects = _ref20[2];

                                                      if (!err) {
                                                            _context4.next = 59;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 59:

                                                      subjects = [].concat(_toConsumableArray(subjects), _toConsumableArray(data));

                                                      _context4.next = 62;
                                                      return _Project2.default.getBySubjects(data);

                                                case 62:
                                                      _ref21 = _context4.sent;
                                                      _ref22 = _slicedToArray(_ref21, 3);
                                                      err = _ref22[0];
                                                      data = _ref22[1];
                                                      joinedProjects = _ref22[2];

                                                      if (!err) {
                                                            _context4.next = 69;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 69:

                                                      projects = [].concat(_toConsumableArray(projects), _toConsumableArray(data));

                                                      _context4.next = 72;
                                                      return _StudentProject2.default.getByProjects(data);

                                                case 72:
                                                      _ref23 = _context4.sent;
                                                      _ref24 = _slicedToArray(_ref23, 3);
                                                      err = _ref24[0];
                                                      data = _ref24[1];
                                                      joinedStudentProjects = _ref24[2];

                                                      if (!err) {
                                                            _context4.next = 79;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 79:

                                                      studentProjects = [].concat(_toConsumableArray(studentProjects), _toConsumableArray(data));

                                                      _context4.next = 82;
                                                      return _Card2.default.getByStudentProjects(data);

                                                case 82:
                                                      _ref25 = _context4.sent;
                                                      _ref26 = _slicedToArray(_ref25, 3);
                                                      err = _ref26[0];
                                                      data = _ref26[1];
                                                      joinedCards = _ref26[2];

                                                      if (!err) {
                                                            _context4.next = 89;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 89:

                                                      cards = [].concat(_toConsumableArray(cards), _toConsumableArray(data));

                                                      _context4.next = 92;
                                                      return _Group2.default.getByUserAndProjects(user._id, joinedProjects);

                                                case 92:
                                                      _ref27 = _context4.sent;
                                                      _ref28 = _slicedToArray(_ref27, 3);
                                                      err = _ref28[0];
                                                      data = _ref28[1];
                                                      joinedGroups = _ref28[2];

                                                      if (!err) {
                                                            _context4.next = 99;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 99:

                                                      groups = [].concat(_toConsumableArray(groups), _toConsumableArray(data));

                                                      _context4.next = 102;
                                                      return _Course2.default.getTeaching(user._id);

                                                case 102:
                                                      _ref29 = _context4.sent;
                                                      _ref30 = _slicedToArray(_ref29, 3);
                                                      err = _ref30[0];
                                                      data = _ref30[1];
                                                      teachingCourses = _ref30[2];

                                                      if (!err) {
                                                            _context4.next = 109;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 109:

                                                      courses = [].concat(_toConsumableArray(courses), _toConsumableArray(data));

                                                      _context4.next = 112;
                                                      return _Subject2.default.getByCourses(data.slice(0).reverse());

                                                case 112:
                                                      _ref31 = _context4.sent;
                                                      _ref32 = _slicedToArray(_ref31, 3);
                                                      err = _ref32[0];
                                                      data = _ref32[1];
                                                      teachingSubjects = _ref32[2];

                                                      if (!err) {
                                                            _context4.next = 119;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 119:

                                                      subjects = [].concat(_toConsumableArray(subjects), _toConsumableArray(data));

                                                      _context4.next = 122;
                                                      return _Project2.default.getBySubjects(data);

                                                case 122:
                                                      _ref33 = _context4.sent;
                                                      _ref34 = _slicedToArray(_ref33, 3);
                                                      err = _ref34[0];
                                                      data = _ref34[1];
                                                      teachingProjects = _ref34[2];

                                                      if (!err) {
                                                            _context4.next = 129;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 129:

                                                      projects = [].concat(_toConsumableArray(projects), _toConsumableArray(data));

                                                      _context4.next = 132;
                                                      return _StudentProject2.default.getByProjects(data);

                                                case 132:
                                                      _ref35 = _context4.sent;
                                                      _ref36 = _slicedToArray(_ref35, 3);
                                                      err = _ref36[0];
                                                      data = _ref36[1];
                                                      teachingStudentProjects = _ref36[2];

                                                      if (!err) {
                                                            _context4.next = 139;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 139:

                                                      studentProjects = [].concat(_toConsumableArray(studentProjects), _toConsumableArray(data));

                                                      _context4.next = 142;
                                                      return _Card2.default.getByStudentProjects(data);

                                                case 142:
                                                      _ref37 = _context4.sent;
                                                      _ref38 = _slicedToArray(_ref37, 3);
                                                      err = _ref38[0];
                                                      data = _ref38[1];
                                                      teachingCards = _ref38[2];

                                                      if (!err) {
                                                            _context4.next = 149;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 149:

                                                      cards = [].concat(_toConsumableArray(cards), _toConsumableArray(data));

                                                      _context4.next = 152;
                                                      return _Group2.default.getByProjects(teachingProjects);

                                                case 152:
                                                      _ref39 = _context4.sent;
                                                      _ref40 = _slicedToArray(_ref39, 3);
                                                      err = _ref40[0];
                                                      data = _ref40[1];
                                                      teachingGroups = _ref40[2];

                                                      if (!err) {
                                                            _context4.next = 159;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 159:

                                                      groups = [].concat(_toConsumableArray(groups), _toConsumableArray(data));

                                                      _context4.next = 162;
                                                      return _School2.default.getByUser(user._id, profile);

                                                case 162:
                                                      _ref41 = _context4.sent;
                                                      _ref42 = _slicedToArray(_ref41, 3);
                                                      err = _ref42[0];
                                                      data = _ref42[1];
                                                      supervisingSchools = _ref42[2];

                                                      if (!err) {
                                                            _context4.next = 169;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 169:

                                                      schools = [].concat(_toConsumableArray(schools), _toConsumableArray(data));

                                                      _context4.next = 172;
                                                      return _User2.default.getByType('admin');

                                                case 172:
                                                      _ref43 = _context4.sent;
                                                      _ref44 = _slicedToArray(_ref43, 3);
                                                      err = _ref44[0];
                                                      data = _ref44[1];
                                                      adminUsers = _ref44[2];
                                                      admins = [];
                                                      _context4.next = 180;
                                                      return _User2.default.getProfilesByUsers(data);

                                                case 180:
                                                      _ref45 = _context4.sent;
                                                      _ref46 = _slicedToArray(_ref45, 3);
                                                      err = _ref46[0];
                                                      data = _ref46[1];
                                                      admins = _ref46[2];

                                                      if (!err) {
                                                            _context4.next = 187;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 187:

                                                      profiles = [].concat(_toConsumableArray(profiles), _toConsumableArray(data));

                                                      _context4.next = 190;
                                                      return _Profile2.default.getByStudentProjects(studentProjects);

                                                case 190:
                                                      _ref47 = _context4.sent;
                                                      _ref48 = _slicedToArray(_ref47, 3);
                                                      err = _ref48[0];
                                                      data = _ref48[1];
                                                      profilesId = _ref48[2];

                                                      if (!err) {
                                                            _context4.next = 197;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 197:

                                                      profiles = [].concat(_toConsumableArray(profiles), _toConsumableArray(data));

                                                      _context4.next = 200;
                                                      return _Lang2.default.getByCards(cards);

                                                case 200:
                                                      _ref49 = _context4.sent;
                                                      _ref50 = _slicedToArray(_ref49, 3);
                                                      err = _ref50[0];
                                                      data = _ref50[1];
                                                      langsId = _ref50[2];

                                                      if (!err) {
                                                            _context4.next = 207;
                                                            break;
                                                      }

                                                      return _context4.abrupt('return', res.json({ result: "failed" }));

                                                case 207:

                                                      langs = [].concat(_toConsumableArray(langs), _toConsumableArray(data));

                                                      return _context4.abrupt('return', res.json({
                                                            result: "success",
                                                            user: user,
                                                            profile: profile,
                                                            profiles: profiles,

                                                            admins: admins,
                                                            supervisingSchools: supervisingSchools,

                                                            teachingCourses: teachingCourses,
                                                            joinedCourses: profile.joinedCourses,

                                                            teachingSubjects: teachingSubjects,
                                                            joinedSubjects: joinedSubjects,

                                                            teachingProjects: teachingProjects,
                                                            joinedProjects: joinedProjects,

                                                            teachingStudentProjects: teachingStudentProjects,
                                                            joinedStudentProjects: joinedStudentProjects,

                                                            teachingCards: teachingCards,
                                                            joinedCards: joinedCards,

                                                            schools: schools,
                                                            courses: courses,
                                                            subjects: subjects,
                                                            projects: projects,
                                                            studentProjects: studentProjects,
                                                            groups: groups,
                                                            cards: cards,
                                                            langs: langs
                                                      }));

                                                case 209:
                                                case 'end':
                                                      return _context4.stop();
                                          }
                                    }
                              }, _callee4, _this2);
                        }));

                        return function (_x10, _x11, _x12) {
                              return _ref10.apply(this, arguments);
                        };
                  }());
            }
      }]);

      return UserRouter;
}(_Router3.default);

exports.default = UserRouter;
//# sourceMappingURL=user.js.map