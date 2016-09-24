import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import SummaryChart from './SummaryChart';

const createVariation = (data) => {
  return data.map(container => ({
    ...container,
    data: container.data.map(info => ({
      ...info,
      avg: (info.avg * Math.random() * 5)
    }))
  }))
};

const data = createVariation(require('./mock.json'));

const style = {
  margin: '30px',
  width: '250px',
};

storiesOf('SummaryChart', module)
  .add('default', () => (
    <div style={style}>
      <SummaryChart containerList={data} unitLabel='MiB Memory'/>
      <SummaryChart containerList={data} unitLabel='Millicores CPU'/>
    </div>
  ));
