'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _StudentProject = require('./StudentProject');

var _StudentProject2 = _interopRequireDefault(_StudentProject);

var _to = require('../to');

var _to2 = _interopRequireDefault(_to);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var cardSchema = _mongoose2.default.Schema({
  studentProject: {
    type: ObjectId
  },
  icon: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    default: ''
  },
  audioComment: {
    type: String
  },
  grade: {
    type: String,
    default: 'notGraded'
  },
  author: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  resubmitted: {
    type: Boolean,
    default: false
  },
  studentRead: {
    type: Boolean,
    default: false
  },
  langs: [ObjectId],
  geoLocated: {
    altitude: { type: String },
    latitude: { type: String },
    longitude: { type: String }
  }
});

var Card = module.exports = _mongoose2.default.model('card', cardSchema);

module.exports.getByStudentProjects = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(studentProjects) {
    var err, card, cardsId, cards, i, _ref2, _ref3;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            err = void 0, card = void 0;
            cardsId = [];
            cards = [];


            for (i = 0; i < studentProjects.length; i++) {
              cardsId = [].concat(_toConsumableArray(cardsId), _toConsumableArray(studentProjects[i].cards));
            }

            i = 0;

          case 5:
            if (!(i < cardsId.length)) {
              _context.next = 16;
              break;
            }

            _context.next = 8;
            return (0, _to2.default)(Card.findById(cardsId[i]));

          case 8:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            card = _ref3[1];

            cards.push(card);

          case 13:
            i++;
            _context.next = 5;
            break;

          case 16:
            return _context.abrupt('return', [err, cards, cardsId]);

          case 17:
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

module.exports.getByProjects = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(projects) {
    var err, studentProject, card, studentProjectsId, cardsId, cards, featured, i, _ref5, _ref6, _ref7, _ref8;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            err = void 0, studentProject = void 0, card = void 0;
            studentProjectsId = [];
            cardsId = [];
            cards = [];
            featured = 0;


            for (i = 0; i < projects.length; i++) {
              studentProjectsId = [].concat(_toConsumableArray(studentProjectsId), _toConsumableArray(projects[i].studentProjects));
            }

            i = 0;

          case 7:
            if (!(i < studentProjectsId.length)) {
              _context2.next = 18;
              break;
            }

            _context2.next = 10;
            return (0, _to2.default)(_StudentProject2.default.findById(studentProjectsId[i]));

          case 10:
            _ref5 = _context2.sent;
            _ref6 = _slicedToArray(_ref5, 2);
            err = _ref6[0];
            studentProject = _ref6[1];

            cardsId = [].concat(_toConsumableArray(cardsId), _toConsumableArray(studentProject.cards));

          case 15:
            i++;
            _context2.next = 7;
            break;

          case 18:
            i = 0;

          case 19:
            if (!(i < cardsId.length)) {
              _context2.next = 31;
              break;
            }

            _context2.next = 22;
            return (0, _to2.default)(Card.findById(cardsId[i]));

          case 22:
            _ref7 = _context2.sent;
            _ref8 = _slicedToArray(_ref7, 2);
            err = _ref8[0];
            card = _ref8[1];

            cards = [].concat(_toConsumableArray(cards), [card]);
            if (card.grade === 'featured') {
              featured++;
            }

          case 28:
            i++;
            _context2.next = 19;
            break;

          case 31:
            return _context2.abrupt('return', [err, cards, cardsId, featured]);

          case 32:
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
//# sourceMappingURL=Card.js.map