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

var renderLegend = function renderLegend(props) {
  var payload = props.payload;

  return _react2.default.createElement(
    'ul',
    { className: 'recharts-default-legend' },
    payload.map(function (entry, index) {
      return _react2.default.createElement(
        'li',
        {
          key: 'item-' + index,
          className: 'recharts-legend-item',
          style: { color: entry.color }
        },
        _react2.default.createElement(
          'span',
          { className: 'recharts-legend-item-text' },
          entry.value
        )
      );
    })
  );
};
var getLastAverage = function getLastAverage(containerData) {
  var tick = containerData.data[containerData.data.length - 1];
  var lines = containerData.lines;
  return lines.reduce(function (current, tickName) {
    return current + (tick[tickName] || 0);
  }, 0) / lines.length;
};
var DetailedChart = function DetailedChart(_ref) {
  var containerList = _ref.containerList;
  var labelAxysY = _ref.labelAxysY;
  var unitLabel = _ref.unitLabel;
  var unit = _ref.unit;
  var _ref$averageFormatter = _ref.averageFormatter;
  var averageFormatter = _ref$averageFormatter === undefined ? function (average) {
    return parseFloat(average).toFixed(1);
  } : _ref$averageFormatter;
  var _ref$unitNormalizer = _ref.unitNormalizer;
  var unitNormalizer = _ref$unitNormalizer === undefined ? function (unit) {
    return unit / 10000000;
  } : _ref$unitNormalizer;


  var containerData = (0, _utils.normalizeContainersData)(containerList, unitNormalizer);
  var lastAverage = getLastAverage(containerData);

  return _react2.default.createElement(
    'div',
    { className: 'chart-recharts' },
    labelAxysY && _react2.default.createElement(
      'span',
      { className: 'recharts-labelAxysY' },
      labelAxysY
    ),
    _react2.default.createElement(
      _recharts.ResponsiveContainer,
      {
        height: 300,
        margin: { top: 5, right: 30, left: 20, bottom: 5 }
      },
      _react2.default.createElement(
        _recharts.LineChart,
        { data: containerData.data },
        _react2.default.createElement(_recharts.CartesianGrid, { strokeDasharray: '1 2' }),
        _react2.default.createElement(_recharts.XAxis, {
          dataKey: 'start',
          tickFormatter: function tickFormatter(start) {
            return (0, _moment2.default)(start).format('ddd H:mm');
          }
        }),
        _react2.default.createElement(_recharts.YAxis, null),
        _react2.default.createElement(_recharts.Tooltip, { labelFormatter: function labelFormatter(start) {
            return (0, _moment2.default)(start).format('ddd H:mm');
          } }),
        _react2.default.createElement(_recharts.Legend, { content: renderLegend }),
        containerData.lines.map(function (containerName) {
          return _react2.default.createElement(_recharts.Line, {
            key: containerName,
            type: 'monotone',
            dataKey: containerName,
            stroke: '#' + (0, _utils.hexEncode)(containerName),
            strokeWidth: '2px',
            dot: false,
            activeDot: { r: 8 },
            unit: unit,
            formatter: averageFormatter,
            isAnimationActive: false
          });
        })
      )
    ),
    _react2.default.createElement(
      'div',
      { className: 'chart-recharts-info' },
      _react2.default.createElement(
        'span',
        { className: 'chart-recharts-value' },
        lastAverage.toFixed(1)
      ),
      _react2.default.createElement(
        'span',
        { className: 'chart-recharts-unitLabel' },
        unitLabel
      )
    )
  );
};

//DetailedChart.propTypes = {};

exports.default = DetailedChart;