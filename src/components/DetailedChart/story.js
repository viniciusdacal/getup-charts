import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import DetailedChart from './DetailedChart';

const data = require('./mock.json');
const data2 = require('./mock2.json');
const style = {
  margin: '30px',
  width: '900px',
};

storiesOf('DetailedChart', module)
  .add('default', () => (
    <div style={style}>
      <DetailedChart containerList={data2} labelAxysY='Millicores' unit='m'/>
    </div>
  ))
  .add('more data', () => (
    <div style={style}>
      <DetailedChart containerList={data} labelAxysY='Millicores' unit='m'/>
    </div>
  ));
