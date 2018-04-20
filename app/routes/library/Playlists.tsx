import React, { Component } from 'react'
import { GlobalProps, Globals } from '../../Control'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router-dom'
import { List, ListItem } from 'material-ui/List'
import Subheader from 'material-ui/Subheader'
import {
    api,
    output$api$playlists$get_playlists as PlaylistInfo
} from '../../Api'


import SearchBar from '../../components/SearchBar'




const ChannelRenderer = ({ info: { name, pid } }: { info: PlaylistInfo }) => (
    <Link to={'/playlist/' + pid}>
        <ListItem primaryText={name}></ListItem>
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
    playlists: Array<PlaylistInfo>
}



export default class Contacts extends Component<GlobalProps, State>{
    loadPlaylists = () => {
        api.playlists.get_playlists((info: Array<PlaylistInfo>) => {
            this.setState({
                playlists: info
            })
        })
    }

    constructor(props) {
        super(props)
        this.state = { playlists: [] }
        this.loadPlaylists()
    }


    render() {
        let globals: Globals = this.props.globals
        if (globals.noAccess()) { return globals.noAccessRet() }
        const { playlists } = this.state
        return (
            <Paper zDepth={4} style={styles.paper}>
                <List>
                    <Subheader>Playlists</Subheader>
                    {playlists.map((info: PlaylistInfo, index) => (
                        <ChannelRenderer key={index} info={info} />
                    ))}
                </List>
            </Paper >
        );
    }
}
