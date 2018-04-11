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
            <div {...this.props} className={className("col-12 row", this.props)}>
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

export class ColAuto extends Component<any> {
    render() {
        return (
            <div className="col-12">
                <div className="col-md-2 .d-none .d-md-block"></div>
                <div {...this.props} className={className("col-md-8 offset-md-2 col-12", this.props)}>
                    {this.props.children}
                </div>
                <div className="col-md-2 .d-none .d-md-block"></div>
            </div>
        )
    }
}

export class RowAuto extends Component<any> {
    render() {
        return (
            <ColAuto>
                <div {...this.props} className={className("row", this.props)} >
                    {this.props.children}
                </div>
            </ColAuto>
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
            <div className="row" style={{ width: "100%", margin: "0em" }}>
                <ColFull {...this.props}>
                    {this.props.children}
                </ColFull>
            </div>
        )
    }
}




export class Label extends Component<any> {
    render() {
        return (
            <Col>
                <label style={{ width: "90%" }} {...this.props}>
                    {this.props.children}
                </label>
            </Col >
        )
    }
}
