import React, { Component } from 'react'
import { Authentication } from '../../tools/Auth'
import Api from '../../tools/Api'
import { Globals, GlobalProps } from '../../Control'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import MainBar from '../../container/MainBar'

import valid from '../../tools/Validators'


import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'


export default class Login extends Component<GlobalProps> {
    form: Form
    input: Input
    state: { wasError: boolean }
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.state = {
            wasError: false
        }
    }
    handleKeyPress(event) {
        if (event.key == 'Enter') { this.submit(event) }
    }

    submit(event) {
        event.preventDefault()
        //console.log(this.form)

        let globals: Globals = this.props.globals
        let values: { username: string, password: string } = this.form.getValues()

        Api.Auth.login({
            username: values.username,
            password: values.password,
            itWorked: (res) => {
                console.log(res);
                if (res.username) {
                    globals.auth.login(res)
                    globals.goHome()
                } else {
                    console.error("This should not happen : Login.tsx");
                }
            },
            itFailed: (err) => {
                console.log(err)
                this.setState({ wasError: true })
            }
        })
    }

    render() {
        let globals: Globals = this.props.globals
        return (
            <Form ref={(form) => { this.form = form }} style={{ width: "100%" }} onSubmit={this.submit}>
                <MainBar globals={globals}></MainBar>
                <div className="form-container">

                    <div className="form row">
                        <div className="col-12">
                            <h1>Log into your account</h1>
                        </div>
                        <hr />
                        {!this.state.wasError ? <div></div> :
                            <div className="col-12 error">Invalid username or password</div>}
                        <div className="col-8 offset-2">
                            <label>
                                Username
				<Input ref={(c) => { this.input = c }} type='text' name='username' validations={[valid.required]} />
                            </label>
                        </div>
                        <div className="col-8 offset-2">
                            <label>
                                Password
				<Input type='password' name='password' validations={[valid.required]} />
                            </label>
                        </div>
                        <hr />
                        <div className="col-12">
                            <Button>Login</Button>
                        </div>
                    </div>
                </div>
            </Form>
        )
    }
}
