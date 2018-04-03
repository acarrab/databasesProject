import React, { Component } from 'react'
import AccessControl, { AuthProps } from '../tools/Auth'
import Api, { UserInfo } from '../tools/Api'


export default class Settings extends Component<AuthProps> {
  public render() {
    let info: UserInfo = this.props.auth.userInfo
    return (
      <AccessControl auth={this.props.auth}>
        <div className="container">
          <div className="row">
            {!info ? (<div></div>) : (
              <div className="col-12">
                <p>Username: {info.username}</p>
                <p>Name: <b>{info.f_name}</b> {info.l_name}</p>
              </div>
            )}
          </div>
        </div>
      </AccessControl>
    );
  }
}
