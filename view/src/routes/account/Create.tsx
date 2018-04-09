import React, { Component } from 'react'
import { Authentication } from '../../tools/Auth'
import { Globals, GlobalProps } from '../../Control'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Api, { UserInfo, CreateInput } from '../../tools/Api'

import MainBar from '../../container/MainBar'

import valid from '../../tools/Validators'


import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'


export default class Create extends Component<GlobalProps> {
    form: Form
    state: { errorMessage: string }
    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.state = {
            errorMessage: ""
        }
    }
    handleKeyPress(event) {
        if (event.key == 'Enter') { this.submit(event) }
    }

    submit(event) {
        event.preventDefault()
        //console.log(this.form)

        let globals: Globals = this.props.globals;
        let values: {
            first: string,
            last: string,
            username: string,
            email: string,
            password: string
        } = this.form.getValues()
        console.log(values);

        var createVars: CreateInput = {
            f_name: values.first,
            l_name: values.last,
            username: values.username,
            email: values.email,
            password: values.password,
            itWorked: (data: UserInfo) => {
                if (!data.username) { // this should not happen
                    this.setState({ errorMessage: "Username or Email is in use" })
                    console.log(data)
                } else {
                    // if that worked, then we are logged in...
                    globals.auth.login(data)
                    globals.goHome()
                }
            },
            itFailed: (err: any) => {
                this.setState({ errorMessage: "Username or Email is in use" })
                console.log(err);
            }
        }
        console.log(createVars)
        Api.Auth.create(createVars)

    }

    render() {
        let globals: Globals = this.props.globals
        return (
            <Form ref={(form) => { this.form = form }} style={{ width: "100%" }} onSubmit={this.submit}>
                <MainBar globals={globals}></MainBar>
                <div className="form-container">
                    <div className="form row">
                        <div className="col-12">
                            <h1>Create your account</h1>
                        </div>
                        <hr />
                        {!this.state.errorMessage.length ? <div></div> :
                            <div className="col-12 error">{this.state.errorMessage}</div>
                        }

                        <div className="col-12">
                            <div className="row">
                                <div className="col">
                                    <label>
                                        First Name
					<Input type='text' name='first' validations={[valid.required]} />
                                    </label>
                                </div>
                                <div className="col">
                                    <label>
                                        Last Name
					<Input type='text' name='last' validations={[valid.required]} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-12">
                            <div className="row">
                                <div className="col">
                                    <label>
                                        Username
					<Input type='text' name='username' validations={[valid.required]} />
                                    </label>
                                </div>
                                <div className="col">
                                    <label>
                                        Email
					<Input type='text' name='email' validations={[valid.required, valid.email]} />
                                    </label>
                                </div>
                            </div>
                        </div>

                        <hr />
                        <div className="col-12">
                            <div className="row">
                                <div className="col">
                                    <label>
                                        Password
					<Input type='password' name='password' validations={[valid.required, valid.password]} />
                                    </label>
                                </div>
                                <div className="col">
                                    <label>
                                        Confirm
					<Input type='password' name='confirm' validations={[valid.required]} />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="col-12">
                            <Button>Create</Button>
                        </div>
                    </div>
                </div>
            </Form>
        )
    }
}
