import React, { Component } from 'react'
import { Globals, GlobalProps } from '../../Control'
import Paper from 'material-ui/Paper'
import ContactRenderer from '../../components/ContactRenderer'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { getTimeSince } from '../../tools/Time'
import { Required, Over255 } from '../../tools/Validate'
import {
    api,
    output$api$users$get as ContactInfo,
    output$api$messaging$get as MessageData
} from '../../Api'




const styles = {
    paper: {
        maxWidth: "70rem",
        padding: "4rem",
        margin: "0 auto",
        textAlign: "left",
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    title: {
        marginBottom: "2em",
        marginTop: "1em",
        padding: "1em",
        width: "100%"
    },
    input: {
        marginBottom: "1em",
        marginTop: "2em",
        padding: "1em",
        width: "100%"
    }
}

class MessageInput extends Component<{ uid: string, reload: () => void }, { text: string, text_error: string }> {
    state = { text: "", text_error: "" }
    submit = (e) => {
        e.preventDefault()
        const { text } = this.state
        let noError = true
        let updates = { text_error: "" }
        let err = Required(text)

        if (err) {
            noError = false
            updates.text_error = err
        }

        err = Over255(text)
        if (err) {
            noError = false
            updates.text_error = err
        }

        if (noError) {
            api.messaging.send({ uid: this.props.uid, text: text }, () => {
                this.props.reload()
            })
            this.setState({ text: "", text_error: "" })
        } else {
            this.setState(updates)
        }
    }

    render() {
        const { text_error, text } = this.state

        return (
            <form onSubmit={this.submit} style={{ textAlign: "right" }}>
                <span>
                    <TextField
                        hintText="send message"
                        errorText={text_error}
                        value={text}
                        fullWidth={true}
                        style={{ width: "calc(100% - 100px)" }}
                        onChange={(e) => { this.setState({ text: e.target.value }) }}
                    />
                </span>
                <span style={{ width: "80px", paddingLeft: "10px" }}>
                    <RaisedButton type="submit" label="Send" primary={true} style={{ margin: "0em 0em" }} />
                </span>
            </form>
        )
    }

}



interface MessageProps {
    message: MessageData
    contact: ContactInfo
}

const Message = ({ message, contact }: MessageProps) => (
    <Paper style={{
        textAlign: (message.sender === contact.uid ? "left" : "right"),
        marginBottom: "1em",
        marginTop: "1em",
        padding: "1em",
        width: "100%"
    }} zDepth={2} >
        <h3>{getTimeSince(message.send_time)}</h3>
        <p>{message.message}</p>
    </Paper>
)

interface MessagingProps extends GlobalProps {
    contact: ContactInfo
    messages: Array<MessageData>
    reload: () => void
}

class Messaging extends Component<MessagingProps> {

    render() {
        const { f_name, l_name, is_contact, username, uid } = this.props.contact
        const { messages, reload } = this.props
        return (
            <div style={{ width: "100%" }}>
                <Paper style={styles.title} zDepth={5}>
                    <h1>{f_name + " " + l_name}</h1>
                    <span style={{ color: "rgba(255,255,255, .5)" }}>{"@" + username}</span>
                </Paper>
                {messages.map((m, index) => (<Message key={index} message={m} contact={this.props.contact} />))}

                <Paper style={styles.input} zDepth={5}>
                    <MessageInput uid={uid} reload={reload} />
                </Paper>
            </div>
        )

    }

}








interface State {
    contact: ContactInfo
    messages: Array<MessageData>
}

interface Props extends GlobalProps {
    match: { params: { uid: string } }
}

const getUid = (props: Props) => (props.match.params.uid)

export default class Messages extends Component<Props, State>{
    // keeps previously loaded information to make experience smoother
    static previous_messages: { [uid: number]: Array<MessageData> } = {}
    static previous_contact: { [uid: number]: ContactInfo } = {}
    selected_user: string
    constructor(props) {
        super(props)
        const uid = getUid(props)

        this.state = {
            contact: Messages.previous_contact[uid],
            messages: Messages.previous_messages[uid]
        }
        if (Messages.previous_contact[uid] === undefined) {
            this.state = {
                contact: null,
                messages: null
            }
            this.update_contact(props)
            this.update_messages(props)
        } else {
            this.state = {
                contact: Messages.previous_contact[uid],
                messages: Messages.previous_messages[uid]
            }
        }

    }

    get_contact = () => {
        this.update_contact(this.props)

    }
    get_messages = () => {
        this.update_messages(this.props)
    }

    contact_interval: any
    messages_interval: any
    componentDidMount() {
        this.contact_interval = setInterval(this.get_contact, 10000)
        this.messages_interval = setInterval(this.get_messages, 3000)
    }
    componentWillUnmount() { clearInterval(this.messages_interval); clearInterval(this.contact_interval); }

    componentWillReceiveProps(props: Props) {
        if (getUid(props) !== getUid(this.props)) {
            this.update_messages(props)
            this.update_contact(props)
        }
    }



    update_messages = (props: Props) => {
        const uid = getUid(props)
        api.messaging.get({ uid: uid }, (messages: Array<MessageData>) => {
            Messages.previous_messages[uid] = messages
            this.setState({ messages })
            api.messaging.mark_as_read({ uid: uid }, () => { })
        })
    }

    update_contact = (props: Props) => {
        const uid = getUid(props)
        api.users.get({ uid: uid }, (contact: ContactInfo) => {
            Messages.previous_contact[uid] = contact
            this.setState({ contact })
        }, () => {
            this.setState({ contact: null })
        })
    }

    render() {
        let globals: Globals = this.props.globals
        if (globals.noAccess()) { return globals.noAccessRet() }

        const { contact, messages } = this.state
        if (contact === null && messages === null) {
            return (
                <Paper zDepth={4} style={styles.paper} >
                    <h1>Loading User...</h1>
                </Paper>
            )
        }


        if (contact === null && messages.length === 0) {
            return (
                <Paper zDepth={4} style={styles.paper} >
                    <h1>User was not found...</h1>
                </Paper>
            )
        }


        return (
            <Paper zDepth={0} style={styles.paper} >
                <Messaging globals={globals} {...this.state} reload={this.get_messages} />
            </Paper>

        );
    }
}
