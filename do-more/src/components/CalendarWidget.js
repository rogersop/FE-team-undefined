import React, { Component } from 'react';

class CalendarWidget extends Component {
  render () {
    return (
      <div className="calendar-widget">
          <div className="event-container">
            <h4>Event name</h4>
            <span>Times</span> | <span>Location</span>
            <p>Get coding on the project and make stuff look awesome...</p>
         </div>
         <div className="event-container">
            <h4>Event name</h4>
            <span>Times</span> | <span>Location</span>
            <p>Get coding on the project and make stuff look awesome...</p>
         </div>
         <div className="event-container">
            <h4>Event name</h4>
            <span>Times</span> | <span>Location</span>
            <p>Get coding on the project and make stuff look awesome...</p>
         </div>
         <div className="event-container">
            <h4>Event name</h4>
            <span>Times</span> | <span>Location</span>
            <p>Get coding on the project and make stuff look awesome...</p>
         </div>
      </div>
    )
  }
}

export default CalendarWidget;