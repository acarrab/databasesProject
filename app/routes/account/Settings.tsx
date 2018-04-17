import React, { Component, ChangeEvent } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { Password, Required } from '../../tools/Validate'
import { Globals, GlobalProps } from '../../Control'

import * as Api from '../../Api'
import { api } from '../../Api'


const style = {
    margin: "2em auto",
}


interface LoginState {
}

export default class Settings extends Component<GlobalProps, any> {
    onUsername(e: ChangeEvent<{ value: string }>) {
        e.preventDefault();
        if (e.target.value !== this.state.username)
            this.setState({ username: e.target.value })
    }
    onPassword(e: ChangeEvent<{ value: string }>) {
        e.preventDefault();
        if (e.target.value !== this.state.password)
            this.setState({ password: e.target.value })
    }


    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onUsername = this.onUsername.bind(this)
        this.onPassword = this.onPassword.bind(this)
        this.state = {
            username: "", username_error: "",
            password: "", password_error: "",
            error: ""
        }
    }
    onSubmit() {
        const s = this.state
        let noError = true
        let err = Required(s.username)
        var updates = { username_error: "", password_error: "" }

        if (err) {
            noError = false
            updates.username_error = err
        }

        err = Required(s.password)
        if (err) {
            noError = false
            updates.password_error = err
        }

        if (noError) {
            console.log(s.username, s.password)

            this.props.globals.login(s.username, s.password, () => {
                this.setState({ error: "Incorrect username or password" })
            })
        } else {
            this.setState(updates);
        }
    }
    componentDidMount() {

    }
    render() {
        const s = this.state
        return (
            <div>
                <TextField
                    hintText="Username"
                    errorText={s.username_error}
                    value={s.username}
                    onChange={this.onUsername}
                /><br />
                <TextField
                    hintText="Password"
                    errorText={s.password_error}
                    type="password"
                    value={s.password}
                    onChange={this.onPassword}
                /><br />
                <RaisedButton label="Login" primary={true} style={style} onClick={this.onSubmit} />
            </div>
        );
    }
}
