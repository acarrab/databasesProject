import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { AuthProps } from '../tools/Auth'
import Api, { VideoInfo } from '../tools/Api'

import Home from './videos/Home'
import History from './videos/History'
import Settings from './account/Settings'
import Uploads from './account/Uploads'
import Login from './account/Login'





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
  },
  {
    title: '',
    data: [
      { title: 'Login', to: '/login', icon: 'fas fa-sign-in-alt' }
    ]
  }
]
export function getLinks(isLoggedIn: boolean): Array<Category> {
  if (isLoggedIn) return loggedInLinks
  else return loggedOutLinks
}

interface RoutesProps extends AuthProps {
  videos: Array<VideoInfo>
  updateVideoView: () => void
}

export default class Routes extends Component<RoutesProps> {
  public render() {
    return (
      <div className="main-content">
        <div className="row">
          <Switch>
            <Route exact path="/" render={(routeProps) => (<Home {...routeProps} {...this.props} />)} />
            <Route path="/history" render={(routeProps) => (<History {...routeProps} {...this.props} />)} />
            <Route path="/settings" render={(routeProps) => (<Settings {...routeProps} {...this.props} />)} />
            <Route path="/uploads" render={(routeProps) => (<Uploads {...routeProps} {...this.props} />)} />
            <Route path="/login" render={(routeProps) => (<Login {...routeProps} {...this.props} />)} />
          </Switch>
        </div>
      </div>
    )
  }
}
