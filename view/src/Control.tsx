import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Authentication, AuthProps } from './tools/Auth'

import SideBar from './container/SideBar'
import MainBar from './container/MainBar'
import MyRoutes from './routes/Routes'


interface ViewControlProps extends RouteComponentProps<any> { }



export class Globals {
    auth: Authentication
    changeRoute: (route: string) => void
    toggleExpand: () => void
    previousMessage: string
    constructor(auth: Authentication, changeRoute: (route: string) => void, toggleExpand: () => void) {
        this.auth = auth
        this.changeRoute = changeRoute
        this.toggleExpand = toggleExpand
        this.previousMessage = ""
    }
    goHome() {
        this.changeRoute('/')
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
            globals: new Globals(new Authentication(this), this.changeRoute, this.toggleExpand)
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
