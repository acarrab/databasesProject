import React, { Component } from 'react'
import Access, { AuthProps } from '../Auth'


export default class History extends Component<AuthProps> {
  public render() {
    return (
      <Access auth={this.props.auth}>
        <div className="container">
          <div className="col-12">
            <h1>History!</h1>
          </div>
        </div>
      </Access>
    );
  }
}
