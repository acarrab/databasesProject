import React, { Component } from 'react';

import SearchBar from '../../components/SearchBar'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

import IconButton from 'material-ui/IconButton';

import Paper from 'material-ui/Paper'
import {
    api,
    output$api$users$search_object_matches as ContactData,
} from '../../Api'


import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'

import ContactRenderer from '../../components/ContactRenderer'

import { Globals, GlobalProps } from '../../Control'

const styles = {
    paper: {
        height: "100vh",
        overflowY: 'auto',
        margin: "0em auto",
        padding: "2em",
        maxWidth: "40rem",
        textAlign: "left"
    },
};


interface State {
    users: Array<ContactData>
    suggestions: Array<string>
    displayingContacts: boolean
}



export default class Contacts extends Component<GlobalProps, State>{
    loadUsers = () => {
        api.users.contact_list((users: Array<ContactData>) => {
            this.setState({
                users: users,
                displayingContacts: true
            })
        })
    }

    constructor(props) {
        super(props)
        this.state = { users: [], suggestions: [], displayingContacts: true }
        this.loadUsers()
    }

    suggest = (searchText: string) => {
        api.users.search_text_matches({ searchText: searchText }, (s: Array<{ text: string }>) => {
            this.setState({ suggestions: s.map((suggestion) => (suggestion.text)) })
        })
    }

    submit = (searchText: string) => {
        console.log("searchText: " + searchText)
        api.users.search_object_matches({ searchText: searchText }, (users: Array<ContactData>) => {
            this.setState({
                users: users,
                displayingContacts: false
            })
        })
    }

    render() {
        let globals: Globals = this.props.globals
        if (globals.noAccess()) { return globals.noAccessRet() }
        const { displayingContacts } = this.state
        return (
            <div>
                <SearchBar
                    submit={this.submit}
                    hintText="Search for other users"
                    suggestions={this.state.suggestions}
                    updateSuggestions={this.suggest} />
                <Paper zDepth={4} style={styles.paper}>
                    {displayingContacts ? "" :
                        <RaisedButton fullWidth={true} primary={true} onClick={this.loadUsers}>
                            Clear Results
		     </RaisedButton>
                    }
                    <List>
                        {displayingContacts ?
                            <Subheader>Contact List</Subheader>
                            :
                            <Subheader>Search Results</Subheader>
                        }
                        {this.state.users.map((user: ContactData, index) => (
                            <ContactRenderer key={index} info={user} loadUsers={this.loadUsers} />
                        ))}
                    </List>
                </Paper >
            </div>
        );
    }
}
