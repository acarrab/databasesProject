import React, {Component} from 'react'

interface SideBarProps {
  className?: string
  style?: object
}

export default class SideBar extends Component<SideBarProps> {
  public render() {
    return (
      <div className={this.props.className+" side-bar"} style={this.props.style}>
	<button><i className="fas fa-home"></i>Home</button>
	<button><i className="fas fa-newspaper"></i>New</button>
	<button><i className="fas fa-filter"></i>Categories</button>
	<hr />
	<h1>Library</h1>
	<button><i className="fas fa-history"></i>History</button>
	<button><i className="fas fa-upload"></i>Uploads</button>
	<hr />
	<h1>Customize</h1>
	<button><i className="fas fa-cogs"></i>Setting</button>
	<button><i className="fas fa-info-circle"></i>Help</button>
	<hr />
	<h2>&copy; MeTube, LLC</h2>
      </div>
    );
  }
}
