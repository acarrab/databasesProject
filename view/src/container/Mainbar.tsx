import React, { Component } from 'react'
import { AuthProps } from '../Auth'
import axios from 'axios';

class SearchBar extends Component {
  textInput: any;

  setSearchText(searchText) {
    axios.post('api/videos/search', { searchText: searchText })
      .then((res) => { console.log(res) })
      .catch((err) => { console.log(err) })
  }
  constructor(props) {
    super(props)
    this.enterClicked = this.enterClicked.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.setSearchText('');
  }
  enterClicked() {
    // this gets the text
    let searchText = this.textInput.value
    console.log(searchText)
    this.setSearchText(searchText)
    this.textInput.blur();
  }

  handleKeyPress(event) {
    if (event.key == 'Enter') {
      this.enterClicked()
    }
  }

  render() {
    return (
      <div className="search-bar row align-items-center">
        <span className="bar">
          <input ref={(input) => { this.textInput = input }} type="text" placeholder="Search" onKeyPress={this.handleKeyPress}>
          </input>
        </span>
        <span className="bar-button" onClick={this.enterClicked}>
          <i className="fas fa-search"></i>
        </span>
      </div>
    )
  }
}



interface MainBarProps extends AuthProps {
  className?: string
  style?: object
  toggleExpand: Function
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
            <SearchBar />
          </div>
        </div>
      </div>
    );
  }

}
