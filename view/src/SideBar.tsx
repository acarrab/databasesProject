import React, { Component } from 'react'
import ScrollArea from 'react-scrollbar'
import { AuthProps } from './Auth'
import { Link } from 'react-router-dom'


interface SideBarProps extends AuthProps {
  className?: string
  style?: object
}
// <button><i className="fas fa-filter"></i>Categories</button>
// <button><i className="fas fa-newspaper"></i>New</button>



export default class SideBar extends Component<SideBarProps> {

  public render() {
    let auth = this.props.auth
    if (auth.islogged()) {
      return (
        <div className={this.props.className + " side-bar"} style={this.props.style}>
          <h1>Library</h1>
          <button><Link to="/"><i className="fas fa-home"></i>Home</Link></button>
          <hr />
          <h1>Account</h1>
          <button><Link to="/history"><i className="fas fa-history"></i>History</Link></button>
          <button><Link to="/uploads"><i className="fas fa-upload"></i>Uploads</Link></button>
          <button><Link to="/settings"><i className="fas fa-cogs"></i>Setting</Link></button>
          <button onClick={() => (auth.logout())}><i className="fas fa-sign-out-alt"></i>Logout</button>
          <hr />
          <h2>&copy; MeTube, LLC</h2>
        </div>
      )
    } else {
      return (
        <div className={this.props.className + " side-bar"} style={this.props.style}>
          <button><Link to="/"><i className="fas fa-home"></i>Home</Link></button>
          <hr />
          <button onClick={() => (auth.login())}><i className="fas fa-sign-in-alt" ></i>Login</button>

          <h2>&copy; MeTube, LLC</h2>
        </div>
      )
    }
  }
}
