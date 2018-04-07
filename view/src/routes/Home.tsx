import React, { Component } from 'react'
import { Globals, GlobalProps } from '../Control'
import Api from '../tools/Api'
import MainBar from '../container/MainBar'



export default class Home extends Component<GlobalProps> {
    public render() {
        let globals: Globals = this.props.globals
        return (
            <div className="container video-list">
                <MainBar globals={globals}> </MainBar>
                <div className="row">
                </div>
            </div>
        );
    }

}
