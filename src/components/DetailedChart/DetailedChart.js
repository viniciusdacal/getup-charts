import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
import {normalizeContainersData, hexEncode} from '../_utils';

const renderLegend = (props) => {
  const { payload } = props;
  return (
    <ul className='recharts-default-legend'>
      {payload.map((entry, index) => (
        <li
          key={`item-${index}`}
          className='recharts-legend-item'
          style={{color: entry.color}}
          >
          <span className='recharts-legend-item-text'>{entry.value}</span>
        </li>
      ))}
    </ul>
  );
}
const getLastAverage = (containerData) => {
  const tick = containerData.data[containerData.data.length - 1];
  const lines = containerData.lines;
  return lines.reduce((current, tickName) => current + (tick[tickName] || 0), 0) / lines.length;
};
const DetailedChart = ({
  containerList,
  labelAxysY,
  unitLabel,
  unit,
  unitNormalizer = (unit) => (unit / 10000000),
}) => {

  const containerData = normalizeContainersData(containerList, unitNormalizer);
  const lastAverage = getLastAverage(containerData);
  return (
    <div className='chart-recharts'>
      {labelAxysY && <span className='recharts-labelAxysY'>{labelAxysY}</span>}
      <ResponsiveContainer
        height={300}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <LineChart data={containerData.data}>
          <CartesianGrid strokeDasharray="1 2" />
          <XAxis
            dataKey='start'
            tickFormatter={(start) => moment(start).format('ddd H:mm')}
            />
          <YAxis />
          <Tooltip labelFormatter={(start) => moment(start).format('ddd H:mm')} />
          <Legend content={renderLegend}/>
          {containerData.lines.map((containerName) => (
            <Line
              key={containerName}
              type='monotone'
              dataKey={containerName}
              stroke={`#${hexEncode(containerName)}`}
              strokeWidth='2px'
              dot={false}
              activeDot={{r: 8}}
              unit={unit}
              formatter={(average) => parseFloat(average).toFixed(1)}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <div className='chart-recharts-info'>
        <span className='chart-recharts-value'>{lastAverage.toFixed(1)}</span>
        <span className='chart-recharts-unitLabel'>{unitLabel}</span>
      </div>
    </div>
  )
};

//DetailedChart.propTypes = {};

export default DetailedChart;
