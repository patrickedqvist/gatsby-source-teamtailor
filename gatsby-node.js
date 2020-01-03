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
  _regenerator["default"].mark(function _callee(_ref, configOptions) {
    var actions, createNode, createTypes, getJobs, fetchUsers, _ref3, _ref4, allJobs, allUsers;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            actions = _ref.actions;
            createNode = actions.createNode, createTypes = actions.createTypes;
            _context.prev = 2;
            (0, _api.createInstance)({
              Authorization: "Token token=".concat(configOptions.token),
              'X-Api-Version': configOptions.version,
              Accept: 'application/vnd.api+json'
            }); // Fetch all jobs from teamtailor

            _context.next = 6;
            return (0, _api.fetchJobs)();

          case 6:
            getJobs = _context.sent;
            _context.next = 9;
            return (0, _api.getUsers)();

          case 9:
            fetchUsers = _context.sent;
            _context.next = 12;
            return Promise.all([getJobs, fetchUsers]);

          case 12:
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
            return _context.abrupt("return");

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](2);
            console.log('===== Gatsby Source Teamtailor =====');

            if ((0, _fp.get)('response.data.errors', _context.t0)) {
              console.log((0, _fp.get)('response.data.errors', _context.t0));
            } else {
              console.log(_context.t0);
            }

            process.exit(1);

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 21]]);
  }));

  return function (_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createSchemaCustomization = function (_ref5) {
  var actions = _ref5.actions,
      schema = _ref5.schema;
  var createTypes = actions.createTypes; // Explicitly define tags as an non nullable array of strings
  // this is to make sure that gatsby understand how to handle a situation
  // where tags could be an empty array

  var typeDefs = "\n    type TeamTailorJob implements Node {\n      attributes: Attributes\n      recruiter: TeamTailorUser @link(by: \"id\", from: \"recruiterId\")      \n    }\n\n    type Attributes {\n      tags: [String!]\n    }\n\n    type TeamTailorUser implements Node {\n      teamTailorId: String\n    }\n  ";
  createTypes(typeDefs);
};