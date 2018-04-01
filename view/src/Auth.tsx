import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios'

export class UserInfo {
  username: string

  uid: string

  f_name: string
  l_name: string

  id: string

  constructor() {
    this.username = 'tacobot'
    this.uid = 'taco bot'
    this.f_name = 'taco'
    this.l_name = 'bot'
    this.id = 'randomid'
  }
}


export class Authentication {
  userInfo?: UserInfo


  setStateFunc: ({ auth: GlobalVariables }) => void;
  update() { this.setStateFunc({ auth: this }) }


  constructor(globalsContainer: React.Component) {
    this.userInfo = null
    this.setStateFunc = globalsContainer.setState.bind(globalsContainer)
    this.update = this.update.bind(this)
  }

  islogged() {
    return (this.userInfo !== null)
  }
  login(username: string, password: string, itWorked: () => void, itFailed: () => void) {
    console.log(username, password)
    this.userInfo = new UserInfo()
    this.update()

    axios.post('public/api/auth/login.php', { username: username, password: password })
      .then((res) => {
        console.log("success")
        console.log(res)
        itWorked()
      })
      .catch((err) => {
        console.log("failed")
        console.log(err)
        itFailed()
      })
  }
  logout() {
    this.userInfo = null
    this.update()
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
