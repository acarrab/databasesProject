import React, { Component } from 'react'
import { Globals, GlobalProps } from '../../Control'
import Api from '../../tools/Api'
import { VideoInfo, VideoDisplay } from '../../tools/Video'
import { Row, Col2, Col2a, Block, Content, ContentBlock, Label, Center } from '../../Design'

import { Player } from 'video-react'


interface VideoDisplayerProps extends GlobalProps {
    match: { params: { vid: string } }
}
export default class VideoDisplayer extends Component<VideoDisplayerProps> {
    state: { info?: VideoInfo }
    constructor(props) {
        super(props)
        this.state = {
            info: null
        }
    }
    componentDidMount() {
        const vid = this.props.match.params.vid
        Api.Videos.get_video(vid, (info: VideoInfo) => {
            this.setState({ info: info })
        })
    }
    public render() {
        if (this.state.info === null || this.state.info === undefined) {
            return (
                <Block>
                    <Center>Video not found...</Center>
                </Block>
            )
        }
        const i: VideoInfo = this.state.info
        return (
            <Row>
                <Block>
                    <Center><h1>{i.title}</h1></Center>
                    <Content>
                        <ContentBlock>
                            <Player playInline src={i.video_path} />
                            <Row style={{ textAlign: "right" }}>
                                <div className="col-8" style={{ marginTop: "2rem" }}>
                                    <Row>
                                        <h4>{i.channel} <span className="username">@{i.username}</span></h4>
                                    </Row>
                                    <Row><p>{i.description}</p></Row>
                                </div>
                                <div className="col-4" style={{ marginTop: "2rem", textAlign: "right" }}>
                                    <a style={{ width: "100%", textAlign: "right" }} href={i.video_path}>
                                        <button className="my-btn fas fa-cloud-download-alt"></button>
                                    </a>
                                </div>
                            </Row>
                        </ContentBlock>
                    </Content>
                </Block >
            </Row >
        );
    }

}
