import React, { Component } from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import Paper from 'material-ui/Paper'


import IconButton from 'material-ui/IconButton';
import SearchIcon from 'material-ui/svg-icons/action/search'


const styles = {
    paper: {
        padding: "1em"
    },
    inner_paper: {
        width: "80vw",
        maxWidth: "70rem",
        margin: "1em auto",
        padding: ".6em",
        textAlign: "left",
        borderRadius: ".5em",

    },
    left: {
        width: "100%"
    },
    AutoComplete: {
        width: "100%"
    },
    right: {
        width: "4em"
    }
}


interface State {
    searchText: string
}
interface Props {
    updateSuggestions: (searchText: string) => void
    submit: (searchText: string) => void
    suggestions: Array<string>
    hintText: string
}

export default class SearchBar extends Component<Props, State>{
    state = {
        searchText: '',
    }

    handleUpdateInput = (searchText) => {
        if (searchText.length > 0) {
            this.props.updateSuggestions(searchText)
        }
        this.setState({
            searchText: searchText,
        })
    }

    handleNewRequest = () => {
        this.props.submit(this.state.searchText)
        this.setState({
            searchText: '',
        })
    }

    render() {
        return (
            <Paper style={styles.paper} zDepth={0} >
                <Paper style={styles.inner_paper} zDepth={5}>
                    <AutoComplete
                        style={styles.AutoComplete}
                        hintText={this.props.hintText}
                        searchText={this.state.searchText}
                        onUpdateInput={this.handleUpdateInput}
                        onNewRequest={this.handleNewRequest}
                        dataSource={this.props.suggestions}
                        filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
                        openOnFocus={true}
                        fullWidth={true}
                    />
                </Paper>
            </Paper>
        );
    }
}
