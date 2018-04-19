import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { List, ListItem } from 'material-ui/List'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import ActionGrade from 'material-ui/svg-icons/action/grade';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Popover from 'material-ui/Popover/Popover'
import { Menu, MenuItem } from 'material-ui/Menu'

import Badge from 'material-ui/Badge'


import { Globals, GlobalProps } from '../Control'
import {
    api,
    output$api$users$search_object_matches as ContactData,
} from '../Api'



interface Props {
    info: ContactData
    loadUsers: () => void
    unread_messages?: string
}
interface State {
    open: boolean,
    anchorEl: JSX.Element
}
export default class ContactRender extends Component<Props, State> {
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
        const { f_name, l_name, username, is_contact, uid } = this.props.info
        const { unread_messages } = this.props
        const { open, anchorEl, } = this.state
        return (
            <Link to={"/message/" + uid}>
                <ListItem
                    primaryText={
                        <span>
                            {f_name + " " + l_name + " "}
                            <span style={{ color: "rgba(255,255,255,.5)" }}>@{username}</span>
                        </span>
                    }
                    leftAvatar={unread_messages === undefined || unread_messages === "0" ?
                        <CommunicationChatBubble />
                        :
                        <Badge badgeStyle={{ right: 40, top: 10 }} secondary={true} badgeContent={unread_messages}>
                            <CommunicationChatBubble />
                        </Badge>
                    }
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
            </Link>
        )
    }

}
