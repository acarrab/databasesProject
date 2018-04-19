import React, { Component } from 'react'
import { Globals, GlobalProps } from '../Control'
import Paper from 'material-ui/Paper'
import Drawer from 'material-ui/Drawer';
import RaisedButton from 'material-ui/RaisedButton'

import ContactRenderer from './ContactRenderer'


import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import Divider from 'material-ui/Divider'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Popover from 'material-ui/Popover/Popover'
import { Menu, MenuItem } from 'material-ui/Menu'

import {
    api,
    output$api$messaging$get_unread_from as ContactData
} from '../Api'




interface Props extends GlobalProps {
    expanded: boolean
}
interface State {
    contacts: Array<ContactData>
    randoms: Array<ContactData>
    only_sent: Array<ContactData>
    selected_user: number
}
export default class ContactsSideBar extends Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            contacts: [],
            randoms: [],
            only_sent: [],
            selected_user: null
        }
        this.load()
        this.tick = 0
    }

    load = () => {
        api.messaging.get_unread_from({ contacts: "1" }, (contacts) => { this.setState({ contacts }) })
        api.messaging.get_unread_from({ contacts: "0" }, (randoms) => { this.setState({ randoms }) })
        api.messaging.get_only_sent((only_sent) => { this.setState({ only_sent }) })
    }

    tick: number
    conditional_load = () => {
        if (this.props.expanded || !this.tick) {
            this.load()
            this.tick = 4
        }
    }


    componentWillReceiveProps(newProps: Props) {
        if (newProps.expanded && !this.props.expanded) {
            this.conditional_load()
        }
    }
    interval: any
    componentDidMount() { this.interval = setInterval(this.conditional_load, 3000) }
    componentWillUnmount() { clearInterval(this.interval) }


    render() {
        const { expanded, globals } = this.props
        const { contacts, randoms, only_sent } = this.state
        return (
            <Drawer
                docked={false}
                width={400}
                open={this.props.expanded}
                onRequestChange={(keep_open) => { if (!keep_open) globals.toggle_messaging() }}
                openSecondary={true}
            >
                <List style={{ textAlign: "left" }}>
                    {!contacts.length ? "" : <Subheader>Messages With Contacts</Subheader>}
                    <div>
                        {contacts.map((user: ContactData, index) => (
                            <ContactRenderer key={index} info={user} loadUsers={this.conditional_load} unread_messages={user.unread_messages} />
                        ))}
                    </div>
                    {!randoms.length ? "" : <Subheader>Messages With Randoms</Subheader>}
                    <div>
                        {randoms.map((user: ContactData, index) => (
                            <ContactRenderer key={index} info={user} loadUsers={this.conditional_load} unread_messages={user.unread_messages} />
                        ))}
                    </div>
                    {!only_sent.length ? "" : <Subheader>Only Sent To</Subheader>}
                    <div>
                        {only_sent.map((user: ContactData, index) => (
                            <ContactRenderer key={index} info={user} loadUsers={this.conditional_load} unread_messages={user.unread_messages} />
                        ))}
                    </div>
                </List>
            </Drawer>
        );
    }
}
