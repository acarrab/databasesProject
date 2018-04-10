import React, { Component } from 'react'
import { Authentication } from '../../tools/Auth'
import Api from '../../tools/Api'
import { Globals, GlobalProps } from '../../Control'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import MainBar from '../../container/MainBar'
import Form, { Input, Button, valid } from '../../forms/Form'

import { Row, Col, ColAuto, ColFull } from '../../BootstrapWrappers'


interface LoginFields {
    username: string
    password: string
}



interface LoginFormInterface extends Form<LoginFields> {
    globals: Globals
}


export default class Login extends Form<LoginFields> {
    formSubmit(fields: LoginFields) {
        let globals: Globals = this.props.globals
        Api.Auth.login({
            username: fields.username,
            password: fields.password,
            itWorked: (res) => {
                console.log(res);
                if (res.username) {
                    globals.auth.login(res)
                    globals.goHome()
                } else {
                    this.setError("Connection Timed Out")
                    console.error("This should not happen : Login.tsx");
                }
            },
            itFailed: (err) => {
                console.log(err)
                this.setError("Incorrect Username or Password")
            }
        })
    }
    formRender() {
        let globals: Globals = this.props.globals
        return (
            <Row>
                <MainBar globals={globals}></MainBar>
                <ColFull><h1>Log into your account</h1></ColFull>
                {this.getError()}
                <hr />
                <ColAuto>
                    <label>Username
			<Input type="text" name="username" validations={[valid.required]} />
                    </label>
                </ColAuto>
                <ColAuto>
                    <label>Password
			<Input type="password" name="password" validations={[valid.required]} />
                    </label>
                </ColAuto>
                <hr />
                <ColFull>
                    <Button>Login</Button>
                </ColFull>
            </Row>
        )
    }
}
