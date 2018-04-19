import React, { Component } from 'react'
import { GlobalProps, Globals } from '../../Control'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper'

import * as Api from '../../Api'
import { api } from '../../Api'

import { Grid, VideoInfo } from '../../components/VideoInfo'

interface State {
    videos: Array<Api.output$api$videos$get_mine>
}
const styles = {
    paper: {
        maxWidth: "70rem",
        padding: "4em",
        margin: "0 auto"
    },
    button: {
        marginBottom: "4em"
    }
}


interface Props extends GlobalProps {
    match: { params: { uid: string } }
}

export default class Channel extends Component<Props, State> {
    previousMessage: string

    get_my_videos = (props: Props) => {
        api.videos.get_channel({ uid: props.match.params.uid }, (videos: Array<Api.output$api$videos$get_mine>) => {
            console.log(videos)
            this.setState({ videos: videos })
        })
    }
    reload_videos = () => {
        this.get_my_videos(this.props)
    }

    constructor(props) {
        super(props)
        this.get_my_videos = this.get_my_videos.bind(this)

        this.state = {
            videos: []
        }
        this.get_my_videos(props);
    }

    public render() {
        let globals: Globals = this.props.globals
        if (globals.noAccess()) { return globals.noAccessRet() }
        const { videos } = this.state
        if (videos.length === 0) {
            return <Paper zDepth={4} style={styles.paper}><h1>No videos found</h1></Paper>
        }
        return (
            <Paper zDepth={4} style={styles.paper}>
                <div style={{ textAlign: "left" }}>
                    <Link to='/channels'><RaisedButton secondary={true}>Back</RaisedButton></Link>
                </div>
                <h1 style={{ paddingBottom: "2em" }}>{videos[0].channel}</h1>
                <Grid>
                    {videos.map((info: Api.output$api$videos$get_mine) => (
                        <VideoInfo reload={this.reload_videos} key={info.vid} globals={globals} info={info} />
                    ))}
                </Grid>
            </Paper >
        );
    }
}
