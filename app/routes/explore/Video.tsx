import React, { Component } from 'react'
import { Globals, GlobalProps } from '../../Control'

import { DefaultPlayer as Video } from 'react-html5video'


import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';


import * as Api from '../../Api'
import { api } from '../../Api'


interface VideoViewProps {
    info: Api.output$api$videos$get_video
}
class VideoView extends Component<VideoViewProps>{
    render() {
        const i = this.props.info
        return (
            <Video style={{
                padding: "3em 4em",
                backgroundColor: "rgba(0, 0, 0, .2)",
                boxShadow: "inset 0em 0em 8em #222"
            }}
                controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen', 'Download']} poster={i.image_path}>
                <source src={i.video_path} type="video/webm" />
            </Video>
        )
    }
}
interface VideoDisplayProps extends GlobalProps {
    match: { params: { vid: string } }
}

export default class VideoPlay extends Component<VideoDisplayProps, { info: Api.output$api$videos$get_video }> {
    getVideo(vid: string) {
        api.videos.get_video({ vid: vid }, (res: Api.output$api$videos$get_video) => {
            this.setState({ info: res })
        })
    }
    constructor(props) {
        super(props)
        this.state = {
            info: null
        }
        this.getVideo = this.getVideo.bind(this)
        this.getVideo(this.props.match.params.vid)
    }
    render() {

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
                        <VideoView info={i} />
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
