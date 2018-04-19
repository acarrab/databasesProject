import React, { Component } from 'react'
import { Globals, GlobalProps } from '../../Control'
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper'
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton'
import { Required, Over255 } from '../../tools/Validate'
import { getTimeSince } from '../../tools/Time'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import Popover from 'material-ui/Popover/Popover'
import { Menu, MenuItem } from 'material-ui/Menu'

const styles = {
    paper: {
        maxWidth: "60rem",
        padding: "4em",
        margin: "0em auto",
        marginBottom: "2rem"

    },
    paper_second: {
        maxWidth: "60rem",
        padding: "4em",
        margin: "0 auto"
    },
    button: {
        margin: "2em 1em",
    }
}

import {
    api,
    output$api$videos$get_comments as CommentData
} from '../../Api'


interface CommentProps extends GlobalProps {
    data: CommentData,
    update: () => void
}

class Comment extends Component<CommentProps, { open: boolean, anchorEl: JSX.Element }> {
    state = {
        open: false,
        anchorEl: null
    }
    deleteComment = () => {
        api.videos.delete_comment({ com_id: this.props.data.com_id }, () => (
            this.props.update()
        ))
    }
    handleClick = (e) => {
        e.preventDefault()
        this.setState({ anchorEl: e.currentTarget, open: true })
    }
    render() {
        let globals: Globals = this.props.globals
        const { username, f_name, l_name, submit_time, text } = this.props.data

        return (
            <Card style={{ textAlign: "left", marginBottom: "1em", marginTop: "1em" }} zDepth={2} >

                <CardHeader
                    title={<h1>{f_name + " " + l_name}</h1>}
                    closeIcon={<SettingsIcon onClick={this.handleClick} />}
                    openIcon={<SettingsIcon onClick={this.handleClick} />}
                    showExpandableButton={username === globals.user.username}

                    subtitle={
                        <span style={{ color: "rgba(255,255,255, .5)" }}>@{username}</span>
                    }
                />
                <CardText expandable={false}>
                    {text}
                </CardText>

                <Popover
                    open={this.state.open && this.state.anchorEl !== null}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ "horizontal": "left", "vertical": "top" }}
                    targetOrigin={{ "horizontal": "right", "vertical": "bottom" }}
                    onRequestClose={() => { this.setState({ open: false }) }}>
                    <MenuItem onClick={this.deleteComment}>Delete your Comment</MenuItem>
                </Popover>
            </Card>
        )
    }
}



class CommentIn extends Component<{ vid: string, update: () => void }, { text: string, text_error: string }> {
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
            api.videos.add_comment({
                text: text,
                vid: this.props.vid
            }, () => (
                this.props.update()
            ))
            this.setState({ text: "", text_error: "" })
        } else {
            this.setState(updates)
        }
    }

    render() {
        const { text_error, text } = this.state
        return (
            <form onSubmit={this.submit}>
                <TextField
                    hintText="Comment Here"
                    errorText={text_error}
                    value={text}
                    fullWidth={true}
                    multiLine={true}
                    onChange={(e) => { this.setState({ text: e.target.value }) }}
                />

                <RaisedButton type="submit" label="Submit Comment" primary={true} style={styles.button} />
            </form>
        )
    }

}


interface Props extends GlobalProps {
    vid: string
}

interface State {
    comments: Array<CommentData>
}
export default class CommentControl extends Component<Props, State> {
    getComments = () => {
        api.videos.get_comments({ vid: this.props.vid }, (comments: Array<CommentData>) => {
            this.setState({ comments })
        })
    }

    interval: any
    componentDidMount() { this.interval = setInterval(this.getComments, 2000) }
    componentWillUnmount() { clearInterval(this.interval) }



    constructor(props) {
        super(props)
        this.state = {
            comments: []
        }
        this.getComments()
    }
    render() {
        let globals: Globals = this.props.globals
        const { comments } = this.state
        return (
            <div>
                <Paper zDepth={4} style={styles.paper}>
                    {!comments.length ? <h1>No Comments Yet</h1> :
                        comments.map((comment: CommentData) => (
                            <Comment key={comment.com_id} data={comment} globals={globals} update={this.getComments} />
                        ))}

                </Paper>
                <Paper zDepth={4} style={styles.paper_second}>
                    <CommentIn vid={this.props.vid} update={this.getComments} />
                </Paper>
            </div>
        )
    }
}
