import React, { Component } from 'react'
import AccessControl from '../../tools/Auth'
import { GlobalProps } from '../../Control'

import { Row, Col, Label, ColAuto, RowAuto, ColFull, RowFull } from '../../BootstrapWrappers'
import { ImageUpload, VideoUpload } from '../../UploadFile'


export default class Upload extends Component<GlobalProps> {
    public render() {
        return (
            <AccessControl globals={this.props.globals}>
                <div className="container">
                    <h1>Uploads!</h1>
                </div >
                <Row>
                    <ColAuto>
                        <ImageUpload />
                    </ColAuto>
                </Row>
                <Row>
                    <ColAuto>
                        <VideoUpload />
                    </ColAuto>
                </Row>
            </AccessControl>
        );
    }
}
