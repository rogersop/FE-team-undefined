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
        events.items.length < 1 ?
        'No more upcoming events this week...':
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
          return <a key={i} className="event-container" href="https://calendar.google.com/calendar/r/agenda">
              <h2>{summary}</h2>
              <h3>{location}</h3>
              <h3>{startTimeFormatted} </h3> <h4>This event lasts {duration}</h4>
              
              <p>{description}</p>
            </a>
        })
      }
      </div>
    )
  }
}

export default CalendarWidget;