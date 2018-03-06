import React, { Component } from 'react'



interface VideoSummaryProps {
  img: string
  title: string
  summary: string
  author: string
  date: string
}
class VideoSummary extends Component<VideoSummaryProps> {
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


const imgDir = 'resources/images/'
let key=0;
let exampleInfo: Array<VideoSummaryRowProps> = [
  {
    img: imgDir+'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018',
    key: key++
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018',
    key: key++
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018',
    key: key++
  }
]



export class VideoList extends Component {
  public render() {
    return (
      <div className="container video-list">
	<div className="row">
	  {
	    exampleInfo.map((row) => (
		<VideoSummary
		  key={row.title}
		  img={row.img}
		  title={row.title}
		  summary={row.summary}
		  author={row.author}
		  date={row.date}
		  key={row.key}
		/>
	    ))
	  }
	</div>
      </div>
    );
  }

}
