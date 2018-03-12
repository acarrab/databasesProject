import React, { Component } from 'react'
import Access, { AuthProps } from '../Auth'


export default class Home extends Component<AuthProps> {
  public render() {
    return (
      <Access auth={this.props.auth}>
        <div className="container">
          <h1>Uploads!</h1>
        </div>
      </Access>
    );
  }
}
