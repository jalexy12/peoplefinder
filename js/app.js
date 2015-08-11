import React from "react"
import MyNav from './components/MyNav'
import superagent from 'superagent'
import GoogleMap from 'google-map-react'
import MyGreatPlace from './components/MyGreatPlace'
import Modal from 'react-modal'
let GoogleMapsAPI = window.google.maps


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
	 		firebase: ref,
	 		userLocation: [],
	 		specials: [{
	 			venue: {
	 				location: {
	 					lat: 25, 
	 					lon: 81
	 				}
	 			}
	 		}]
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

	 updateUserLocation(location){
	 	let coords = [
	 				  location.coords.latitude,
	 				  location.coords.longitude
	 				 ]
	 	this.setState( {userLocation: coords} )
	 }

	 geoErr(err){
	 	console.log(err)
	 }

	 facebookLogout(){
	 	this.setState({ loggedIn: false, currentUser: null }, this.state.firebase.unauth())
	 }

 	 getLocation() {
 	    if (navigator.geolocation) {
 	        navigator.geolocation.getCurrentPosition(this.updateUserLocation.bind(this), this.geoErr, {enableHighAccuracy: true})
 	    } else {
 	       console.log("Geolocation is not supported by this browser.")
 	    }
 	}

 	findPlaces(start, end){
 		let location = this.state.userLocation
 		let _this = this
 		superagent
 		  .get('https://api.foursquare.com/v2/specials/search')
 		  .query({ client_id: 'NGTEZ5LGBMUKPJP5CKGZL1OUQXJHM0ZY3BA5YKCZGLR4K5PF' })
 		  .query({ client_secret: 'UW52GGEJCQ5PH0E2D5ETH42WKT5MMK5RFICLXD33K1ROYIP1' })
 		  .query({ v: '20130815' })
 		  .query({ ll: location[0] + "," + location[1] })
 		  .query({ limit: "50"})
 		  .end(function(err, res){
 		  	if (err) { console.log(err) }
 		  	if (res) { 
 		  		_this.setState( {specials: res.body.response.specials.items })
 		  	}
 		  });
 	}

 	renderSpecials(){
 		return this.state.specials.map( (special) => {
 			// console.log(special.venue.location.lat)
 			return <MyGreatPlace lat={special.venue.location.lat} lng={special.venue.location.lng} text={'$'} />
 		})
 	}

	 componentDidMount() {
	 	this.setState( {loggedIn: this.state.currentUser ? true : false} ) 	
 		this.getLocation()
	 }

	render(){
		console.log(this.state.specials)
		return(
			  <div>
		           <MyNav 
		        	loggedIn={this.state.loggedIn} 
		        	onLogout={this.facebookLogout}
		        	onLogin={this.facebookLogin}
		        	onFormSubmit={this.findPlaces.bind(this)}
		        	/>
		        	<div className="map row">
			        	<GoogleMap
	        	          center={this.state.userLocation}
	        	          zoom={13}>
	        	          {this.renderSpecials()}
	        	          <MyGreatPlace lat={this.state.userLocation[0]} lng={this.state.userLocation[1]} text={'U'} />
	        	        </GoogleMap>
	        	    </div>
		      	</div>	            
		    )
	}
}


React.render(<App />, document.getElementById("demoContainer"))