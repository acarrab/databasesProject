import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { Globals, GlobalProps } from '../../Control'



import SearchBar from '../../tools/SearchBar'
import Api, { UserInfo } from '../../tools/Api'
import { Row, Col2, Col2a, Block, Content, ContentBlock, Label, Center } from '../../Design'



interface UsersState {
    value: string
    suggestions: Array<{ text: string }>
    users: Array<UserInfo>
}
class UsersSearch extends Component<GlobalProps> {
    state: UsersState
    onChange(text: string) {
        console.log(text)
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
    onSubmit(text: string) {
        console.log("submitted: " + text);
        if (!text.trim().length) {
            text = "%"
        }
        Api.Search.User.user_list(
            text,
            (users: Array<UserInfo>) => { this.setState({ users: users }) },
            (err) => { console.error(err) }
        )
    }
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.state = {
            value: "",
            suggestions: [],
            users: []
        }
    }

    renderUser(user: UserInfo) {
        return (
            <ContentBlock key={user.username}>
                <Row><h4>{user.f_name + " " + user.l_name}</h4></Row>
                <Row><p className="username">@{user.username}</p></Row>
            </ContentBlock>
        )
    }

    public render() {
        let globals: Globals = this.props.globals
        const state: UsersState = this.state
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
                            {state.users.map(this.renderUser)}
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
        if (!globals.auth.islogged()) {
            globals.goHome()
            return <div className="error">No Access</div>
        }
        return (
            <UsersSearch globals={globals} />
        )
    }
}
