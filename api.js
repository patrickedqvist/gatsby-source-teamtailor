"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getUsers = exports.fetchUsers = exports.fetchJobs = exports.createInstance = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _axios = _interopRequireDefault(require("axios"));

var BASE_URL = 'https://api.teamtailor.com/v1';
var instance = {};

var createInstance = function createInstance() {
  var headers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  instance = _axios["default"].create({
    baseURL: BASE_URL,
    headers: headers
  });
};

exports.createInstance = createInstance;

var fetchJobs =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee() {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return instance.get('/jobs?filter[status]=all&include=locations,user').then(function (_ref2) {
              var data = _ref2.data;
              return data;
            })["catch"](function (error) {
              throw error;
            });

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchJobs() {
    return _ref.apply(this, arguments);
  };
}();

exports.fetchJobs = fetchJobs;

var fetchUsers =
/*#__PURE__*/
function () {
  var _ref4 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(_ref3) {
    var _ref3$url, url, users;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref3$url = _ref3.url, url = _ref3$url === void 0 ? '/users' : _ref3$url;
            users = [];
            _context2.next = 4;
            return instance.get(url).then(function (_ref5) {
              var data = _ref5.data;
              return data;
            })["catch"](function (error) {
              throw error;
            });

          case 4:
            return _context2.abrupt("return", _context2.sent);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function fetchUsers(_x) {
    return _ref4.apply(this, arguments);
  };
}();

exports.fetchUsers = fetchUsers;

var getUsers =
/*#__PURE__*/
function () {
  var _ref6 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee3() {
    var records, keepGoing, url, response;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            records = [];
            keepGoing = true;
            url = '/users?page[size]=30';

          case 3:
            if (!keepGoing) {
              _context3.next = 17;
              break;
            }

            _context3.next = 6;
            return fetchUsers({
              url: url
            });

          case 6:
            response = _context3.sent;
            _context3.next = 9;
            return records.push.apply(records, response.data);

          case 9:
            if (!(response.links && response.links.next)) {
              _context3.next = 13;
              break;
            }

            url = response.links.next;
            _context3.next = 15;
            break;

          case 13:
            keepGoing = false;
            return _context3.abrupt("return", records);

          case 15:
            _context3.next = 3;
            break;

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getUsers() {
    return _ref6.apply(this, arguments);
  };
}();

exports.getUsers = getUsers;