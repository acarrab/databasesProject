import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { object } from 'prop-types'
import AppBar from 'material-ui/AppBar'


/*
   This is using Material-ui to create a navigation bar.

   http://www.material-ui.com/#/components/app-bar
 */

interface Listener {
  alert: Function;
}

var loginState = false,
    loginListeners: Array<Listener> = [];
class LoginManager {
  // singleton
  static instance = undefined;
  static getInstance() {
    if (LoginManager.instance === undefined) {
      LoginManager.instance = new LoginManager()
    }
    return LoginManager.instance;
  }

  loginState: boolean
  listeners: array<Function>


  constructor() {
    this.loginState = false
    this.listeners = []
  }


  alert() {
    for (let listener in this.listeners) {
      listener.alert(this.loginState)
    }
  }

  register(fun: Function) {
    this.listeners.push(fun)
  }

  set(loginState: boolean) {
    this.loginState = loginState
    this.alert()
  }

  state() {
    return this.loginState
  }
}





class Login extends Component {
  static muiName = 'FlatButton';


  login() {
    // This is where the login routine goes. For now just set states of registered elements.

    // toggle state
    LoginManager.getInstance().set(true);
  }

  render() {
    return (
      <FlatButton {...this.props} onClick={this.login()} label="Login" />
    );
  }
}

class Logged extends Component {

  this.logout() {
    LoginManager.getInstance().set(false)
  }

  render() {
    return (
      <IconMenu
	{...props}
	iconButtonElement={
	  <IconButton><MoreVertIcon /></IconButton>
	}
	targetOrigin={{horizontal: 'right', vertical: 'top'}}
	anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
	<MenuItem primaryText="Refresh" />
	<MenuItem primaryText="Help" />
	<MenuItem primaryText="Sign out" onClick={this.logout()} />
      </IconMenu>
    )
  }
}

export default class NavBar extends Component {
  state: { logged: boolean }

  handleChange = (event, logged) => {
    this.setState({logged: LoginManager.getInstance().state()})

    // binds this to function changeLogin so it has right scope whenever it is called

  };
  constructor(props) {
    super(props)
    let lm = LoginManager.getInstance()

    this.state = {
      logged: lm.state()
    }
    this.changeLogin.bind(this)
    lm.register(this.changeLogin)
  }

  changeLogin(loginState: boolean) {
    this.setState({ logged: loginState });
  }

  render() {
    return (
      <div>
        <AppBar
          title="MeTube"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementRight={this.state.logged ? <Logged /> : <Login />}
        />
      </div>
    );
  }
}
