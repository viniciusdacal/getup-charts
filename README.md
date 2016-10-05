
# How to use

```bash
  npm install getup-charts --save
```

```js
import { SummaryChart, DetailedChart } from 'getup-charts';
import 'getup-charts/lib/index.css';

render() {
  return (
    <div>
      <SummaryChart containerList={data} unitLabel='MiB Memory'/>
      <DetailedChart containerList={data} unitLabel='MiB Memory'/>
    </div>
  );
}

```

You can find samples for data in ./src/mock.json

#Dev
```bash
npm install
npm run storybook
```

