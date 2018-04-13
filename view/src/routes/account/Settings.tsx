import React, { Component } from 'react'
import { Authentication } from '../../tools/Auth'
import { Globals, GlobalProps } from '../../Control'
import Api, { UserInfo, CreateInput } from '../../tools/Api'

//import valid from '../../tools/Validators'

import Form, { Input, Button, valid } from '../../forms/Form'
import { Row, Col2, Col2a, Block, Content, ContentBlock, Label, Center } from '../../Design'

class InfoSettings extends Form<UserInfo>{
    formSubmit(fields: UserInfo) {
        let globals: Globals = this.props.globals
        console.log(fields);
        Api.Auth.update({
            f_name: fields.f_name,
            l_name: fields.l_name,
            username: fields.username,
            email: fields.email,
            channel: fields.channel,
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
                this.setMessage("")
                this.setError("Username or Email is taken")
            }
        })
    }
    formRender() {
        let globals: Globals = this.props.globals
        let info: UserInfo = globals.auth.userInfo

        return (
            <Block>
                <Center><h3>Update your info</h3></Center>
                <Content>
                    {this.getError()}
                    {this.getMessage()}
                    <ContentBlock>
                        <Col2>
                            <Label>First Name
				<Input type="text" name="f_name" validations={[valid.required]} value={info.f_name} />
                            </Label>
                        </Col2>
                        <Col2>
                            <Label>Last Name
				<Input type="text" name="l_name" validations={[valid.required]} value={info.l_name} />
                            </Label>
                        </Col2>
                        <hr />
                        <Col2>
                            <Label>Username
				<Input type="text" name="username" validations={[valid.required]} value={info.username} />
                            </Label>
                        </Col2>
                        <Col2>
                            <Label>Email
				<Input type="text" name="email" validations={[valid.required, valid.email]} value={info.email} />
                            </Label>
                        </Col2>
                        <Col2a>
                            <Label>Channel Name
				<Input type="text" name="channel" validations={[valid.required]} value={info.channel} />
                            </Label>
                        </Col2a>
                    </ContentBlock>
                </Content>
                <Center>
                    <Button>Update Info</Button>
                </Center>
            </Block>
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
                    this.setMessage("");
                    this.setError("The password sent was empty...")
                } else {
                    globals.auth.login(data)
                    this.setMessage("The password was updated!!!")
                    this.setError("")
                    console.log(this.form)
                }
            },
            itFailed: (err: any) => {
                this.setMessage("")
                if (err.response.status === 401) {
                    this.setError("The password sent was incorrect")
                } else {
                    this.setError("The password sent was empty")
                }
            }
        })
    }
    formRender() {
        let globals: Globals = this.props.globals
        let info: UserInfo = globals.auth.userInfo
        return (
            <Block>
                <Center><h3>Update your password</h3></Center>
                <Content>
                    {this.getError()}
                    {this.getMessage()}
                    <ContentBlock>
                        <Col2a>
                            <Label>Old Password
				<Input type='password' name='old_password' validations={[valid.required]} />
                            </Label>
                        </Col2a>
                        <hr />
                        <Col2>
                            <Label>Password
				<Input type='password' name='password' validations={[valid.required, valid.password]} />
                            </Label>
                        </Col2>
                        <Col2>
                            <Label>Confirm
				<Input type='password' name='confirm' validations={[valid.required]} />
                            </Label>
                        </Col2>
                        <Center><Button>Update Password</Button></Center>
                    </ContentBlock>
                </Content>
            </Block>
        )
    }
}


export default class Settings extends Component<GlobalProps> {
    render() {
        let globals: Globals = this.props.globals
        if (globals.noAccess()) return globals.noAccessRet()
        return (
            <div style={{ width: "100%" }}>
                <Center><h1>Change your user settings</h1></Center>
                <InfoSettings globals={globals} />
                <PasswordSettings globals={globals} />
            </div>
        )
    }
}
