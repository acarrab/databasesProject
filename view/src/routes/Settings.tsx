import React, { Component } from 'react'
import AccessControl, { AuthProps } from '../Auth'


export default class Settings extends Component<AuthProps> {
  public render() {
    let info = this.props.auth.userInfo
    return (
      <AccessControl auth={this.props.auth}>
        <div className="container">
          <div className="row">
            {!info ? (<div></div>) : (
              <div className="col-12">
                <p>Username: {info.username}</p>
                <p>Name: <b>{info.firstname}</b> {info.lastname}</p>
              </div>
            )}
          </div>
        </div>
      </AccessControl>
    );
  }
}
