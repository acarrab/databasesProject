import React, { Component } from 'react'
import { GlobalProps, Globals } from '../../Control'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import {
    api,
    output$api$videos$get_channels as ChannelInfo,
    output$api$videos$search_channel_only as ChannelNames
} from '../../Api'


import SearchBar from '../../components/SearchBar'




const ChannelRenderer = ({ info: { channel, uid, username, video_count } }: { info: ChannelInfo }) => (
    <Link to={'/channel/' + uid}>
        <ListItem primaryText={
            <span>
                {channel + " "}
                <span style={{ color: "rgba(255,255,255,.5)" }}>@{username}</span>
            </span>
        }>
            <div style={{ textAlign: "right" }}>
                <span>Total videos: {video_count}</span>
            </div>
        </ListItem>
    </Link>
)

const styles = {
    paper: {
        height: "100vh",
        overflowY: 'auto',
        margin: "0em auto",
        padding: "2em",
        maxWidth: "40rem",
        textAlign: "left"
    },
};


interface State {
    channels: Array<ChannelInfo>
    suggestions: Array<string>
    results: Array<ChannelInfo>
    displayingResults: boolean
}



export default class Contacts extends Component<GlobalProps, State>{
    loadChannels = () => {
        api.videos.get_channels((info: Array<ChannelInfo>) => {

            this.setState({
                channels: info,
                displayingResults: false
            })
        })
    }

    constructor(props) {
        super(props)
        this.state = { channels: [], suggestions: [], results: [], displayingResults: false }
        this.loadChannels()
    }

    suggest = (searchText: string) => {
        api.videos.search_channel_only({ searchText: searchText }, (res: Array<ChannelNames>) => {
            let r = res.map(({ channel }: ChannelNames) => (channel))
            this.setState({ suggestions: r })
        })
    }


    submit = (searchText: string) => {
        if (searchText.length > 0)
            api.videos.search_channel({ searchText: searchText }, (res: Array<ChannelInfo>) => {
                this.setState({
                    results: res,
                    displayingResults: true
                })
            })
    }

    render() {
        let globals: Globals = this.props.globals
        if (globals.noAccess()) { return globals.noAccessRet() }
        const { displayingResults, channels, results, suggestions } = this.state
        return (
            <div>
                <SearchBar
                    submit={this.submit}
                    hintText="Search for channels"
                    suggestions={suggestions}
                    updateSuggestions={this.suggest} />
                <Paper zDepth={4} style={styles.paper}>
                    {!displayingResults ? "" :
                        <RaisedButton fullWidth={true} primary={true} onClick={this.loadChannels}>
                            Clear Results
		     </RaisedButton>
                    }
                    <List>
                        {displayingResults ?
                            <div>
                                <Subheader>Channel Search Results</Subheader>
                                {results.map((info: ChannelInfo, index) => (
                                    <ChannelRenderer key={index} info={info} />
                                ))}
                            </div>
                            :
                            <div>
                                <Subheader>Channels</Subheader>
                                {channels.map((info: ChannelInfo, index) => (
                                    <ChannelRenderer key={index} info={info} />
                                ))}
                            </div>
                        }

                    </List>
                </Paper >
            </div >
        );
    }
}
