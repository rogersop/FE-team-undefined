import React, { Component } from 'react';
import WeatherBox from './WeatherBox';
import TimeBox from './TimeBox';
import DateBox from './DateBox';
import GreetingBox from './GreetingBox';

class InfoWidget extends Component {

  render () {
    return (
      <div className="info-widget">
        <WeatherBox />
        <TimeBox />
        <DateBox />
        <GreetingBox />
      </div>
    )
  }
}

export default InfoWidget;