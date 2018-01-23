import React, { Component } from 'react';

class TwitterWidget extends Component {

  render () {
    return (
      <div className="twitter-widget">
        <div className="tweet-container">
          <p><b>Tweet Header</b></p>
          <p>Tweet Body</p>
          <p></p>
        </div>
        <div className="tweet-container">
          <p><b>Tweet Header</b></p>
          <p>Tweet Body</p>
          <p></p>
        </div>
        <div className="tweet-container">
          <p><b>Tweet Header</b></p>
          <p>Tweet Body</p>
          <p></p>
        </div>
        <div className="tweet-container">
          <p><b>Tweet Header</b></p>
          <p>Tweet Body</p>
          <p></p>
        </div>
      </div>
    )
  }
}

export default TwitterWidget;