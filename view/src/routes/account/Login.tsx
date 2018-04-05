import React, { Component } from 'react'
import { Authentication, AuthProps } from '../../tools/Auth'
import { withRouter, RouteComponentProps } from 'react-router-dom'




interface LoginProps extends RouteComponentProps<any> {
  auth: Authentication
}

class Login extends Component<LoginProps> {
  state: { loginFailed: boolean }


  username: { value: string, blur: () => void }
  password: { value: string, blur: () => void }
  login() {
    let auth: Authentication = this.props.auth;
    auth.login({
      username: this.username.value,
      password: this.password.value,
      itWorked: (res) => {
        this.props.history.push('/');
      },
      itFailed: (err) => {
        console.log(err)
        this.setState({ loginFailed: true });
      }
    })
  }
  enterClicked() {
    // this gets the text
    this.username.blur();
    this.password.blur();
    this.login()
  }
  handleKeyPress(event) {
    if (event.key == 'Enter') {
      this.enterClicked()
    }
  }
  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.state = {
      loginFailed: false
    }
  }
  public render() {
    let loginFailed = this.state.loginFailed;
    return (
      <div className="form-container">
        <div className="form row">
          <div className="col-12">
            <h1>Log Into your Account</h1>
          </div>
          <hr />
          <div className="col-12">
            {loginFailed ? (<p style={{ color: "red" }}>Wrong Credentials...</p>) : (<div></div>)}
          </div>
          <div className="col-8 offset-2">
            <input ref={(input) => { this.username = input }} placeholder="username"></input>
          </div>
          <div className="col-8 offset-2">
            <input ref={(input) => { this.password = input }} type="password" placeholder="password" onKeyPress={this.handleKeyPress}></input>
          </div>
          <hr />
          <div className="col-4 offset-4">
            <button onClick={this.login}>
              Login
            </button>
          </div>
        </div>
      </div >
    )
  }
}

export default withRouter<LoginProps>(Login);
