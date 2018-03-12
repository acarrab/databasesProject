import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { AuthProps } from './Auth'

import Home from './routes/Home'
import History from './routes/History'
import Settings from './routes/Settings'
import Uploads from './routes/Uploads'

export default class MyRoutes extends Component<AuthProps> {
  public render() {
    return (
      <div className="main-content">
        <div className="row">
          <Switch>
            <Route exact path="/" render={(routeProps) => (<Home {...routeProps} {...this.props} />)} />
            <Route path="/history" render={(routeProps) => (<History {...routeProps} {...this.props} />)} />
            <Route path="/settings" render={(routeProps) => (<Settings {...routeProps} {...this.props} />)} />
            <Route path="/uploads" render={(routeProps) => (<Uploads {...routeProps} {...this.props} />)} />
          </Switch>
        </div>
      </div>
    )
  }
}
