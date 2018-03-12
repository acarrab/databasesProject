import React, { Component } from 'react'
import Access, { AuthProps } from '../Auth'


export default class Home extends Component<AuthProps> {
  public render() {
    let info = this.props.auth.userInfo
    return (
      <Access auth={this.props.auth}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p>Username: {info.username}</p>
              <p>Name: <b>{info.firstname}</b> {info.lastname}</p>
            </div>
          </div>
        </div>
      </Access>
    );
  }
}
