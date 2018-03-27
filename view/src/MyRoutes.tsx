import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { AuthProps } from './Auth'

import Home from './routes/Home'
import History from './routes/History'
import Settings from './routes/Settings'
import Uploads from './routes/Uploads'





// The links that are needed
export interface MyLink { title: string, to: string, icon: string }
export interface Category { title: string, data: Array<MyLink> }


var loggedInLinks: Array<Category> = [
  {
    title: 'Library',
    data: [
      { title: 'Home', to: '/', icon: 'fas fa-home' }
    ]
  },
  {
    title: 'Account',
    data: [
      { title: 'History', to: '/history', icon: 'fas fa-history' },
      { title: 'Uploads', to: '/uploads', icon: 'fas fa-upload' },
      { title: 'Settings', to: '/settings', icon: 'fas fa-cogs' }
    ]
  }
]
var loggedOutLinks: Array<Category> = [
  {
    title: 'Library',
    data: [loggedInLinks[0].data[0]]
  }
]
export function getLinks(isLoggedIn: boolean): Array<Category> {
  if (isLoggedIn) return loggedInLinks
  else return loggedOutLinks
}



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
