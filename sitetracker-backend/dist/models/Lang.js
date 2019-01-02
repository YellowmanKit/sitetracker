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
var langSchema = _mongoose2.default.Schema({
  card: {
    type: ObjectId,
    required: true
  },
  key: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  audio: {
    type: String
  }
});

var Lang = module.exports = _mongoose2.default.model('lang', langSchema);

module.exports.getByCards = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cards) {
    var err, lang, langsId, langs, i, _ref2, _ref3;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            err = void 0, lang = void 0;
            langsId = [];
            langs = [];


            for (i = 0; i < cards.length; i++) {
              langsId = [].concat(_toConsumableArray(langsId), _toConsumableArray(cards[i].langs));
            }

            i = 0;

          case 5:
            if (!(i < langsId.length)) {
              _context.next = 16;
              break;
            }

            _context.next = 8;
            return (0, _to2.default)(Lang.findById(langsId[i]));

          case 8:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            lang = _ref3[1];

            langs = [].concat(_toConsumableArray(langs), [lang]);

          case 13:
            i++;
            _context.next = 5;
            break;

          case 16:
            return _context.abrupt('return', [err, langs, langsId]);

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
//# sourceMappingURL=Lang.js.map