import React, { Component } from 'react'
import { GlobalProps, Globals } from '../../Control'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton';


import {
    api,
    output$api$videos$get_channels,
    output$api$videos$search_keywords as KeywordData,
} from '../../Api'


import SearchBar from '../../components/SearchBar'



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
    channel: string
}

function getWords(words: Array<{ word: string }>): Array<string> {
    let result = words.map((obj) => (obj.word))
    return result
}

export default class Channels extends Component<GlobalProps, ManageState> {

    get_list = () => {

    }

    suggest = (searchText: string) => {
        api.videos.search_channel_only({ searchText: searchText }, (videos: Array<{ word: string }>) => {
            this.setState({
                suggestions: getWords(videos)
            })
        })
    }

    submit = (channel: string) => {
        console.log("submitting")
        api.videos.get_channel({ channel: channel }, (videos: Array<VideoData>) => {
            console.log(videos);
            this.setState({ videos: videos })
        })
    }

    constructor(props) {
        super(props)

        this.state = {
            videos: [],
            suggestions: [],
            channel: "",
            displayingResults: false
        }
    }


    search_clear = () => {

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
                    {!displayingResults ? "" :
                        <RaisedButton fullWidth={true} primary={true} onClick={this.search_clear}>
                            Clear Results
			</RaisedButton>
                    }

                </Paper>
            </div>
        );
    }

}
