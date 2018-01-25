import React, { Component } from 'react';
import WeatherBox from './WeatherBox';
import TimeBox from './TimeBox';
import GreetingBox from './GreetingBox';

class InfoWidget extends Component {

  render () {
    return (
      <div className="info-widget">
        <TimeBox />
        <GreetingBox />
        <WeatherBox />
      </div>
    )
  }
}

export default InfoWidget;