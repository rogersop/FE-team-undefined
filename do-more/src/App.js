import React, { Component } from 'react';
import './index.css';
import SideBar from './components/SideBar';
import WidgetContainer from './components/WidgetContainer'
import CalendarWidget from './components/CalendarWidget';
import NewsWidget from './components/NewsWidget';
import EmailWidget from './components/EmailWidget';
import TwitterWidget from './components/TwitterWidget';
import TodoWidget from './components/TodoWidget';
import {increaseUseCount, getRandomBackground, increaseLikeCount, decreaseLikeCount} from './database/index.js';
// import getRandomBackground from './database/index.js';
import moment from 'moment';

class App extends Component {

  state = {
    spaces: {
      topLeft: 'emailWidget',
      topRight: 'todoWidget',
      bottomLeft: 'twitterWidget',
      bottomRight: 'calendarWidget'
    },
    widgets: {
      'emailWidget': {
        component: <EmailWidget loading={true} emails={[]} />
      },
      'calendarWidget': {
        component: <CalendarWidget loading={true} events={[]} />
      },
      'newsWidget': {
        component: <NewsWidget />
      },
      'twitterWidget': {
        component: <TwitterWidget />
      },
      'todoWidget': {
        component: <TodoWidget />
      }
    },
    background: {},
    backgroundLiked: false
  }

  componentWillMount = () => {
    const currentTimeStamp = moment().format();
    const lastRefreshTimeStamp = localStorage.getItem('bgLastRefresh')
    const difference = moment(currentTimeStamp).diff(moment(lastRefreshTimeStamp), 'hours');
    const currentBackground = JSON.parse(localStorage.getItem('background'));
    if (lastRefreshTimeStamp === null || +difference >= 12) {
      this.handleRefreshBackground()
    } else {
     this.setState({ background: currentBackground })
    }
  }

  assignSpace = (space, widgetName) => {
    increaseUseCount(widgetName);
    const newSpaces = Object.assign({}, this.state.spaces)
    newSpaces[space] = widgetName;
    this.setState({
      spaces: newSpaces
    })
    
  }

  autoFetchEmails = () => {
    setTimeout(() => this.props.fetchFiveEmails((fiveEmails) => {
      console.log(fiveEmails)
      const functioningWidgets = Object.assign({}, this.state.widgets, {
        emailWidget: Object.assign({}, this.state.widgets.emailWidget, {
          component: <EmailWidget loading={false} emails={fiveEmails} />
        })
      })
      this.setState({
        widgets: functioningWidgets
      });
    }), 1000);
  }

  autoFetchEvents = () => {
    setTimeout(() => this.props.fetchFiveEvents((fiveEvents) => {
      console.log(fiveEvents)
      const functioningWidgets = Object.assign({}, this.state.widgets, {
        calendarWidget: Object.assign({}, this.state.widgets.calendarWidget, {
          component: <CalendarWidget loading={false} events={fiveEvents} />
        })
      })
      this.setState({
        widgets: functioningWidgets
      });
    }), 1000);
  }

  autoClearEmailsAndEvents = () => {
    const functioningWidgets = Object.assign({}, this.state.widgets, {
      emailWidget: Object.assign({}, this.state.widgets.emailWidget, {
        component: <EmailWidget loading={true} emails={[]} />
      })
    },
      {
        calendarWidget: Object.assign({}, this.state.widgets.calendarWidget, {
          component: <CalendarWidget loading={true} events={[]} />
        })
      })
    this.setState({
      widgets: functioningWidgets
    });
  }

  handleLikeBackground = () => {
    if (!this.state.backgroundLiked) {
      increaseLikeCount(this.state.background.key);
      this.setState({backgroundLiked: true})
    }
  }

  handleRefreshClick = () => {
    this.handleRefreshBackground();
    decreaseLikeCount(this.state.background.key);
  }

  handleRefreshBackground = () => {
    const currentTimeStamp = moment().format();
    getRandomBackground()
        .then(background => {
          this.setState({ 
            background,
            backgroundLiked: false
           })
          localStorage.setItem('background', JSON.stringify(background))
          localStorage.setItem('bgLastRefresh', currentTimeStamp)
        })
  }

  render() {

    const { widgets, spaces, background } = this.state

    return (
      <div id="outer-container">
        <SideBar
          pageWrapId="page-wrap"
          outerContainerId="outer-container"
          assignSpace={this.assignSpace}
          widgets={this.state.widgets}
          authClick={this.props.authClick}
          autoFetchEmails={this.autoFetchEmails}
          autoFetchEvents={this.autoFetchEvents}
          autoClearEmailsAndEvents={this.autoClearEmailsAndEvents} />
        <div className="App" id="page-wrap" >
          <img className="background-image" src={`${background.url}`} alt="background" />
          <div className="background-btns">
          <p className="refresh-logo" onClick={this.handleRefreshClick}>
            <i className="fa fa-refresh" />
          </p>
          <p className="like-logo" onClick={this.handleLikeBackground}>
            <i className="fa fa-heart-o" />
          </p>  
          </div>
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