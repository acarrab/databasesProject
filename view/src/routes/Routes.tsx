import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import { Globals, GlobalProps } from '../Control'

import Home from './Home'

import History from './explore/History'
import Users from './explore/Users'
import Videos from './explore/Videos'
import Following from './explore/Following'


import Manage from './channel/Manage'
import Upload from './channel/Upload'

import Login from './account/Login'
import Create from './account/Create'
import Settings from './account/Settings'

// The links that are needed
export interface MyLink { title: string, path: string, to: string, icon: string }
export interface Category { title: string, data: Array<MyLink> }



const homeTitle = "Home"

function linkOf(title: string, icon: string): MyLink {
    return { title: title, path: '/' + title.toLowerCase(), to: title.toLowerCase(), icon: 'fas fa-' + icon }
}
class MyLinks {
    Home: MyLink = { title: 'Home', path: '/', to: '/', icon: 'fas fa-home' }
    Videos: MyLink = linkOf('Videos', 'desktop')
    Following: MyLink = linkOf('Following', 'eye')
    Users: MyLink = linkOf('Users', 'users')
    History: MyLink = linkOf('History', 'history')
    Manage: MyLink = linkOf('Manage', 'bullhorn')
    Upload: MyLink = linkOf('Upload', 'upload')
    Settings: MyLink = linkOf('Settings', 'cogs')
    Login: MyLink = linkOf('Login', 'sign-in-alt')
}

const ml = new MyLinks()

export const loggedInLinks: Array<Category> = [
    { title: '', data: [ml.Home] },
    { title: "Explore", data: [ml.Videos, ml.Following, ml.Users, ml.History] },
    { title: "My Channel", data: [ml.Manage, ml.Upload] },
    { title: 'Account', data: [ml.Settings] }
]
export const loggedOutLinks: Array<Category> = [
    { title: '', data: [ml.Home] },
    { title: '', data: [ml.Login] }
]


export default class Routes extends Component<GlobalProps> {
    public render() {
        return (
            <div className="main-content">
                <div className="row">
                    <Switch>
                        <Route exact path={ml.Home.path} render={(props) => (<Home {...props} {...this.props} />)} />
                        <Route path={ml.Videos.path} render={(props) => (<Videos {...props} {...this.props} />)} />
                        <Route path={ml.Following.path} render={(props) => (<Following {...props} {...this.props} />)} />
                        <Route path={ml.Users.path} render={(props) => (<Users {...props} {...this.props} />)} />
                        <Route path={ml.History.path} render={(props) => (<History {...props} {...this.props} />)} />
                        <Route path={ml.Manage.path} render={(props) => (<Manage {...props} {...this.props} />)} />
                        <Route path={ml.Upload.path} render={(props) => (<Upload {...props} {...this.props} />)} />
                        <Route path={ml.Settings.path} render={(props) => (<Settings {...props} {...this.props} />)} />
                        <Route path={ml.Login.path} render={(props) => (<Login {...props} {...this.props} />)} />
                    </Switch>
                </div>
            </div>
        )
    }
}
