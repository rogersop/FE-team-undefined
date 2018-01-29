import React, { Component } from 'react';
import firebase from 'firebase';

    // Initialize Firebase
    let config = {
      apiKey: "AIzaSyC021C6kMFD7rgBY3Ibv6sLRyplwNunZW8",
      authDomain: "twitter-app-3b663.firebaseapp.com",
      databaseURL: "https://twitter-app-3b663.firebaseio.com",
      projectId: "twitter-app-3b663",
      storageBucket: "twitter-app-3b663.appspot.com",
      messagingSenderId: "63643362222"
    };
    firebase.initializeApp(config);

let provider = new firebase.auth.TwitterAuthProvider();

class TwitterWidget extends Component {

  state = {
    tweets: []
  }

  twitterSignin = () => {
    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        let token = result.credential.accessToken;
        let secret = result.credential.secret;
        let data = {
          token: token,
          secret: secret
        }
      fetch('https://aqueous-meadow-64857.herokuapp.com', {method: 'POST', body: JSON.stringify(data), headers: new Headers({
        'Content-Type': 'application/json'
      })})
        .then((res) => {
          return res.json()
        })
        .then((res) => {
          this.addTweetsToState(res)
        })
        }).catch(function(error) {
            console.log(error.code)
            console.log(error.message)
        });
  }
 
 addTweetsToState = (tweets) => {
  this.setState({
    tweets
  })
 }

 twitterSignout = () => {
   firebase.auth().signOut()
   
   .then(function() {
      console.log('Signout successful!')
   }, function(error) {
      console.log('Signout failed!')
   });
 }

  render () {
    return (
      <div className="twitter-widget">
          {
            this.state.tweets.map((tweet, i) => {
            return <div key={i} className="tweet-container">
            {tweet.name}
            {tweet.profile_image_url}
            {tweet.screen_name}
            {tweet.text}
        </div>
          })
        }
        <button onClick = {this.twitterSignin}>Twitter Signin</button>
        <button onClick = {this.twitterSignout}>Twitter Signout</button>
      </div>
    )
  }
}

export default TwitterWidget;