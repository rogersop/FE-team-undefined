import React, { Component } from 'react';

  class TwitterWidget extends Component {

  state = {
    tweets: [],
    isAuthenticated: false,
  }

  dragstart_handler = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  }

  componentDidMount = () => {
    this.setState({
      loading: true
    })
    if (this.props.tweets) {
      this.setState({
        tweets: this.props.tweets,
        loading: false
      })
    }
  }

  componentWillReceiveProps = (newProps) => {
    console.log('newprops', newProps)
    if (newProps.tweets) {
        this.setState({
          tweets: newProps.tweets,
          loading: false
        })
    } else if (newProps.loading) {
      this.setState({
        loading: true,
        tweets: []
      })
    }
  }


  render () {
    const tweets = this.state.tweets;
    const loading = this.state.loading;
    
    return (
      <div className="twitter-widget twitterWidget" draggable='true' onDragStart={this.dragstart_handler} id="twitterWidget">
        <h3 className="twitterWidget">// LATEST TWEETS</h3>
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
              )
            })
            
        }
      </div>
    )
  }
}

export default TwitterWidget;