import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import StarBorder from 'material-ui/svg-icons/toggle/star-border'

import * as Api from '../Api'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: "100vw",
        height: "calc(100vh - 200)",
        overflowY: 'auto',
        maxWidth: "70rem",
        margin: "0em auto"
    },
};

export class Grid extends Component<any> {
    render() {
        return (<GridList cols={4} cellHeight={180} style={styles.gridList} {...this.props} >{this.props.children}</GridList>)
    }
}

interface VideoProps {
    info: Api.output$api$videos$get_all
}
export class VideoInfo extends Component<VideoProps> {
    public render() {
        const i = this.props.info
        return (
            <GridTile
                key={i.vid}
                title={i.title}
                subtitle={i.channel}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
            >
                <Link to={"video/" + i.vid}><img src={i.image_path} /></Link>
            </GridTile>
        )
    }
}
