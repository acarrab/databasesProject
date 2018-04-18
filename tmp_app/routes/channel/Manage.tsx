import React, { Component } from 'react'
import { GlobalProps, Globals } from '../../Control'
import { Link } from 'react-router-dom'

import * as Api from '../../Api'
import { api } from '../../Api'

import { Grid, VideoInfo } from '../../components/VideoInfo'

import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper'

interface ManageState {
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

export default class Manage extends Component<GlobalProps> {
    previousMessage: string

    state: ManageState

    get_my_videos() {
        api.videos.get_mine((videos: Array<Api.output$api$videos$get_mine>) => {
            console.log(videos)
            this.setState({ videos: videos })
        })
    }
    constructor(props) {
        super(props)
        this.get_my_videos = this.get_my_videos.bind(this)

        this.state = {
            videos: []
        }
        this.get_my_videos();
    }

    public render() {
        let globals: Globals = this.props.globals
        if (globals.noAccess()) { return globals.noAccessRet() }

        const s: ManageState = this.state
        return (
            <Paper zDepth={4} style={styles.paper}>
                <Link to="/upload"><RaisedButton style={styles.button} label="Go Upload A Video" primary={true} /></Link>
                <Grid>
                    {s.videos.map((info: Api.output$api$videos$get_mine) => (
                        <VideoInfo reload={this.get_my_videos} key={info.vid} globals={globals} info={info} />
                    ))}
                </Grid>
            </Paper >
        );
    }
}
