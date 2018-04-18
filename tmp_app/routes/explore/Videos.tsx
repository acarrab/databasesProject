import React, { Component } from 'react'
import { GlobalProps, Globals } from '../../Control'
import Paper from 'material-ui/Paper'


import {
    api,
    output$api$videos$get_all as VideoData,
    output$api$videos$search_keywords as KeywordData
} from '../../Api'


import SearchBar from '../../components/SearchBar'
import { Grid, VideoInfo } from '../../components/VideoInfo'


const styles = {
    paper: {
        maxWidth: "70rem",
        padding: "4em 2em",
        margin: "0 auto"
    },
}

interface ManageState {
    videos: Array<VideoData>
    suggestions: Array<string>
}

function getWords(words: Array<{ word: string }>): Array<string> {
    let result = words.map((obj) => (obj.word))
    return result
}

export default class Videos extends Component<GlobalProps, ManageState> {

    get_my_videos = () => {
        api.videos.get_all((videos: Array<VideoData>) => {
            this.setState({ videos: videos })
        })
    }
    suggest = (searchText: string) => {
        api.videos.search_keywords_only({ searchText: searchText }, (videos: Array<{ word: string }>) => {
            this.setState({
                suggestions: getWords(videos)
            })
        })
    }

    submit = (searchText: string) => {
        console.log("submitted: " + searchText)
    }

    constructor(props) {
        super(props)

        this.state = {
            videos: [],
            suggestions: []
        }
        this.get_my_videos();
    }
    public render() {

        let globals: Globals = this.props.globals
        if (globals.noAccess()) { return globals.noAccessRet() }
        const s: ManageState = this.state
        return (
            <div>
                <SearchBar
                    submit={this.submit}
                    hintText="Search for videos by keyword"
                    suggestions={this.state.suggestions}
                    updateSuggestions={this.suggest} />

                <Paper zDepth={4} style={styles.paper}>
                    <Grid>
                        {s.videos.map((info: VideoData) => (
                            <VideoInfo key={info.vid} reload={this.get_my_videos} globals={globals} info={info} />
                        ))}
                    </Grid>
                </Paper>
            </div>
        );
    }
}
