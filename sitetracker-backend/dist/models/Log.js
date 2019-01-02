'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _to = require('../to');

var _to2 = _interopRequireDefault(_to);

var _Model = require('./Model');

var _Model2 = _interopRequireDefault(_Model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var logSchema = _mongoose2.default.Schema({
  createdAt: {
    type: Date,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  user: {
    type: ObjectId,
    required: true
  }
});

var Log = module.exports = _mongoose2.default.model('log', logSchema);

module.exports.createLoginLog = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(userId) {
    var err, log, _ref2, _ref3;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            err = void 0, log = void 0;
            _context.next = 3;
            return (0, _to2.default)(Log.findOne({ user: userId, type: 'login' }, null, { sort: { createdAt: -1 } }));

          case 3:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            log = _ref3[1];

            if (!err) {
              _context.next = 9;
              break;
            }

            return _context.abrupt('return');

          case 9:
            if (!log) {
              _context.next = 12;
              break;
            }

            if (!(_Model2.default.deltaMinute(new Date(), log.createdAt) < 60)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt('return');

          case 12:
            Log.create({ type: 'login', user: userId, createdAt: new Date() });

          case 13:
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
//# sourceMappingURL=Log.js.map