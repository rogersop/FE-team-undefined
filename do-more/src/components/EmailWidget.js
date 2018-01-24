import React, { Component } from 'react';
import '../index.css';
// import moment from 'moment';

class EmailWidget extends Component {
 
  state = {
    loading: true,
    emails: {}
  }

  // componentWillReceiveProps = (newProps) => {
  //   // console.log(newProps, "newProps")
  //   this.handleFetchEmailsClick();
  // }

  handleFetchEmailsClick = () => {
     
    this.props.fetchFiveEmails((fiveEmails) => {
      // console.log(fiveEmails) 
      this.setState({
        emails: fiveEmails,
        loading: false
      })
    }) 
  }
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

  render () {

    const {loading, emails} = this.state;
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
        
        {
          loading ? 
          'Sign-in to view your most recent emails...' : 
          emails.map((email, i) => (
            <div key={i} className="email-container">
              <h4>Subject: Subject example</h4>
              <h4>From: Team-Undefined</h4>
              <p>{email.result.snippet}</p>
            </div>
          ))
        }
  
      </div>
    )
  }
}

export default EmailWidget;
