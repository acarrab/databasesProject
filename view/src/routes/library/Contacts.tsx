import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Globals, GlobalProps } from '../../Control'



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
                <Col2 style={{ textAlign: "left" }}>
                    In contact list:
                    <Selector active={this.props.user.is_contact} update={this.updateContact} />
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
class UsersSearch extends Component<GlobalProps> {
    state: UsersState
    onChange(text: string) {
        this.setState({ value: text })
        if (text.trim().length) {
            Api.Search.User.text_list(
                text,
                (usernames: Array<string>) => { this.setState({ suggestions: usernames.map(name => ({ text: name })) }) },
                (err) => { console.error(err) }
            )
        } else {
            this.setState({ value: text, suggestions: [] })
        }
    }
    lastSubmitted: string
    runSearch(text: string) {
        Api.Search.User.user_list(
            text,
            (users: Array<UserInfo>) => { this.setState({ users: users }) },
            (err) => { console.error(err) }
        )
    }

    onSubmit(text: string) {
        if (!text.trim().length) {
            text = "%"
        }
        this.lastSubmitted = text;
        this.runSearch(text);
    }
    constructor(props) {
        super(props)
        this.lastSubmitted = ""
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.runSearch = this.runSearch.bind(this)
        this.contact = this.contact.bind(this)
        this.state = {
            value: "",
            suggestions: [],
            users: [],
        }
    }
    contact(is_contact: boolean, username: string) {
        console.log("we want to change")
        if (is_contact)
            Api.Users.add_relationship(username, () => (this.runSearch(this.lastSubmitted)))
        else
            Api.Users.remove_relationship(username, () => (this.runSearch(this.lastSubmitted)))
    }


    public render() {
        let globals: Globals = this.props.globals
        const state: UsersState = this.state

        if (globals.noAccess()) return globals.noAccessRet()

        return (
            <div style={{ width: "100%" }}>
                <SearchBar
                    suggestions={state.suggestions}
                    value={state.value}
                    placeholderText="Search for Users"
                    onChange={this.onChange}
                    onSubmit={this.onSubmit}
                ></SearchBar>
                <h1>Search For Users</h1>
                {!state.users.length ? <div></div> :
                    <Block>
                        <Center><h1>Results</h1></Center>
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

export default class Users extends Component<GlobalProps>{

    render() {
        let globals: Globals = this.props.globals
        if (globals.noAccess()) return globals.noAccessRet()
        return (
            <UsersSearch globals={globals} />
        )
    }
}
