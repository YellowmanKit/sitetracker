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

var _Profile = require('../../models/Profile.js');

var _Profile2 = _interopRequireDefault(_Profile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProfileRouter = function (_Router) {
  _inherits(ProfileRouter, _Router);

  function ProfileRouter(app) {
    _classCallCheck(this, ProfileRouter);

    var _this = _possibleConstructorReturn(this, (ProfileRouter.__proto__ || Object.getPrototypeOf(ProfileRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(ProfileRouter, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var app = this.app;
      _mongoose2.default.connect('mongodb://localhost/sitetracker');
      var db = _mongoose2.default.connection;

      app.post('/profile/getMultiple', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
          var list, err, profile, _profiles, i, _ref2, _ref3;

          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  list = req.body.data;
                  //console.log(list);

                  err = void 0, profile = void 0;
                  _profiles = [];
                  i = 0;

                case 4:
                  if (!(i < list.length)) {
                    _context.next = 17;
                    break;
                  }

                  _context.next = 7;
                  return (0, _to2.default)(_Profile2.default.findOne({ belongTo: list[i] }));

                case 7:
                  _ref2 = _context.sent;
                  _ref3 = _slicedToArray(_ref2, 2);
                  err = _ref3[0];
                  profile = _ref3[1];

                  if (!err) {
                    _context.next = 13;
                    break;
                  }

                  return _context.abrupt('return', res.json({ result: 'failed' }));

                case 13:
                  _profiles.splice(0, 0, profile);

                case 14:
                  i++;
                  _context.next = 4;
                  break;

                case 17:
                  return _context.abrupt('return', res.json({
                    result: 'success',
                    profiles: _profiles
                  }));

                case 18:
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

      app.post('/profile/update', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
          var data;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data)

                  _Profile2.default.findOneAndUpdate({ _id: data.profile._id }, { $set: {
                      name: data.newName ? data.newName : data.profile.name,
                      description: data.newDesc,
                      icon: data.newIcon ? data.newIcon : data.profile.icon
                    } }, { new: true }, function (err, _updatedProfile) {
                    //console.log(_updatedUser)
                    return res.json({
                      result: err || !_updatedProfile ? 'failed' : 'success',
                      updatedProfile: _updatedProfile
                    });
                  });

                case 2:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x3, _x4, _x5) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
  }]);

  return ProfileRouter;
}(_Router3.default);

exports.default = ProfileRouter;
//# sourceMappingURL=profile.js.map