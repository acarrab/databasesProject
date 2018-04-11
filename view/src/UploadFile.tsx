import React, { Component } from 'react'
import { Player } from 'video-react'

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
            <div className="previewComponent">
                <input className="fileInput"
                    type="file"
                    onChange={(e) => this.handleImageChange(e)} />
                <div className="imgPreview">
                    {state.invalidType ? (<div className="error">{props.error}</div>) :
                        state.imagePreviewUrl.length === 0 ? (<div className="previewText">{props.message}</div>) :
                            props.displayFile(state.imagePreviewUrl)}
                </div>

            </div>
        )
    }
}


export class ImageUpload extends Component {
    displayFile(fileUrl) {
        return <img src={fileUrl} />
    }
    onChange(file, fileUrl) {
        console.log("got the file: " + file)
    }
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }
    render() {
        return (
            <Upload
                displayFile={this.displayFile}
                isValidType={(type) => (type.match('image.*'))}
                error="Invalid file type, It should be an image"
                message="Upload an image"
                onChange={this.onChange}
            />
        )
    }
}

export class VideoUpload extends Component {
    placeholder: "Upload an image"
    displayFile(fileUrl) {
        return <Player playsInline src={fileUrl} />
    }
    onChange(file, fileUrl) {
        console.log("got the file: " + file)
    }
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
    }
    render() {
        return (
            <Upload
                displayFile={this.displayFile}
                isValidType={(type) => (type.match('video.*'))}
                error="Invalid file type, It should be a video"
                message="Upload a video"
                onChange={this.onChange}
            />
        )
    }
}
