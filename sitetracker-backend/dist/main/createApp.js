'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _app = require('./routers/app.js');

var _app2 = _interopRequireDefault(_app);

var _school = require('./routers/school.js');

var _school2 = _interopRequireDefault(_school);

var _user = require('./routers/user.js');

var _user2 = _interopRequireDefault(_user);

var _profile = require('./routers/profile.js');

var _profile2 = _interopRequireDefault(_profile);

var _course = require('./routers/course.js');

var _course2 = _interopRequireDefault(_course);

var _subject = require('./routers/subject.js');

var _subject2 = _interopRequireDefault(_subject);

var _project = require('./routers/project.js');

var _project2 = _interopRequireDefault(_project);

var _studentProject = require('./routers/studentProject.js');

var _studentProject2 = _interopRequireDefault(_studentProject);

var _group = require('./routers/group.js');

var _group2 = _interopRequireDefault(_group);

var _card = require('./routers/card.js');

var _card2 = _interopRequireDefault(_card);

var _lang = require('./routers/lang.js');

var _lang2 = _interopRequireDefault(_lang);

var _mlanghku = require('./routers/mlanghku.js');

var _mlanghku2 = _interopRequireDefault(_mlanghku);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//const temp = 'C:/data/temp/';
//const storage = 'C:/data/storage/';

var CreateApp = function () {
  function CreateApp(appName, port, useHttps, useUbuntu, devMode) {
    _classCallCheck(this, CreateApp);

    this.createApp(appName, port, useHttps, useUbuntu, devMode);
  }

  _createClass(CreateApp, [{
    key: 'createApp',
    value: function createApp(appName, port, useHttps, useUbuntu, devMode) {
      var temp = _path2.default.join(__dirname, '../../../data/temp/');
      var storage = _path2.default.join(__dirname, '../../../data/storage/');

      var storageConfig = _multer2.default.diskStorage({
        destination: function destination(req, file, cb) {
          cb(null, temp);
        },
        filename: function filename(req, file, cb) {
          console.log(file);
          cb(null, Date.now() + '-' + file.originalname);
        }
      });

      var upload = (0, _multer2.default)({ storage: storageConfig });

      var app = (0, _express2.default)();
      if (useHttps) {
        var httpsOptions = {
          cert: _fs2.default.readFileSync(_path2.default.join(__dirname, '../ssl', devMode ? 'dev-server.crt' : 'server.crt')),
          key: _fs2.default.readFileSync(_path2.default.join(__dirname, '../ssl', devMode ? 'dev-server.key' : 'server.key')),
          ca: _fs2.default.readFileSync(_path2.default.join(__dirname, '../ssl', devMode ? 'dev-server-ca.crt' : 'server-ca.crt'))
        };
        app.server = _https2.default.createServer(httpsOptions, app);
      } else {
        app.server = _http2.default.createServer(app);
      }

      app.use((0, _morgan2.default)('dev'));
      app.use((0, _cors2.default)({ exposeHeaders: "*" }));
      app.use(_bodyParser2.default.json({ limit: '50mb' }));
      app.use(_bodyParser2.default.urlencoded({ extended: false }));
      app.use(_express2.default.static(_path2.default.join(__dirname, '../../' + appName + '/')));

      app.set('root', __dirname);
      app.set('config', storageConfig);
      app.set('upload', upload);
      app.set('temp', temp);
      app.set('storage', storage);

      var mlanghku = new _mlanghku2.default(app);

      new _app2.default(app);
      new _school2.default(app);
      new _user2.default(app, mlanghku);
      new _profile2.default(app);
      new _course2.default(app);
      new _project2.default(app);
      new _studentProject2.default(app);
      new _card2.default(app);
      new _lang2.default(app);
      new _subject2.default(app);
      new _group2.default(app);

      app.server.listen(port, function () {
        console.log('App is running on port ' + app.server.address().port);
      });
    }
  }]);

  return CreateApp;
}();

exports.default = CreateApp;
//# sourceMappingURL=createApp.js.map