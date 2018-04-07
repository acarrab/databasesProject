import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Api, { UserInfo, LoginInput } from './Api'
import { Globals, GlobalProps } from '../Control'



export class Authentication {
    userInfo?: UserInfo = null

    setStateFunc: ({ auth: GlobalVariables }) => void;
    update() { this.setStateFunc({ auth: this }) }

    constructor(globalsContainer: React.Component) {
        this.setStateFunc = globalsContainer.setState.bind(globalsContainer)
        this.update = this.update.bind(this)
    }

    islogged() {
        return (this.userInfo !== null)
    }
    login(vars: LoginInput) {

        Api.Auth.login({
            username: vars.username,
            password: vars.password,
            itWorked: (res) => {
                this.userInfo = new UserInfo("Taco", "Bot", "TacoBot314", "tacobot@gmail.com");
                vars.itWorked(res);
            },
            itFailed: (err) => { vars.itFailed(err) }
        })
    }
    logout() {
        this.userInfo = null
        this.update()
        Api.Auth.logout()
    }
}

export interface AuthProps { auth: Authentication }

interface AuthAccessProps extends RouteComponentProps<any> {
    globals: Globals
}
export default class AccessControl extends Component<GlobalProps> {
    validateAccess() {
        let globals: Globals = this.props.globals
        if (!globals.auth.islogged()) { globals.changeRoute('/') }
    }
    constructor(props) {
        super(props)
        this.validateAccess = this.validateAccess.bind(this)
    }
    componentDidMount() { this.validateAccess() }
    componentDidUpdate() { this.validateAccess() }

    render() {
        if (this.props.globals.auth.islogged())
            return (<div style={{ width: "100%" }}>{this.props.children}</div>)
        else
            return (<div></div>)
    }
}
