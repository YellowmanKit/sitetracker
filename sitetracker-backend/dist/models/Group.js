'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

var _to = require('../to');

var _to2 = _interopRequireDefault(_to);

var _Profile = require('./Profile');

var _Profile2 = _interopRequireDefault(_Profile);

var _StudentProject = require('./StudentProject');

var _StudentProject2 = _interopRequireDefault(_StudentProject);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _Lang = require('./Lang');

var _Lang2 = _interopRequireDefault(_Lang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ObjectId = _mongoose2.default.Schema.Types.ObjectId;
var groupSchema = _mongoose2.default.Schema({
  name: {
    type: String
  },
  project: {
    type: ObjectId,
    required: true
  },
  members: [ObjectId],
  leader: {
    type: ObjectId
  },
  code: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: new Date()
  }
});

var Group = module.exports = _mongoose2.default.model('group', groupSchema);

module.exports.fetchData = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(group, cb) {
    var err, data, groupData, profiles, _ref2, _ref3, studentProjects, members, _ref4, _ref5, cards, i, _ref6, _ref7, langs, j, _ref8, _ref9;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            err = void 0, data = void 0;
            groupData = { group: group._id };
            profiles = [];
            _context.next = 5;
            return (0, _to2.default)(_Profile2.default.find({ belongTo: group.members }));

          case 5:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            data = _ref3[1];

            if (!(err || !data)) {
              _context.next = 12;
              break;
            }

            cb('failed');return _context.abrupt('return');

          case 12:
            studentProjects = [];
            members = group.members;
            _context.next = 16;
            return (0, _to2.default)(_StudentProject2.default.find({ project: group.project, student: group.members }));

          case 16:
            _ref4 = _context.sent;
            _ref5 = _slicedToArray(_ref4, 2);
            err = _ref5[0];
            data = _ref5[1];

            if (!(err || !data)) {
              _context.next = 23;
              break;
            }

            cb('failed');return _context.abrupt('return');

          case 23:

            studentProjects = [].concat(_toConsumableArray(studentProjects), _toConsumableArray(data));

            cards = [];
            i = 0;

          case 26:
            if (!(i < studentProjects.length)) {
              _context.next = 40;
              break;
            }

            _context.next = 29;
            return (0, _to2.default)(_Card2.default.find({ _id: studentProjects[i].cards }));

          case 29:
            _ref6 = _context.sent;
            _ref7 = _slicedToArray(_ref6, 2);
            err = _ref7[0];
            data = _ref7[1];

            if (!(err || !data)) {
              _context.next = 36;
              break;
            }

            cb('failed');return _context.abrupt('return');

          case 36:
            cards = [].concat(_toConsumableArray(cards), _toConsumableArray(data));

          case 37:
            i++;
            _context.next = 26;
            break;

          case 40:
            langs = [];
            j = 0;

          case 42:
            if (!(j < cards.length)) {
              _context.next = 56;
              break;
            }

            _context.next = 45;
            return (0, _to2.default)(_Lang2.default.find({ _id: cards[j].langs }));

          case 45:
            _ref8 = _context.sent;
            _ref9 = _slicedToArray(_ref8, 2);
            err = _ref9[0];
            data = _ref9[1];

            if (!(err || !data)) {
              _context.next = 52;
              break;
            }

            cb('failed');return _context.abrupt('return');

          case 52:
            langs = [].concat(_toConsumableArray(langs), _toConsumableArray(data));

          case 53:
            j++;
            _context.next = 42;
            break;

          case 56:

            cb('success', groupData, profiles, studentProjects, cards, langs);

          case 57:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports.leaveGroup = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data, cb) {
    var err, group, _ref11, _ref12;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            err = void 0, group = void 0;
            _context2.next = 3;
            return (0, _to2.default)(Group.findOneAndUpdate({ code: data.groupCode }, { $pull: { members: data.userId } }, { new: true }));

          case 3:
            _ref11 = _context2.sent;
            _ref12 = _slicedToArray(_ref11, 2);
            err = _ref12[0];
            group = _ref12[1];

            if (!(!err && group === null)) {
              _context2.next = 10;
              break;
            }

            cb('failed');return _context2.abrupt('return');

          case 10:
            ;

            //console.log(group)
            cb('success', group);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function (_x3, _x4) {
    return _ref10.apply(this, arguments);
  };
}();

module.exports.joinGroup = function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data, cb) {
    var err, group, _ref14, _ref15;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            err = void 0, group = void 0;
            _context3.next = 3;
            return (0, _to2.default)(Group.findOneAndUpdate({ code: data.groupCode }, { $addToSet: { members: data.userId } }, { new: true }));

          case 3:
            _ref14 = _context3.sent;
            _ref15 = _slicedToArray(_ref14, 2);
            err = _ref15[0];
            group = _ref15[1];

            if (!(!err && group === null)) {
              _context3.next = 10;
              break;
            }

            cb('failed');return _context3.abrupt('return');

          case 10:
            ;

            //console.log(group)
            cb('success', group);

          case 12:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function (_x5, _x6) {
    return _ref13.apply(this, arguments);
  };
}();

module.exports.addGroup = function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data, cb) {
    var err, group, newCode, i, _ref17, _ref18, _ref19, _ref20, _ref21, _ref22;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            err = void 0, group = void 0;
            newCode = '';
            i = 0;

          case 3:
            if (!(i < 99)) {
              _context4.next = 17;
              break;
            }

            newCode = _randomstring2.default.generate({
              length: 5,
              charset: 'ABCDEFGHJKMNOPQRSTUVWXYZ1234567890'
            });

            _context4.next = 7;
            return (0, _to2.default)(Group.findOne({ code: newCode }));

          case 7:
            _ref17 = _context4.sent;
            _ref18 = _slicedToArray(_ref17, 2);
            err = _ref18[0];
            group = _ref18[1];

            if (!(!err && group === null)) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt('break', 17);

          case 13:
            ;

          case 14:
            i++;
            _context4.next = 3;
            break;

          case 17:
            _context4.next = 19;
            return (0, _to2.default)(Group.findOne({ project: data.projectId, leader: data.userId }));

          case 19:
            _ref19 = _context4.sent;
            _ref20 = _slicedToArray(_ref19, 2);
            err = _ref20[0];
            group = _ref20[1];

            if (!(group !== null)) {
              _context4.next = 27;
              break;
            }

            cb('failed', null, group);console.log('group existed');return _context4.abrupt('return');

          case 27:
            ;

            _context4.next = 30;
            return (0, _to2.default)(Group.create({ name: data.groupName, project: data.projectId, members: [data.userId], leader: data.userId, code: newCode }));

          case 30:
            _ref21 = _context4.sent;
            _ref22 = _slicedToArray(_ref21, 2);
            err = _ref22[0];
            group = _ref22[1];

            if (!err) {
              _context4.next = 38;
              break;
            }

            cb('failed');console.log(err);return _context4.abrupt('return');

          case 38:

            //console.log(group)
            cb('success', group);

          case 39:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function (_x7, _x8) {
    return _ref16.apply(this, arguments);
  };
}();

module.exports.getByProjects = function () {
  var _ref23 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(projectsId) {
    var err, data, groupsId, groups, i, _ref24, _ref25, j;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            err = void 0, data = void 0;
            groupsId = [];
            groups = [];
            i = 0;

          case 4:
            if (!(i < projectsId.length)) {
              _context5.next = 17;
              break;
            }

            _context5.next = 7;
            return (0, _to2.default)(Group.find({ project: projectsId[i] }));

          case 7:
            _ref24 = _context5.sent;
            _ref25 = _slicedToArray(_ref24, 2);
            err = _ref25[0];
            data = _ref25[1];

            if (!err) {
              _context5.next = 13;
              break;
            }

            return _context5.abrupt('return', [err]);

          case 13:
            if (data) {
              for (j = 0; j < data.length; j++) {
                groupsId = [].concat(_toConsumableArray(groupsId), [data[j]._id]);
              }
              groups = [].concat(_toConsumableArray(groups), _toConsumableArray(data));
            }

          case 14:
            i++;
            _context5.next = 4;
            break;

          case 17:
            return _context5.abrupt('return', [err, groups, groupsId]);

          case 18:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function (_x9) {
    return _ref23.apply(this, arguments);
  };
}();

module.exports.getByUserAndProjects = function () {
  var _ref26 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(userId, projectsId) {
    var err, group, groupsId, groups, i, _ref27, _ref28;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            err = void 0, group = void 0;
            groupsId = [];
            groups = [];
            i = 0;

          case 4:
            if (!(i < projectsId.length)) {
              _context6.next = 17;
              break;
            }

            _context6.next = 7;
            return (0, _to2.default)(Group.findOne({ members: userId, project: projectsId[i] }));

          case 7:
            _ref27 = _context6.sent;
            _ref28 = _slicedToArray(_ref27, 2);
            err = _ref28[0];
            group = _ref28[1];

            if (!err) {
              _context6.next = 13;
              break;
            }

            return _context6.abrupt('return', [err]);

          case 13:
            if (group) {
              groupsId = [].concat(_toConsumableArray(groupsId), [group._id]);
              groups = [].concat(_toConsumableArray(groups), [group]);
            }

          case 14:
            i++;
            _context6.next = 4;
            break;

          case 17:
            return _context6.abrupt('return', [err, groups, groupsId]);

          case 18:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function (_x10, _x11) {
    return _ref26.apply(this, arguments);
  };
}();
//# sourceMappingURL=Group.js.map