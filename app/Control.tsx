import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Snackbar from 'material-ui/Snackbar'

import Paper from 'material-ui/Paper';

import AppBar from './components/AppBar'
import Routes, { SideBar } from './Routes'

import * as Api from './Api'
import { api } from './Api'



export interface Globals {
    user: Api.output$api$auth$login
    changeRoute: (route: string) => void
    toggleExpand: () => void

    noAccess(): void
    noAccessRet(): JSX.Element

    update(message?: string): void
    message(message?: string): void
    goHome(): void

    login(username: string, password: string, failure: (err: any) => void): void
    logout(): void
    logged(): boolean
}
export interface GlobalProps {
    globals: Globals
}

class NoAccessWarning extends Component<GlobalProps> {
    state: { open: boolean, message: string }
    constructor(props) {
        super(props)
        this.checkStatus = this.checkStatus.bind(this)
        this.state = { open: true, message: "You are not logged in locally, checking your status..." }
        this.checkStatus()
    }

    checkStatus() {
        api.auth.status((user: Api.output$api$auth$status) => {
            this.props.globals.user = user
            this.props.globals.update()
        }, (err: any) => {
            console.error(err)
            this.setState({ message: "You are not logged in... taking you home" })
            this.props.globals.goHome()
        })
    }

    render() {
        return (
            <Snackbar
                open={this.state.open}
                message={this.state.message}
                autoHideDuration={4000}
                onRequestClose={() => { this.setState({ open: false }) }}
            />
        )
    }
}



class MyGlobals implements Globals {
    public user: Api.output$api$auth$login
    public changeRoute: (route: string) => void
    public toggleExpand: () => void


    public goHome() { this.changeRoute('/') }

    public noAccess() { return this.user === null }

    public noAccessRet() { return <NoAccessWarning globals={this} /> }

    public login(username: string, password: string, failure: (err: any) => void) {
        let data: Api.input$api$auth$login = {
            username: username,
            password: password
        }

        api.auth.login(data, (user: Api.output$api$auth$login) => {
            console.log(user)
            this.user = user
            this.update()
            this.changeRoute('/videos')
        }, failure)
    }

    public logout() {
        api.auth.logout()
        this.user = null
        this.update()
    }

    public logged() { return this.user !== null }

    setState: Function
    public update(message?: string) {
        if (message) {
            this.setState({ message: message, globals: this })
        } else {
            this.setState({ globals: this })
        }
    }

    public message(message: string) {
        this.setState({ message: message })
    }


    public constructor(changeRoute: (route: string) => void, toggleExpand: () => void, setState: Function) {
        this.user = null
        this.changeRoute = changeRoute
        this.toggleExpand = toggleExpand
        this.setState = setState

        this.goHome = this.goHome.bind(this)
        this.noAccess = this.noAccess.bind(this)
        this.noAccessRet = this.noAccessRet.bind(this)
        this.update = this.update.bind(this)
        this.login = this.login.bind(this)
        this.logout = this.logout.bind(this)
        this.logged = this.logged.bind(this)
    }
}


class Control extends Component<RouteComponentProps<any>, { globals: MyGlobals, expanded: boolean, message: string }> {

    changeRoute(route: string) {
        const props = this.props
        if (props.location.pathname !== route) {
            props.history.push(route)
        }
    }

    toggleExpand() {
        this.setState((prev, props) => ({ expanded: !prev.expanded }))
    }

    constructor(props) {
        super(props)
        this.changeRoute = this.changeRoute.bind(this)
        this.toggleExpand = this.toggleExpand.bind(this)
        this.state = {
            globals: new MyGlobals(this.changeRoute, this.toggleExpand, this.setState.bind(this)),
            expanded: false,
            message: ""
        }
    }
    render() {
        let globals: Globals = this.state.globals
        const s = this.state
        return (
            <div style={{ textAlign: "center" }}>
                <Snackbar
                    open={(s.message.length > 0)}
                    message={this.state.message}
                    autoHideDuration={4000}
                    onRequestClose={() => { this.setState({ message: "" }) }}
                />
                <AppBar globals={globals} expanded={s.expanded} />
                <SideBar globals={globals} expanded={s.expanded} />

                <Paper zDepth={1} style={{ minHeight: "100vh", paddingTop: "64px" }}>
                    <Routes globals={globals} />
                </Paper>
            </div>
        )
    }
}

export default withRouter(Control)
