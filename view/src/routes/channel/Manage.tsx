import React, { Component } from 'react'
import AccessControl from '../../tools/Auth'
import { GlobalProps } from '../../Control'

export default class Manage extends Component<GlobalProps> {
    public render() {
        return (
            <AccessControl globals={this.props.globals}>
                <div className="container">
                    <h1>Channel Management!</h1>
                </div >
            </AccessControl>
        );
    }
}
