import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

export class UserInfo {
  username: string

  name: string
  firstname: string
  lastname: string

  id: string

  constructor() {
    this.username = 'tacobot'
    this.name = 'taco bot'
    this.firstname = 'taco'
    this.lastname = 'bot'
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
  login() {
    this.userInfo = new UserInfo()
    this.update()
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
class AuthenticationAccess extends Component<AuthAccessProps> {
  componentDidMount() {
    if (!this.props.auth.islogged()) {
      // return the user to home if they do not have access
      this.props.history.push('/')
    }
  }
  render() {
    return (<div>{this.props.children}</div>)
  }
}
export default withRouter<AuthAccessProps>(AuthenticationAccess)
