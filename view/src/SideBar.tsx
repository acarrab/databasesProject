import React, { Component } from 'react'
import ScrollArea from 'react-scrollbar'
import { AuthProps } from './Auth'
import { Link } from 'react-router-dom'
import { getLinks, Category, MyLink } from './MyRoutes'



interface SideBarProps extends AuthProps {
  className?: string
  style?: object
}
// <button><i className="fas fa-filter"></i>Categories</button>
// <button><i className="fas fa-newspaper"></i>New</button>

const createLink = (link: MyLink) => (
  <Link to={link.to}>
    <button >
      <i className={link.icon}></i>{link.title}
    </button>
  </Link>
)

const createCategory = (category: Category) => (
  <div className="side-bar-category">
    <h1>{category.title}</h1>
    {category.data.map(createLink)}
    <hr />
  </div>
)

export default class SideBar extends Component<SideBarProps> {
  public render() {
    let auth = this.props.auth
    return (
      <div className={this.props.className + " side-bar"} style={this.props.style}>
        {getLinks(auth.islogged()).map(createCategory)}
	{auth.islogged() ?
         (<button onClick={() => (auth.logout())}><i className="fas fa-sign-out-alt"></i>Logout</button>) :
	 (<button onClick={() => (auth.login())}><i className="fas fa-sign-in-alt" ></i>Login</button>)
	}
        <hr />
        <h2>&copy; MeTube, LLC</h2>
      </div>
    )
  }
}
