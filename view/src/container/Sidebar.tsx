import React, { Component } from 'react'
import ScrollArea from 'react-scrollbar'
import { AuthProps } from '../tools/Auth'
import { Link } from 'react-router-dom'
import { getLinks, Category, MyLink } from '../routes/Routes'



interface SideBarProps extends AuthProps {
  className?: string
  style?: object
  toggleExpand: () => void
}

export default class SideBar extends Component<SideBarProps> {

  loggedInView() {
    return (
      <div>
        <div className="side-bar-category">
          <h1>Library</h1>
          <Link to="/"><button><i className="fas fa-home"></i>Home</button></Link>
        </div>
        <hr />
        <div className="side-bar-category">
          <h1>Account</h1>
          <Link to="/history"><button><i className="fas fa-history"></i>History</button></Link>
          <Link to="/uploads"><button><i className="fas fa-upload"></i>Uploads</button></Link>
          <Link to="/settings"><button><i className="fas fa-cogs"></i>Settings</button></Link>
        </div>
        <hr />
        <button onClick={() => (this.props.auth.logout())}><i className="fas fa-sign-out-alt"></i>Logout</button>
      </div>
    )
  }
  loggedOutView() {
    return (
      <div>
        <div className="side-bar-category">
          <h1>Library</h1>
          <Link to="/"><button><i className="fas fa-home"></i>Home</button></Link>
        </div>
        <hr />
        <div className="side-bar-category">
          <Link to="/login" onClick={this.props.toggleExpand}><button><i className="fas fa-sign-in-alt"></i>Login</button></Link>
        </div>
      </div>
    )
  }

  public render() {
    return (
      <div className={this.props.className + " side-bar"} style={this.props.style}>
        {this.props.auth.islogged() ? this.loggedInView() : this.loggedOutView()}
        <h2>&copy; MeTube, LLC</h2>
      </div>
    )
  }
}
