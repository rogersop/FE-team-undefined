import React, { Component } from 'react';


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
  
    if(this.state.loading) return <div>Loading...</div>
    return ( 
      <div className="weather-box">
        <img src={this.state.weather.weather[0].icon} alt="logo"/>
        <h2>{this.state.weather.weather[0].main}</h2> 
        <h2>{this.state.weather.main.temp.toFixed(0) +  "°C"}</h2>
        <h2>{this.state.weather.name}</h2>
      </div>
    )
}

}

export default WeatherBox;