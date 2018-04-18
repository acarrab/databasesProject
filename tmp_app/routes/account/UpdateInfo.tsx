import React, { Component, ChangeEvent } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { Password, Required, Over255, Over45, Email } from '../../tools/Validate'
import { Globals, GlobalProps } from '../../Control'

import * as Api from '../../Api'
import { api } from '../../Api'



interface InfoState extends Api.input$api$auth$update_info {
    f_name_error: string
    l_name_error: string
    username_error: string
    email_error: string
    channel_error: string
    error: string
}

interface MyE extends ChangeEvent<{ value: string }> { }

export default class InfoSettings extends Component<GlobalProps, InfoState> {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        const u = this.props.globals.user
        this.state = {
            f_name: u.f_name,
            f_name_error: "",
            l_name: u.l_name,
            l_name_error: "",
            username: u.username,
            username_error: "",
            email: u.email,
            email_error: "",
            channel: u.channel,
            channel_error: "",
            error: ""
        }

    }

    onSubmit(e) {
        e.preventDefault();
        const s = this.state
        let noError = true
        var updates: any = {}
        let required = ["f_name", "l_name", "username", "email", "channel"]

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

        let err = undefined
        err = Email(s.email)
        if (err) {
            noError = false
            updates.email_error = err
        }


        if (noError) {
            api.auth.update_info({
                f_name: s.f_name.trim(),
                l_name: s.l_name.trim(),
                username: s.username.trim(),
                email: s.email.trim(),
                channel: s.channel.trim()
            }, (res: Api.output$api$auth$update_info) => {
                console.log(res)
                this.props.globals.user = res
                this.props.globals.update("Account info update successful")
            }, (err: any) => {
                console.log(err)
                this.props.globals.message("Username, Email, or Channel already in use")
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
                    hintText="username"
                    floatingLabelText="username"
                    errorText={s.username_error}
                    value={s.username}
                    onChange={(e: MyE) => { this.setState({ username: e.target.value }) }}
                /><br />

                <TextField
                    hintText="first name"
                    floatingLabelText="first name"
                    errorText={s.f_name_error}
                    value={s.f_name}
                    onChange={(e: MyE) => { this.setState({ f_name: e.target.value }) }}
                /><br />


                <TextField
                    hintText="last name"
                    floatingLabelText="last name"
                    errorText={s.l_name_error}
                    value={s.l_name}
                    onChange={(e: MyE) => { this.setState({ l_name: e.target.value }) }}
                /><br />

                <TextField
                    hintText="email"
                    floatingLabelText="email"
                    errorText={s.email_error}
                    value={s.email}
                    onChange={(e: MyE) => { this.setState({ email: e.target.value }) }}
                /><br />

                <TextField
                    hintText="channel"
                    floatingLabelText="channel"
                    errorText={s.channel_error}
                    value={s.channel}
                    onChange={(e: MyE) => { this.setState({ channel: e.target.value }) }}
                /><br />

                <RaisedButton type="submit" label="Update Info" primary={true} />
            </form>
        );
    }
}
