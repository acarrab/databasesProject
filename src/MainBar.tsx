import React, { Component } from 'react'


class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.buttonClicked = this.buttonClicked.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  buttonClicked() {
    // this gets the text
    let searchText = this.textInput.value
    console.log(searchText);
    this.textInput.blur();
  }

  handleKeyPress(event) {
    if (event.key == 'Enter') {
      this.buttonClicked()
    }
  }

  render() {
    return (
      <div className="search-bar row align-items-center">
	<span className="bar">
	  <input ref={(input) => {this.textInput = input}} type="text" placeholder="Search" onKeyPress={this.handleKeyPress}>
	  </input>
	</span>
	<span className="bar-button" onClick={this.buttonClicked}>
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

	  <div className="expanded no-select left">
	    <i className="fas fa-bars" onClick={() => { console.log("calling func"); this.props.toggleExpand()}}></i>
	    <span className="title no-select" style={{paddingLeft: "1em"}}>
	      MeTube
	    </span>
	  </div>

	  <div className="inverse-expanded">
	    <SearchBar />
	  </div>
	</div>
      </div>
    );
  }

}
