import React, { Component } from 'react'
import AccessControl from '../../tools/Auth'
import { Globals, GlobalProps } from '../../Control'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import Form, { Input, Button, Textarea, valid } from '../../forms/Form'

import { VideoUpload } from '../../UploadFile'
import Api, { UploadVideoFields } from '../../tools/Api'

import { Row, Col2, Col2a, Block, Content, ContentBlock, Label, Center, VideoCard } from '../../Design'

const categories = [
    "Select a category",
    "funny",
    "sports",
    "nature",
    "gaming",
    "music",
    "other"
]

interface UploadFields {
    title: string
    description: string
    keywords: string

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

                <Label>
                    <Textarea
                        style={{ width: "100%" }}
                        name="keywords"
                        placeholder="Keywords separated by space"
                        validations={[valid.required, valid.under255]} />
                </Label>

                <Center><Button>Upload Video</Button></Center>
            </Row>
        )
    }
}


interface UploadState extends UploadFields {
    videoBlob: string
    error: boolean
    value: number
    category: string
    categoryError: boolean
    extension: string
    file: any
}
export default class Upload extends Component<GlobalProps> {
    state: UploadState
    onVideoChange(file, fileUrl) {
        console.log(file)
        const extRegex = /\.([0-9a-z]+)(?:[\?#]|$)/i;
        const ext = file.name.match(extRegex)[1];
        console.log(ext)
        this.setState({ videoBlob: fileUrl, extension: ext, file: file })
    }

    handleCategoryChange(event, index, value) {
        this.setState({ value: value, category: categories[value] })
    }
    constructor(props) {
        super(props)
        this.onVideoChange = this.onVideoChange.bind(this)
        this.handleCategoryChange = this.handleCategoryChange.bind(this)
        this.submit = this.submit.bind(this)
        this.state = {
            error: false,
            videoBlob: "",
            extension: "",
            title: "",
            description: "",
            keywords: "",
            value: 0,
            category: "",
            categoryError: false,
            file: null
        }
    }

    submit(values: UploadFields) {

        if (!this.state.videoBlob.length && !this.state.value) {
            this.setState({ error: true, categoryError: true })

        } else if (!this.state.videoBlob.length) {
            this.setState({ error: true, categoryError: false })

        } else if (!this.state.value) {
            this.setState({ error: false, categoryError: true })

        } else {
            const s = this.state

            let data = new FormData()
            data.append('title', values.title)
            data.append('description', values.description)
            data.append('keywords', values.keywords)
            data.append('category', s.category)
            data.append('extension', s.extension)
            data.append('file', s.file);


            Api.Videos.upload(data, (res) => {
                console.log(res)
                this.props.globals.previousMessage = "Upload Successful!"
                this.props.globals.changeRoute('/manage')
            })
        }
    }
    render() {
        let globals: Globals = this.props.globals
        if (globals.noAccess()) return globals.noAccessRet()
        return (
            <Row className="form-container">
                <Center><h1>Upload your own video!</h1></Center>
                <Block className="upload">
                    <Center><h4 style={{ margin: "1em" }}>Upload your video</h4></Center>
                    <Content>
                        {!this.state.error || this.state.videoBlob.length ? (<div></div>) :
                            <Center><h4 className="error">Please upload the video</h4></Center>}
                        <ContentBlock style={{ minHeight: "8em" }}>
                            <VideoUpload onChange={this.onVideoChange} />
                        </ContentBlock>
                    </Content>
                    <Center><h4 style={{ margin: "1em" }}>Create your video card</h4></Center>
                    <Content>
                        <ContentBlock style={{ minHeight: "8em" }}>
                            {this.state.categoryError ? <Row className="error">Category is a required field</Row> : <div></div>}
                            <Center><SelectField
                                floatingLabelText="Category"
                                value={this.state.value}
                                onChange={this.handleCategoryChange}
                            >
                                {categories.map((text, id) => (
                                    <MenuItem key={id} value={id} primaryText={text} />
                                ))}
                            </SelectField></Center>
                            <Row>
                                <div className="col-12 col-lg-8">
                                    <CardForm globals={this.props.globals} onSubmit={this.submit} />
                                </div>
                            </Row>
                        </ContentBlock>
                    </Content>
                </Block>
            </Row>
        );
    }
}
