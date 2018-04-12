import React, { Component } from 'react'
import AccessControl from '../../tools/Auth'
import { Globals, GlobalProps } from '../../Control'

import Form, { Input, Button, Textarea, valid } from '../../forms/Form'

import { ImageUpload, VideoUpload } from '../../UploadFile'
import { Row, Col2, Col2a, Block, Content, ContentBlock, Label, Center, VideoCard } from '../../Design'




interface UploadFields {
    title: string
    description: string
}
interface UploadState extends UploadFields {
    imgUrl: string
    videoUrl: string
    error: boolean
}
class CardForm extends Form<UploadFields> {
    formSubmit(fields: UploadFields) { }
    formRender() {
        return (
            <Row>
                <Label>
                    <Input type="text" placeholder="Title" name="title" validations={[valid.required]} />
                </Label>
                <Label>
                    <Textarea
                        style={{ width: "100%" }}
                        name="description"
                        placeholder="Video description"
                        validations={[valid.required, valid.under255]} />
                </Label>
                <Center><Button>Update Card</Button></Center>
            </Row>
        )
    }
}


export default class Upload extends Component<GlobalProps> {
    state: UploadState
    onThumbnailChange(file, fileUrl) {
        this.setState({ imgUrl: fileUrl })
    }
    onVideoChange(file, fileUrl) {
        this.setState({ videoUrl: fileUrl })
    }
    constructor(props) {
        super(props)
        this.onThumbnailChange = this.onThumbnailChange.bind(this)
        this.onVideoChange = this.onVideoChange.bind(this)
        this.submit = this.submit.bind(this)
        this.state = {
            error: false,
            imgUrl: "",
            videoUrl: "",
            title: "",
            description: ""
        }
    }

    submit(e) {
        e.preventDefault()
        if (!this.state.videoUrl.length) {
            this.setState({ error: true })
        } else if (!this.state.imgUrl.length) {
            this.setState({ error: true })
        } else {
            this.props.globals.previousMessage = "Upload Successful!"
            this.props.globals.changeRoute('/manage')
        }
    }
    render() {
        let globals: Globals = this.props.globals
        if (!globals.auth.islogged()) {
            globals.goHome()
            return <div className="error">No Access</div>
        }
        return (
            <Row className="form-container">
                <Center><h1>Upload your own video!</h1></Center>
                <Block className="upload">
                    <Center><h4 style={{ margin: "1em" }}>Upload your video</h4></Center>
                    <Content>
                        {!this.state.error || this.state.videoUrl.length ? (<div></div>) :
                            <Center><h4 className="error">Please upload the video</h4></Center>}
                        <ContentBlock style={{ minHeight: "8em" }}>
                            <VideoUpload onChange={this.onVideoChange} />
                        </ContentBlock>
                    </Content>
                    <Center><h4 style={{ margin: "1em" }}>Create your video card</h4></Center>
                    <Content>
                        {!this.state.error || this.state.imgUrl.length ? (<div></div>) :
                            <Center><h4 className="error">Please upload the thumbnail image</h4></Center>}
                        <ContentBlock style={{ minHeight: "8em" }}>
                            <Row>
                                <div className="col-12 col-lg-4">
                                    <ImageUpload onChange={this.onThumbnailChange} />
                                </div>
                                <div className="col-12 col-lg-8">
                                    <CardForm globals={this.props.globals} onSubmit={(values: UploadFields) => {
                                        this.setState({ title: values.title, description: values.description })
                                    }} />
                                </div>
                            </Row>
                        </ContentBlock>

                        <ContentBlock>
                            <VideoCard
                                imgSrc={this.state.imgUrl}
                                title={this.state.title}
                                author={globals.auth.userInfo.f_name + " " + globals.auth.userInfo.l_name}
                                username={globals.auth.userInfo.username}
                                description={this.state.description}
                            >
                            </VideoCard>
                        </ContentBlock>
                    </Content>
                    <Center><button onClick={this.submit}>Upload Video</button></Center>
                </Block>
            </Row>
        );
    }
}
