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
      <div className="container-fluid">
	<div className="row">
	  <img src={this.props.img}
	       alt="image not found"
	       width="192"
	       height="108"
	  />
	</div>
	<div className="row" style={{ paddingTop: "1em" }}>
	  <div style={{}}>
	    <div style={{
	      fontSize: "1em",
	      fontWeight: 400
	    }}>
	      {this.props.title}
	    </div>
	    <div style={{
	      fontSize: "1em",
	      fontWeight: 300,
	      color: "#aaa"

	    }}>
	      {this.props.author}
	    </div>
	    <div style={{
	      fontSize: ".6em",
	      color: "#aaa",
	      textDecoration: "italics"

	    }}>
	      {this.props.date}
	    </div>
	  </div>

	</div>
      </div>
    )
  }
}
/*
   <div style={{
   margin: "1em",
   fontSize: ".6em"
   }}>
   {this.props.summary}
   </div>
*/


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
      <div className="container video-list">
	<div className="row">
	  {
	    exampleInfo.map((row) => (
	      <div className="col-3">
		<VideoSummaryRow
		  key={row.title}
		  img={row.img}
		  title={row.title}
		  summary={row.summary}
		  author={row.author}
		  date={row.date}
		/>
	      </div>
	    ))
	  }
	</div>
      </div>
    );
  }

}
