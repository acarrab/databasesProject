import React, { Component } from 'react'
import { Globals, GlobalProps } from '../../Control'
import Api from '../../tools/Api'
import { VideoInfo, VideoDisplay } from '../../tools/Video'
import { Row, Col2, Col2a, Block, Content, ContentBlock, Label, Center } from '../../Design'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const categories = [
    "all",
    "funny",
    "sports",
    "nature",
    "gaming",
    "music",
    "other"
]

export default class Video extends Component<GlobalProps> {
    state: { videos: Array<VideoInfo>, category: string, categoryValue: number }
    get_videos(category?: string) {
        if (category === undefined) {
            category = this.state.category;
        }

        if (category === "all") {
            Api.Videos.get_all_videos((info: VideoInfo) => {
                this.setState({ videos: info })
            })
        } else {
            Api.Videos.get_category_videos(category, (info: VideoInfo) => {
                this.setState({ videos: info })
            })
        }
    }
    set_category(event, index, value) {
        this.setState({
            categoryValue: value,
            category: categories[value]
        })
        this.get_videos(categories[value]);
    }
    constructor(props) {
        super(props)
        this.get_videos = this.get_videos.bind(this)
        this.set_category = this.set_category.bind(this)
        this.state = {
            videos: [],
            category: "all",
            categoryValue: 0
        }
        this.get_videos();
    }
    public render() {
        return (
            <Row>
                <Center><h1>Videos!</h1></Center>
                <Block>
                    <Center><SelectField
                        floatingLabelText="Select A Category"
                        value={this.state.categoryValue}
                        onChange={this.set_category}>

                        {categories.map((text, id) => (
                            <MenuItem key={id} value={id} primaryText={text} />
                        ))}
                    </SelectField></Center>
                    <Content>
                        {this.state.videos.map((info: VideoInfo) => (
                            <ContentBlock key={info.vid}>
                                <VideoDisplay info={info} />
                            </ContentBlock>
                        ))}
                    </Content>
                </Block>
            </Row >
        );
    }

}
