import React, { Component } from 'react'
import { GlobalProps, Globals } from '../../Control'

import * as Api from '../../Api'
import { api } from '../../Api'

import { Grid, VideoInfo } from '../../components/VideoInfo'


interface ManageState {
    videos: Array<Api.output$api$videos$get_mine>
}


export default class Manage extends Component<GlobalProps> {
    previousMessage: string

    state: ManageState

    get_my_videos() {
        api.videos.get_mine((videos: Array<Api.output$api$videos$get_mine>) => {
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

        const s: ManageState = this.state
        return (
            <Grid>
                {s.videos.map((info: Api.output$api$videos$get_mine) => (
                    <VideoInfo info={info} />
                ))}
            </Grid>
        );
    }
}
