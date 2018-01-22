import React, { Component } from 'react';
import NewsWidget from './components/NewsWidget';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">DoMore</h1>
        </header>
        <p className="App-intro">
          Welcome to DoMore.
        </p>
        <NewsWidget />
      </div>
    );
  }
}

export default App;
