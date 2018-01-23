import React, { Component } from 'react';
import NewsWidget from './components/NewsWidget';
import EmailWidget from './components/EmailWidget';
import CalendarWidget from './components/CalendarWidget';
import TodoWidget from './components/TodoWidget';
import SideBar from './components/SideBar';
import './index.css';

class App extends Component {
  
  render() {
    return (
      <div id="outer-container">
       <SideBar pageWrapId= "page-wrap"  outerContainerId="outer-container" />
        <div className="App" id="page-wrap">
          <div className="widget-container" id="NW">
            <TodoWidget />
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
      </div>
    );
  }
}

export default App;