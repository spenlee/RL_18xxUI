import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './components/Home';
import Game from './components/Game';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path={`/game/:id`} component={Game}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  );
};

export default App;
