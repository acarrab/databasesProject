import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Authentication, AuthProps } from './tools/Auth'

import Api from './tools/Api'

import SideBar from './container/SideBar'
import MainBar from './container/MainBar'
import MyRoutes from './routes/Routes'


interface ViewControlProps extends RouteComponentProps<any> { }

const testing = true;

export class Globals {
    auth: Authentication
    changeRoute: (route: string) => void
    toggleExpand: () => void
    previousMessage: string
    setState: Function

    constructor(auth: Authentication, changeRoute: (route: string) => void, toggleExpand: () => void, setState: Function) {
        this.auth = auth
        this.changeRoute = changeRoute
        this.toggleExpand = toggleExpand
        this.previousMessage = ""
        this.noAccess = this.noAccess.bind(this)
        this.noAccessRet = this.noAccessRet.bind(this)
        this.setState = setState
    }
    update() {
        this.setState({ globals: this })
    }

    goHome() {
        this.changeRoute('/')
    }
    noAccess() { return !this.auth.islogged() }
    noAccessRet() {
        if (testing)
            Api.Auth.login({
                username: "tbot",
                password: "P1",
                itWorked: (res) => {
                    if (res.username) {
                        this.auth.login(res)
                        console.log("logged back in")
                        this.update()
                    } else {
                        console.error("failed to log in: Control.tsx")
                    }
                },
                itFailed: (err) => { console.error("invalid credentials?") }
            })
        else
            this.goHome()

        return <div className="error">No Access</div>
    }
}

export interface GlobalProps { globals: Globals }


class ViewControl extends Component<ViewControlProps> {

    state: { expanded: boolean, globals: Globals }

    constructor(props) {
        super(props)

        this.toggleExpand = this.toggleExpand.bind(this)
        this.changeRoute = this.changeRoute.bind(this)
        this.state = {
            expanded: false,
            globals: new Globals(new Authentication(this), this.changeRoute, this.toggleExpand, this.setState.bind(this))
        }
    }

    changeRoute(newRoute: string) {
        let props: ViewControlProps = this.props
        if (props.location.pathname !== newRoute) {
            props.history.push(newRoute)
        }
    }


    toggleExpand() { this.setState({ expanded: !this.state.expanded }) }

    public render() {
        let isExpanded = this.state.expanded;
        let expanded = (isExpanded ? "expanded" : "collapsed")

        return (
            <div className="view-control">
                <SideBar className={"side-" + expanded + " side-bar"}
                    globals={this.state.globals}
                    toggleExpand={this.toggleExpand} />
                <MainBar globals={this.state.globals}></MainBar>

                <div className={isExpanded ? "content-hider" : ""} onClick={this.toggleExpand}></div>

                <MyRoutes globals={this.state.globals} />
            </div>
        )
    }
}


export default withRouter<ViewControlProps>(ViewControl)
