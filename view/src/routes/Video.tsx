import React, { Component } from 'react'


export interface VideoSummaryProps {
  img: string
  title: string
  summary: string
  author: string
  date: string
}
export class VideoSummary extends Component<VideoSummaryProps> {
  public render() {
    return (
      <div className="video-summary">
        <div>
          <img src={this.props.img} alt="image not found" width="192" height="108" />
          <div className="title">{this.props.title}</div>
          <div className="author">{this.props.author}</div>
          <div className="date">{this.props.date}</div>
        </div>
      </div>
    )
  }
}
