import React, { Component } from 'react'
import { AuthProps } from '../Auth'
import { VideoSummary, VideoSummaryProps } from './Video'
import axios from 'axios'


const imgDir = 'public/images/'
let key = 0;
interface VideoSummaryInfoAndKey extends VideoSummaryProps {
  key: any
}

export default class Home extends Component<AuthProps> {
  state: { videos: Array<VideoSummaryInfoAndKey> }
  updateVideoView() {
    axios.get("api/videos/")
      .then((res) => {
        console.log(res)
        this.setState({ videos: res.data });
      })
      .catch((err) => {
        console.log(err)
      })
  }
  constructor(props) {
    super(props)
    this.updateVideoView = this.updateVideoView.bind(this)
    this.state = { videos: [] }
    this.updateVideoView()
  }
  public render() {
    return (
      <div className="container video-list">
        <button onClick={this.updateVideoView}>test load!!!</button>
        <div className="row">
          {
            this.state.videos.map((row) => (
              <VideoSummary
                key={row.key}
                img={row.img}
                title={row.title}
                summary={row.summary}
                author={row.author}
                date={row.date}
              />
            ))
          }
        </div>
      </div>
    );
  }

}
