import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './components/Home';
import GameComponent from './components/Game';
import './App.css';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/game" component={GameComponent}/>
        <Route path="/" component={Home}/>
      </Switch>
    </Router>
  );
};

export default App;
