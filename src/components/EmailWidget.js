import React, { Component } from 'react';
import '../index.css';
import moment from 'moment';

class EmailWidget extends Component {

  state = {
    emails: [],
    loading: true
  }

  dragstart_handler = (event) => {
    event.dataTransfer.setData("text/plain", event.target.id);
  }

  componentDidMount = () => {
    this.setState({
      loading: true
    })
    if (this.props.fetchFiveEmails) {
      this.props.fetchFiveEmails(emails => {
        this.setState({
          emails,
          loading: false
        })
      })
    }
  }

  componentWillReceiveProps = (newProps) => {
    if (newProps.fetchFiveEmails) {
      newProps.fetchFiveEmails(emails => {
        this.setState({
          emails,
          loading: false
        })
      })
    } else if (newProps.loading) {
      this.setState({
        loading: true,
        emails: []
      })
    }
  }

  render () {
    const emails = this.state.emails;
    const loading = this.state.loading;

    return( 
      <div className="email-widget draggable emailWidget" draggable='true' onDragStart={this.dragstart_handler} id='emailWidget'>
      <h2>// LATEST EMAILS</h2>
        {
          loading ? 
          'Sign-in to view your most recent emails...' :
          emails.map((email, i) => {
            const subject = email.result.payload.headers.find(header => (header.name === "Subject")).value
            const from = email.result.payload.headers.find(header => (header.name === "From")).value
            const regexForDate = / [-+][0-9][0-9][0-9][0-9]/
            const date = moment(email.result.payload.headers.find(header => (header.name === "Date")).value.split(regexForDate)[0], 'ddd-DD-MMM-YYYY-HH-mm-ss').fromNow();
            return <div key={i} className="email-container emailWidget">
            <a className="email-link emailWidget" href="https://mail.google.com/mail/u/0/#inbox/" target="_blank" rel="noopener noreferrer">  
              <h3 className="emailWidget">Subject: {subject}</h3> 
              <h3 className="emailWidget">From:  {from}</h3> 
              <h3 className="emailWidget">Received:   {date}</h3>
              <p className="emailWidget">{email.result.snippet}</p>
            </a>
            </div>
          })
        }
      </div>
    )
  }
}

export default EmailWidget;
