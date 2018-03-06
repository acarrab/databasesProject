import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { GlobalProps } from './Global'

import { VideoList } from './routes/Video'

interface MyRoutesProps extends GlobalProps { }

export default class MyRoutes extends Component<MyRoutesProps> {
  public render() {
    return (
      <div className="main-content">
        <div className="row">
          <Switch>
            <Route exact path="/" component={VideoList} />
          </Switch>
        </div>
      </div>
    )
  }
}
