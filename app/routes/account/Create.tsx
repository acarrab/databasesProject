import React, { Component, ChangeEvent } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { Password, Required, Over255, Over45, Email } from '../../tools/Validate'
import { Globals, GlobalProps } from '../../Control'

import * as Api from '../../Api'
import { api } from '../../Api'

const style = {
    margin: "2em auto",
}
const istyle = {
    margin: ".5em 1em"
}

interface InfoState extends Api.input$api$auth$create {
    f_name_error: string
    l_name_error: string
    username_error: string
    email_error: string
    channel_error: string
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
        this.state = {
            f_name: "",
            f_name_error: "",
            l_name: "",
            l_name_error: "",
            username: "",
            username_error: "",
            email: "",
            email_error: "",
            channel: "",
            channel_error: "",
            password: "",
            password_error: "",
            confirm: "",
            confirm_error: "",
            error: ""
        }

    }

    onSubmit() {
        const s = this.state
        let noError = true
        var updates: any = {}
        let required = ["f_name", "l_name", "username", "email", "channel", "password", "confirm"]

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

        err = Password(s.password, s.confirm)
        if (err) {
            noError = false
            updates.confirm_error = err
        }



        if (noError) {
            api.auth.create({
                f_name: s.f_name.trim(),
                l_name: s.l_name.trim(),
                username: s.username.trim(),
                email: s.email.trim(),
                channel: s.channel.trim(),
                password: s.password
            }, (res: Api.output$api$auth$create) => {
                console.log(res)
                this.props.globals.user = res
                this.props.globals.update("Account created successfully")
            }, (err: any) => {
                console.error(err)
                this.props.globals.message("Username, Email, or Channel already in use")
            })
            this.setState(updates);

        } else {
            this.setState(updates);
        }
    }
    componentDidMount() {

    }
    render() {
        const s = this.state
        return (
            <form onSubmit={this.onSubmit}>.
                <TextField
                    hintText="username"
                    errorText={s.username_error}
                    value={s.username}
                    style={istyle}
                    onChange={(e: MyE) => { this.setState({ username: e.target.value }) }}
                />

                <TextField
                    hintText="email"
                    errorText={s.email_error}
                    value={s.email}
                    style={istyle}
                    onChange={(e: MyE) => { this.setState({ email: e.target.value }) }}
                /><br />

                <TextField
                    hintText="f_name"
                    errorText={s.f_name_error}
                    value={s.f_name}
                    style={istyle}
                    onChange={(e: MyE) => { this.setState({ f_name: e.target.value }) }}
                />


                <TextField
                    hintText="l_name"
                    errorText={s.l_name_error}
                    value={s.l_name}
                    style={istyle}
                    onChange={(e: MyE) => { this.setState({ l_name: e.target.value }) }}
                /><br />



                <TextField
                    hintText="channel"
                    errorText={s.channel_error}
                    value={s.channel}
                    style={istyle}
                    onChange={(e: MyE) => { this.setState({ channel: e.target.value }) }}
                /><br />

                <div>
                    <TextField
                        hintText="password"
                        errorText={s.password_error}
                        value={s.password}
                        style={istyle}
                        type="password"
                        onChange={(e: MyE) => { this.setState({ password: e.target.value }) }}
                    />

                    <TextField
                        hintText="confirm"
                        errorText={s.confirm_error}
                        value={s.confirm}
                        style={istyle}
                        type="password"
                        onChange={(e: MyE) => { this.setState({ confirm: e.target.value }) }}
                    />
                </div>

                <RaisedButton type="submit" label="Create Account" style={style} primary={true} />
            </form>
        );
    }
}
