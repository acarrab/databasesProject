import React, { Component } from 'react';

import SearchBar from '../../components/SearchBar'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';

import Paper from 'material-ui/Paper'
import {
    api,
    input$api$users$contact_list,
    output$api$users$contact_list,
    input$api$users$search_object_matches,
    output$api$users$search_object_matches as contact,
    input$api$users$update_relationship,
    output$api$users$update_relationship
} from '../../Api'


import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Popover from 'material-ui/Popover/Popover'
import { Menu, MenuItem } from 'material-ui/Menu'

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

/**
 * A more complex example, allowing the table height to be set, and key boolean properties to be toggled.
 */
interface HashSet {
    [index: number]: boolean
}

function getSetOf(arr: Array<number>): HashSet {
    var hs: HashSet = {}
    for (let i = 0; i < arr.length; i++) {
        hs[arr[i]] = true
    }
    return hs
}


interface ContactRenderProps {
    info: contact
    loadUsers: () => void
}
interface ContactRenderState {
    open: boolean,
    anchorEl: JSX.Element
}
class ContactRender extends Component<ContactRenderProps, ContactRenderState> {
    state = {
        open: false,
        anchorEl: null
    }
    changeRelationship = (state: "0" | "1") => {
        const p = this.props
        api.users.update_relationship({
            username: p.info.username,
            status: state
        }, () => {
            p.loadUsers()
        })
    }
    removeContact = () => { this.changeRelationship("0") }
    addContact = () => { this.changeRelationship("1") }

    handleClick = (e) => {
        e.preventDefault()
        this.setState({ anchorEl: e.currentTarget, open: true })
    }

    render() {
        const { f_name, l_name, username, is_contact } = this.props.info
        const { open, anchorEl } = this.state
        return (
            <div>
                <ListItem
                    primaryText={
                        <span>
                            {f_name + " " + l_name + " "}
                            <span style={{ color: "rgba(255,255,255,.5)" }}>@{username}</span>
                        </span>
                    }
                    leftAvatar={<CommunicationChatBubble />}
                    rightIcon={is_contact === "1" ?
                        <ActionGrade onClick={this.handleClick} />
                        :
                        <MoreVertIcon onClick={this.handleClick} />
                    }
                />
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    anchorOrigin={{ "horizontal": "left", "vertical": "bottom" }}
                    targetOrigin={{ "horizontal": "right", "vertical": "top" }}
                    onRequestClose={() => { this.setState({ open: false }) }}>
                    {is_contact === "1" ?
                        <MenuItem onClick={this.removeContact}>Remove Contact</MenuItem>
                        :
                        <MenuItem onClick={this.addContact}>Add as contact</MenuItem>
                    }
                </Popover>
            </div>
        )
    }

}
interface State {
    users: Array<contact>
    suggestions: Array<string>
    displayingContacts: boolean
}

function mapContactList(user: Array<output$api$users$contact_list>): Array<contact> {
    let res: Array<contact> = user.map((u) => (
        {
            f_name: u.f_name,
            l_name: u.l_name,
            username: u.username,
            email: u.email,
            channel: u.channel,
            is_contact: "1"
        }
    ))
    return res
}

export default class Contacts extends Component<GlobalProps, State>{
    loadUsers = () => {
        api.users.contact_list((users: Array<output$api$users$contact_list>) => {
            this.setState({
                users: mapContactList(users),
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
        api.users.search_object_matches({ searchText: searchText }, (users: Array<contact>) => {
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
                        {this.state.users.map((user: contact, index) => (
                            <ContactRender key={index} info={user} loadUsers={this.loadUsers} />
                        ))}
                    </List>
                </Paper >
            </div>
        );
    }
}
