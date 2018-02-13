import React, { Component } from 'react'


interface VideoSummaryRowProps {
  img: string
  title: string
  summary: string
  author: string
  date: string
}

class VideoSummaryRow extends Component<VideoSummaryRowProps>{
  public render() {
    return (
      <div className="container-fluid"
	   style={{
	     padding: "1em"
	   }}>
	<div className="row">
	  <div className="col-4">
	    <img src={this.props.img}
		 alt="image not found"
		 width="200"
		 height="200"
	    />
	  </div>
	  <div className="col-8">
	    <h1>{this.props.title}</h1>
	    <h4>{this.props.author} <i>{this.props.date}</i></h4>
	    <p>
	      {this.props.summary}
	    </p>
	  </div>
	</div>
      </div>
    )
  }
}


const imgDir = '/public/resources/exampleImages/'
const exampleInfo: Array<VideoSummaryRowProps> = [
  {
    img: imgDir+'doggo1.jpg',
    title: 'First Doggo',
    summary: 'This is an example row with an example image',
    author: 'Angelo Carrabba',
    date: 'Monday, February 12th, 2018'
  },{
    img: imgDir+'doggo2.jpg',
    title: 'Second Doggo',
    summary: 'This is an example row with an example image',
    author: 'Daniel Pebbles',
    date: 'Monday, February 12th, 2018'
  }, {
    img: imgDir+'doggo3.jpg',
    title: 'Third Doggo',
    summary: 'This is an example row with an example image',
    author: 'Lucas Durham',
    date: 'Monday, February 12th, 2018'
  }
]



export class VideoList extends Component {
  public render() {
    return (
      <div className="contiainer">
	{
	  exampleInfo.map((row) => (
	    <VideoSummaryRow
	    key={row.title}
	    img={row.img}
	    title={row.title}
	    summary={row.summary}
	    author={row.author}
	    date={row.date}
	    />
	  ))
	}
      </div>
    );
  }

}
