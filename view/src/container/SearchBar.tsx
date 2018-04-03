import React, { Component } from 'react'
import Api from '../tools/Api'

interface SearchBarProps {
  updateVideoView: () => void
}

export default class SearchBar extends Component<SearchBarProps> {
  textInput: any;

  setSearchText(searchText) {
    Api.Videos.search({
      searchText: searchText,
      itWorked: (res) => { console.log(res); },
      itFailed: (err) => { console.error(err); }
    })
  }
  constructor(props) {
    super(props)
    this.setSearchText = this.setSearchText.bind(this)
    this.submit = this.submit.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.setSearchText('');
  }

  submit() {
    let searchText = this.textInput.value
    console.log(searchText)
    this.setSearchText(searchText)
    this.textInput.blur()
    this.props.updateVideoView()
  }
  handleKeyPress(event) {
    if (event.key == 'Enter') {
      this.submit()
    }
  }

  render() {
    return (
      <div className="search-bar row align-items-center">
        <span className="bar">
          <input ref={(input) => { this.textInput = input }} type="text" placeholder="Search" onKeyPress={this.handleKeyPress}>
          </input>
        </span>
        <span className="bar-button" onClick={this.submit}>
          <i className="fas fa-search"></i>
        </span>
      </div>
    )
  }
}
