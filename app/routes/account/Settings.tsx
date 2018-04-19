import React, { Component, ChangeEvent } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { Password, Required } from '../../tools/Validate'
import { Globals, GlobalProps } from '../../Control'

import UpdateInfo from './UpdateInfo'
import UpdatePassword from './UpdatePassword'

import * as Api from '../../Api'
import { api } from '../../Api'

import Paper from 'material-ui/Paper';

const styles = {
    paper: {
        maxWidth: "70rem",
        padding: "4rem",
        margin: "0 auto"
    },
}


interface LoginState {
}

export default class Settings extends Component<GlobalProps, any> {
    render() {
        let globals: Globals = this.props.globals
        if (globals.noAccess()) { return globals.noAccessRet() }

        return (
            <div>
                <Paper zDepth={3} style={styles.paper}>
                    <UpdateInfo globals={this.props.globals} />
                </Paper>
                <Paper zDepth={3} style={styles.paper}>
                    <UpdatePassword globals={this.props.globals} />
                </Paper>
            </div>
        )
    }
}
