import React, { Component } from 'react'
import { AuthProps } from '../Auth'
import { VideoSummary, VideoSummaryProps } from './Video'


const imgDir = 'resources/images/'
let key = 0;
interface VideoSummaryInfoAndKey extends VideoSummaryProps {
  key: any
}
let exampleInfo: Array<VideoSummaryInfoAndKey> = [
  {
    img: imgDir + 'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir + 'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }
]



export default class Home extends Component<AuthProps> {
  public render() {
    return (
      <div className="container video-list">
        <div className="row">
          {
            exampleInfo.map((row) => (
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
