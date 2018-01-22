import React, { Component } from 'react';
import NewsWidget from './components/NewsWidget';
import EmailWidget from './components/EmailWidget';
import CalendarWidget from './components/CalendarWidget';
import TodoWidget from './components/TodoWidget';
import WeatherWidget from './components/WeatherWidget'

class App extends Component {
  
  render() {
      const style = {
        "background": "url('https://images.unsplash.com/photo-1489844097929-c8d5b91c456e')",
        "background-size":"cover"
      }
    return (
      <div className="App" style={style}>
        <header className="App-header">
          <h1 className="App-title">DoMore</h1>
        </header>
        <p className="App-intro">
          Welcome to DoMore.
        </p>
        <NewsWidget />
        <EmailWidget />
        <CalendarWidget />
        <TodoWidget />
        <WeatherWidget />
      </div>
    );
  }
}

export default App;
