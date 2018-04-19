import React, { Component } from 'react'
import { Route, Switch, Link } from 'react-router-dom'
import { Globals, GlobalProps } from './Control'

import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'

import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'


import Login from './routes/account/Login'
import Create from './routes/account/Create'
import Settings from './routes/account/Settings'

import Manage from './routes/channel/Manage'
import Upload from './routes/channel/Upload'

import VideoPlay from './routes/explore/Video'
import Videos from './routes/explore/Videos'

import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

import Contacts from './routes/social/Contacts'
import Message from './routes/social/Message'


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
    { title: 'Welcome', data: [ml.Videos] },
    { title: 'Library', data: [ml.Following, ml.Contacts] },
    { title: 'Account', data: [ml.Settings, ml.Manage, ml.Upload] }
]






export class SideBar extends Component<SideBarProps> {
    render() {
        let globals: Globals = this.props.globals
        let toggle = this.props.globals.toggle_navigation

        const links = globals.logged() ? loggedInLinks : loggedOutLinks

        return (
            <Drawer open={this.props.expanded} docked={false} onRequestChange={this.props.globals.toggle_navigation}>
                <List style={{ textAlign: "left" }}>
                    <div>
                        {links.map((value: Category) => (
                            <div key={value.title}>
                                {value.title.length ? <Subheader>{value.title}</Subheader> : <div></div>}
                                {value.data.map((l: MyLink) => (
                                    <Link key={l.to} to={l.to}>
                                        <ListItem style={{ paddingLeft: "2em" }} onClick={toggle}>
                                            <i className={l.icon}></i> {l.title}
                                        </ListItem>
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </div>
                    <ListItem style={{ paddingLeft: "2em" }} onClick={() => { this.props.globals.logout() }}>
                        <i className="fas fa-sign-out-alt"></i> Sign out
		    </ListItem>
                </List>
            </Drawer>
        )
    }
}


class GoHomeDude extends Component<GlobalProps> {
    render() {
        const g = this.props.globals
        if (g.noAccess()) { return g.noAccessRet() }
        return (
            <Paper zDepth={4} style={{ padding: "4em" }}>
                <h1 style={{ lineHeight: "2em" }}>You seem to be lost, the page you are looking for does not exist.</h1>
                <RaisedButton
                    onClick={() => { g.logged() ? g.goToVideos() : g.goHome() }}
                    label="Go Home"
                    primary={true}
                    style={{ margin: "2em" }} />
            </Paper>
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
                <Route path="/upload" render={(props) => (<Upload {...props} {...this.props} />)} />
                <Route path="/contacts" render={(props) => (<Contacts {...props} {...this.props} />)} />
                <Route path="/message/:uid" render={(props) => (<Message {...props} {...this.props} />)} />
                <Route path="*" component={(props) => (<GoHomeDude {...props} {...this.props} />)} />
            </Switch >
        )
    }
}
