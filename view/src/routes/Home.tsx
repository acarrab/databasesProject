import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Globals, GlobalProps } from '../Control'
import Api from '../tools/Api'
import MainBar from '../container/MainBar'

class MainLink extends Component<any> {
    render() {
        return (
            <div className="col-12 col-md-6 col-lg-3 content-block-container" >
                <Link to={this.props.to}>
                    <div className="content-block">
                        {this.props.children}
                    </div>
                </Link>
            </div>
        )
    }
}


export default class Home extends Component<GlobalProps> {
    public render() {
        let globals: Globals = this.props.globals

        if (!globals.auth.islogged())
            return (
                <div className="container video-list">
                    <MainBar globals={globals}> </MainBar>
                    <div className="row">
                        <div className="col-12">
                            <h1>Welcome to Metube!</h1>
                        </div>
                        <div className="col-12" >
                            <p>To access all features...</p>
                            <p>Log in <Link to="/login"><a>here</a></Link></p>
                            <p>Create account <Link to="/create"><a>here</a></Link></p>
                        </div>
                    </div>
                </div>
            );
        else
            return (
                <div className="container video-list">
                    <MainBar globals={globals}> </MainBar>
                    <div className="row">
                        <div className="col-12" style={{ paddingBottom: "3em", paddingTop: "2em" }}>
                            <h1>Hello <span className="user-info">{globals.auth.userInfo.f_name}</span>... Welcome to Metube!</h1>
                        </div>

                        <MainLink to="/videos">
                            <h2>Videos</h2>
                            <img src="public/images/video.png" />
                        </MainLink>
                        <MainLink to="/following">
                            <h2>Following</h2>
                            <img src="public/images/following.png" />
                        </MainLink>
                        <MainLink to="/users">
                            <h2>Users</h2>
                            <img src="public/images/users.png" />
                        </MainLink>
                        <MainLink to="/manage">
                            <h2>Channel</h2>
                            <img src="public/images/channel.png" />
                        </MainLink>
                    </div>
                </div >
            );
    }

}
