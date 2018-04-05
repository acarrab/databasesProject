
import React, { Component } from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import { Authentication } from '../tools/Auth'
import Api, { VideoInfo } from '../tools/Api'

import MainBar from './MainBar'
import SideBar from './SideBar'
import MyRoutes from '../routes/Routes'


interface ViewControlProps extends RouteComponentProps<any> { }


var changeRoute = null
export function getChangeRoute() { return changeRoute }


class ViewControl extends Component<ViewControlProps> {

  state: { expanded: boolean, globals: Authentication, videos: Array<VideoInfo> }

  constructor(props) {
    super(props)
    this.state = { expanded: false, globals: new Authentication(this), videos: [] }
    this.toggleExpand = this.toggleExpand.bind(this)
    this.updateVideoView = this.updateVideoView.bind(this)

    this.changeRoute = this.changeRoute.bind(this)
    changeRoute = this.changeRoute
  }

  changeRoute(newRoute: string) {
    let props: ViewControlProps = this.props
    if (props.location.pathname !== newRoute) {
      props.history.push(newRoute)
    }
  }


  updateVideoView() {
    let myThis = this

    Api.Videos.list({
      itWorked: (videos) => { myThis.setState({ videos: videos }) },
      itFailed: (err) => { console.log(err) }
    })
    this.changeRoute('/')
  }

  toggleExpand() { this.setState({ expanded: !this.state.expanded }) }

  public render() {
    let isExpanded = this.state.expanded;
    let expanded = (isExpanded ? "expanded" : "collapsed")

    return (
      <div className="view-control">
        <MainBar toggleExpand={this.toggleExpand}
          auth={this.state.globals}
          updateVideoView={this.updateVideoView} />

        <SideBar className={"side-" + expanded + " side-bar"}
          auth={this.state.globals}
          toggleExpand={this.toggleExpand} />
        <div className={isExpanded ? "content-hider" : ""} onClick={this.toggleExpand}></div>

        <MyRoutes auth={this.state.globals} videos={this.state.videos} updateVideoView={this.updateVideoView} />
      </div>
    )
  }
}


export default withRouter<ViewControlProps>(ViewControl)
