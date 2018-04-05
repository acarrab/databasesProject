import React, { Component } from 'react'
import Api from '../tools/Api'
import Autosuggest from 'react-autosuggest'

const testText = [
  {
    text: "hello world"
  },
  {
    text: "more stuff"
  }
]
/*
setSearchText(searchText) {
  Api.Videos.search({
    searchText: searchText,
    itWorked: (res) => {
      console.log(res)
      this.props.updateVideoView()
    },
    itFailed: (err) => { console.error(err); }
  })
}
*/

interface SearchBarProps {
  onChange: (searchText: string) => void
  onSubmit: (searchText: string) => void
  placeholderText: string
}

export default class SearchBar extends Component<SearchBarProps> {
  textInput: any;

  constructor(props) {
    super(props)
    this.submit = this.submit.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  submit() {
    let searchText = this.textInput.value
    let props: SearchBarProps = this.props

    console.log(searchText)
    props.onSubmit(searchText)
    this.textInput.blur()
  }

  handleKeyPress(event) { if (event.key == 'Enter') { this.submit() } }

  render() {
    return (
      <div className="search-bar row align-items-center">
        <span className="bar">
          <input ref={(input) => { this.textInput = input }}
            type="text"
            placeholder={this.props.placeholderText}
            onKeyPress={this.handleKeyPress}
            onSubmit={this.submit}>
          </input>
        </span>
        <span className="bar-button" onClick={this.submit}>
          <i className="fas fa-search"></i>
        </span>
      </div>
    )
  }
}
