import React, { Component } from 'react';
import '../index.css';
import moment from 'moment';

class EmailWidget extends Component {

  state = {
    replying: false,
    replyingTo: '',
    replyContent: ''
  }

  handleReplyClick = () => {
    this.setState({
      replying: true
    })
  }

  updateReplyContent = (event) => {
    this.setState({
      replyContent: event.target.value
    })
  }

  updateReplyingTo = (event) => {
    this.setState({
      replyingTo: event.target.value
    })
  }

  handleSendEmail = () => {
    console.log(this.state.replyingTo, this.state.replyContent)
    this.setState({
      replying: false,
      replyingTo: '',
      replyContent: ''
    })
  }
  
  render () {
    const emails = this.props.emails;
    const loading = this.props.loading;
    const {replying, replyingTo, replyContent} = this.state;


    if (replying) {
      return(
        <div className="email-widget">
          <input type="text" name="to" value={replyingTo} onChange={this.updateReplyingTo} />
          <input type="text" name="content" value={replyContent} onChange={this.updateReplyContent} />
          <button onClick={this.handleSendEmail}>Send Email</button>
        </div>
      )
    } else return( 
      <div className="email-widget">
        {
          loading ? 
          'Sign-in to view your most recent emails...' : 
          emails.map((email, i) => {
            const subject = email.result.payload.headers.find(header => (header.name === "Subject")).value;
            const from = email.result.payload.headers.find(header => (header.name === "From")).value;
            const regexForDate = / [-+][0-9][0-9][0-9][0-9]/
            const date = moment(email.result.payload.headers.find(header => (header.name === "Date")).value.split(regexForDate)[0], 'ddd-DD-MMM-YYYY-HH-mm-ss').fromNow();
            console.log(date)
            return <div key={i} className="email-container">
              <p>Subject: {subject}</p>
              <p>From: {from}</p>
              <p>Received: {date}</p>
              <p>{email.result.snippet}</p>
              <a className="email-link" href={`https://mail.google.com/mail/u/0/#inbox/${email.id}`}><i className="fa fa-envelope-open"></i></a>
              <span onClick={this.handleReplyClick}><i className="fa fa-reply"></i></span>
            </div>
          })
        }
      </div>
    )
  }
}

export default EmailWidget;
