import React, { Component, ChangeEvent } from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'

import { Password, PasswordConfirm, Required, Over255, Over45, Email } from '../../tools/Validate'
import { Globals, GlobalProps } from '../../Control'
import VideoRetriever from './VideoRetriever'
import CategorySelector from '../../tools/Category'



import * as Api from '../../Api'
import { api } from '../../Api'

const style = {
    margin: "2em auto",
}
const istyle = {
    margin: ".5em 1em"
}

interface InfoState extends Api.input$api$videos$upload {
    title_error: string
    description_error: string
    keywords_error: string
    category_error: string
    thumbnail: string
    thumbnail_error: string
    video_file: File
    video_file_error: string
    error: string
}

interface MyE extends ChangeEvent<{ value: string }> { }

export default class InfoSettings extends Component<GlobalProps, InfoState> {

    constructor(props) {
        super(props)
        this.onSubmit = this.onSubmit.bind(this)
        this.onThumbnailUpdate = this.onThumbnailUpdate.bind(this)
        this.onVideoUpdate = this.onVideoUpdate.bind(this)
        this.onCategoryUpdate = this.onCategoryUpdate.bind(this)
        this.state = {
            title: "",
            title_error: "",
            description: "",
            description_error: "",
            keywords: "",
            keywords_error: "",
            category: "",
            category_error: "",
            extension: "",
            thumbnail: "",
            thumbnail_error: "",
            video_file: null,
            video_file_error: "",
            error: ""
        }
    }

    onSubmit(e) {
        e.preventDefault()
        const s = this.state
        let noError = true
        var updates: any = {}
        let required = ["title", "description", "keywords", "category", "thumbnail"]




        required.map((field: string) => {
            updates[field + "_error"] = ""
        })

        required.map((field: string) => {
            let err = Required(s[field])
            if (err) {
                noError = false
                updates[field + "_error"] = err
            }
        })

        let err = Over45(s.title)
        if (err) {
            noError = false
            updates.title_error = err
        }

        err = Over255(s.description)
        if (err) {
            noError = false
            updates.description_error = err
        }



        if (noError) {
            console.log(s)
            let data = new FormData()
            data.append('title', s.title)
            data.append('description', s.description)
            data.append('keywords', s.keywords)
            data.append('category', s.category)
            data.append('extension', s.extension)
            data.append('thumbnail_png', s.thumbnail)
            data.append('file', s.video_file)

            api.videos.upload(data, () => {
                this.props.globals.message('Upload Successful!')
                this.props.globals.changeRoute('/manage')
            }, () => {
                this.props.globals.message('Upload Failed, too big maybe?')
            })
            this.setState(updates);
        } else {
            this.setState(updates);
        }
    }
    onVideoUpdate(videoFile: File) {
        const extRegex = /\.([0-9a-z]+)(?:[\?#]|$)/i;
        if (videoFile) {
            const ext = videoFile.name.match(extRegex)[1];
            this.setState({ video_file: videoFile, extension: ext })
        } else {
            this.setState({ video_file: null, extension: "" })
        }

    }
    onThumbnailUpdate(png: string) {
        this.setState({ thumbnail: png })
    }
    onCategoryUpdate(category: string) {
        this.setState({ category })
    }
    render() {
        const s = this.state
        const p = this.props
        let globals: Globals = this.props.globals
        if (globals.noAccess()) { return globals.noAccessRet() }
        return (
            <form onSubmit={this.onSubmit} style={{ maxWidth: "70rem", margin: "0em auto" }}>

                <VideoRetriever
                    onThumbnailChange={this.onThumbnailUpdate}
                    thumbnailError={s.thumbnail_error}
                    onVideoChange={this.onVideoUpdate}
                    videoError={s.video_file_error}
                    globals={p.globals} />

                <Paper zDepth={4} style={{ marginTop: "3em" }} >

                    <TextField
                        hintText="title"
                        errorText={s.title_error}
                        value={s.title}
                        onChange={(e: MyE) => { this.setState({ title: e.target.value }) }}
                    /><br />

                    <TextField
                        multiLine={true}
                        hintText="description"
                        errorText={s.description_error}
                        value={s.description}
                        onChange={(e: MyE) => { this.setState({ description: e.target.value }) }}
                    /><br />

                    <TextField
                        multiLine={true}
                        hintText="keywords"
                        errorText={s.keywords_error}
                        value={s.keywords}
                        onChange={(e: MyE) => { this.setState({ keywords: e.target.value }) }}
                    /><br />

                    <CategorySelector
                        onUpdate={this.onCategoryUpdate}
                        errorText={s.category_error}
                    />

                    <RaisedButton type="submit" label="Upload Video" style={style} primary={true} />
                </Paper>
            </form>
        );
    }
}
