import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import { VideoList } from './Video';
interface ViewControlProps { baseUrl: string; }

export default class ViewControl extends React.Component<ViewControlProps> {
  static instance: ViewControl

  constructor(props) {
    super(props)
    ViewControl.instance = this
  }

  public render() {
    return (
      <div style={{ width: '100%'}}>
	<Router ref='router' basename={this.props.baseUrl}>
	  <div>
	    <AppBar title="MeTube" iconClassNameRight="muidocs-icon-navigation-expand-more" />
	    <Switch>
	      <Route exact  path='/' component={VideoList}/>
	    </Switch>
	  </div>
	</Router>
      </div>
    )
  }
}
