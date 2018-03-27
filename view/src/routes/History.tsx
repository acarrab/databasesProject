import React, { Component } from 'react'
import AccessControl, { AuthProps } from '../Auth'


export default class History extends Component<AuthProps> {
  public render() {
    return (
      <AccessControl auth={this.props.auth}>
        <div className="container">
          <div className="col-12" style={{ textAlign: "center", width: "100%" }}>
            <h1>History!</h1>
          </div>
        </div>
      </AccessControl>
    )
  }
}
