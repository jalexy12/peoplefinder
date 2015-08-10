import React from "react"
import Login from './Login'
import Logout from './Logout'

class MyNav extends React.Component {
	render(){
		let button = this.props.loggedIn ? (
			        <Logout onClick={this.props.onLogout} />
			      ) : (
			        <Login onClick={this.props.onLogin} />
			      )
		return(
			<nav>
			  <div className="nav-wrapper">
			    <a href="#!" className="brand-logo">Logo</a>
			    <ul className="right">
			     <li><a href="badges.html">Components</a></li>
			     <li> {button} </li>
			    </ul>
			  </div>
			</nav>
		)
	}
}

module.exports = MyNav