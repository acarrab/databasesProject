import React, { Component } from 'react'

import MainBar from '../container/MainBar'

import Form from 'react-validation/build/form'
import { Globals, GlobalProps } from '../Control'

import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'
import Textarea from 'react-validation/build/textarea'
import { valid } from './Validators'

export { valid }
export { Input }
export { Textarea }
export { Button }



interface MyFormProps<T> extends GlobalProps {
    onSubmit?: (feilds: T) => void
}

export default abstract class MyForm<T> extends Component<MyFormProps<T>> {
    form: Form
    state: { message: string, error: string }

    abstract formRender(): JSX.Element
    abstract formSubmit(values: T): void

    constructor(props) {
        super(props)
        this.state = { message: "", error: "" }
        this.submit = this.submit.bind(this)
        this.formRender = this.formRender.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
        this.getError = this.getError.bind(this)
        this.setError = this.setError.bind(this)
        this.getMessage = this.getMessage.bind(this)
        this.setMessage = this.setMessage.bind(this)
    }

    submit(event) {
        event.preventDefault()
        let values: T = this.form.getValues()
        this.formSubmit(values)
        if (this.props.onSubmit) {
            this.props.onSubmit(values)
        }
    }

    setError(error: string) { this.setState({ error: error }) }
    getError() {
        if (this.state.error) {
            return (
                <div className="col-12">
                    <h4 className="error">{this.state.error}</h4>
                </div>
            )
        } else {
            return <div></div>
        }
    }
    setMessage(msg: string) { this.setState({ message: msg }) }
    getMessage() {
        if (this.state.message) {
            return (
                <div className="col-12">
                    <h4 className="success">{this.state.message}</h4>
                </div>
            )
        } else {
            return <div></div>
        }
    }

    render() {
        return (
            <Form ref={(c) => { this.form = c }} style={{ width: "100%" }} onSubmit={this.submit}>
                <div className="form-container">
                    <div className="form">
                        {this.formRender()}
                    </div>
                </div>
            </Form >
        )

    }
}
