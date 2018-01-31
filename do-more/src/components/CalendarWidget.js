import React, { Component } from 'react';
import '../index.css';
import moment from 'moment';

class CalendarWidget extends Component {

  state = {}

  dragstart_handler = (event) => {
    // console.log('dragging')
    event.dataTransfer.setData("text/plain", event.target.id);
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.fetchFiveEvents(events => {
        this.setState({
          events,
          loading: false
        })
      });
    }, 1000)
  }

  render () {
    const events = this.state.events ? this.state.events : this.props.events;
    const loading = this.state.loading === false ? this.state.loading : this.props.loading;
    
    return(
      <div className="calendar-widget calendarWidget" draggable='true' onDragStart={this.dragstart_handler} id="calendarWidget">

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

          return <a key={i} className="event-container calendarWidget" href="https://calendar.google.com/calendar/r/agenda">
            <p className="calendarWidget">{summary}</p>
            <p className="calendarWidget">{startTimeFormatted}</p>
            <p className="calendarWidget">This event lasts {duration}</p>
            <p className="calendarWidget">{location}</p>
            <p className="calendarWidget">{description}</p>
          </a>
        })
      }
      </div>
    )
  }
}

export default CalendarWidget;