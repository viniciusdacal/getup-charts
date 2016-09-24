import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DetailedChart from './DetailedChart';

const createVariation = (data) => {
  return data.map(container => ({
    ...container,
    data: container.data.map(info => ({
      ...info,
      avg: (info.avg * Math.random() * 10)
    }))
  }))
};

const data = createVariation(require('./mock.json'));
const data2 = createVariation(require('./mock2.json'));

const style = {
  margin: '30px',
  width: '900px',
};

storiesOf('DetailedChart', module)
  .add('default', () => (
    <div style={style}>
      <DetailedChart containerList={data} labelAxysY='Millicores' unit='m'/>
    </div>
  ))
  .add('more data', () => (
    <div style={style}>
      <DetailedChart containerList={data2} labelAxysY='Millicores' unit='m'/>
    </div>
  ));
