import React, { Component, ChangeEvent } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { Password, PasswordConfirm, Required, Over255, Over45, Email } from '../../tools/Validate'
import { Globals, GlobalProps } from '../../Control'

import * as Api from '../../Api'
import { api } from '../../Api'

const istyle = {
    margin: ".5em 1em"
}


interface InfoState extends Api.input$api$auth$update_password {
    old_password_error: string
    password_error: string
    confirm: string
    confirm_error: string
    error: string
}

interface MyE extends ChangeEvent<{ value: string }> { }

export default class InfoSettings extends Component<GlobalProps, InfoState> {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        const u = this.props.globals.user
        this.state = {
            old_password_error: "",
            old_password: "",
            password: "",
            password_error: "",
            confirm: "",
            confirm_error: "",
            error: ""
        }

    }

    onSubmit(e) {
        e.preventDefault();
        const s = this.state
        let noError = true
        var updates: any = {}
        let required = ["old_password"]

        required.map((field: string) => {
            updates[field + "_error"] = ""
        })

        required.map((field: string) => {
            let err = Required(s[field])
            if (err) {
                noError = false
                updates[field + "_error"] = err
            }
        })
        required.map((field: string) => {
            let err = Over45(s[field])
            if (err) {
                noError = false
                updates[field + "_error"] = err
            }
        })
        let err = Password(s.password)
        if (err) {
            noError = false
            updates.password_error = err
        }


        err = PasswordConfirm(s.password, s.confirm)
        if (err) {
            noError = false
            updates.confirm_error = err
        }


        if (noError) {
            api.auth.update_password({
                old_password: s.old_password,
                password: s.password,
            }, (res: Api.output$api$auth$update_password) => {
                console.log(res)
                this.props.globals.user = res
                this.props.globals.update("Account info update successful")
                this.setState({
                    password: "",
                    old_password: "",
                    confirm: ""
                })
            }, (err: any) => {
                console.log(err)
                this.props.globals.message("Incorrect old password")
            })
        } else {
            this.setState(updates);
        }
    }
    componentDidMount() {

    }
    render() {
        const s = this.state
        let globals: Globals = this.props.globals
        if (globals.noAccess()) { return globals.noAccessRet() }

        return (
            <form onSubmit={this.onSubmit}>
                <TextField
                    hintText="old password"
                    floatingLabelText="old password"
                    errorText={s.old_password_error}
                    value={s.old_password}
                    style={istyle}
                    type="password"
                    onChange={(e: MyE) => { this.setState({ old_password: e.target.value }) }}
                /><br />
                <div>
                    <TextField
                        hintText="password"
                        floatingLabelText="password"
                        errorText={s.password_error}
                        value={s.password}
                        style={istyle}
                        type="password"
                        onChange={(e: MyE) => { this.setState({ password: e.target.value }) }}
                    />

                    <TextField
                        hintText="confirm"
                        floatingLabelText="confirm"
                        errorText={s.confirm_error}
                        value={s.confirm}
                        style={istyle}
                        type="password"
                        onChange={(e: MyE) => { this.setState({ confirm: e.target.value }) }}
                    />
                </div>

                <RaisedButton type="submit" label="Update Password" primary={true} />
            </form>
        );
    }
}
