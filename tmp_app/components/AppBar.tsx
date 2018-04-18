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

class Login extends Component {
    static muiName = 'FlatButton'

    render() {
        return <FlatButton {...this.props} label="Login" />
    }
}


class Logged extends Component<GlobalProps> {
    static muiName = 'IconMenu'
    render() {
        return (
            <IconMenu
                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
                <MenuItem primaryText="Sign out" onClick={() => { this.props.globals.logout() }} />
            </IconMenu>
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
                    <IconButton style={{ zIndex: 11000 }} onClick={globals.toggleExpand} >
                        {this.props.expanded ? <NavigationClose /> : <NavigationOpen />}
                    </IconButton>
                }
                iconElementRight={globals.logged() ? <Logged globals={globals} /> : <Login />}
            />
        )
    }
}
