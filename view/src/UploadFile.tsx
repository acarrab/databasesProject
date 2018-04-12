import React, { Component } from 'react'
import { Player } from 'video-react'
import { Row, Col2, Col2a, Block, Content, ContentBlock, Label, Center } from './Design'


interface UploadProps {
    message: string
    error: string
    onChange: (file, fileUrl) => void

    displayFile: (fileUrl) => JSX.Element
    isValidType: (file) => boolean
}


interface UploadState {
    file: string,
    imagePreviewUrl: string
    invalidType: boolean
}

export default class Upload extends Component<UploadProps> {
    state: UploadState
    constructor(props) {
        super(props)
        this.state = { file: '', imagePreviewUrl: '', invalidType: false }

        this.handleImageChange = this.handleImageChange.bind(this)
    }
    handleImageChange(e) {
        const props: UploadProps = this.props
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            if (props.isValidType(file.type)) {
                this.setState({ file: file, imagePreviewUrl: reader.result, invalidType: false })
                props.onChange(file, reader.result)
            } else {
                this.setState({ file: '', imagePreviewUrl: '', invalidType: true })
                props.onChange("", "")
            }
        }
        reader.readAsDataURL(file)
    }
    render() {
        const state: UploadState = this.state
        const props: UploadProps = this.props

        console.log("img url: " + state.imagePreviewUrl)
        return (
            <div className="upload-file" >
                <div style={{ paddingBottom: ".5em" }}>{props.message}</div>

                <input style={{ color: "white" }} type="file" onChange={(e) => this.handleImageChange(e)} />
                <hr />
                <div style={{ minWidth: "15em", color: "white !important" }}>
                    {state.invalidType ? (<div className="error">{props.error}</div>) :
                        state.imagePreviewUrl.length === 0 ? <div></div> :
                            props.displayFile(state.imagePreviewUrl)}
                </div>
            </div >
        )
    }
}

interface FileUploadProps {
    onChange: (file, fileUrl) => void
}


export class ImageUpload extends Component<FileUploadProps> {
    displayFile(fileUrl) {
        return <div></div>//<img src={fileUrl} width="192" height="108" />
    }
    render() {
        return (
            <Upload
                displayFile={this.displayFile}
                isValidType={(type) => (type.match('image.*'))}
                error="Invalid file type, It should be an image"
                message="Upload an image"
                onChange={this.props.onChange}
            />
        )
    }
}

export class VideoUpload extends Component<FileUploadProps> {
    placeholder: "Upload an image"
    displayFile(fileUrl) {
        return <Player playsInline src={fileUrl} />
    }
    render() {
        return (
            <Upload
                displayFile={this.displayFile}
                isValidType={(type) => (type.match('video.*'))}
                error="Invalid file type, It should be a video"
                message="Upload a video"
                onChange={this.props.onChange}
            />
        )
    }
}
