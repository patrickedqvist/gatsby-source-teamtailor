"use strict";

exports.__esModule = true;
exports.getStringAfterAt = void 0;

var getStringAfterAt = function getStringAfterAt(string, at) {
  if (!string) {
    return '';
  }

  var indexOfAt = string.lastIndexOf(at) + at.length;
  var lastPart = string.slice(indexOfAt, string.length);
  return lastPart;
};

exports.getStringAfterAt = getStringAfterAt;