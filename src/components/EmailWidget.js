import React, { Component } from 'react';
import '../index.css';
import moment from 'moment';

class EmailWidget extends Component {

  state = {}

  dragstart_handler = (event) => {
    // console.log('dragging')
    event.dataTransfer.setData("text/plain", event.target.id);
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.fetchFiveEmails(emails => {
        this.setState({
          emails,
          loading: false
        })
      });
    }, 1000)
  }

  render () {
    const emails = this.state.emails ? this.state.emails : this.props.emails;
    const loading = this.state.loading === false ? this.state.loading : this.props.loading;

    return( 

      <div className="email-widget draggable emailWidget" draggable='true' onDragStart={this.dragstart_handler} id='emailWidget' >
        {
          loading ? 
          'Sign-in to view your most recent emails...' : 
          emails.map((email, i) => {
            const subject = email.result.payload.headers.find(header => (header.name === "Subject")).value
            const from = email.result.payload.headers.find(header => (header.name === "From")).value
            const regexForDate = / [-+][0-9][0-9][0-9][0-9]/
            const date = moment(email.result.payload.headers.find(header => (header.name === "Date")).value.split(regexForDate)[0], 'ddd-DD-MMM-YYYY-HH-mm-ss').fromNow();
            return <div key={i} className="email-container emailWidget">
              <h3 className="emailWidget">Subject: {subject}</h3> 
              <h3 className="emailWidget">From:  {from}</h3> 
              <h3 className="emailWidget">Received:   {date}</h3>
              <p className="emailWidget">{email.result.snippet}</p>
            <a className="email-link emailWidget" href={`https://mail.google.com/mail/u/0/#inbox/${email.id}`}>
              <i className="fa fa-envelope-open emailWidget" />
            </a>

            </div>
          })
        }
      </div>
    )
  }
}

export default EmailWidget;
