import React from 'react';
import { storiesOf, action, linkTo } from '@kadira/storybook';
import UsageChart from './UsageChart';

const style = {
  margin: '30px'
};

storiesOf('UsageChart', module)
  .add('default', () => (
    <div style={style}>
      <UsageChart />
    </div>
  ));
