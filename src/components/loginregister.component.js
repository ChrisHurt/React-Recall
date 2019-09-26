import React from 'react'
import './loginregister.component.scss'
import $ from 'jquery'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

export default class LoginRegister extends React.Component {

  state = {
    loginUsername: '',
    registerUsername: '',
    email: '',
    loginPassword: '',
    registerPassword: '',
    loginErrorMessage: '',
    registerErrorMessage: ''
  }

  onChangeLoginUsername = (e) =>{
    this.setState({
      loginUsername: e.target.value
    })
  }

  onChangeLoginPassword = (e) =>{
    this.setState({
      loginPassword: e.target.value
    })
  }

  onChangeRegisterUsername = (e) =>{
    this.setState({
      registerUsername: e.target.value
    })
  }

  onChangeEmail = (e) =>{
    this.setState({
      email: e.target.value
    })
  }

  onChangeRegisterPassword = (e) =>{
    this.setState({
      registerPassword: e.target.value
    })
  }
  
  renderRedirect = () => {
    if(this.props.user_id !== null && this.props.user_id !== undefined){
      return <Redirect to='/data_collections/me'/>
    }
  }

  submitLogin = (e) => {
    e.preventDefault()

    const loginData = { username: this.state.loginUsername, password: this.state.loginPassword }
    axios.post('http://localhost:5000/login',loginData).then(res => {
      if(res.data.authenticated){
        console.log(res.data.user_id)

        this.props.updateUserID(res.data.user_id)
        
      } else {
        // Change Login Error Message Here
      }
    })
    .catch(err => this.setState({errorMessage: err}))
  }

  submitRegister = (e) => {
    e.preventDefault()
    const newUser = {
      username: this.state.registerUsername,
      email: this.state.email,
      password: this.state.registerPassword
    }
    axios.post('http://localhost:5000/users/add', newUser)
      .then(res=> {
        console.log(res.data.msg)
        if(res.data.success){
          console.log('Successful user addition, logging in...')
          const loginData = { username: newUser.username, password: newUser.password }
          axios.post('http://localhost:5000/login',loginData).then(res => {


            if(res.data.authenticated){
              // window.location = '/data_collections/new'
              
            } else {
              // Change Register Error Message Here
            }
          })
        } else {
          this.setState({errorMessage: 'Invalid email, username or password.'})
        }
      })
      .catch(err => this.setState({errorMessage: err}))

  }

  componentDidMount = () => {
    $('.message a').click(function(){
      $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
   });
  }

  render(){
    return (
    <div className="login-page">
      {this.renderRedirect()}
      {(this.state.loginErrorMessage) ? (<div>{this.state.loginErrorMessage}</div>): ('')}
      <div className="form">
        <form className="register-form">
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={this.onChangeRegisterUsername}
            value={this.state.registerUsername}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={this.onChangeRegisterPassword}
            value={this.state.registerPassword}
          />
          <input
            type="text"
            placeholder="email address"
            name="email"
            onChange={this.onChangeEmail}
            value={this.state.email}
          />
          <button type="button" onClick={this.submitRegister}>create</button>
          <p className="message">Already registered? <a href="#">Sign In</a></p>
        </form>
        <form className="login-form">
          <input
            type="text"
            placeholder="username"
            name="username"
            onChange={this.onChangeLoginUsername}
            value={this.state.loginUsername}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={this.onChangeLoginPassword}
            value={this.state.loginPassword}
          />
          <button type="button" onClick={this.submitLogin}>login</button>
          <p className="message">Not registered? <a href="#">Create an account</a></p>
        </form>
      </div>
    </div>
    )
  }
}