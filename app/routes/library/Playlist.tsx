import React, { Component } from 'react'
import { GlobalProps, Globals } from '../../Control'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper'

import * as Api from '../../Api'
import {
    api,
    output$api$playlists$get_playlist as PlaylistData,
    output$api$playlists$get_playlist_info as PlaylistInfo
} from '../../Api'

import { Grid, VideoInfo } from '../../components/VideoInfo'

interface State {
    videos: Array<PlaylistData>
    info: PlaylistInfo
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
    match: { params: { pid: string } }
}

export default class Channel extends Component<Props, State> {
    previousMessage: string

    get_my_videos = (props: Props) => {
        const { pid } = props.match.params
        api.playlists.get_playlist({ pid: pid }, (videos: Array<PlaylistData>) => {
            this.setState({ videos })
        })
        api.playlists.get_playlist_info({ pid: pid }, (info: PlaylistInfo) => {
            this.setState({ info })
        })
    }
    reload_videos = () => {
        this.get_my_videos(this.props)
    }

    constructor(props) {
        super(props)
        this.get_my_videos = this.get_my_videos.bind(this)

        this.state = {
            videos: [],
            info: null
        }
        this.get_my_videos(props);
    }

    public render() {
        let globals: Globals = this.props.globals
        if (globals.noAccess()) { return globals.noAccessRet() }
        const { videos, info } = this.state
        if (info === null) {
            return <Paper zDepth={4} style={styles.paper}><h1>No Playlist Found</h1></Paper>
        }
        return (
            <Paper zDepth={4} style={styles.paper}>
                <div style={{ textAlign: "left" }}>
                    <Link to='/playlists'><RaisedButton secondary={true}>Back</RaisedButton></Link>
                </div>
                <h1
                    style={{ paddingBottom: "2em" }}
                ><span style={{ color: "yellow" }}>{info.name}</span> Playlist</h1>
                <Grid>
                    {videos.map((info: Api.output$api$videos$get_mine) => (
                        <VideoInfo reload={this.reload_videos} key={info.vid} globals={globals} info={info} />
                    ))}
                </Grid>
            </Paper >
        );
    }
}
