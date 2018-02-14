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
    return (
      <div style={{ width: '100%'}}>
	<Router ref='router' basename={this.props.baseUrl}>
	  <div>
	    <MainBar style={{ display: "float", height: navBarHeight }} toggleExpand={() => {this.toggleExpand()}} />
	    <div className="container-fluid">
	      <div className="row" >
		<SideBar className={this.state.expanded ? "col-2" : "d-none"} style={{ display: "float", height: "100vh" }} />
		<div className={this.state.expanded ? "col-10" : "col-12"} style={{ paddingTop: navBarHeight }}>
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
