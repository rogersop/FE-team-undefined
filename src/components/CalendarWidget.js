import React, { Component } from 'react';
import '../index.css';
import moment from 'moment';

class CalendarWidget extends Component {

  state = {
    events: [],
    loading: true
  }

  dragstart_handler = (event) => {
    // console.log('dragging')
    event.dataTransfer.setData("text/plain", event.target.id);
  }

  componentDidMount = () => {
    this.setState({
      loading: true
    })
    if (this.props.fetchFiveEvents) {
      this.props.fetchFiveEvents(events => {
        this.setState({
          events,
          loading: false
        })
      })
    }
  }

  componentWillReceiveProps = (newProps) => {
    if (newProps.fetchFiveEvents) {
      newProps.fetchFiveEvents(events => {
        this.setState({
          events,
          loading: false
        })
      })
    } else if (newProps.loading) {
      this.setState({
        loading: true,
        events: []
      })
    }
  }

  render () {
    const events = this.state.events;
    const loading = this.state.loading;
    
    return(
      <div className="calendar-widget calendarWidget" draggable='true' onDragStart={this.dragstart_handler} id="calendarWidget">
      <h3 className ="calendar-title calendarWidget">{"// EVENTS"}</h3>
      {
        loading ?
        'Sign-in to see your upcoming calendar events...' :
        events.length < 1 ?
        'No more upcoming events this week...':
        events.items.reverse().map((event, i) => {
          const summary = event.summary;
          const location = event.location;
          const description = event.description;
          let startTime = event.start.date ? event.start.date : event.start.dateTime;
          let endTime = event.end.date ? event.end.date : event.end.dateTime;
          startTime = moment(startTime.split('-05:00')[0], 'YYYY-MM-DD-HH-mm-ss')
          endTime = moment(endTime.split('-05:00')[0], 'YYYY-MM-DD-HH-mm-ss')
          const startTimeFormatted = startTime.format('LT');
          const startDateFormatted = startTime.format('ll');
          const duration = endTime.from(startTime, true)
          return <a key={i} className="event-container calendarWidget" href="https://calendar.google.com/calendar/r/agenda" target="_blank" rel="noopener noreferrer">
              <h4 className="calendarWidget"> {summary.toUpperCase()}</h4>
              <h5 className="calendarWidget">- {location}</h5>
              <h5 className="calendarWidget">- {startDateFormatted}</h5> 
              <h5 className="calendarWidget">- {startTimeFormatted} {"// This event lasts"} {duration}</h5>  
              <p className="calendarWidget">{description}</p>
            </a>
        })
      }
      </div>
    )
  }
}

export default CalendarWidget;