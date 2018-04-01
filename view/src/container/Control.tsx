
import React from 'react'

import { Authentication } from '../Auth'

import MainBar from './MainBar'
import SideBar from './SideBar'
import MyRoutes from '../routes/Routes'


export default class ViewControl extends React.Component {

  state: { expanded: boolean, globals: Authentication }

  constructor(props) {
    super(props)
    this.state = { expanded: false, globals: new Authentication(this) }
    this.toggleExpand = this.toggleExpand.bind(this)
  }

  toggleExpand() { this.setState({ expanded: !this.state.expanded }) }

  public render() {
    let isExpanded = this.state.expanded;
    let expanded = (isExpanded ? "expanded" : "collapsed")

    return (
      <div className="view-control">
        <MainBar toggleExpand={this.toggleExpand} auth={this.state.globals} />
        <SideBar className={"side-" + expanded + " side-bar"} auth={this.state.globals} toggleExpand={this.toggleExpand} />
        <div className={isExpanded ? "content-hider" : ""} onClick={this.toggleExpand}></div>
        <MyRoutes auth={this.state.globals} />
      </div>
    )
  }
}
