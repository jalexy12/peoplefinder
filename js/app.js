import React from "react"
import Login from './components/Login'
import Logout from './components/Logout'

let mui = require('material-ui')
let RaisedButton = mui.RaisedButton
let ThemeManager = new mui.Styles.ThemeManager()
let Menu = require('material-ui/lib/menus/menu')
let MenuItem = require('material-ui/lib/menus/menu-item')

class App extends React.Component {

	 constructor(props){
	 	super()
	 	let ref = new Firebase("https://brilliant-torch-3183.firebaseio.com")
	 	let currentUser = ref.getAuth()
	 	this.facebookLogin = this.facebookLogin.bind(this)

	 	this.state = {
	 		currentUser: currentUser || null,
	 		loggedIn: false,
	 		firebase: ref
	 	}
	 }

	 facebookLogin(){
 	 	let _this = this

 	 	if (!this.state.currentUser){
 		 	this.state.firebase.authWithOAuthPopup("facebook", function(error, authData) {
 		 	  if (error) {
 		 	    console.log("Login Failed!", error);
 		 	  } else {
 		 	    _this.setState({current_user: _this.state.firebase.getAuth})
 		 	    console.log(authData.facebook.accessToken);
 		 	  }
 		 	}, {
 		 	  scope: "email,user_likes" // the permissions requested
 		 	});
 	 	}
	 }

	 facebookLogout(){

	 }

	 getChildContext() {
	   return {
	     muiTheme: ThemeManager.getCurrentTheme()
	   };
	 }

	 componentDidMount() {
	 	this.facebookLogin();
	 	this.setState( {loggedIn: this.state.currentUser ? true : false} ) 	
	 }

	render(){
		return(
		      <div>
		        <ul>
		          <li>
		            {this.state.loggedIn ? (
		              <Logout auth={this.state.firebase} />
		            ) : (
		              <Login onClick={this.facebookLogin} />
		            )}
		          </li>
		        </ul>
		      </div>
		    )
	}
}



App.childContextTypes = {
  muiTheme: React.PropTypes.object
};

React.render(<App />, document.getElementById("demoContainer"))