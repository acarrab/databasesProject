import React, { Component } from 'react'
import { Authentication, AuthProps } from '../../tools/Auth'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import valid from '../../tools/Validators'


import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import Button from 'react-validation/build/button'

interface LoginProps extends RouteComponentProps<any> {
  auth: Authentication
}
class Login extends Component<LoginProps> {
  form: Form
  constructor(props) {

    super(props)
    this.submit = this.submit.bind(this)
  }
  handleKeyPress(event) {

    if (event.key == 'Enter') {
      this.submit(event)
    }
  }

  submit(event) {
    event.preventDefault()
    //console.log(this.form)

    let auth: Authentication = this.props.auth;
    let values: { username: string, password: string } = this.form.getValues()
    console.log(values);
    auth.login({
      username: values.username,
      password: values.password,
      itWorked: (res) => {
        this.props.history.push('/');
      },
      itFailed: (err) => {
        console.log(err)
        this.form.showError(this.form, <span>API error</span>);
      }
    })
  }

  render() {
    return (
      <Form ref={(form) => { this.form = form }} onSubmit={this.submit}>
        <div className="form-container">
          <div className="form row">
            <div className="col-12">
              <h1>Log into your account</h1>
            </div>
            <hr />
            <div className="col-8 offset-2">
              <label>
                Username
		<Input type='text' name='username' validations={[valid.required]} />
              </label>
            </div>
            <div className="col-8 offset-2">
              <label>
                Password
		<Input type='password' name='password' validations={[valid.required]} />
              </label>
            </div>
            <hr />
            <div className="col-12">
              <Button>Login</Button>
            </div>
          </div>
        </div>
      </Form>
    )
  }
}


export default withRouter<LoginProps>(Login);
