import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DetailedChart from './DetailedChart';

const createVariation = (data) => {
  return data.map(container => ({
    ...container,
    data: container.data.map(info => ({
      ...info,
      avg: isNaN(parseInt(info.avg)) ? null : (info.avg * Math.random())
    }))
  }))
};

const cpu = require('../../mock.json').cpu;
const memory = require('../../mock.json').memory;
const data2 = createVariation(require('../../mock2.json'));

const style = {
  margin: '30px',
  width: '900px',
};

storiesOf('DetailedChart', module)
  .add('default', () => (
    <div>
        <div style={style}>
          <DetailedChart containerList={cpu} labelAxysY='%CPU Usage' unit='%' unitLabel='%CPU' unitNormalizer={value => ((value * 100) / 366)}/>
        </div>
        <div style={style}>
          <DetailedChart containerList={memory} labelAxysY='Memory Usage MiB' unit='MiB' unitLabel='MiB' unitNormalizer={value => value/1000000}/>
        </div>
    </div>
  ))
  .add('more data', () => (
    <div style={style}>
      <DetailedChart containerList={data2} labelAxysY='%CPU Usage' unit='m' unitLabel='%CPU'/>
    </div>
  ));
