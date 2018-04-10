import React, { Component } from 'react'
import { Authentication } from '../../tools/Auth'
import { Globals, GlobalProps } from '../../Control'
import Api, { UserInfo, CreateInput } from '../../tools/Api'

import MainBar from '../../container/MainBar'
//import valid from '../../tools/Validators'

import Form, { Input, Button, valid } from '../../forms/Form'
import { Row, Col, Label, ColAuto, RowAuto, ColFull, RowFull } from '../../BootstrapWrappers'


class InfoSettings extends Form<UserInfo>{
    formSubmit(fields: UserInfo) {
        let globals: Globals = this.props.globals
        console.log(fields);
        Api.Auth.update({
            f_name: fields.f_name,
            l_name: fields.l_name,
            username: fields.username,
            email: fields.email,
            itWorked: (data: UserInfo) => {
                console.log(data)
                if (!data.username) {
                    this.setError("Username or Email is taken")
                } else {
                    globals.auth.login(data)
                    this.setMessage("Account info updated!!!")
                    this.setError("")
                }
            },
            itFailed: (err: any) => {
                this.setError("Username or Email is taken")
            }
        })
    }
    formRender() {
        let globals: Globals = this.props.globals
        let info: UserInfo = globals.auth.userInfo


        return (
            <Row>
                <MainBar globals={globals}></MainBar>
                <ColFull><h2>Update user information</h2></ColFull>
                {this.getError()}
                {this.getMessage()}
                <hr />
                <RowAuto style={{ marginBottom: "2em" }}>
                    <Label>
                        First Name
			<Input type="text" name="f_name" validations={[valid.required]} value={info.f_name} />
                    </Label>
                    <Label>
                        Last Name
			<Input type="text" name="l_name" validations={[valid.required]} value={info.l_name} />
                    </Label>
                </RowAuto>

                <RowAuto style={{ marginBottom: "2em" }}>
                    <Label>
                        Username
			<Input type="text" name="username" validations={[valid.required]} value={info.username} />
                    </Label>
                    <Label>
                        Email
			<Input type="text" name="email" validations={[valid.required, valid.email]} value={info.email} />
                    </Label>
                </RowAuto>
                <hr />
                <ColFull>
                    <Button>Update Info</Button>
                </ColFull>
            </Row >
        )

    }
}

interface PasswordFields {
    old_password: string
    password: string
    confirm: string
}

class PasswordSettings extends Form<PasswordFields>{
    formSubmit(fields: PasswordFields) {
        let globals: Globals = this.props.globals
        console.log(fields);
        Api.Auth.updatePassword({
            old_password: fields.old_password,
            password: fields.password,
            itWorked: (data: UserInfo) => {
                console.log(data)
                if (!data.username) {
                    this.setError("The password sent was empty...")
                } else {
                    globals.auth.login(data)
                    this.setMessage("The password was updated!!!")
                    this.setError("")
                    console.log(this.form)
                }
            },
            itFailed: (err: any) => {
                console.log(err)
                this.setError("The password sent was empty")
            }
        })
    }
    formRender() {
        let globals: Globals = this.props.globals
        let info: UserInfo = globals.auth.userInfo
        return (
            <Row>
                <MainBar globals={globals}></MainBar>
                <ColFull><h2>Update Password</h2></ColFull>
                {this.getError()}
                {this.getMessage()}
                <hr />
                <Row style={{ marginBottom: "2em" }}>
                    <Col></Col>
                    <Label>
                        Old Password
			<Input type='password' name='old_password' validations={[valid.required]} />
                    </Label>
                    <Col></Col>
                </Row>
                <RowAuto>
                    <Label>
                        Password
			<Input type='password' name='password' validations={[valid.required, valid.password]} />
                    </Label>
                    <Label>
                        Confirm
			<Input type='password' name='confirm' validations={[valid.required]} />
                    </Label>
                </RowAuto>
                <hr />
                <ColFull>
                    <Button>Update Password</Button>
                </ColFull>
            </Row >
        )
    }
}


export default class Settings extends Component<GlobalProps> {
    render() {
        let globals: Globals = this.props.globals
        if (!globals.auth.islogged()) {
            globals.goHome()
            return <div className="error">No Access</div>
        }
        return (
            <div>
                <MainBar globals={globals}></MainBar>
                <RowFull><h1>Change your user settings</h1></RowFull>
                <InfoSettings globals={globals} />
                <PasswordSettings globals={globals} />
            </div>
        )
    }
}
