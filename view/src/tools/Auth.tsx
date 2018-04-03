import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Api, { UserInfo, LoginInput } from './Api'



export class Authentication {
  userInfo?: UserInfo = null

  setStateFunc: ({ auth: GlobalVariables }) => void;
  update() { this.setStateFunc({ auth: this }) }

  constructor(globalsContainer: React.Component) {
    this.setStateFunc = globalsContainer.setState.bind(globalsContainer)
    this.update = this.update.bind(this)
  }

  islogged() {
    return (this.userInfo !== null)
  }
  login(vars: LoginInput) {

    Api.Auth.login({
      username: vars.username,
      password: vars.password,
      itWorked: (res) => {
        this.userInfo = new UserInfo("Taco", "Bot", "TacoBot314", "tacobot@gmail.com");
        vars.itWorked(res);
      },
      itFailed: (err) => { vars.itFailed(err) }
    })
  }
  logout() {
    this.userInfo = null
    this.update()
    Api.Auth.logout()
  }
}

export interface AuthProps { auth: Authentication }

interface AuthAccessProps extends RouteComponentProps<any> {
  auth: Authentication
}
class AccessControl extends Component<AuthAccessProps> {
  componentDidMount() {
    if (!this.props.auth.islogged()) {
      // return the user to home if they do not have access
      this.props.history.push('/')
    }
  }
  componentDidUpdate() {
    if (!this.props.auth.islogged()) {
      // return the user to home if they do not have access
      this.props.history.push('/')
    }
  }
  render() {
    if (this.props.auth.islogged())
      return (<div style={{ width: "100%" }}>{this.props.children}</div>)
    else
      return (<div></div>)
  }
}
export default withRouter<AuthAccessProps>(AccessControl)
