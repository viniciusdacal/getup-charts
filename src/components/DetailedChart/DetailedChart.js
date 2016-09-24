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
import {normalizeContainersData, hexEncode} from '../../utils';

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

const DetailedChart = ({
  containerList,
  labelAxysY,
  unit,
  unitNormalizer = (unit) => (unit / 10000000),
}) => {

  const containerData = normalizeContainersData(containerList, unitNormalizer);

  return (
    <div className='chart-recharts'>
      {labelAxysY && <span className='recharts-labelAxysY'>{labelAxysY}</span>}
      <ResponsiveContainer
        height={300}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}
        >
        <LineChart data={containerData.data} >
          <XAxis
            dataKey='start'
            tickFormatter={(start) => moment(start).format('ddd H:mm')}
            minTickGap={10}
            />
          <YAxis />
          <Tooltip labelFormatter={(start) => moment(start).format('ddd H:mm')}/>
          <Legend content={renderLegend}/>
          {containerData.lines.map((containerName) => (
            <Line
              key={containerName}
              type='basis'
              dataKey={containerName}
              stroke={`#${hexEncode(containerName)}`}
              strokeWidth='2px'
              dot={false}
              activeDot={{r: 8}}
              unit={unit}
              formatter={(average) => parseInt(average)}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
};

//DetailedChart.propTypes = {};

export default DetailedChart;
