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

var _node = require('parse/node');

var _node2 = _interopRequireDefault(_node);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mlanghkuRouter = function (_Router) {
  _inherits(mlanghkuRouter, _Router);

  function mlanghkuRouter(app) {
    _classCallCheck(this, mlanghkuRouter);

    var _this = _possibleConstructorReturn(this, (mlanghkuRouter.__proto__ || Object.getPrototypeOf(mlanghkuRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(mlanghkuRouter, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var app = this.app;
      _mongoose2.default.connect('mongodb://localhost/sitetracker');
      var db = _mongoose2.default.connection;

      _node2.default.initialize(process.env.PARSE_APP_ID, process.env.DOTNET_KEY);
      _node2.default.serverURL = process.env.PARSE_SERVER;

      app.get('/mlanghku/download/:filenameUpper/:filenameLower', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
          var url;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  url = 'http://147.8.219.237:1337/parse/files/' + req.params.filenameUpper + '/' + req.params.filenameLower;
                  //console.log(url);

                  (0, _request2.default)(url).pipe(res);

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

      app.post('/mlanghku/fetch', function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
          var data, err, dataRes, query, _ref3, _ref4;

          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  data = req.body.data;
                  err = void 0, dataRes = void 0;
                  query = new _node2.default.Query(data.className);
                  //query.equalTo('project', { __type: 'Pointer', className: 'Project', objectId: req.body.data.projectId });

                  query.equalTo(data.field, data.value);
                  _context2.next = 6;
                  return (0, _to2.default)(query.find());

                case 6:
                  _ref3 = _context2.sent;
                  _ref4 = _slicedToArray(_ref3, 2);
                  err = _ref4[0];
                  dataRes = _ref4[1];

                  if (err) {
                    res.json({ result: 'failed' });
                  }

                  res.json({
                    result: 'success',
                    data: dataRes
                  });

                case 12:
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

      app.post('/mlanghku/login', function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
          var data, err, dataRes, user, _ref6, _ref7, timestamp;

          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  data = req.body.data;
                  //console.log(data);

                  err = void 0, dataRes = void 0, user = void 0;
                  _context3.next = 4;
                  return (0, _to2.default)(_node2.default.User.logIn(data.id, data.pw));

                case 4:
                  _ref6 = _context3.sent;
                  _ref7 = _slicedToArray(_ref6, 2);
                  err = _ref7[0];
                  user = _ref7[1];

                  if (!err) {
                    _context3.next = 12;
                    break;
                  }

                  console.log(err);res.json({ result: 'failed to login' });return _context3.abrupt('return');

                case 12:
                  //console.log(user);

                  timestamp = _this2.timestamp();
                  //[err, dataRes] = await to(Parse.Cloud.run('RenewUser', { timestamp: timestamp }));

                  _this2.runParseCloudFunction("RenewUser", user.attributes.sessionToken, { timestamp: timestamp }, function (err, dataRes, body) {

                    if (err) {
                      console.log(err);res.json({ result: 'failed to RenewUser' });return;
                    }

                    //console.log(body);
                    var jsonBody = JSON.parse(body);
                    //console.log(jsonBody);

                    res.json({
                      result: 'success',
                      user: user,
                      body: jsonBody.result
                    });
                  });

                case 14:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, _this2);
        }));

        return function (_x7, _x8, _x9) {
          return _ref5.apply(this, arguments);
        };
      }());
    }
  }, {
    key: 'login',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, pw) {
        var err, user, _ref9, _ref10;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                err = void 0, user = void 0;
                _context4.next = 3;
                return (0, _to2.default)(_node2.default.User.logIn(id, pw));

              case 3:
                _ref9 = _context4.sent;
                _ref10 = _slicedToArray(_ref9, 2);
                err = _ref10[0];
                user = _ref10[1];

                if (!err) {
                  _context4.next = 10;
                  break;
                }

                console.log(err.message);return _context4.abrupt('return', ['error']);

              case 10:
                return _context4.abrupt('return', [null, user]);

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function login(_x10, _x11) {
        return _ref8.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: 'timestamp',
    value: function timestamp() {
      //return '000000000';
      return Math.floor(new Date().getTime() / 1000);
    }
  }, {
    key: 'runParseCloudFunction',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(urlPath, token, params, cb) {
        var url, headers;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!params) {
                  params = {};
                }

                //var buildVariables = config.buildVariables(buildEnvironment);
                //var publicServerURL = buildVariables.publicServerURL;

                urlPath = urlPath.indexOf('/') == 0 ? urlPath.substring(1) : urlPath;
                url = process.env.PARSE_SERVER + "/functions/" + urlPath;
                headers = {
                  'X-Parse-Application-Id': process.env.PARSE_APP_ID,
                  'X-Parse-REST-API-Key': process.env.DOTNET_KEY,
                  'X-Parse-Client-Key': process.env.DOTNET_KEY,
                  'X-Parse-Javascript-Key': process.env.DOTNET_KEY,
                  'Content-Type': 'application/json;charset=utf-8'
                };


                if (token) {
                  headers['X-Parse-Session-Token'] = token;
                }

                //let err, res;
                (0, _request2.default)({
                  url: url,
                  method: "POST",
                  headers: headers,
                  qs: params
                }, function (err, res, body) {
                  cb(err, res, body);
                });

              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function runParseCloudFunction(_x12, _x13, _x14, _x15) {
        return _ref11.apply(this, arguments);
      }

      return runParseCloudFunction;
    }()
  }]);

  return mlanghkuRouter;
}(_Router3.default);

exports.default = mlanghkuRouter;
//# sourceMappingURL=mlanghku.js.map