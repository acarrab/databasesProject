import React, { Component } from 'react'

interface FieldProps {
  valid: (value: string) => Array<string>
  registerAlert: (alert: () => void) => void
}

export default class Field extends Component<FieldProps> {
  reference: HTMLInputElement
  state: { errors: Array<string> }

  public alert() {
    let messages = this.props.valid(this.reference.value)
    this.setState({ errors: messages })
  }

  public constructor(props: FieldProps) {
    super(props)
    this.state = { errors: [] }
    this.alert = this.alert.bind(this)
    props.registerAlert(this.alert) // register alert with object above
  }



  public render() {
    let noErrors: boolean = this.state.errors.length == 0
    return (
      <div>
        {noErrors ? <div></div> : (
          <div>
            {this.state.errors.map((message) => (<p style={{ color: "red" }}>{message}</p>))}
          </div>
        )}
        <input ref={(input) => { this.reference = input }} {...this.props} />
      </div >
    )
  }
}


class Validator {
  alert: () => void
  value: string | undefined

  valid(value: string): Array<string> {
    let messages = []
    if (value.trim().length == 0) {
      messages.push("Empty")
    }

    if (messages.length == 0) {
      this.value = value.trim()
    }
    return messages
  }

  getValue(): string | undefined {
    this.alert() // alert in turn calls valid and if it is valid we set value
    return this.value
  }

  constructor() {
    this.valid = this.valid.bind(this)
    this.getValue = this.getValue.bind(this)
  }
}

class PasswordValidator extends Validator {
  valid(value: string): Array<string> {
    let messages = []

    if (value.length < 8) { messages.push("Must be 8 characters or longer") }


    let tests: Array<[RegExp, string]> = [
      [/[^ ]/, "Must not contain spaces"],
      [/[a-z]/, "Must contain lower-case letters"],
      [/[A-Z]/, "Must contain upper-case letters"],
      [/[0-9]/, "Must contain a number"],
      [/[^0-9a-zA-Z]/, "Must contain a symbol"]
    ]

    for (let i = 0; i < tests.length; i++) {
      if (!tests[i][0].test(value)) {
        messages.push(tests[i][1])
      }
    }

    return messages;
  }

}
