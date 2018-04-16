import React, { Component } from 'react'
import Api from './Api'

import { Row, Col2, Col2a, Block, Content, ContentBlock, Label, Center } from '../Design'
import { Link } from 'react-router-dom'

export interface VideoInfo {
    username: string
    f_name: string
    l_name: string
    channel: string
    title: string
    description: string
    upload_date: string
    video_path: string
    image_path: string
    last_access: string
    category: string
    vid: string
}

interface VideoDisplayInterface {
    info: VideoInfo
}
export class VideoDisplay extends Component<VideoDisplayInterface> {
    render() {
        let i: VideoInfo = this.props.info
        return (
            <Link to={"/video/" + i.vid} style={{ width: "100%" }} >
                <Row style={{ minHeight: "10em" }}>
                    <div className="col-md-3 offset-md-0 col-8 offset-2 " style={{ padding: "1rem" }} >
                        <img src={i.image_path} width="192" height="108" style={{ width: "100%" }} />
                    </div>
                    <div className="col-md-9 col-12">
                        <Row>
                            <div className="col-md-8 col-12" style={{ fontSize: "1.2rem", textAlign: "left" }}>
                                {i.title}
                            </div>
                            <div className="col-md-4 col-12" style={{ textAlign: "right" }}>
                                <span>{i.category}</span>
                            </div>
                        </Row>
                        <hr />
                        <Row>
                            <div className="col-12" style={{ textAlign: "left" }}>
                                <h5>{i.f_name + " " + i.l_name} <span className="username">@{i.username}</span></h5>
                            </div>
                            <div className="col-12" style={{ textAlign: "left" }}>
                                <p>{i.description}</p>
                            </div>
                        </Row>
                    </div>
                </Row>
            </Link>
        )
    }
}
