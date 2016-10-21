import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import SummaryChart from './SummaryChart';

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

const single_cpu = require('../../mock-single.json').cpu;

const style = {
  margin: '30px',
  width: '250px',
};

storiesOf('SummaryChart', module)
  .add('many pods', () => (
    <div style={style}>
      <SummaryChart containerList={memory} unitLabel='MiB Memory' unitNormalizer={value => value/1000000}/>
      <SummaryChart containerList={cpu} unitLabel='%CPU Usage' unitNormalizer={value => ((value * 100) / 366)}/>
    </div>
  ))
  .add('flat', () => (
    <div style={style}>
      <SummaryChart containerList={single_cpu} unitLabel='%CPU Usage' unitNormalizer={value => ((value * 100) / 366)}/>
    </div>
  ));
