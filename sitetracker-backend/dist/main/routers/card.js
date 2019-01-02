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

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _to = require('../../to');

var _to2 = _interopRequireDefault(_to);

var _Card = require('../../models/Card.js');

var _Card2 = _interopRequireDefault(_Card);

var _Lang = require('../../models/Lang.js');

var _Lang2 = _interopRequireDefault(_Lang);

var _Project = require('../../models/Project.js');

var _Project2 = _interopRequireDefault(_Project);

var _StudentProject = require('../../models/StudentProject.js');

var _StudentProject2 = _interopRequireDefault(_StudentProject);

var _Profile = require('../../models/Profile.js');

var _Profile2 = _interopRequireDefault(_Profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectId = require('mongoose').Types.ObjectId;
//import multer from 'multer';

var CardRouter = function (_Router) {
  _inherits(CardRouter, _Router);

  function CardRouter(app) {
    _classCallCheck(this, CardRouter);

    var _this = _possibleConstructorReturn(this, (CardRouter.__proto__ || Object.getPrototypeOf(CardRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(CardRouter, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var app = this.app;
      var upload = app.get('upload');
      //const config = app.get('config');
      //var upload = multer({ storage: config }).single('avatar')

      var temp = app.get('temp');
      var storage = app.get('storage');
      _mongoose2.default.connect('mongodb://localhost/sitetracker');
      var db = _mongoose2.default.connection;

      app.post('/card/studentRead', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
          var cardId, err, card, _ref2, _ref3;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  cardId = req.body.data.cardId;
                  err = void 0, card = void 0;
                  _context.next = 4;
                  return (0, _to2.default)(_Card2.default.findOneAndUpdate({ _id: cardId }, { $set: {
                      studentRead: true
                    } }, { new: true }));

                case 4:
                  _ref2 = _context.sent;
                  _ref3 = _slicedToArray(_ref2, 2);
                  err = _ref3[0];
                  card = _ref3[1];

                  if (!(err || card === null)) {
                    _context.next = 11;
                    break;
                  }

                  console.log('failed to update card');return _context.abrupt('return', res.json({ result: 'failed to update card' }));

                case 11:
                  return _context.abrupt('return', res.json({
                    result: 'success',
                    updatedCard: card
                  }));

                case 12:
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

      app.post('/card/edit', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
          var cardToUpdate, langs, err, lang, card, langsId, i, _ref5, _ref6, _ref7, _ref8;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  cardToUpdate = req.body.data.card;
                  langs = req.body.data.langs;
                  //console.log(cardToUpdate);
                  //console.log(langs);

                  err = void 0, lang = void 0, card = void 0;
                  langsId = [];
                  i = 0;

                case 5:
                  if (!(i < langs.length)) {
                    _context2.next = 20;
                    break;
                  }

                  _context2.next = 8;
                  return (0, _to2.default)(_Lang2.default.findOneAndUpdate({ _id: langs[i]._id }, { $set: {
                      key: langs[i].key,
                      text: langs[i].text,
                      audio: langs[i].audio,
                      card: cardToUpdate._id
                    } }, { new: true, upsert: true }));

                case 8:
                  _ref5 = _context2.sent;
                  _ref6 = _slicedToArray(_ref5, 2);
                  err = _ref6[0];
                  lang = _ref6[1];

                  if (!(err || lang === null)) {
                    _context2.next = 15;
                    break;
                  }

                  console.log('failed to update lang');return _context2.abrupt('return', res.json({ result: 'failed to update lang' }));

                case 15:
                  //console.log(lang);
                  langs[i]._id = lang._id;
                  langsId.splice(0, 0, langs[i]._id);

                case 17:
                  i++;
                  _context2.next = 5;
                  break;

                case 20:
                  _context2.next = 22;
                  return (0, _to2.default)(_Card2.default.findOneAndUpdate({ _id: cardToUpdate._id }, { $set: {
                      langs: langsId,
                      icon: cardToUpdate.icon,
                      geoLocated: cardToUpdate.geoLocated
                    } }, { new: true }));

                case 22:
                  _ref7 = _context2.sent;
                  _ref8 = _slicedToArray(_ref7, 2);
                  err = _ref8[0];
                  card = _ref8[1];

                  if (!(err || card === null)) {
                    _context2.next = 29;
                    break;
                  }

                  console.log('failed to update card');return _context2.abrupt('return', res.json({ result: 'failed to update card' }));

                case 29:
                  return _context2.abrupt('return', res.json({
                    result: 'success',
                    updatedLangs: langs,
                    updatedCard: card
                  }));

                case 30:
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

      app.post('/card/grade', function () {
        var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
          var data, cards, err, card, featuredCount, profile, studentProject, updatedCards, i, _ref10, _ref11, _ref12, _ref13, _ref14, _ref15;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  data = req.body.data;
                  cards = data.cards;
                  //console.log(cards);

                  err = void 0, card = void 0, featuredCount = void 0, profile = void 0, studentProject = void 0;
                  updatedCards = [];
                  i = 0;

                case 5:
                  if (!(i < cards.length)) {
                    _context3.next = 19;
                    break;
                  }

                  _context3.next = 8;
                  return (0, _to2.default)(_Card2.default.findOneAndUpdate({ _id: cards[i] }, { $set: {
                      grade: cards[i].grade,
                      comment: cards[i].comment,
                      audioComment: cards[i].audioComment,
                      resubmitted: false,
                      studentRead: false
                    } }, { new: true }));

                case 8:
                  _ref10 = _context3.sent;
                  _ref11 = _slicedToArray(_ref10, 2);
                  err = _ref11[0];
                  card = _ref11[1];

                  if (!(err || card === null)) {
                    _context3.next = 15;
                    break;
                  }

                  console.log('no such card!');return _context3.abrupt('return', res.json({ result: 'failed' }));

                case 15:
                  updatedCards.splice(0, 0, card);

                case 16:
                  i++;
                  _context3.next = 5;
                  break;

                case 19:
                  if (!(cards.length > 0)) {
                    _context3.next = 34;
                    break;
                  }

                  _context3.next = 22;
                  return (0, _to2.default)(_Card2.default.count({ author: cards[0].author, grade: 'featured' }));

                case 22:
                  _ref12 = _context3.sent;
                  _ref13 = _slicedToArray(_ref12, 2);
                  err = _ref13[0];
                  featuredCount = _ref13[1];

                  if (err || featuredCount === null) {
                    console.log('err on getting featuredCount!');
                  }

                  _context3.next = 29;
                  return (0, _to2.default)(_Profile2.default.findOneAndUpdate({ belongTo: cards[0].author }, { $set: {
                      featuredCount: featuredCount
                    } }, { new: true }));

                case 29:
                  _ref14 = _context3.sent;
                  _ref15 = _slicedToArray(_ref14, 2);
                  err = _ref15[0];
                  profile = _ref15[1];

                  if (err || profile === null) {
                    console.log('err on updating featuredCount!');
                  }

                case 34:
                  return _context3.abrupt('return', res.json({
                    result: 'success',
                    updatedCards: updatedCards,
                    updatedProfile: profile
                  }));

                case 35:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2);
        }));

        return function (_x5, _x6) {
          return _ref9.apply(this, arguments);
        };
      }());

      app.post('/card/getMultiple', function () {
        var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
          var cards, err, card, langs, profile, _cards, _profiles, i, _ref17, _ref18, _ref19, _ref20, _langs, j, _ref21, _ref22;

          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  cards = req.body.data.cards;
                  //console.log(cards);

                  err = void 0, card = void 0, langs = void 0, profile = void 0;
                  _cards = [];
                  _profiles = [];
                  i = 0;

                case 5:
                  if (!(i < cards.length)) {
                    _context4.next = 28;
                    break;
                  }

                  _context4.next = 8;
                  return (0, _to2.default)(_Card2.default.findById(cards[i]));

                case 8:
                  _ref17 = _context4.sent;
                  _ref18 = _slicedToArray(_ref17, 2);
                  err = _ref18[0];
                  card = _ref18[1];

                  if (!(err || card === null)) {
                    _context4.next = 15;
                    break;
                  }

                  console.log('no such card!');return _context4.abrupt('return', res.json({ result: 'failed' }));

                case 15:
                  _cards.splice(0, 0, card);

                  _context4.next = 18;
                  return (0, _to2.default)(_Profile2.default.findOne({ belongTo: card.author }));

                case 18:
                  _ref19 = _context4.sent;
                  _ref20 = _slicedToArray(_ref19, 2);
                  err = _ref20[0];
                  profile = _ref20[1];

                  if (!(err || profile === null)) {
                    _context4.next = 24;
                    break;
                  }

                  return _context4.abrupt('return', res.json({ result: 'failed' }));

                case 24:
                  _profiles.splice(0, 0, profile);

                case 25:
                  i++;
                  _context4.next = 5;
                  break;

                case 28:
                  _langs = [];
                  j = 0;

                case 30:
                  if (!(j < _cards.length)) {
                    _context4.next = 44;
                    break;
                  }

                  _context4.next = 33;
                  return (0, _to2.default)(_Lang2.default.find({ card: cards[j] }));

                case 33:
                  _ref21 = _context4.sent;
                  _ref22 = _slicedToArray(_ref21, 2);
                  err = _ref22[0];
                  langs = _ref22[1];

                  if (!(err || langs === null || langs.length === 0)) {
                    _context4.next = 40;
                    break;
                  }

                  console.log('card hv no lang!');return _context4.abrupt('return', res.json({ result: 'failed' }));

                case 40:
                  _langs = [].concat(_toConsumableArray(_langs), _toConsumableArray(langs));

                case 41:
                  j++;
                  _context4.next = 30;
                  break;

                case 44:
                  return _context4.abrupt('return', res.json({
                    result: 'success',
                    cards: _cards,
                    langs: _langs,
                    profiles: _profiles
                  }));

                case 45:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this2);
        }));

        return function (_x7, _x8) {
          return _ref16.apply(this, arguments);
        };
      }());

      app.post('/card/add', function () {
        var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
          var data, card, langs, err, project, studentProject, createdCard, createdLang, cardCount, profile, _ref24, _ref25, createdLangs, createdLangsId, i, _ref26, _ref27, _ref28, _ref29, _ref30, _ref31, _ref32, _ref33, _ref34, _ref35, _ref36, _ref37, _ref38, _ref39, _ref40, _ref41, resubmitCard, _ref42, _ref43;

          return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
              switch (_context5.prev = _context5.next) {
                case 0:
                  data = req.body.data;
                  card = data.card;
                  langs = data.langs;
                  err = void 0, project = void 0, studentProject = void 0, createdCard = void 0, createdLang = void 0, cardCount = void 0, profile = void 0;

                  //console.log(card);

                  _context5.next = 6;
                  return (0, _to2.default)(_Card2.default.create(card));

                case 6:
                  _ref24 = _context5.sent;
                  _ref25 = _slicedToArray(_ref24, 2);
                  err = _ref25[0];
                  createdCard = _ref25[1];

                  if (!(err || createdCard === null)) {
                    _context5.next = 13;
                    break;
                  }

                  console.log(err);return _context5.abrupt('return', res.json({ result: "failed to create card" }));

                case 13:
                  createdLangs = [];
                  createdLangsId = [];
                  i = 0;

                case 16:
                  if (!(i < langs.length)) {
                    _context5.next = 31;
                    break;
                  }

                  langs[i].card = createdCard._id;
                  _context5.next = 20;
                  return (0, _to2.default)(_Lang2.default.create(langs[i]));

                case 20:
                  _ref26 = _context5.sent;
                  _ref27 = _slicedToArray(_ref26, 2);
                  err = _ref27[0];
                  createdLang = _ref27[1];

                  if (!(err || createdLang === null)) {
                    _context5.next = 26;
                    break;
                  }

                  return _context5.abrupt('return', res.json({ result: "failed to create lang" }));

                case 26:
                  createdLangs.splice(0, 0, createdLang);
                  createdLangsId.splice(0, 0, createdLang._id);

                case 28:
                  i++;
                  _context5.next = 16;
                  break;

                case 31:
                  _context5.next = 33;
                  return (0, _to2.default)(_Card2.default.findOneAndUpdate({ _id: createdCard._id }, { $set: {
                      langs: createdLangsId
                    } }, { new: true }));

                case 33:
                  _ref28 = _context5.sent;
                  _ref29 = _slicedToArray(_ref28, 2);
                  err = _ref29[0];
                  createdCard = _ref29[1];

                  if (!(err || createdCard === null)) {
                    _context5.next = 39;
                    break;
                  }

                  return _context5.abrupt('return', res.json({ result: "failed to update langs in card" }));

                case 39:
                  if (!data.isTeacher) {
                    _context5.next = 67;
                    break;
                  }

                  _context5.next = 42;
                  return (0, _to2.default)(_StudentProject2.default.findOneAndUpdate({ student: card.author, project: data.project }, { $push: {
                      cards: createdCard._id
                    } }, { upsert: true, new: true }));

                case 42:
                  _ref30 = _context5.sent;
                  _ref31 = _slicedToArray(_ref30, 2);
                  err = _ref31[0];
                  studentProject = _ref31[1];

                  if (!(err || studentProject === null)) {
                    _context5.next = 48;
                    break;
                  }

                  return _context5.abrupt('return', res.json({ result: "failed to create student project" }));

                case 48:
                  _context5.next = 50;
                  return (0, _to2.default)(_Project2.default.findById(studentProject.project));

                case 50:
                  _ref32 = _context5.sent;
                  _ref33 = _slicedToArray(_ref32, 2);
                  err = _ref33[0];
                  project = _ref33[1];

                  if (!(err || project === null)) {
                    _context5.next = 56;
                    break;
                  }

                  return _context5.abrupt('return', res.json({ result: "failed to find project" }));

                case 56:
                  if (project.studentProjects.some(function (sp) {
                    return sp.equals(studentProject._id);
                  })) {
                    _context5.next = 65;
                    break;
                  }

                  _context5.next = 59;
                  return (0, _to2.default)(_Project2.default.findOneAndUpdate({ _id: studentProject.project }, { $push: {
                      studentProjects: studentProject._id
                    } }, { new: true }));

                case 59:
                  _ref34 = _context5.sent;
                  _ref35 = _slicedToArray(_ref34, 2);
                  err = _ref35[0];
                  project = _ref35[1];

                  if (!(err || project === null)) {
                    _context5.next = 65;
                    break;
                  }

                  return _context5.abrupt('return', res.json({ result: "failed to update project" }));

                case 65:
                  _context5.next = 75;
                  break;

                case 67:
                  _context5.next = 69;
                  return (0, _to2.default)(_StudentProject2.default.findOneAndUpdate({ _id: card.studentProject._id }, { $push: {
                      cards: createdCard._id
                    } }, { new: true }));

                case 69:
                  _ref36 = _context5.sent;
                  _ref37 = _slicedToArray(_ref36, 2);
                  err = _ref37[0];
                  studentProject = _ref37[1];

                  if (!((err || createdCard === null) && !data.isTeacher)) {
                    _context5.next = 75;
                    break;
                  }

                  return _context5.abrupt('return', res.json({ result: "failed to find student project" }));

                case 75:
                  _context5.next = 77;
                  return (0, _to2.default)(_Card2.default.count({ author: card.author }));

                case 77:
                  _ref38 = _context5.sent;
                  _ref39 = _slicedToArray(_ref38, 2);
                  err = _ref39[0];
                  cardCount = _ref39[1];

                  if (!(!err && cardCount)) {
                    _context5.next = 88;
                    break;
                  }

                  _context5.next = 84;
                  return (0, _to2.default)(_Profile2.default.findOneAndUpdate({ belongTo: card.author }, { $set: {
                      cardCount: cardCount
                    } }, { new: true }));

                case 84:
                  _ref40 = _context5.sent;
                  _ref41 = _slicedToArray(_ref40, 2);
                  err = _ref41[0];
                  profile = _ref41[1];

                case 88:
                  resubmitCard = void 0;

                  if (!data.resubmitCard) {
                    _context5.next = 98;
                    break;
                  }

                  _context5.next = 92;
                  return (0, _to2.default)(_Card2.default.findOneAndUpdate({ _id: data.resubmitCard }, { $set: { resubmitted: true } }));

                case 92:
                  _ref42 = _context5.sent;
                  _ref43 = _slicedToArray(_ref42, 2);
                  err = _ref43[0];
                  resubmitCard = _ref43[1];

                  if (!(err || !resubmitCard)) {
                    _context5.next = 98;
                    break;
                  }

                  return _context5.abrupt('return', res.json({ result: "failed to update resubmitCard!" }));

                case 98:
                  return _context5.abrupt('return', res.json({
                    result: 'success',
                    card: createdCard,
                    langs: createdLangs,
                    updatedStudentProject: studentProject,
                    updatedProject: project,
                    updatedProfile: profile,
                    updatedCard: resubmitCard
                  }));

                case 99:
                case 'end':
                  return _context5.stop();
              }
            }
          }, _callee5, _this2);
        }));

        return function (_x9, _x10, _x11) {
          return _ref23.apply(this, arguments);
        };
      }());
    }
  }]);

  return CardRouter;
}(_Router3.default);

exports.default = CardRouter;
//# sourceMappingURL=card.js.map