import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { SummaryChart } from '../lib';
import '../lib/index.css';

const createVariation = (data) => {
  return data.map(container => ({
    ...container,
    data: container.data.map(info => ({
      ...info,
      avg: (info.avg * Math.random() * 5)
    }))
  }))
};
const data = createVariation(require('./components/SummaryChart/mock.json'));

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Get up Charts </h2>
        </div>
        <SummaryChart containerList={data} unitLabel='MiB Memory'/>
        <p className="App-intro"></p>
      </div>
    );
  }
}

export default App;
