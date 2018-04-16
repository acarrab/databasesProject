import React, { Component } from 'react'
import AccessControl from '../../tools/Auth'
import { GlobalProps, Globals } from '../../Control'
import { Row, Col2, Col2a, Block, Content, ContentBlock, Label, Center } from '../../Design'
import { VideoDisplay, VideoInfo } from '../../tools/Video'
import Api from '../../tools/Api'




interface ManageState {
    videos: Array<VideoInfo>
}


export default class Manage extends Component<GlobalProps> {
    previousMessage: string

    state: ManageState

    get_my_videos() {
        Api.Videos.get_my_videos((videos: Array<VideoInfo>) => {
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
        if (globals.previousMessage) {
            this.previousMessage = globals.previousMessage
            globals.previousMessage = ""
        }
        if (globals.noAccess()) { return globals.noAccessRet() }

        const user = globals.auth.userInfo
        const s: ManageState = this.state
        return (
            <Row>
                <Center>{this.previousMessage ? <h4 className="success">{this.previousMessage}</h4> : <div></div>}</Center>
                <Center><h1>Channel Management!</h1></Center>
                <Block>
                    <h2>Videos</h2>
                    <Content>
                        {s.videos.map((video: VideoInfo) => (
                            <ContentBlock key={video.vid}>
                                <VideoDisplay info={video} />
                            </ContentBlock>
                        ))}
                    </Content>
                </Block>
            </Row>
        );
    }
}
