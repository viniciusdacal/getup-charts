import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import moment from 'moment';
import {normalizeContainersData, hexEncode} from '../_utils';

const isNumber = value => typeof value === 'number';

const getAverageByTick = (containerData) => {
  return containerData.data.map(range => {
    const totals = Object.keys(range).reduce((totals, key) => {
      if (containerData.lines.indexOf(key) == -1) {
        return totals;
      }
      return { lines: (totals.lines + 1), values: (totals.values + range[key])};
    }, {lines: 0, values: 0});

    return {
      start: range.start,
      avg : isNumber(totals.values) ? parseFloat((totals.values / totals.lines).toFixed(2)) : null,
    };
  });
};

const getLastAverage = (averageByTick) => averageByTick.length > 0 ? (averageByTick[averageByTick.length - 1].avg || 0) : 0;
const SummaryChart = ({
  containerList,
  labelAxysY,
  unitLabel,
  unitNormalizer = (unit) => (unit / 10000000),
}) => {

  const containerData = normalizeContainersData(containerList, unitNormalizer);
  const averageByTick = getAverageByTick(containerData);
  const last = getLastAverage(averageByTick);

  return (
    <div className='chart-recharts'>
      <ResponsiveContainer height={42} margin={{top:0, bottom: 0}}>
        <AreaChart data={averageByTick} margin={{top:0, bottom: 0}}>
          <Area
            type='monotone'
            dataKey='avg'
            stroke='#00659c'
            fill='#d2e4f0'
            strokeWidth='1px'
            dot={false}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className='chart-recharts-info'>
        <span className='chart-recharts-value'>{last.toFixed(1)}</span>
        <span className='chart-recharts-unitLabel'>{unitLabel}</span>
      </div>
    </div>
  )
};

//SummaryChart.propTypes = {};

export default SummaryChart;
