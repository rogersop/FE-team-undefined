import React, { Component } from 'react';
import '../index.css';
import moment from 'moment';

class CalendarWidget extends Component {

  render () {
    const events = this.props.events;
    const loading = this.props.loading;
    
    return(
      <div className="calendar-widget">

      {
        loading ?
        'Sign-in to see your upcoming calendar events...' :
        events.items.map((event, i) => {
          const summary = event.summary;
          const location = event.location;
          const description = event.description;
          let startTime = event.start.date ? event.start.date : event.start.dateTime;
          let endTime = event.end.date ? event.end.date : event.end.dateTime;
          startTime = moment(startTime.split('-05:00')[0], 'YYYY-MM-DD-HH-mm-ss')
          endTime = moment(endTime.split('-05:00')[0], 'YYYY-MM-DD-HH-mm-ss')
          const startTimeFormatted = startTime.format('llll');
          const duration = endTime.from(startTime, true)
          return <div key={i} className="event-container">
            <p>{summary}</p>
            <p>{startTimeFormatted}</p>
            <p>This event lasts {duration}</p>
            <p>{location}</p>
            <p>{description}</p>
          </div>
        })
      }
      </div>
    )
  }
}

export default CalendarWidget;