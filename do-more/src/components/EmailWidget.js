import React, { Component } from 'react';
import '../index.css';
import moment from 'moment';

class EmailWidget extends Component {
  
  render () {
    const emails = this.props.emails;
    const loading = this.props.loading;

    return( 
      <div className="email-widget">
        
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
