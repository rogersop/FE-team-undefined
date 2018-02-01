import React, { Component } from 'react';
import WeatherBox from './WeatherBox';
import TimeBox from './TimeBox';

class InfoWidget extends Component {

  render () {
    return (
      <div className="info-widget">
        <TimeBox />
        <WeatherBox />
      </div>
    )
  }
}

export default InfoWidget;