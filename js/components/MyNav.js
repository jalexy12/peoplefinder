import React from "react"
import Login from './Login'
import Logout from './Logout'

class MyNav extends React.Component {

	handleSubmit(event){
		event.preventDefault();
		let start = React.findDOMNode(this.refs.start).value.trim()
		let end = React.findDOMNode(this.refs.start).value.trim()

		if (!start || !end) {
			return;
		}
		this.props.onFormSubmit({start: start, end: end})

		React.findDOMNode(this.refs.start).value = ''
		React.findDOMNode(this.refs.end).value = ''
		return
	}

	render(){
	    let button = this.props.loggedIn ? (
			        <Logout onClick={this.props.onLogout} />
			      ) : (
			        <Login onClick={this.props.onLogin} />
			      )
		return(
			<nav>
			  <form onSubmit={this.handleSubmit.bind(this)}>
				  <div className="nav-wrapper">
				  	<div className="col s1">
				      {button}
					</div>
				  	<div className="col s3 offset-s1">
				       <input type="text" placeholder="Start" ref="start" />
					</div>
				  	<div className="col s3 offset-s1">
				       <input type="text" placeholder="End" ref="end" />
					</div>
					<input type="submit" style={ {display: "none"} }/>
				  </div>
			  </form>
			</nav>
		)
	}
}

module.exports = MyNav