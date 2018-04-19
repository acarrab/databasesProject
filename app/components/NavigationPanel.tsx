import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'
import Toggle from 'material-ui/Toggle'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import NavigationClose from 'material-ui/svg-icons/navigation/close'
import NavigationOpen from 'material-ui/svg-icons/navigation/menu'

import { Globals, GlobalProps } from '../Control'

import Chat from 'material-ui/svg-icons/communication/chat'

import Badge from 'material-ui/Badge'

import {
    api,
    output$api$messaging$get_unread_count as UnreadCountData
} from '../Api'

class Login extends Component {
    static muiName = 'FlatButton'

    render() {
        return <FlatButton {...this.props} label="Login" />
    }
}

interface State {
    unread_messages: string
}




class Logged extends Component<GlobalProps, State> {
    static muiName = 'IconMenu'
    constructor(props) {
        super(props)
        this.state = { unread_messages: "0" }
        this.get_unread_count()
    }

    get_unread_count = () => {
        api.messaging.get_unread_count((unread: UnreadCountData) => { this.setState(unread) })
    }

    interval: any
    componentDidMount() { this.interval = setInterval(this.get_unread_count, 3000) }
    componentWillUnmount() { clearInterval(this.interval) }


    render() {
        const { unread_messages } = this.state
        const { globals } = this.props
        return (
            <IconButton style={{ zIndex: 11000 }} onClick={globals.toggle_messaging} >
                {unread_messages === "0" ? <Chat /> :
                    <Badge badgeStyle={{ right: 40, top: 10 }} secondary={true} badgeContent={unread_messages}>
                        <Chat />
                    </Badge>
                }
            </IconButton>
        )
    }
}

interface MyAppBarProps extends GlobalProps {
    expanded: boolean
}

export default class MyAppBar extends Component<MyAppBarProps> {
    render() {
        let globals: Globals = this.props.globals
        return (
            <AppBar
                title="MeTube"
                iconElementLeft={
                    <IconButton style={{ zIndex: 11000 }} onClick={globals.toggle_navigation} >
                        {this.props.expanded ? <NavigationClose /> : <NavigationOpen />}
                    </IconButton>
                }
                iconElementRight={globals.logged() ? <Logged globals={globals} /> : <Login />}
            />
        )
    }
}
