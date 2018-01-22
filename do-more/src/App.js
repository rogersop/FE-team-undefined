import React, { Component } from 'react';
import NewsWidget from './components/NewsWidget';
import EmailWidget from './components/EmailWidget';
import CalendarWidget from './components/CalendarWidget';
//import TodoWidget from './components/TodoWidget';
import InfoWidget from './components/InfoWidget';
import './index.css';

class App extends Component {
  
  render() {
      const style = {
        "backgroundImage": "url('https://images.unsplash.com/photo-1489844097929-c8d5b91c456e')",
        "bacgroundRepeat": "no-repeat",
        "backgroundPosition": "center",
        "backgroundSize":"cover",
    }

    return (
      <div className="App" style={style}>
        <header className="App-header">
          <h1 className="App-title">DoMore</h1>
        </header>
        <p className="App-intro">
          Welcome to DoMore.
        </p>
        <div className="widget-container" id="NW">
          <InfoWidget />
        </div>
        <div className="widget-container" id="NE">
          <NewsWidget />
        </div>
        <div className="widget-container" id="SE">
          <EmailWidget />
        </div>
        <div className="widget-container" id="SW">
          <CalendarWidget />
        </div>
      </div>
    );
  }
}

export default App;
