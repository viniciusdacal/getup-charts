'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var normalizeContainersData = exports.normalizeContainersData = function normalizeContainersData(containerList, avgFormat) {
  var lines = [];
  var ticks = containerList.reduce(function (acc, container) {
    lines = [].concat(_toConsumableArray(lines), [container.name]);
    var formatted = container.data.reduce(function (accContainer, item) {
      var _extends2;

      return _extends({}, accContainer, _defineProperty({}, item.start, _extends({}, acc[item.start], accContainer[item.start], (_extends2 = {}, _defineProperty(_extends2, container.name, isNaN(parseInt(item.avg)) ? null : avgFormat(item.avg)), _defineProperty(_extends2, 'start', item.start), _extends2))));
    }, {});

    return _extends({}, acc, formatted);
  }, {});

  return {
    data: Object.keys(ticks).map(function (key) {
      return ticks[key];
    }),
    lines: lines
  };
};

var hexEncode = exports.hexEncode = function hexEncode(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  var c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
  return '00000'.substring(0, 6 - c.length) + c;
};