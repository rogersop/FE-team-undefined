import React, { Component } from 'react';

class WeatherBox extends Component {

  render () {
    return (
        <div className="weather-box">
          <img style={{"height": "40px"}}src="http://cdn.mysitemyway.com/icons-watermarks/simple-black/raphael/raphael_rain-cloud/raphael_rain-cloud_simple-black_512x512.png" />
          <h2>7°C</h2>
          <h3>Rain</h3>
          <p>Manchester grey all day long</p>
        </div>
    )
  }
}

export default WeatherBox;