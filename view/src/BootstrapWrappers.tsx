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

export class Col extends Component<any> {
    render() {
        return (
            <div {...this.props} className={className("col", this.props)} >
                {this.props.children}
            </div>
        )
    }
}

export class Col2 extends Component<any> {
    render() {
        return (
            <div {...this.props} className={className("col-6", this.props)} >
                {this.props.children}
            </div>
        )
    }
}

export class Col2a extends Component<any> {
    render() {
        return (
            <div {...this.props} className={className("col-12 col-md-6", this.props)} >
                {this.props.children}
            </div>
        )
    }
}

export class ColAuto extends Component<any> {
    render() {

        return (
            <div className={className("col-12", this.props)} >
                <div className="col-md-2 .d-none .d-md-block"></div>
                <div {...this.props} className="col-md-8 offset-md-2 col-12">
                    {this.props.children}
                </div>
                <div className="col-md-2 .d-none .d-md-block"></div>
            </div >
        )
    }
}

export class RowAuto extends Component<any> {
    render() {
        return (
            <Row>
                <ColAuto>
                    <Row {...this.props}>
                        {this.props.children}
                    </Row>
                </ColAuto>
            </Row>
        )
    }
}
export class ColFull extends Component<any> {
    render() {
        return (
            <div  {...this.props} className={className("col-12", this.props)}>
                {this.props.children}
            </div>
        )
    }
}
export class RowFull extends Component<any> {
    render() {
        return (
            <Row {...this.props}>
                {this.props.children}
            </Row>
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
