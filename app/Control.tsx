import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import Snackbar from 'material-ui/Snackbar'

import Paper from 'material-ui/Paper';

import NavigationPanel from './components/NavigationPanel'
import MessagingPanel from './components/MessagingPanel'


import Routes, { SideBar } from './Routes'

import * as Api from './Api'
import { api } from './Api'



export interface Globals {
    user: Api.output$api$auth$login
    changeRoute: (route: string) => void
    toggle_navigation: () => void
    toggle_messaging: () => void

    noAccess(): void
    noAccessRet(): JSX.Element

    update(message?: string): void
    message(message?: string): void
    error(message?: string): void
    goHome(): void
    goToVideos(): void

    login(username: string, password: string, failure: (err: any) => void): void
    logout(): void
    logged(): boolean
}

export interface GlobalProps { globals: Globals }


class NoAccessWarning extends Component<GlobalProps> {
    state: { open: boolean, message: string }
    constructor(props) {
        super(props)
        this.state = { open: true, message: "You are not logged in locally, checking your status..." }
        this.checkStatus()
    }

    checkStatus = () => {
        api.auth.status((user: Api.output$api$auth$status) => {
            this.props.globals.user = user
            console.log("successful")
            this.props.globals.update("Successfully logged you back in!")
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
                autoHideDuration={2000}
                onRequestClose={() => { this.setState({ open: false }) }}
            />
        )
    }
}



class MyGlobals implements Globals {
    public user: Api.output$api$auth$login
    public changeRoute: (route: string) => void
    public toggle_navigation: () => void
    public toggle_messaging: () => void

    public goHome = () => { this.changeRoute('/') }
    public goToVideos = () => { this.changeRoute('/videos') }

    public noAccess = () => { return this.user === null }
    public noAccessRet = () => { return <NoAccessWarning globals={this} /> }

    public login = (username: string, password: string, failure: (err: any) => void) => {
        let data: Api.input$api$auth$login = {
            username: username,
            password: password
        }

        api.auth.login(data, (user: Api.output$api$auth$login) => {
            this.user = user
            this.update()
            this.changeRoute('/videos')
        }, failure)
    }

    public logout = () => {
        api.auth.logout()
        this.user = null
        this.update()
        this.goHome()
    }

    public logged = () => { return this.user !== null }

    setState: Function
    public update = (message?: string) => {
        if (message) {
            this.setState({ message: message, globals: this })
        } else {
            this.setState({ globals: this })
        }
    }

    public message = (message: string) => {
        this.setState({ message: message })
    }
    public error = (message: string) => {
        this.setState({ error: message })
    }



    public constructor(changeRoute: (route: string) => void, toggle_navigation: () => void, toggle_messaging: () => void, setState: Function) {
        this.user = null
        this.changeRoute = changeRoute
        this.toggle_navigation = toggle_navigation
        this.toggle_messaging = toggle_messaging
        this.setState = setState
    }
}

interface ControlState {
    globals: MyGlobals
    navigation: boolean
    messaging: boolean
    message: string
    error: string
}

class Control extends Component<RouteComponentProps<any>, ControlState> {
    constructor(props) {
        super(props)
        this.state = {
            globals: new MyGlobals(this.changeRoute, this.toggle_navigation, this.toggle_messaging, this.setState.bind(this)),
            navigation: false,
            messaging: false,
            message: "",
            error: ""
        }
    }
    changeRoute = (route: string) => {
        const props = this.props
        if (props.location.pathname !== route) {
            props.history.push(route)
        }
    }
    toggle_navigation = () => {
        this.setState((prev, props) => ({ navigation: !prev.navigation }))
    }

    toggle_messaging = () => {
        this.setState((prev, props) => ({ messaging: !prev.messaging }))
    }

    render() {
        let globals: Globals = this.state.globals
        const s = this.state
        return (
            <div style={{ textAlign: "center" }}>
                <Snackbar
                    open={(s.message.length > 0)}
                    message={this.state.message}
                    autoHideDuration={2000}
                    onRequestClose={() => { this.setState({ message: "" }) }}
                />
                <Snackbar
                    open={(s.error.length > 0)}
                    message={<span style={{ color: "red" }}>{s.error}</span>}
                    autoHideDuration={2000}
                    onRequestClose={() => { this.setState({ error: "" }) }}
                />
                <NavigationPanel globals={globals} expanded={s.navigation} />
                <MessagingPanel globals={globals} expanded={s.messaging} />
                <SideBar globals={globals} expanded={s.navigation} />


                <Paper zDepth={1} style={{ minHeight: "100vh" }}>
                    <Routes globals={globals} />
                </Paper>
            </div>
        )
    }
}

export default withRouter(Control)
