import React, { Component } from 'react'
import { GlobalProps, Globals } from '../Control'




interface MainBarProps extends GlobalProps {
    className?: string
    style?: object
}

export default class MainBar extends Component<MainBarProps> {
    public render() {
        let globals: Globals = this.props.globals
        return (
            <div className={this.props.className + " container-fluid main-bar"} style={this.props.style}>
                <div className="row align-items-center" style={{ height: "inherit" }}>

                    <div className="expanded no-select left">
                        <i className="fas fa-bars" onClick={() => { globals.toggleExpand() }}></i>
                        <span className="title no-select" style={{ paddingLeft: "1em" }}>
                            MeTube
			</span>
                    </div>

                    <div className="inverse-expanded">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
