import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Private from './components//ProfileView/Private';
import User from './components/Dashboard/User';
import Profile from './components/ProfileView/Profile';

class App extends Component {
  render() {
    return (
      <div className="App">
      <HashRouter>
        <Switch>
          < Route path='/' component={ Home } exact />
          < Route path='/private' component={ Private }/>
          < Route path='/user' component={ User }/>
          < Route path='/profile' component={ Profile } />
        </Switch>
      </HashRouter>


      </div>
    );
  }
}

export default App;
