import React, { Component } from 'react'
import AccessControl from '../../tools/Auth'
import { Globals, GlobalProps } from '../../Control'
import Api, { UserInfo } from '../../tools/Api'


export default class Settings extends Component<GlobalProps> {
    public render() {
        let info: UserInfo = this.props.globals.auth.userInfo
        return (
            <AccessControl globals={this.props.globals}>
                <div className="container">
                    <div className="row">
                        {!info ? (<div></div>) : (
                            <div className="col-12">
                                <p>Username: {info.username}</p>
                                <p>Name: <b>{info.f_name}</b> {info.l_name}</p>
                            </div>
                        )}
                    </div>
                </div>
            </AccessControl>
        );
    }
}
