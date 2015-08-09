import React from 'react'

class Login extends React.Component {

  constructor () {
    super()
  }

  handleSubmit (event) {
    console.log("Submitted")
  }

  render () {
    return (
      <RaisedButton className="waves-effect waves-light btn" label="Default" />
    );
  }
}

module.exports = Login