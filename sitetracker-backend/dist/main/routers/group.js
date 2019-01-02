'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Router2 = require('./Router');

var _Router3 = _interopRequireDefault(_Router2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _to = require('../../to');

var _to2 = _interopRequireDefault(_to);

var _Group = require('../../models/Group.js');

var _Group2 = _interopRequireDefault(_Group);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GroupRouter = function (_Router) {
  _inherits(GroupRouter, _Router);

  function GroupRouter(app) {
    _classCallCheck(this, GroupRouter);

    var _this = _possibleConstructorReturn(this, (GroupRouter.__proto__ || Object.getPrototypeOf(GroupRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(GroupRouter, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var app = this.app;
      _mongoose2.default.connect('mongodb://localhost/sitetracker');
      var db = _mongoose2.default.connection;

      app.post('/group/fetchData', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
          var data;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data)

                  _Group2.default.fetchData(data.group, function (result, groupData, profiles, studentProjects, cards, langs) {
                    return res.json({
                      result: result,
                      groupData: groupData,
                      profiles: profiles,
                      studentProjects: studentProjects,
                      cards: cards,
                      langs: langs
                    });
                  });

                case 2:
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

      app.post('/group/join', function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
          var data;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data)

                  _Group2.default.joinGroup(data, function (result, newGroup) {
                    return res.json({
                      result: result,
                      group: newGroup
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
          return _ref2.apply(this, arguments);
        };
      }());

      app.post('/group/leave', function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
          var data;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data)

                  _Group2.default.leaveGroup(data, function (result, newGroup) {
                    return res.json({
                      result: result,
                      group: newGroup
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
          return _ref3.apply(this, arguments);
        };
      }());

      app.post('/group/add', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
          var data;
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data)

                  _Group2.default.addGroup(data, function (result, newGroup, existedGroup) {
                    return res.json({
                      result: result,
                      group: newGroup,
                      existedGroup: existedGroup
                    });
                  });

                case 2:
                case 'end':
                  return _context4.stop();
              }
            }
          }, _callee4, _this2);
        }));

        return function (_x10, _x11, _x12) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
  }]);

  return GroupRouter;
}(_Router3.default);

exports.default = GroupRouter;
//# sourceMappingURL=group.js.map