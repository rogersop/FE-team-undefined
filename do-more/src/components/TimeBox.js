import React, { Component } from 'react';
import moment from 'moment';


class TimeBox extends Component {

  state = {
    curTime: '',
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        curTime: moment(),
      })
    }, 1000)

  }

  render() {
    let date = new Date();

    return (
      <div className="time-box">
        <span>{moment(date).format('MMMM Do YYYY')}</span>
        <div>{moment(this.state.curTime).format('HH:mm')}</div>
      </div>
    )
  }
}

export default TimeBox;