import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';


import { Globals, GlobalProps } from '../Control'
import {
    api,
    output$api$videos$get_all as VideoData,
    output$api$playlists$get_playlists as PlaylistData
} from '../Api'


interface Props extends GlobalProps {
    info: VideoData,
    cancel: () => void
    open: boolean
}
interface State {
    playlists: Array<PlaylistData>
    loading: boolean
    selected_name: string
}
export default class AddToPlaylist extends Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = {
            playlists: [],
            loading: true,
            selected_name: ""
        }
        api.playlists.get_playlists(
            (playlists) => {
                this.setState({ playlists, loading: false })
            }
        )

    }

    add = () => {
        const { selected_name } = this.state
        if (selected_name !== null) {
            api.playlists.add_to_playlist({ name: selected_name, vid: this.props.info.vid }, () => {
                this.props.globals.message("Video Successfully Added")
            })
            this.props.cancel()
        }
    }
    handleInputChange = (event) => {
        this.setState({
            selected_name: event.target.value,
        });
    };

    handleChange = (event, index, selected_name) => {

        this.setState({ selected_name })
    }

    render() {
        const { open, info, cancel } = this.props
        const { playlists, loading, selected_name } = this.state
        const actions = [
            <FlatButton label="Cancel" primary={true} onClick={cancel} />,
            <FlatButton label="Submit" primary={true} keyboardFocused={true} onClick={this.add} />
        ];

        let listVals: { [name: string]: true } = {}
        for (let i = 0; i < playlists.length; i++)
            listVals[playlists[i].name] = true


        return (
            <div>
                <Dialog
                    onClick={(e) => { e.preventDefault() }}
                    title="Add To A Playlist"
                    actions={actions}
                    modal={false}
                    open={open}
                    onRequestClose={cancel}
                >
                    {loading ?
                        <h1>Loading</h1>
                        :
                        <div>
                            <SelectField
                                floatingLabelText="Use made playlist?"
                                value={listVals[selected_name] ? selected_name : ""}
                                onChange={this.handleChange}
                            >
                                <MenuItem value={""} primaryText="" />
                                {playlists.map((playlist: PlaylistData, index) => (
                                    <MenuItem key={index} value={playlist.name} primaryText={playlist.name} />
                                ))}
                            </SelectField><br />
                            <TextField
                                id="text-field-controlled"
                                value={selected_name}
                                onChange={this.handleChange}
                            />
                        </div>
                    }
                </Dialog>
            </div>
        );
    }
}
