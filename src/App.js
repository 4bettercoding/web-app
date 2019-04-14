import React, { Component } from 'react';
import '../src/styles/app.scss';
import Sample from './components/sample/Sample'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Sample/>
      </div>
    );
  }
}

export default App;
