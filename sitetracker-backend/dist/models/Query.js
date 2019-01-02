'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _to = require('../to');

var _to2 = _interopRequireDefault(_to);

var _Profile = require('./Profile');

var _Profile2 = _interopRequireDefault(_Profile);

var _User = require('./User');

var _User2 = _interopRequireDefault(_User);

var _School = require('./School');

var _School2 = _interopRequireDefault(_School);

var _Course = require('./Course');

var _Course2 = _interopRequireDefault(_Course);

var _Subject = require('./Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _Project = require('./Project');

var _Project2 = _interopRequireDefault(_Project);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

var _Lang = require('./Lang');

var _Lang2 = _interopRequireDefault(_Lang);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports.getStatistics = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(schoolId) {
    var err, data, school, statistics, _ref2, _ref3, coursesId, _ref4, _ref5, subjectsId, _ref6, _ref7, projectsId, _ref8, _ref9, cardsId, featured, _ref10, _ref11, langsId, _ref12, _ref13, profilesId, _ref14, _ref15, _ref16, _ref17;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            err = void 0, data = void 0, school = void 0;
            statistics = {
              schoolTeachers: [],
              schoolStudents: [],
              schoolCourses: [],
              schoolSubjects: [],
              schoolProjects: [],
              schoolCards: [],
              schoolLangs: [],
              profiles: [],
              courses: [],
              subjects: [],
              projects: [],
              cards: [],
              langs: [],
              featured: 0
            };
            _context.next = 4;
            return (0, _to2.default)(_School2.default.findById(schoolId));

          case 4:
            _ref2 = _context.sent;
            _ref3 = _slicedToArray(_ref2, 2);
            err = _ref3[0];
            school = _ref3[1];
            coursesId = [];
            _context.next = 11;
            return _Course2.default.getBySchool(school);

          case 11:
            _ref4 = _context.sent;
            _ref5 = _slicedToArray(_ref4, 3);
            err = _ref5[0];
            data = _ref5[1];
            coursesId = _ref5[2];


            statistics['schoolCourses'] = coursesId;
            statistics['courses'] = data;

            subjectsId = [];
            _context.next = 21;
            return _Subject2.default.getByCourses(data, true);

          case 21:
            _ref6 = _context.sent;
            _ref7 = _slicedToArray(_ref6, 3);
            err = _ref7[0];
            data = _ref7[1];
            subjectsId = _ref7[2];


            statistics['schoolSubjects'] = subjectsId;
            statistics['subjects'] = data;

            projectsId = [];
            _context.next = 31;
            return _Project2.default.getBySubjects(data);

          case 31:
            _ref8 = _context.sent;
            _ref9 = _slicedToArray(_ref8, 3);
            err = _ref9[0];
            data = _ref9[1];
            projectsId = _ref9[2];


            statistics['schoolProjects'] = projectsId;
            statistics['projects'] = data;

            cardsId = [];
            featured = 0;
            _context.next = 42;
            return _Card2.default.getByProjects(data);

          case 42:
            _ref10 = _context.sent;
            _ref11 = _slicedToArray(_ref10, 4);
            err = _ref11[0];
            data = _ref11[1];
            cardsId = _ref11[2];
            featured = _ref11[3];


            statistics['schoolCards'] = cardsId;
            statistics['cards'] = data;
            statistics['featured'] = featured;

            langsId = [];
            _context.next = 54;
            return _Lang2.default.getByCards(data);

          case 54:
            _ref12 = _context.sent;
            _ref13 = _slicedToArray(_ref12, 3);
            err = _ref13[0];
            data = _ref13[1];
            langsId = _ref13[2];


            statistics['schoolLangs'] = langsId;
            statistics['langs'] = data;

            profilesId = [];
            _context.next = 64;
            return _Profile2.default.getTeachers(schoolId);

          case 64:
            _ref14 = _context.sent;
            _ref15 = _slicedToArray(_ref14, 3);
            err = _ref15[0];
            data = _ref15[1];
            profilesId = _ref15[2];


            statistics['schoolTeachers'] = profilesId;
            statistics['profiles'] = data;

            _context.next = 73;
            return _Profile2.default.getStudents(statistics.schoolCourses);

          case 73:
            _ref16 = _context.sent;
            _ref17 = _slicedToArray(_ref16, 3);
            err = _ref17[0];
            data = _ref17[1];
            profilesId = _ref17[2];


            statistics['schoolStudents'] = profilesId;
            statistics['profiles'] = [].concat(_toConsumableArray(statistics['profiles']), _toConsumableArray(data));

            return _context.abrupt('return', [err, statistics]);

          case 81:
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
//# sourceMappingURL=Query.js.map