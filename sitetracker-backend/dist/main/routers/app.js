'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Router2 = require('./Router');

var _Router3 = _interopRequireDefault(_Router2);

var _package = require('../../../package.json');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppRouter = function (_Router) {
  _inherits(AppRouter, _Router);

  function AppRouter(app) {
    _classCallCheck(this, AppRouter);

    var _this = _possibleConstructorReturn(this, (AppRouter.__proto__ || Object.getPrototypeOf(AppRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(AppRouter, [{
    key: 'init',
    value: function init() {
      var _this2 = this;

      var app = this.app;
      var upload = app.get('upload');
      var temp = app.get('temp');
      var storage = app.get('storage');

      _mongoose2.default.connect('mongodb://localhost/sitetracker');
      var db = _mongoose2.default.connection;

      app.get('/download/:type/:name', function (req, res, next) {
        var type = req.params.type;
        var append = _this2.getAppend(type);
        var fileName = req.params.name;
        var filePath = _path2.default.join(storage, append, fileName);

        console.log('Donwloading ' + filePath);

        return res.download(filePath, fileName, function (err) {
          if (err) {
            console.log('File download error');
          }
        });
      });

      app.post('/upload', upload.array('files'), function (req, res, next) {
        //console.log('Uploaded ', req.files);

        var type = req.headers.type;
        var append = _this2.getAppend(type);
        var filenames = [];

        for (var i = 0; i < req.files.length; i++) {
          var filename = req.files[i].filename;
          var splted = filename.split('-');

          filenames.splice(0, 0, filename);

          if (type === 'card') {
            append = splted[1] === 'cardIcon.png' ? _this2.getAppend('cardIcon') : _this2.getAppend('langAudio');
          }

          _fsExtra2.default.move(temp + filename, storage + append + filename, function (err) {
            if (err) {
              console.log(err);
            }
          });
        }

        return res.json({
          result: 'success',
          filenames: filenames
        });
      });

      app.get('/', function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  return _context.abrupt('return', res.status(200).json({
                    version: _package.version
                  }));

                case 1:
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
    }
  }]);

  return AppRouter;
}(_Router3.default);

exports.default = AppRouter;
//# sourceMappingURL=app.js.map