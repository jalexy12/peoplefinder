import React from 'react'

class Logout extends React.Component {
  componentDidMount () {
    console.log("Logging out")
  }

  render () {
    return <a className="waves-effect waves-light btn"> Logout through facebook </a>
  }
}

module.exports = Logout