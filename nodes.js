"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.UserNode = exports.JobNode = void 0;

var _gatsbyNodeHelpers = _interopRequireDefault(require("gatsby-node-helpers"));

var _fp = require("lodash/fp");

var _utils = require("./utils");

var _createNodeHelpers = (0, _gatsbyNodeHelpers["default"])({
  typePrefix: "TeamTailor"
}),
    createNodeFactory = _createNodeHelpers.createNodeFactory,
    generateNodeId = _createNodeHelpers.generateNodeId,
    generateTypeName = _createNodeHelpers.generateTypeName;

var JOB_TYPE = "Job";
var USER_TYPE = "User";
var JobNode = createNodeFactory(JOB_TYPE, function (node) {
  var externalUrl = (0, _fp.get)(['links', 'careersite-job-url'], node);
  var slug = (0, _utils.getStringAfterAt)(externalUrl, '/jobs/');
  var userId = (0, _fp.get)(['relationships', 'user', 'data', 'id'], node); // Set new fields

  node.slug = slug;
  node.recruiterId = generateNodeId(USER_TYPE, userId);
  return node;
});
exports.JobNode = JobNode;
var UserNode = createNodeFactory(USER_TYPE);
exports.UserNode = UserNode;