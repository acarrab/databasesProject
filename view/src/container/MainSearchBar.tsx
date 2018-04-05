import React, { Component } from 'react'
import Api from '../tools/Api'
import SearchBar from '../tools/SearchBar'

interface SearchBarProps {
  updateVideoView: () => void
}

export default class MainSearchBar extends Component<SearchBarProps> {
  textInput: any;
  state: { textSuggestions: Array<{ text: string }> }

  setSearchText(searchText) {
    Api.Videos.search({
      searchText: searchText,
      itWorked: (res) => {
        console.log(res)
        this.props.updateVideoView()

        Api.Videos.textlist({
          itWorked: (vars: Array<string>) => {
            this.setState({
              textSuggestions: vars.map((text) => ({ text: text }))
            })
          },
          itFailed: (err) => { console.error(err) }
        })
      },
      itFailed: (err) => {
        console.error(err);
      }
    })
  }
  doSearch(searchText: string) {
    Api.Videos.search({
      searchText: searchText,
      itWorked: (res) => {
        console.log(res)
        this.props.updateVideoView()
      },
      itFailed: (err) => { console.error(err); }
    })
  }

  constructor(props) {
    super(props)
    this.setSearchText = this.setSearchText.bind(this)
    this.setSearchText('');
  }
  render() {
    return (
      <SearchBar onChange={this.setSearchText} onSubmit={this.doSearch} placeholderText="Search For Videos" />
    )
  }
}
