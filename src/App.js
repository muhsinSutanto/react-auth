import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login'
import Register from './components/Register'
import EmployeesDetail from './components/EmployeeDetail'
import axios from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      isAuthenticated : false,
      employees: []
    };
  }

  handleLogin = (email,password) => {
    // const data = {email, password} es6
    const data = {email: email, password: password}
    axios.post('https://impact-byte-demo.herokuapp.com/accounts/login', data)
          .then(res => {
            console.log(res.data.message)
            if (res.data.message === 'You are logged in'){
              localStorage.setItem('token', res.data.token);
              this.setState({
                isAuthenticated: true
              })
            } else {
              console.log('eror bro')
            }})
          .catch(err => console.log(err))
    
    }

  handleRegister = (first_name, last_name, email, password) => {
    const body = {
      first_name, last_name, email, password
    }
    axios.post('https://impact-byte-demo.herokuapp.com/accounts/register', body
    ).then(res=> {
      console.log(res)
      if (res.data.message === "insert account data success") {
        alert('success bro')
      }else {
        alert('gagal cuy')
      }}
    ).catch(err => console.log(err))
  }

  getEmployeesData = () => {
    axios
      .get('https://impact-byte-demo.herokuapp.com/employees', {
        headers : {
          authorization: `bearer ${localStorage.token}`
        }
      })
      .then(res => {
        this.setState({
          employees : res.data.data
        })
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  handleLogOut = () => {
    this.setState({
      isAuthenticated : false,
      employees : []
    })
    localStorage.removeItem('token')
  }

  componentDidMount = () => {
    if (localStorage.token) {
      this.setState({
        isAuthenticated : true
      })
    }
  }


  render() {
    return (
      <div>
        <Login handleLogin={this.handleLogin}/>
        <Register handleRegister={this.handleRegister}/>
        {this.state.isAuthenticated ? (
          <h1> Your are authenticated</h1>
        ) : (<h1> you are not authenticated</h1>)}
        <button onClick={this.getEmployeesData}> get employees data</button>
        {this.state.employees && 
          this.state.employees.map((data, index) =>
          (<EmployeesDetail
            key = {index}
            emp_no = {data.emp_no}
            first_name = {data.first_name}
            last_name = {data.last_name}
            />))}
        <h1>Log out </h1>
        <button onClick= {() =>this.handleLogOut()}> log out </button>       
      </div>
    );
  }
}

export default App;
