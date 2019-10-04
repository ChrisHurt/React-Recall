import React from 'react'
import './loginregister.component.scss'
import $ from 'jquery'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

let domainName = 'https://react-recall-be.herokuapp.com'

export default class LoginRegister extends React.Component {

  state = {
    loginUsername: '',
    registerUsername: '',
    email: '',
    loginPassword: '',
    registerPassword: '',
    loginErrorMessage: null,
    registerErrorMessage: null
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
      return <Redirect to='/React-Recall/data_collections/me'/>
    }
  }

  submitLogin = (e) => {
    e.preventDefault()

    const loginData = { username: this.state.loginUsername, password: this.state.loginPassword }
    axios.post(`${domainName}/login`,loginData).then(res => {
      if(res.data.authenticated){
        this.props.updateUserID(res.data.user_id,res.data.username)
      } else {
        this.setState({
          loginErrorMessage: `Login Error: ${res.data.msg}`,
          registerErrorMessage: null
        })
      }
    })
    .catch(err => this.setState({loginErrorMessage: err}))
  }

  submitRegister = (e) => {
    e.preventDefault()
    const newUser = {
      username: this.state.registerUsername,
      email: this.state.email,
      password: this.state.registerPassword
    }
    axios.post(`${domainName}/users/add`, newUser)
      .then(res=> {

        if(res.data.success){
          console.log('Successful user addition, logging in...')
          const loginData = { username: newUser.username, password: newUser.password }
          axios.post(`${domainName}/login`,loginData).then(res => {
            if(res.data.authenticated){
              this.props.updateUserID(res.data.user_id,res.data.username)
              $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
            } else {
              this.setState({
                loginErrorMessage: 'Registration Error: Invalid username or email',
                registerErrorMessage: null
              })
            }
          })
        } else {
          console.log(res.data)
          this.setState({
            registerErrorMessage: `Registration Error: ${res.data.msg}`,
            loginErrorMessage: null
          })
        }
      })
      .catch(err => {
        this.setState({
          registerErrorMessage: `Registration Error: Invalid username or email`,
          loginErrorMessage: null
        })
      })

  }

  componentDidMount = () => {
    $('.message a').click(function(){
      $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
   });
  }

  render(){
    return (
    <div className="full-page">
      {this.renderRedirect()}
      {(this.state.loginErrorMessage) ? (<div className="error-message">{this.state.loginErrorMessage}</div>): ('')}
      {(this.state.registerErrorMessage) ? (<div className="error-message">{this.state.registerErrorMessage}</div>): ('')}
      <div className="login-page">
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
    </div>
    )
  }
}