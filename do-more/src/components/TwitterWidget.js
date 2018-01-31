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
    tweets: [],
    isAuthenticated: false,
  }

  componentDidMount = () => {
    let data = JSON.parse(localStorage.getItem('twitterData'))
    if(data) {
      this.fetchTweets(data)
      this.fetchTweetsInterval(data)
    } 
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
        localStorage.setItem('twitterData', JSON.stringify(data))

        this.fetchTweets(data);
        this.fetchTweetsInterval(data);        
      })
        .catch(function(error) {
            console.log(error.code)
            console.log(error.message)
        });
  }
 

  fetchTweets = (data) => {
    fetch('https://team-undefined-back-end.herokuapp.com', {method: 'POST', body: JSON.stringify(data), headers: new Headers({
      'Content-Type': 'application/json'
    })})
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      this.addTweetsToState(res)
    })
  }
  
  fetchTweetsInterval = (data) => {
    // console.log('fetching tweets intermittently')
    setInterval(() => this.fetchTweets(data),  1800000) // this is 30 minutes, do not change please
  }

  addTweetsToState = (tweets) => {
    this.setState({
      tweets,
      isAuthenticated: true,
    }, res => {localStorage.setItem("twitterState", JSON.stringify(this.state))})

  }

 twitterSignout = () => {
   firebase.auth().signOut()
   .then( () => {
      this.setState({
        tweets : [],
        isAuthenticated: false
      })
   }, (error)  => {
      console.log(error)
   });
 }

 dragstart_handler = (event) => {
  // console.log('dragging')
  event.dataTransfer.setData("text/plain", event.target.id);
}


  render () {

    if(!this.state.isAuthenticated) {
      return  <div className="twitter-widget twitterWidget twitterWidget" 
                draggable='true' onDragStart={this.dragstart_handler} id="twitterWidget">
                <div className="twitter-sign-in">
                  <button onClick = {this.twitterSignin}>Twitter Sign In</button>
                </div>
              </div>
    }

    return (
      <div className="twitter-widget twitterWidget" draggable='true' onDragStart={this.dragstart_handler} id="twitterWidget">
        <h2 className="twitterWidget">// LATEST TWEETS</h2>
        <button className="twitterWidget" onClick = {this.twitterSignout}>Twitter Sign Out</button>
          {
            this.state.tweets.map((tweet, i) => {
            return (
            <div key={i} className="tweet-container twitterWidget">
              <div className="tweet-grid-1 twitterWidget">
                <a href={`https://www.twitter.com/${tweet.screen_name}`} className="twitterWidget" target="_blank"><img src={tweet.profile_image_url} alt='tweet-logo'/></a>
              </div>
              <div className="tweet-grid-2 twitterWidget">
              <a href={`https://www.twitter.com/${tweet.screen_name}`} target="_blank"><p className="tweet-name twitterWidget">{tweet.name}</p>
                <span className="tweet-screename twitterWidget"> @{tweet.screen_name}</span></a>
                <div>
                     <a href={`https://twitter.com/${tweet.screen_name}/status/${tweet.id}`} target="_blank" className="tweet-text twitterWidget">
                      <p className="twitterWidget"> {tweet.text}</p>
                     </a>
                </div>
              </div>
          </div>
            )
          })
        }        
      </div>
    )
  }
}

export default TwitterWidget;