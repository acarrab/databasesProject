import React, { Component } from 'react'
import { Globals, GlobalProps } from '../../Control'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton';
import { VideoView } from '../explore/Video'
import { PositionProperty } from 'csstype';

let pos: PositionProperty = 'absolute';

const styles = {
    button: {
        margin: "2em",
    },
    videoInput: {
        cursor: 'pointer',
        position: pos,
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
    },
}


export interface VideoRetrieverProps extends GlobalProps {
    onVideoChange: (videoFile?: File) => void
    onThumbnailChange: (thumbnailPng?: string) => void
    thumbnailError: string
    videoError: string
}

interface VideoRetrieverState {
    videoFile?: File
    videoUrl?: string
    thumbnailPng?: string
    thumbnailUrl?: string
}

export default class VideoRetriever extends Component<VideoRetrieverProps, VideoRetrieverState>{
    canvas: HTMLCanvasElement
    input: HTMLInputElement
    handleChange(e) {
        e.preventDefault()
        let file: File = this.input.files[0]
        const g = this.props.globals
        const p = this.props

        if (file.type.match('video.*')) {
            console.log("it is a video")
            // set state to null to force a reload
            this.setState({
                videoFile: file,
                videoUrl: null,
                thumbnailPng: null,
                thumbnailUrl: null
            })
            p.onVideoChange(file)
            // read in the file and load it into videoUrl
            let reader = new FileReader()
            reader.onloadend = () => {
                console.log("it was loaded")
                this.setState({ videoUrl: reader.result })
            }
            reader.readAsDataURL(file)
        } else {
            g.error("Invalid Type, should be a video")
            p.onThumbnailChange(null)
            p.onVideoChange(null)
            this.setState({
                videoFile: null,
                videoUrl: null,
                thumbnailPng: null,
                thumbnailUrl: null
            })
        }
    }

    captureFrame(e) {
        e.preventDefault()
        let video: HTMLVideoElement = document.getElementsByTagName("video")[0]
        let cvs = document.createElement("canvas")
        cvs.height = video.videoHeight
        cvs.width = video.videoWidth

        var ctx = cvs.getContext('2d')
        ctx.drawImage(video, 0, 0, cvs.width, cvs.height)

        let url = cvs.toDataURL()

        //url.replace(/^data:image\/(pn
        let png = url.replace(/^data:image\/(png|jpg);base64,/, "")
        this.setState({ thumbnailPng: png, thumbnailUrl: url })
        const p = this.props
        p.onThumbnailChange(png)
    }
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        this.captureFrame = this.captureFrame.bind(this)
        this.state = {
            videoFile: null,
            videoUrl: null,
            thumbnailPng: null,
            thumbnailUrl: null
        }
    }
    render() {
        const s = this.state
        const { videoError, thumbnailError } = this.props
        return (
            <Paper zDepth={4}>
                <RaisedButton
                    label="Choose your video"
                    labelPosition="before"
                    style={{ margin: "2em auto" }}
                    containerElement="label"
                >
                    <input
                        ref={(c) => { this.input = c }}
                        type="file"
                        onChange={this.handleChange}
                        style={styles.videoInput}
                    />
                </RaisedButton>
                {videoError.length ? <div style={{ color: "red" }} >{videoError}</div> : ""}
                {s.videoUrl !== null ?
                    <div>
                        <VideoView src={s.videoUrl} />
                        <RaisedButton
                            style={{ margin: "2em 0em" }}
                            label="Capture Frame from video as thumbnail"
                            onClick={this.captureFrame}
                        />
                        {thumbnailError.length ? <div style={{ color: "red" }} >{thumbnailError}</div> : ""}
                    </div>
                    : ""
                }

                {s.thumbnailUrl !== null ?
                    <img src={s.thumbnailUrl} width="192" height="108" style={{ marginBottom: "2em" }} />
                    : ""}
            </Paper>
        )
    }
}
