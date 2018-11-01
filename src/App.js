import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'

class App extends Component {
  constructor() {
    super()
    this.state = {
      isAuthenticated : false
    };
  }

  handleLogin = (email,password) => {
    // const data = {email, password} es6
    const data = {email: email, password: password}
    console.log(data)
  }

  render() {
    return (
      <div>
        <Login handleLogin={this.handleLogin}/>
      </div>
    );
  }
}

export default App;
