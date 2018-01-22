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
    }

    return (
      <div className="App" style={style}>
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
