import React, { Component } from 'react';
import {geolocated} from 'react-geolocated';

class WeatherBox extends Component {

  state = {
    weather : {},
    loading: true,
  }

  componentDidMount() {
      this.geoFindMe();
  }

  geoFindMe = () => {
   


    navigator.geolocation.getCurrentPosition(this.success)

  }

   success = (position)  => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;


  return  fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`).then((res) => {

     return res.json();
      }).then((res) => {
       


         return  this.setState({
               weather: res,
               loading: false
           })

       }).catch(console.error);

 }


  render() {
    console.log(this.state.weather)
    if(this.state.loading) return <div>Loading...</div>
    return ( 
      <div>
        <h2>{this.state.weather.name}</h2>
        <h2>{this.state.weather.main.temp.toFixed(0) +  "°C"}</h2>
        <h2>{this.state.weather.weather[0].main}</h2> 
      </div>
    )
}

}

export default WeatherBox;