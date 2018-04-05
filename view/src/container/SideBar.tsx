import React, { Component } from 'react'
import ScrollArea from 'react-scrollbar'
import { AuthProps } from '../tools/Auth'
import { Link } from 'react-router-dom'
import { Category, MyLink, loggedInLinks, loggedOutLinks } from '../routes/Routes'



interface SideBarProps extends AuthProps {
  className?: string
  style?: object
  toggleExpand: () => void
}

export default class SideBar extends Component<SideBarProps> {
  constructor(props) {
    super(props)
    this.renderMyLink = this.renderMyLink.bind(this)
    this.renderCategory = this.renderCategory.bind(this)
  }
  renderMyLink(myLink: MyLink) {
    return (
      <Link key={myLink.title} to={myLink.to}><button><i className={myLink.icon}></i>{myLink.title}</button></Link>
    )
  }
  renderCategory(category: Category) {
    return (
      <div key={category.title + category.data[0].title}>
        {category.title.length == 0 ? <div></div> : (<h1>{category.title}</h1>)}
        {category.data.map(this.renderMyLink)}
        <hr />
      </div>
    )
  }


  public render() {
    let isLogged = this.props.auth.islogged()

    return (
      <div className={this.props.className + " side-bar"} style={this.props.style}>
        {isLogged ?
          <div>
            {loggedInLinks.map(this.renderCategory)}
            <button onClick={() => (this.props.auth.logout())}><i className="fas fa-sign-out-alt"></i>Logout</button>
            <hr />
          </div>
          :
          <div>
            {loggedOutLinks.map(this.renderCategory)}
          </div>
        }
        <h2>&copy; MeTube, LLC</h2>
      </div>
    )
  }
}
