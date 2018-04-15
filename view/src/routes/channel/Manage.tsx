import React, { Component } from 'react'
import AccessControl from '../../tools/Auth'
import { GlobalProps, Globals } from '../../Control'
import { Row, Col2, Col2a, Block, Content, ContentBlock, Label, Center } from '../../Design'
import Api from '../../tools/Api'


interface VideoInfo {
    image_path: string
    video_path: string
    upload_date: string
    description: string
    title: string
    category: string
}

interface VideoDisplayInterface {
    info: VideoInfo
    username: string
    name: string
}
class VideoDisplay extends Component<VideoDisplayInterface> {
    render() {
        let p: VideoDisplayInterface = this.props
        return (
            <Row style={{ minHeight: "10em" }}>
                <div className="col-md-3 offset-md-0 col-8 offset-2 " style={{ padding: "1rem" }} >
                    <img src={p.info.image_path} width="192" height="108" style={{ width: "100%" }} />
                </div>
                <div className="col-md-9 col-12">
                    <Row>
                        <div className="col-md-8 col-12" style={{ fontSize: "1.2rem", textAlign: "left" }}>
                            {p.info.title}
                        </div>
                        <div className="col-md-4 col-12" style={{ textAlign: "right" }}>
                            <span>{p.info.category}</span>
                        </div>
                    </Row>
                    <hr />
                    <Row>
                        <div className="col-12" style={{ textAlign: "left" }}>
                            <h5>{p.name} <span className="username">@{p.username}</span></h5>
                        </div>
                        <div className="col-12" style={{ textAlign: "left" }}>
                            <p>{p.info.description}</p>
                        </div>
                    </Row>
                </div>
            </Row>
        )
    }
}


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
                            <ContentBlock>
                                <VideoDisplay info={video} username={user.username} name={user.f_name + " " + user.l_name} />
                            </ContentBlock>
                        ))}
                    </Content>
                </Block>
            </Row>
        );
    }
}
