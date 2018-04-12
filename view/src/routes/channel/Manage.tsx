import React, { Component } from 'react'
import AccessControl from '../../tools/Auth'
import { GlobalProps, Globals } from '../../Control'

export default class Manage extends Component<GlobalProps> {
    previousMessage: string
    public render() {
        let globals: Globals = this.props.globals
        if (globals.previousMessage) {
            this.previousMessage = globals.previousMessage
            globals.previousMessage = ""
        }
        return (
            <AccessControl globals={this.props.globals}>
                <div className="container">
                    {this.previousMessage ? <h4 className="success">{this.previousMessage}</h4> : <div></div>}
                    <h1>Channel Management!</h1>
                </div >
            </AccessControl>
        );
    }
}
