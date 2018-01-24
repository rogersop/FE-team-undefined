import React, { Component } from 'react';
import '../index.css'

class CalendarWidget extends Component {
  render () {
    return (
      <div className="calendar-widget">
        <div className="event-container">
          <h4>Calendar Event Subject</h4>
          <span>Times</span> | <span>Location</span>
          <p>Description of event.....</p>
        </div>
        <div className="event-container">
          <h4>Calendar Event Subject</h4>
          <span>Times</span> | <span>Location</span>
          <p>Description of event.....</p>
        </div>
        <div className="event-container">
          <h4>Calendar Event Subject</h4>
          <span>Times</span> | <span>Location</span>
          <p>Description of event.....</p>
        </div>
        <div className="event-container">
          <h4>Calendar Event Subject</h4>
          <span>Times</span> | <span>Location</span>
          <p>Description of event.....</p>
        </div>
        <div className="event-container">
          <h4>Calendar Event Subject</h4>
          <span>Times</span> | <span>Location</span>
          <p>Description of event.....</p>
        </div>
      </div>
    )
  }
}

export default CalendarWidget;