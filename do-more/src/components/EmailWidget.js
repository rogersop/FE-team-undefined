import React, { Component } from 'react';
import '../index.css';
import moment from 'moment';

class EmailWidget extends Component {
 

  state = {
    emails: {}
  }

  handleFetchEmailsClick = () => {
    this.props.fetchFiveEmails((msgs) => {
      console.log(msgs)
      // console.log(msgs[0].result) // FROM
      // // console.log(msgs[0].payload.headers[20].value) // SUBJECT
      // // console.log(msgs[0].payload.headers[18].value) // DATE / TIME
      // console.log(msgs[0].result.snippet) // PREVIEW
      // console.log(msgs[1].result.snippet) // PREVIEW
      // console.log(msgs[2].result.snippet) // PREVIEW
      // console.log(msgs[3].result.snippet) // PREVIEW
      // console.log(msgs[4].result.snippet) // PREVIEW
      // console.log(moment(msgs[0].result.payload.headers[1].value.split(';')[1]).startOf('hour').fromNow()) // DATE
      // console.log(moment(msgs[1].result.payload.headers[1].value.split(';')[1]).startOf('hour').fromNow()) // DATE
      // console.log(moment(msgs[2].result.payload.headers[1].value.split(';')[1]).startOf('hour').fromNow()) // DATE
      // console.log(moment(msgs[3].result.payload.headers[1].value.split(';')[1]).startOf('hour').fromNow()) // DATE
      // console.log(moment(msgs[4].result.payload.headers[1].value.split(';')[1]).startOf('hour').fromNow()) // DATE
 
    })
  }

  render () {
    return( 
      <div className="email-widget">
        <button id="sign-in-or-out-button"
          style={{marginLeft: "25px"}}>Sign In/Authorize</button>
        <button id="revoke-access-button"
          style={{display: "none", marginLeft: "25px"}}>Revoke access</button>
        <button id="fetch-emails-button"
          style={{display: "none", marginLeft: "25px"}}
          onClick={this.handleFetchEmailsClick}>Fetch emails</button>  
        
        <div id="auth-status" style={{display: "inline", paddingLeft: "25px"}}></div><hr />
  
        <div className="email-container">
          <h4>Subject: Welcome to DoMore</h4>
          <h4>From: Team-Undefined</h4>
          <p>Welcome to DoMore, we hope you enjoy this prev...</p>
        </div>
        <div className="email-container">
          <h4>Subject: Welcome to DoMore</h4>
          <h4>From: Team-Undefined</h4>
          <p>Welcome to DoMore, we hope you enjoy this prev...</p>
        </div>
        <div className="email-container">
          <h4>Subject: Welcome to DoMore</h4>
          <h4>From: Team-Undefined</h4>
          <p>Welcome to DoMore, we hope you enjoy this prev...</p>
        </div>
        <div className="email-container">
          <h4>Subject: Welcome to DoMore</h4>
          <h4>From: Team-Undefined</h4>
          <p>Welcome to DoMore, we hope you enjoy this prev...</p>
        </div>
        <div className="email-container">
          <h4>Subject: Welcome to DoMore</h4>
          <h4>From: Team-Undefined</h4>
          <p>Welcome to DoMore, we hope you enjoy this prev...</p>
        </div>
  
      </div>
    )
  }
}

export default EmailWidget;
