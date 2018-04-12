import React, { Component } from 'react'
import { Authentication } from '../../tools/Auth'
import { Globals, GlobalProps } from '../../Control'
import Api, { UserInfo, CreateInput } from '../../tools/Api'

//import valid from '../../tools/Validators'

import Form, { Input, Button, valid } from '../../forms/Form'

import { Row, Col2, Block, Content, ContentBlock, Label, Center } from '../../Design'

interface CreateFields extends UserInfo {
    password: string
    confirm: string
}


export default class Create extends Form<CreateFields>{
    formSubmit(fields: CreateFields) {
        let globals: Globals = this.props.globals
        Api.Auth.create({
            f_name: fields.f_name,
            l_name: fields.l_name,
            username: fields.username,
            email: fields.email,
            password: fields.password,
            itWorked: (data: UserInfo) => {
                if (!data.username) {
                    this.setError("Username or Email is taken")
                } else {
                    globals.auth.login(data)
                    globals.goHome()
                }
            },
            itFailed: (err: any) => {
                this.setError("Username or Email is taken")
            }
        })
    }
    formRender() {
        let globals: Globals = this.props.globals
        return (
            <Block>
                <Center><h1>Create your account</h1></Center>
                <Content>
                    {this.getError()}
                    <ContentBlock>
                        <Col2>
                            <Label>
                                First Name
				<Input type="text" name="f_name" validations={[valid.required]} />
                            </Label>
                        </Col2>
                        <Col2>
                            <Label>
                                Last Name
				<Input type="text" name="l_name" validations={[valid.required]} />
                            </Label>
                        </Col2>
                        <hr />
                        <Col2>
                            <Label>
                                Username
				    <Input type="text" name="username" validations={[valid.required]} />
                            </Label>
                        </Col2>
                        <Col2>
                            <Label>
                                Email
				    <Input type="text" name="email" validations={[valid.required, valid.email]} />
                            </Label>
                        </Col2>
                        <hr />
                        <Col2>
                            <Label>
                                Password
				    <Input type='password' name='password' validations={[valid.required, valid.password]} />
                            </Label>
                        </Col2>
                        <Col2>
                            <Label>
                                Confirm
				    <Input type='password' name='confirm' validations={[valid.required]} />
                            </Label>
                        </Col2>
                    </ContentBlock>
                </Content>
                <Center><Button>Create</Button></Center>
            </Block >
        )

    }
}
