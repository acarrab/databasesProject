import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Globals, GlobalProps } from '../Control'
import Api from '../tools/Api'
import MainBar from '../container/MainBar'



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
                        <div className="col-12">
                            <h1>Hello <span className="user-info">{globals.auth.userInfo.f_name}</span>... Welcome to Metube!</h1>
                        </div>
                        <div className="col-6" >
                            <h2><Link to="/videos">Videos</Link></h2>
                        </div>
                    </div>
                </div>
            );
    }

}
