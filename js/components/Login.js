import React from 'react'

class Login extends React.Component {
  render () {
    return (
      <a onClick={this.props.onClick} className="waves-effect">Login</a>
    );
  }
}

module.exports = Login