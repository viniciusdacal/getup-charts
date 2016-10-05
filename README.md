
# How to use

```bash
  npm install getup-charts --save
```

```js
import { SummaryChart } from 'getup-charts';
import 'getup-charts/lib/index.css';

render() {
  return (
    <div>
      <SummaryChart containerList={data} unitLabel='MiB Memory'/>
    </div>
  );
}

```

#Dev
```bash
npm install
npm run storybook
```

