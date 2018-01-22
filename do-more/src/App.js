import React, { Component } from 'react';
import NewsWidget from './components/NewsWidget';
import EmailWidget from './components/EmailWidget';
import CalendarWidget from './components/CalendarWidget';
import TodoWidget from './components/TodoWidget';
import InfoWidget from './components/InfoWidget';

class App extends Component {
  
  render() {
      const style = {
        "background-image": "url('https://images.unsplash.com/photo-1489844097929-c8d5b91c456e')",
        "bacground-repeat": "no-repeat",
        "background-position": "center",
        "background-size":"cover",
    }

    return (
      <div className="App" style={style}>
        <header className="App-header">
          <h1 className="App-title">DoMore</h1>
        </header>
        <p className="App-intro">
          Welcome to DoMore.
        </p>
        <InfoWidget />
        <NewsWidget />
        <EmailWidget />
        <CalendarWidget />
        <TodoWidget />
      </div>
    );
  }
}

export default App;
