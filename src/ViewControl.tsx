import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { VideoList } from './Video'
import MainBar from './MainBar'
import SideBar from './SideBar'
interface ViewControlProps { baseUrl: string; }


export default class ViewControl extends React.Component<ViewControlProps> {
  static instance: ViewControl
  state: { expanded: boolean }

  constructor(props) {
    super(props)
    ViewControl.instance = this
    this.state = {
      expanded: false
    }
  }

  toggleExpand() {
    this.setState({ expanded: !this.state.expanded })
  }

  public render() {
    let navBarHeight="3.1em"
    let expanded=(this.state.expanded ? "expanded" : "collapsed")
    return (
      <div style={{ width: '100%'}} className="view-control">
	<Router ref='router' basename={this.props.baseUrl}>
	  <div >
	    <MainBar style={{ display: "float", height: navBarHeight }} toggleExpand={() => {this.toggleExpand()}} />
	    <div className="container-fluid">
	      <div className="row" >
		<SideBar className={"side-"+expanded}/>
		<div className={"main-content-side-"+expanded} style={{ paddingTop: navBarHeight }}>
		  <Switch >
		    <Route exact  path='/' component={VideoList}/>
		  </Switch>
		</div>
	      </div>
	    </div>
	  </div>
	</Router>
      </div>
    )
  }
}
