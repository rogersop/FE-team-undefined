import React, { Component } from 'react';
import NewsWidget from './components/NewsWidget';
import EmailWidget from './components/EmailWidget';
import CalendarWidget from './components/CalendarWidget';
//import TodoWidget from './components/TodoWidget';
import InfoWidget from './components/InfoWidget';
import './index.css';

class App extends Component {
  


  render() {
    return (
      <div className="App">
      <h1>Team Undefined</h1>
        <div className="widget-container" id="NW">
          <InfoWidget />
        </div>
        <div className="widget-container" id="NE">
          <NewsWidget />
        </div>
        <div className="widget-container" id="SE">
          <EmailWidget fetchFiveEmails={this.props.fetchFiveEmails}/>
        </div>
        <div className="widget-container" id="SW">
          <CalendarWidget />
        </div>
      </div>
    );
  }

}

export default App;
