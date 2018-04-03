import React, { Component } from 'react'
import { AuthProps } from '../tools/Auth'
import SearchBar from './SearchBar'



interface MainBarProps extends AuthProps {
  className?: string
  style?: object
  toggleExpand: () => void
  updateVideoView: () => void
}

export default class MainBar extends Component<MainBarProps> {
  public render() {
    return (
      <div className={this.props.className + " container-fluid main-bar"} style={this.props.style}>
        <div className="row align-items-center" style={{ height: "inherit" }}>

          <div className="expanded no-select left">
            <i className="fas fa-bars" onClick={() => { this.props.toggleExpand() }}></i>
            <span className="title no-select" style={{ paddingLeft: "1em" }}>
              MeTube
	    </span>
          </div>

          <div className="inverse-expanded">
            <SearchBar updateVideoView={this.props.updateVideoView} />
          </div>
        </div>
      </div>
    );
  }
}
