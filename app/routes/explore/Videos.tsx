import React, { Component } from 'react'
import { GlobalProps, Globals } from '../../Control'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton';
import CategorySelector from '../../tools/Category';
import Divider from 'material-ui/Divider';

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
    displayingResults: boolean
    category: string
}

function getWords(words: Array<{ word: string }>): Array<string> {
    let result = words.map((obj) => (obj.word))
    return result
}

export default class Videos extends Component<GlobalProps, ManageState> {

    get_videos = (category?: string) => {
        if (!category) {
            api.videos.get_all((videos: Array<VideoData>) => {
                this.setState({ videos: videos, displayingResults: false })
            })
        } else {
            api.videos.get_category({ category: category }, (videos: Array<VideoData>) => {
                this.setState({ videos: videos, displayingResults: false })
            })
        }
    }
    suggest = (searchText: string) => {
        api.videos.search_keywords_only({ searchText: searchText }, (videos: Array<{ word: string }>) => {
            this.setState({
                suggestions: getWords(videos)
            })
        })
    }

    submit = (searchText: string) => {
        api.videos.search_keywords({ searchText: searchText }, (videos: Array<VideoData>) => {
            this.setState({ videos: videos, displayingResults: true })
        })
    }

    constructor(props) {
        super(props)

        this.state = {
            videos: [],
            suggestions: [],
            displayingResults: false,
            category: ""
        }
        this.get_videos();
    }
    render() {

        let globals: Globals = this.props.globals
        if (globals.noAccess()) { return globals.noAccessRet() }
        const { displayingResults } = this.state
        const s: ManageState = this.state
        return (
            <div>
                <SearchBar
                    submit={this.submit}
                    hintText="Search for videos by keyword"
                    suggestions={this.state.suggestions}
                    updateSuggestions={this.suggest} />

                <Paper zDepth={4} style={styles.paper}>
                    {!displayingResults ?
                        <div>
                            <CategorySelector
                                onUpdate={(category: string) => { this.setState({ category }); this.get_videos(category); }}
                            />
                            <Divider style={{ margin: "3em" }} />
                        </div>


                        :
                        <RaisedButton fullWidth={true} primary={true} onClick={this.get_videos}>
                            Clear Results
		     </RaisedButton>}
                    <Grid>
                        {s.videos.map((info: VideoData) => (
                            <VideoInfo key={info.vid} reload={this.get_videos} globals={globals} info={info} />
                        ))}
                    </Grid>
                </Paper>
            </div>
        );
    }
}
