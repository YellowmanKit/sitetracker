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

var _Lang = require('../../models/Lang.js');

var _Lang2 = _interopRequireDefault(_Lang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ObjectId = require('mongoose').Types.ObjectId;

var LangRouter = function (_Router) {
  _inherits(LangRouter, _Router);

  function LangRouter(app) {
    _classCallCheck(this, LangRouter);

    var _this = _possibleConstructorReturn(this, (LangRouter.__proto__ || Object.getPrototypeOf(LangRouter)).call(this, app));

    _this.app = app;
    _this.init();
    return _this;
  }

  _createClass(LangRouter, [{
    key: 'init',
    value: function init() {
      var app = this.app;
      _mongoose2.default.connect('mongodb://localhost/sitetracker');
      var db = _mongoose2.default.connection;

      /*app.post('/lang/add', async(req, res, next)=>{
        const data = req.body.data;
        })*/
    }
  }]);

  return LangRouter;
}(_Router3.default);

exports.default = LangRouter;
//# sourceMappingURL=lang.js.map