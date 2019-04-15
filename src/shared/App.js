import React, { Component } from 'react';
import { Route } from "react-router";
import './styles/app.scss';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="App">
          { routes.map((route, i) => ( <Route key={i} {...route} /> ))}}
      </div>
    );
  }
}

export default App;
