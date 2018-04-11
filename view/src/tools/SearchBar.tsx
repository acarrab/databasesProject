import React, { Component } from 'react'
import Api from '../tools/Api'
import Autosuggest from 'react-autosuggest'



interface Suggestion { text: string }

interface SearchBarProps {
    onChange: (searchText: string) => void
    onSubmit: (searchText: string) => void
    suggestions: Array<Suggestion>
    placeholderText: string
    value: string
}


export default class SearchBar extends Component<SearchBarProps>{
    searchButton: HTMLSpanElement
    renderSuggestion(suggestion: Suggestion) {
        return (
            <div className="row search-suggestion">
                {suggestion.text}
            </div>
        )
    }
    onChange(event, { newValue }) {
        let props: SearchBarProps = this.props
        props.onChange(newValue)

    }
    handleKeyPress(event) {
        let props: SearchBarProps = this.props
        if (event.key == 'Enter') { this.searchButton.click() }
    }
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
    }
    render() {
        let props: SearchBarProps = this.props

        let inputProps = {
            value: props.value,
            placeholder: props.placeholderText,
            onChange: this.onChange,
            onKeyPress: this.handleKeyPress
        }

        return (
            <div className="search-bar-container">
                <div className="search-bar row inverse-expanded inverse-expanded-offset">
                    <span className="bar">
                        <Autosuggest suggestions={props.suggestions} onSuggestionsFetchRequested={({ value }) => { props.onChange(value); }}
                            onSuggestionsClearRequested={() => { }}
                            getSuggestionValue={(suggestion: Suggestion) => (suggestion.text)}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={inputProps} />
                    </span>
                    <span ref={(c) => { this.searchButton = c }} className="bar-button" onClick={() => { props.onSubmit(props.value) }}>
                        <i className="fas fa-search"></i>
                    </span>
                </div>
            </div >
        )
    }
}














/*
export default class SearchBar extends Component<SearchBarProps> {
    textInput: any;
    state: { value: string }


    constructor(props) {
        super(props)
        this.submit = this.submit.bind(this)
        this.handleKeyPress = this.handleKeyPress.bind(this)
        this.state = {
            value: ""
        }
    }

    submit() {
        let searchText = this.textInput.value
        let props: SearchBarProps = this.props

        console.log(searchText)
        props.onSubmit(searchText)
        this.textInput.blur()
    }
    change(event, { newValue }) {
        let props: SearchBarProps = this.props
        props.onChange(newValue)
    }

    handleKeyPress(event) {
        let props: SearchBarProps = this.props
        if (event.key == 'Enter') { this.submit() }
        else {
            console.log(this.textInput)
            props.onChange(this.textInput.value)
        }
    }

    render() {
        let props: SearchBarProps = this.props

        const { value } = this.state
        const inputProps = {
            placeholder: props.placeholderText,
            text: value,
            onChange: (event, { newValue }) => { props.onChange(newValue); }
        }
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
*/
