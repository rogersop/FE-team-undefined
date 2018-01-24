import React, { Component } from 'react';
import SideBar from './components/SideBar';
import WidgetContainer from './components/WidgetContainer'
import './index.css';
import CalendarWidget from './components/CalendarWidget';
import NewsWidget from './components/NewsWidget';
import EmailWidget from './components/EmailWidget';
import InfoWidget from './components/InfoWidget';
import TwitterWidget from './components/TwitterWidget';

class App extends Component {
  
  state = {
    spaces: {
      topLeft: 'emailWidget',
      topRight: 'newsWidget',
      bottomLeft: 'newsWidget',
      bottomRight: 'twitterWidget'
    },
    widgets: {
      'emailWidget': {
        component: <EmailWidget />
      }, 
      'calendarWidget': {
        component: <CalendarWidget />
      }, 
      'infoWidget': {
        component: <InfoWidget />
      }, 
      'newsWidget': {
        component: <NewsWidget />
      }, 
      'twitterWidget': {
        component: <TwitterWidget />
      }
    }
  }

  componentDidMount = () => {
    const {fetchFiveEmails, authClick} = this.props;

    
    const functioningWidgets = Object.assign({}, this.state.widgets, {
      emailWidget: Object.assign({}, this.state.widgets.emailWidget, {
        component: <EmailWidget fetchFiveEmails={fetchFiveEmails} authClick={authClick}/>
      })
    })
    this.setState({
      widgets: functioningWidgets
    })
  }

  assignSpace = (space, widgetName) => {
    const newSpaces = Object.assign({}, this.state.spaces)
    newSpaces[space] = widgetName;
    this.setState({
      spaces : newSpaces
    })
  }
  
  render() {

    const {widgets, spaces} = this.state

    return (
      <div id="outer-container">
       <SideBar pageWrapId= "page-wrap"  outerContainerId="outer-container" assignSpace={this.assignSpace} widgets={this.state.widgets} />
        <div className="App" id="page-wrap">
          <WidgetContainer id="NW" widget={widgets[spaces.topLeft]} />
          <WidgetContainer id="NE" widget={widgets[spaces.topRight]} />
          <WidgetContainer id="SE" widget={widgets[spaces.bottomRight]} />
          <WidgetContainer id="SW" widget={widgets[spaces.bottomLeft]} />
        </div>
      </div>
    );
  }

}

export default App;