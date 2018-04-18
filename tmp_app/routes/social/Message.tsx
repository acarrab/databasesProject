import React, { Component } from 'react'
import { Globals, GlobalProps } from '../../Control'



import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


import * as Api from '../../Api'
import { api } from '../../Api'


interface VideoViewProps {
    src: string
    poster?: string
}


interface VideoDisplayProps extends GlobalProps {
    match: { params: { username: string } }
}

export default class VideoPlay extends Component<VideoDisplayProps, { info: Api.output$api$videos$get_video }> {
    getMessages(username: string) {
        console.log("username: " + username)
    }
    constructor(props) {
        super(props)
        this.state = {
            info: null
        }
        this.getMessages = this.getMessages.bind(this)
        this.getMessages(this.props.match.params.username)
    }
    render() {
        let globals: Globals = this.props.globals
        if (globals.noAccess()) { return globals.noAccessRet() }

        if (this.state.info) {
            const i = this.state.info
            console.log(i.upload_date)
            return (
                <Card style={{ textAlign: "left", maxWidth: "70em", margin: "0em auto" }} zDepth={5}>
                    <CardHeader
                        title={i.channel}
                        subtitle={i.f_name + " " + i.l_name}
                    />
                    <CardMedia>

                    </CardMedia>
                    <CardTitle title={i.title} subtitle={i.upload_date} />
                    <CardText>
                        {i.description}
                    </CardText>
                    <CardActions>
                        <FlatButton label="Download" onClick={() => { window.open(i.video_path) }} primary={false} />
                    </CardActions>
                </Card >
            )
        }

        return (
            <h1> Trying to load the video</h1 >
        )
    }
}
