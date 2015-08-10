import React from "react"
import MyNav from './components/MyNav'

class App extends React.Component {

	 constructor(props){
	 	super()
	 	let ref = new Firebase("https://brilliant-torch-3183.firebaseio.com")
	 	let currentUser = ref.getAuth()

	 	this.facebookLogout = this.facebookLogout.bind(this)
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
 		 	    _this.setState(
 		 	    	{ current_user: _this.state.firebase.getAuth,
 		 	    	  loggedIn: true
 		 	    	})
 		 	    console.log(authData.facebook.accessToken);
 		 	  }
 		 	}, {
 		 	  scope: "email,user_likes" // the permissions requested
 		 	});
 	 	}
	 }

	 facebookLogout(){
	 	this.setState({ loggedIn: false, currentUser: null }, this.state.firebase.unauth())
	 }

	 componentDidMount() {
	 	this.setState( {loggedIn: this.state.currentUser ? true : false} ) 	
	 }

	render(){
		return(
		     <MyNav 
		      	loggedIn={this.state.loggedIn} 
		      	onLogout={this.facebookLogout}
		      	onLogin={this.facebookLogin}
		      	/>
	            
		    )
	}
}


React.render(<App />, document.getElementById("demoContainer"))