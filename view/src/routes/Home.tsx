import React, { Component } from 'react'
import { AuthProps } from '../tools/Auth'
import Api, { VideoInfo } from '../tools/Api'
import { VideoSummary } from './Video'


const imgDir = 'public/images/'
let key = 0;
interface VideoSummaryInfoAndKey extends VideoInfo {
  key: any
}
interface HomeProps extends AuthProps {
  videos: Array<VideoInfo>
  updateVideoView: () => void
}

export default class Home extends Component<HomeProps> {
  constructor(props) {
    super(props)
    this.props.updateVideoView()
  }
  public render() {
    return (
      <div className="container video-list">
        <div className="row">
          {
            this.props.videos.map((row, index) => (
              <VideoSummary
                key={index}
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
