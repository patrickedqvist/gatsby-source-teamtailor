"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fp = require("lodash/fp");

var _nodes = require("./nodes");

var _api = require("./api");

exports.sourceNodes =
/*#__PURE__*/
function () {
  var _ref2 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(_ref, options) {
    var actions, reporter, createNode, token, version, getJobs, fetchUsers, _ref3, _ref4, allJobs, allUsers;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            actions = _ref.actions, reporter = _ref.reporter;
            createNode = actions.createNode;
            token = options.token || null;
            version = options.version || null;

            if (token == null) {
              reporter.panicOnBuild("Invalid token for gatsby-source-teamtailor");
            }

            if (version == null) {
              reporter.panicOnBuild("Invalid version for gatsby-source-teamtailor");
            }

            _context.prev = 6;
            (0, _api.createInstance)({
              Authorization: "Token token=".concat(token),
              'X-Api-Version': version,
              Accept: 'application/vnd.api+json'
            }); // Fetch all jobs from teamtailor

            _context.next = 10;
            return (0, _api.fetchJobs)();

          case 10:
            getJobs = _context.sent;
            _context.next = 13;
            return (0, _api.getUsers)();

          case 13:
            fetchUsers = _context.sent;
            _context.next = 16;
            return Promise.all([getJobs, fetchUsers]);

          case 16:
            _ref3 = _context.sent;
            _ref4 = (0, _slicedToArray2["default"])(_ref3, 2);
            allJobs = _ref4[0];
            allUsers = _ref4[1];
            (0, _fp.map)(function (job) {
              var jobNode = (0, _nodes.JobNode)(job);
              createNode(jobNode);
            }, allJobs.data);
            (0, _fp.map)(function (user) {
              var userNode = (0, _nodes.UserNode)(user);
              createNode(userNode);
            }, allUsers);
            reporter.success("[gatsby-source-teamtailor] created ".concat(allJobs.data.length, " jobs"));
            reporter.success("[gatsby-source-teamtailor] created ".concat(allUsers.length, " users"));
            return _context.abrupt("return");

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](6);

            if ((0, _fp.get)('response.data.errors', _context.t0)) {
              reporter.panicOnBuild("An error occured in gatsby-source-teamtailor", _context.t0);
            } else {
              reporter.panicOnBuild("An error occured in gatsby-source-teamtailor", _context.t0);
            }

            process.exit(1);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 27]]);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createSchemaCustomization = function (_ref5) {
  var actions = _ref5.actions;
  var createTypes = actions.createTypes; // Explicitly define tags as an non nullable array of strings
  // this is to make sure that gatsby understand how to handle a situation
  // where tags could be an empty array

  var typeDefs = "\n    type TeamTailorJob implements Node {      \n      recruiter: TeamTailorUser @link(by: \"id\", from: \"recruiterId\")      \n    }\n\n    type TeamTailorUser implements Node {\n      teamTailorId: String\n    }\n  ";
  createTypes(typeDefs);
};