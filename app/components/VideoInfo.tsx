import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Globals, GlobalProps } from '../Control'

import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import Paper from 'material-ui/Paper'

import StarBorder from 'material-ui/svg-icons/toggle/star-border'

import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add-circle'
import SettingsIcon from 'material-ui/svg-icons/action/settings'

import { getTimeSince } from '../tools/Time'

import Popover from 'material-ui/Popover/Popover'
import { Menu, MenuItem } from 'material-ui/Menu'

import AddToPlaylist from '../components/AddToPlaylist'

import * as Api from '../Api'
import {
    api,
    output$api$videos$get_all as VideoData
} from '../Api'

import Media from 'react-media'

import AreYouSure from '../tools/AreYouSure'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: "100%",
        margin: "0em auto",
        textAlign: "left",
    },
    img: {
        margin: "0em auto"
    },
};








export class Grid extends Component<any> {
    render() {
        return (
            <Media query="(max-width: 599px)">
                {matches =>
                    matches ? (
                        <GridList cols={2} cellHeight={160} style={styles.gridList} {...this.props} >{this.props.children}</GridList>
                    ) : (
                            <GridList cols={3} cellHeight={160} style={styles.gridList} {...this.props} >{this.props.children}</GridList>
                        )
                }
            </Media>

        )
    }
}

interface VideoProps extends GlobalProps {
    reload?: () => void
    info: VideoData
}

export class VideoOptionsPopover extends Component<VideoProps, { open: boolean, playlist: boolean, anchorEl: JSX.Element, maybeDelete: boolean }> {
    state = { open: false, anchorEl: null, maybeDelete: false, playlist: false }

    onMenuClick = () => {
        this.setState((prev) => ({ open: !prev.open }))
    }

    handleClick = (event) => {
        event.preventDefault();
        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        })
    }
    deleteVideo = () => {
        console.log("deleting video")
        api.videos.delete_video({
            vid: this.props.info.vid
        }, (res: Api.output$api$videos$delete_video) => {
            if (res.deleted === "1") {
                this.props.globals.message("Video successfully deleted")
                this.props.reload();
            }
        })
    }
    askToDelete = (e) => {
        e.preventDefault()
        this.setState({ maybeDelete: true, open: false })
    }

    addToFavorites = (e) => {
        api.playlists.add_to_favorites({ vid: this.props.info.vid }, () => {
            this.props.reload()
        })
    }

    removeFromFavorites = (e) => {
        api.playlists.remove_from_favorites({ vid: this.props.info.vid }, () => {
            this.props.reload()
        })
    }

    render() {
        const { reload, info, globals } = this.props
        const { is_favorite } = info
        const { playlist } = this.state
        const my_video = globals.user.username === info.username
        return (
            <IconButton>
                {my_video ? <SettingsIcon onClick={this.handleClick} /> : <ContentAdd onClick={this.handleClick} />}
                <Popover
                    open={this.state.open}
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{ "horizontal": "left", "vertical": "top" }}
                    targetOrigin={{ "horizontal": "right", "vertical": "bottom" }}
                    onRequestClose={this.onMenuClick}>
                    {is_favorite === "1" ?
                        <MenuItem onClick={this.removeFromFavorites}>Remove from favorites</MenuItem>
                        :
                        <MenuItem onClick={this.addToFavorites}>Add to favorites</MenuItem>
                    }
                    <MenuItem onClick={(e) => {
                        e.preventDefault()
                        this.setState({ playlist: true, open: false })
                    }}>Add to playlist</MenuItem>

                    {(reload !== undefined && info.username === globals.user.username) ?
                        <MenuItem onClick={this.askToDelete}
                        >Delete your video</MenuItem> : ""}
                </Popover>
                <AddToPlaylist
                    globals={globals}
                    info={info}
                    cancel={() => { this.setState({ playlist: false }) }}
                    open={playlist}
                />
                <AreYouSure open={this.state.maybeDelete} yes={() => { this.deleteVideo() }} no={() => { this.setState({ maybeDelete: false }) }} />
            </IconButton>
        )
    }
}


export class VideoInfo extends Component<VideoProps> {
    public render() {
        const { info, globals, reload } = this.props
        const i = info
        return (
            <GridTile
                key={i.vid}
                title={i.title}
                subtitle={(<span>{i.channel}<br /><span style={{ fontStyle: "italic" }}>{getTimeSince(i.upload_date)}</span></span>)}
                actionIcon={<VideoOptionsPopover reload={reload} globals={globals} info={i} />}
            >
                <div style={{ width: "100%", textAlign: "center", margin: "0 auto" }}>
                    <div style={styles.img}
                        onClick={(e) => {
                            e.preventDefault();
                            globals.mark()
                            globals.changeRoute("/video/" + i.vid)
                        }}
                    >
                        <img src={i.image_path} width="192" height="108" />
                    </div>
                </div>
            </GridTile>
        )
    }
}
