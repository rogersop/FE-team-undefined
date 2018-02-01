import React, {
  Component
} from 'react';


class WeatherBox extends Component {

  state = {
    weather: {},
    loading: true,
  }

  componentDidMount() {
    this.geoFindMe();
  }

  geoFindMe = () => {
    navigator.geolocation.getCurrentPosition(this.success)
  }

  success = (position) => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;


    return fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${latitude}&lon=${longitude}`).then((res) => {
      return res.json();
    }).then((res) => {
      return this.setState({
        weather: res,
        loading: false
      })
    }).catch(console.error);
  }


  render() {
    if(this.state.loading) return <div>Loading...</div>
    let icon;
    switch(this.state.weather.weather[0].main) {
      case 'Rain':
      icon = "https://cdn3.iconfinder.com/data/icons/weather-16/256/Rainy_Day-512.png";
      break;
      case 'Clouds':
      icon = "https://cdn3.iconfinder.com/data/icons/weather-16/256/Overcast-512.png"
      break;
      case 'Clear':
      icon = "https://cdn3.iconfinder.com/data/icons/weather-and-weather-forecast/32/sunny-512.png";
      break;
      default:
      icon = "https://cdn3.iconfinder.com/data/icons/weather-and-weather-forecast/32/sunny-512.png";
    }
 
    return ( 
      <div className="weather-box">
        <img src={icon} alt="logo"/>
        <h2>{this.state.weather.weather[0].main}</h2> 
        <h2>{this.state.weather.main.temp.toFixed(0) +  "°C"}</h2>
        <h2>{this.state.weather.name}</h2>
      </div>
    )
  }

}

export default WeatherBox;