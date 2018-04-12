import React, { Component } from 'react'

function className(type, props) {
    if (props.className)
        return type + " " + props.className
    else
        return type
}

export class Row extends Component<any> {
    render() {
        return (
            <div {...this.props} className={className("row", this.props)} style={{ width: "100%", margin: "0em" }}>
                {this.props.children}
            </div>
        )
    }
}

export class Block extends Component<any>{
    render() {
        return (
            <div {...this.props} className={className("content-block-container", this.props)}>
                <Row className="content-block">
                    {this.props.children}
                </Row>
            </div>
        )
    }
}

export class Content extends Component<any>{
    render() {
        return (
            <Row {...this.props} className={className("inner-block", this.props)}>
                {this.props.children}
            </Row>
        )
    }
}


export class ContentBlock extends Component<any>{
    render() {
        return (
            <Row {...this.props} className={className("inner-inner-block", this.props)}>
                {this.props.children}
            </Row>
        )
    }
}

export class Col extends Component<any> {
    render() {
        return (
            <div {...this.props} className={className("col-12", this.props)}>
                {this.props.children}
            </div>
        )
    }
}

export class Col2 extends Component<any> {
    render() {
        return (
            <div {...this.props} className={className("col-12 col-md-6", this.props)}>
                {this.props.children}
            </div>
        )
    }
}
export class Col2a extends Component<any> {
    render() {
        return (
            <div {...this.props} className={className("col-12 col-md-6 offset-md-3", this.props)}>
                {this.props.children}
            </div>
        )
    }
}
export class Label extends Component<any> {
    render() {
        return (
            <Col>
                <label style={{ width: "95%" }} {...this.props}>
                    {this.props.children}
                </label>
            </Col >
        )
    }
}

export class Center extends Component<any> {
    render() {
        return (
            <div {...this.props} style={{ textAlign: "center", width: "100%" }}>
                {this.props.children}
            </div>
        )
    }
}

class Example extends Component<any> {
    render() {
        return (
            <Block>
                <Content>
                    <ContentBlock>
                        Hello
		    </ContentBlock>
                    <ContentBlock>
                        World
		    </ContentBlock>
                </Content>
            </Block>
        )
    }
}



interface VideoContentBlockProps {
    imgSrc: string
    title: string
    author: string
    username: string
    description: string
}
export class VideoCard extends Component<VideoContentBlockProps> {
    render() {
        return (
            <Row style={{ minHeight: "10em" }}>
                <div className="col-12 col-md-3" style={{ padding: "15px" }}>
                    <img src={this.props.imgSrc} width="192" height="108" style={{ width: "100%", height: "auto" }} />
                </div>
                <div className="col-12 col-md-9">
                    <Row>
                        <div className="col-12 col-md-6" style={{ textAlign: "left", padding: "0em" }}>
                            {this.props.title}
                        </div>
                        <div className="col-12 col-md-6" style={{ textAlign: "right", padding: "0em" }}>
                            {this.props.author} <span className="username">@{this.props.username}</span>
                        </div>
                    </Row>
                    <hr style={{ margin: ".2rem 0em", width: "100%" }} />
                    <Row>
                        <p>{this.props.description}</p>
                    </Row>
                </div>
            </Row>
        )
    }
}
