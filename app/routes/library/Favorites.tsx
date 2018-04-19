import React, { Component } from 'react'
import { GlobalProps, Globals } from '../../Control'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton';
import CategorySelector from '../../tools/Category';
import Divider from 'material-ui/Divider';

import {
    api,
    output$api$playlists$get_favorites as VideoData
} from '../../Api'


import SearchBar from '../../components/SearchBar'
import { Grid, VideoInfo } from '../../components/VideoInfo'


const styles = {
    paper: {
        maxWidth: "70rem",
        padding: "4em 2em",
        margin: "0 auto"
    },
}

interface ManageState {
    videos: Array<VideoData>
}


export default class Videos extends Component<GlobalProps, ManageState> {

    get_videos = (category?: string) => {
        api.playlists.get_favorites((videos: Array<VideoData>) => {
            this.setState({ videos: videos })
        })
    }
    constructor(props) {
        super(props)

        this.state = { videos: [] }
        this.get_videos();
    }
    render() {

        let globals: Globals = this.props.globals
        if (globals.noAccess()) { return globals.noAccessRet() }
        const { videos } = this.state
        if (videos.length === 0) {
            return (
                <Paper zDepth={4} style={styles.paper}>
                    <h1>Your favorites list is empty...</h1>
                </Paper>
            )
        }

        return (
            <Paper zDepth={4} style={styles.paper}>
                <h1>Favorites!</h1>
                <Grid>
                    {videos.map((info: VideoData, index) => (
                        <VideoInfo key={index} reload={this.get_videos} globals={globals} info={info} />
                    ))}
                </Grid>
            </Paper>
        );
    }
}
