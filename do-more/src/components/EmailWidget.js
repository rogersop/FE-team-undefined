import React, { Component } from 'react';
import '../index.css';
import moment from 'moment';

class EmailWidget extends Component {
  
  dragstart_handler = (event) => {
    console.log('dragging')

    event.dataTransfer.setData("text/plain", event.target.id);

  }


  render () {
    const emails = this.props.emails;
    const loading = this.props.loading;

    return( 
      <div className="email-widget draggable emailWidget" draggable='true' onDragStart={this.dragstart_handler} id='emailWidget' >
        
        {
          loading ? 
          'Sign-in to view your most recent emails...' : 
          emails.map((email, i) => {
            const subject = email.result.payload.headers.find(header => (header.name === "Subject")).value
            const from = email.result.payload.headers.find(header => (header.name === "From")).value
            const date = moment(email.result.payload.headers.find(header => (header.name === "Date")).value.split(' +0000')[0], 'ddd-DD-MMM-YYYY-HH-mm-ss').fromNow();
            return <div key={i} className="email-container emailWidget">
              <p className="emailWidget">Subject: {subject}</p>
              <p className="emailWidget">From: {from}</p>
              <p className="emailWidget">Received: {date}</p>
              <p className="emailWidget">{email.result.snippet}</p>
            </div>
          })
        }
      </div>
    )
  }
}

export default EmailWidget;
