import React from 'react'

class Logout extends React.Component {
  render () {
    return(
    		<a onClick={this.props.onClick} className="waves-effect">Logout</a>
    )
  }
}

module.exports = Logout