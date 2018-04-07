import React, { Component } from 'react'
import AccessControl from '../../tools/Auth'
import { Globals, GlobalProps } from '../../Control'

export default class History extends Component<GlobalProps> {
    public render() {
        return (
            <AccessControl globals={this.props.globals}>
                <div className="container">
                    <div className="col-12" style={{ textAlign: "center", width: "100%" }}>
                        <h1>History!</h1>
                    </div>
                </div>
            </AccessControl>
        )
    }
}
