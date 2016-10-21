'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recharts = require('recharts');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _utils = require('../_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNumber = function isNumber(value) {
  return typeof value === 'number';
};

var getAverageByTick = function getAverageByTick(containerData) {
  return containerData.data.map(function (range) {
    var totals = Object.keys(range).reduce(function (totals, key) {
      if (containerData.lines.indexOf(key) == -1) {
        return totals;
      }
      return { lines: totals.lines + 1, values: totals.values + range[key] };
    }, { lines: 0, values: 0 });

    return {
      start: range.start,
      avg: isNumber(totals.values) ? parseFloat((totals.values / totals.lines).toFixed(2)) : null
    };
  });
};

var getLastAverage = function getLastAverage(averageByTick) {
  return averageByTick[averageByTick.length - 1].avg || 0;
};
var SummaryChart = function SummaryChart(_ref) {
  var containerList = _ref.containerList;
  var labelAxysY = _ref.labelAxysY;
  var unitLabel = _ref.unitLabel;
  var _ref$unitNormalizer = _ref.unitNormalizer;
  var unitNormalizer = _ref$unitNormalizer === undefined ? function (unit) {
    return unit / 10000000;
  } : _ref$unitNormalizer;


  var containerData = (0, _utils.normalizeContainersData)(containerList, unitNormalizer);
  var averageByTick = getAverageByTick(containerData);
  var last = getLastAverage(averageByTick);

  return _react2.default.createElement(
    'div',
    { className: 'chart-recharts' },
    _react2.default.createElement(
      _recharts.ResponsiveContainer,
      { height: 42, margin: { top: 0, bottom: 0 } },
      _react2.default.createElement(
        _recharts.AreaChart,
        { data: averageByTick, margin: { top: 0, bottom: 0 } },
        _react2.default.createElement(_recharts.Area, {
          type: 'monotone',
          dataKey: 'avg',
          stroke: '#00659c',
          fill: '#d2e4f0',
          strokeWidth: '1px',
          dot: false,
          isAnimationActive: false
        })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'chart-recharts-info' },
      _react2.default.createElement(
        'span',
        { className: 'chart-recharts-value' },
        last.toFixed(1)
      ),
      _react2.default.createElement(
        'span',
        { className: 'chart-recharts-unitLabel' },
        unitLabel
      )
    )
  );
};

//SummaryChart.propTypes = {};

exports.default = SummaryChart;