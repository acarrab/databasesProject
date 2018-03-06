
import React from 'react'
import { HashRouter as Router } from 'react-router-dom'
import { GlobalProps } from './Global'

import MainBar from './MainBar'
import SideBar from './SideBar'
import MyRoutes from './MyRoutes'


interface ViewControlProps extends GlobalProps {}

export default class ViewControl extends React.Component<ViewControlProps> {

  state: { expanded: boolean }

  constructor(props) {
    super(props)
    this.state = { expanded: false }

    this.toggleExpand = this.toggleExpand.bind(this)
  }

  toggleExpand() { this.setState({ expanded: !this.state.expanded }) }

  public render() {
    let isExpanded = this.state.expanded;
    let expanded=(isExpanded ? "expanded" : "collapsed")

    return (
      <div style={{ width: '100%'}} className="view-control">
	<Router ref='router' basename={this.props.globals.baseUrl}>
	  <div>
	    <MainBar toggleExpand={this.toggleExpand} />
	    <SideBar className={"side-"+expanded+" side-bar"}/>
	    <div className={isExpanded ? "content-hider" : ""}></div>
	    <MyRoutes globals={this.props.globals} />
	  </div>
	</Router>
      </div>
    )
  }
}
