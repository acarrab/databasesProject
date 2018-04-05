import React, { Component } from 'react'
import AccessControl, { AuthProps } from '../../tools/Auth'

export default class Manage extends Component<AuthProps> {

  public render() {
    return (
      <AccessControl auth={this.props.auth}>
        <div className="container">
          <h1>Channel Management!</h1>
        </div >
      </AccessControl>
    );
  }
}
