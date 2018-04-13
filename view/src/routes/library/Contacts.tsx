import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Globals, GlobalProps } from '../../Control'
import Users from './Users'


import SearchBar from '../../tools/SearchBar'
import Api, { UserInfo } from '../../tools/Api'
import { Row, Col2, Col6, Col2a, Block, Content, ContentBlock, Label, Center, Selector } from '../../Design'


interface UserResultProps {
    user: UserInfo
    contactUpdate: (is_contact: boolean, username: string) => void
}

class UserResult extends Component<UserResultProps> {
    updateContact(is_contact: boolean) {
        this.props.contactUpdate(is_contact, this.props.user.username)
    }
    constructor(props) {
        super(props)
        this.updateContact = this.updateContact.bind(this)
    }
    render() {
        const user: UserInfo = this.props.user
        return (
            <ContentBlock>
                <Col2>
                    <Row><h4>{user.f_name + " " + user.l_name}</h4></Row>
                    <Row><p className="username">@{user.username}</p></Row>
                </Col2>
                <Col2 style={{ textAlign: "right" }}>
                    <button className="my-btn" onClick={() => this.props.contactUpdate(false, user.username)}>Remove as Contact</button>
                </Col2>
            </ContentBlock >
        )
    }
}

interface UsersState {
    value: string
    suggestions: Array<{ text: string }>
    users: Array<UserInfo>
}
class ContactDisplay extends Component<GlobalProps> {
    state: UsersState
    getContacts() {
        Api.Users.get_contacts(
            (users: Array<UserInfo>) => { console.log(users); this.setState({ users: users }) }
        )
    }
    constructor(props) {
        super(props)
        this.getContacts = this.getContacts.bind(this)
        this.contact = this.contact.bind(this)
        this.state = {
            value: "",
            suggestions: [],
            users: [],
        }
        let globals: Globals = this.props.globals
        if (!globals.noAccess()) this.getContacts()

    }
    contact(is_contact: boolean, username: string) {
        if (is_contact)
            Api.Users.add_relationship(username, () => (this.getContacts()))
        else
            Api.Users.remove_relationship(username, () => (this.getContacts()))
    }


    public render() {
        let globals: Globals = this.props.globals
        const state: UsersState = this.state
        if (globals.noAccess()) return globals.noAccessRet()

        return (
            <div style={{ width: "100%" }}>
                {!state.users.length ? <div></div> :
                    <Block>
                        <Center><h1>Contacts</h1></Center>
                        <Content>
                            {state.users.map((user: UserInfo) => (
                                <UserResult key={user.username} user={user} contactUpdate={this.contact} />
                            ))}
                        </Content>
                    </Block>
                }
            </div>
        );
    }

}


export default class Contacts extends Component<GlobalProps>{
    render() {
        let globals: Globals = this.props.globals
        if (globals.noAccess()) return globals.noAccessRet()
        return (
            <ContactDisplay globals={globals} />
        )
    }
}
