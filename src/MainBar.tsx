import React, { Component } from 'react'


class SearchBar extends Component {

  render() {
    return (
      <div className="search-bar row align-items-center">
	<span className="bar">
	  <input type="text" placeholder="Search">
	  </input>
	</span>
	<span className="bar-button">
	  <i className="fas fa-search"></i>
	</span>
      </div>
    )
  }
}



interface MainBarProps {
  className?: string
  style?: object
  toggleExpand: Function
}

export default class MainBar extends Component<MainBarProps> {
  public render() {
    return (
      <div className={this.props.className+" container-fluid main-bar"} style={this.props.style}>
	<div className="row align-items-center" style={{ height: "inherit" }}>

	  <div className="col-2 no-select left">
	    <i className="fas fa-bars" onClick={() => { console.log("calling func"); this.props.toggleExpand()}}></i>
	    <span className="title no-select" style={{paddingLeft: "1em"}}>
	      MeTube
	    </span>
	  </div>

	  <div className="col-8">
	    <SearchBar />
	  </div>
	</div>
      </div>
    );
  }

}
