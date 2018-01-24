import React, { Component } from 'react';
import '../index.css';
import moment from 'moment';

class EmailWidget extends Component {
 
  state = {
    loading: true,
    signedIn: false,
    emails: {}
  }

  componentWillReceiveProps = () => {
    this.autoFetchEmails();
  }

  handleFetchEmails = () => {   
    this.props.fetchFiveEmails((fiveEmails) => {
      this.setState({
        emails: fiveEmails,
        loading: false
      })
    }) 
  }

  autoFetchEmails = () => {
    setTimeout(() => this.props.fetchFiveEmails((fiveEmails) => {
      this.setState({
        emails: fiveEmails,
        loading: false
      });
    }), 500);
  }

  handleAuthClick = () => {
    this.props.authClick(this.onSignOut, this.onSignIn);
  }

  onSignOut = () => {
    this.setState({
      emails: [],
      loading: true
    })
  }

  onSignIn = () => {
    this.handleFetchEmails();
  }

  render () {

    const {loading, emails} = this.state;

    return( 
      <div className="email-widget">
        <button id="sign-in-or-out-button"
          style={{marginLeft: "25px"}} onClick={this.handleAuthClick}>Sign In/Authorize</button>
        <button id="revoke-access-button"
          style={{display: "none", marginLeft: "25px"}}>Revoke access</button>
        <button id="fetch-emails-button"
          style={{display: "none", marginLeft: "25px"}}
          onClick={this.handleFetchEmails}>Fetch emails</button>  
        
        <div id="auth-status" style={{display: "inline", paddingLeft: "25px"}}></div><hr />
        
        {
          loading ? 
          'Sign-in to view your most recent emails...' : 
          emails.map((email, i) => {
            const subject = email.result.payload.headers.find(header => (header.name === "Subject")).value
            const from = email.result.payload.headers.find(header => (header.name === "From")).value
            const date = moment(email.result.payload.headers.find(header => (header.name === "Date")).value.split(' +0000')[0], 'ddd-DD-MMM-YYYY-HH-mm-ss').fromNow();
            return <div key={i} className="email-container">
              <p>Subject: {subject}</p>
              <p>From: {from}</p>
              <p>Received: {date}</p>
              <p>{email.result.snippet}</p>
            </div>
          })
        }
  
      </div>
    )
  }
}

export default EmailWidget;
