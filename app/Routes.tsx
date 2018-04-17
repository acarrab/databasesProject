import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { Globals, GlobalProps } from './Control'

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import Login from './routes/account/Login'
import Create from './routes/account/Create'
import Settings from './routes/account/Settings'

import Manage from './routes/channel/Manage'


import VideoPlay from './routes/explore/Video'
import Videos from './routes/explore/Videos'

import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';




interface SideBarProps extends GlobalProps {
    expanded: boolean
}

// The links that are needed
export interface MyLink { title: string, to: string, icon: string }
export interface Category { title: string, data: Array<MyLink> }

function linkOf(title: string, icon: string): MyLink {
    return { title: title, to: '/' + title.toLowerCase(), icon: 'fas fa-' + icon }
}

class MyLinks {
    Login: MyLink = { title: 'Login', to: '/', icon: 'fas fa-sign-in-alt' }
    Create: MyLink = linkOf('Create', 'sign-in-alt')
    Settings: MyLink = linkOf('Settings', 'cogs')
    Manage: MyLink = linkOf('Manage', 'bullhorn')
    Upload: MyLink = linkOf('Upload', 'upload')
    VideoPlay: MyLink = { title: '', to: '/video/:vid', icon: '' }
    Following: MyLink = linkOf('Following', 'eye')
    Videos: MyLink = linkOf('Videos', 'desktop')
    Contacts: MyLink = linkOf('Contacts', 'users')
}
const ml = new MyLinks();

export const loggedOutLinks: Array<Category> = [
    { title: '', data: [ml.Login, ml.Create] }
]

export const loggedInLinks: Array<Category> = [
    { title: '', data: [ml.Videos] },
    { title: 'Account', data: [ml.Settings, ml.Manage, ml.Upload] },
    { title: 'Library', data: [ml.Following, ml.Contacts] }
]






export class SideBar extends Component<SideBarProps> {
    render() {
        let globals: Globals = this.props.globals
        let toggle = this.props.globals.toggleExpand

        const links = globals.logged() ? loggedInLinks : loggedOutLinks

        return (
            <Drawer open={this.props.expanded} docked={false} onRequestChange={this.props.globals.toggleExpand}>
                <List style={{ textAlign: "left" }}>
                    {links.map((value: Category) => (
                        <div key={value.title}>
                            {value.title.length ? <Subheader>{value.title}</Subheader> : <div></div>}
                            {value.data.map((l: MyLink) => (
                                <Link key={l.to} to={l.to}>
                                    <ListItem style={{ marginLeft: "2em" }} onClick={toggle}>
                                        <i className={l.icon}></i> {l.title}
                                    </ListItem>
                                </Link>
                            ))}
                        </div>
                    ))}
                </List>
            </Drawer>
        )
    }
}


export default class Routes extends Component<GlobalProps> {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Switch>
                <Route exact path="/" render={(props) => (<Login {...props} {...this.props} />)} />
                <Route path="/create" render={(props) => (<Create {...props} {...this.props} />)} />
                <Route path="/settings" render={(props) => (<Settings {...props} {...this.props} />)} />
                <Route path="/manage" render={(props) => (<Manage {...props} {...this.props} />)} />
                <Route path="/video/:vid" render={(props) => (<VideoPlay {...props} {...this.props} />)} />
                <Route path="/videos" render={(props) => (<Videos {...props} {...this.props} />)} />
            </Switch >
        )
    }
}
