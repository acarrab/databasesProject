import React, { Component } from 'react'
import { GlobalProps, Globals } from '../Control'





export default class MainBar extends Component<GlobalProps> {
    public render() {
        let globals: Globals = this.props.globals
        return (
            <div>
                <div className="container-fluid main-bar">
                </div>
                <div className="main-bar-left expanded">
                    <div className="no-select left">
                        <i className="fas fa-bars" onClick={() => { globals.toggleExpand() }}></i>
                        <span className="title no-select" style={{ paddingLeft: "1em" }}>
                            MeTube
			</span>
                    </div>
                </div>
            </div>
        );
    }
}
