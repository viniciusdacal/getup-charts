import { configure } from '@kadira/storybook';
import '../src/index.css';

function loadStories() {
  require('../src/components/UsageChart/story.js');
}

configure(loadStories, module);
