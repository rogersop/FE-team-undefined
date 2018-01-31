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

  assignSpace = (space, widgetName, previousSpace, replacingWidget) => {
    console.log(widgetName, typeof widgetName)
    increaseUseCount(widgetName);
    const newSpaces = Object.assign({}, this.state.spaces)
    newSpaces[space] = widgetName;
    if(previousSpace) {
      newSpaces[previousSpace] = replacingWidget;
      console.log('hit me')
    }
    console.log(newSpaces)
    this.setState({
      spaces: newSpaces
    })
    
  }

  findSpace = (widgetName) => {
    const spaces = this.state.spaces;
    for(let position in spaces) {
      if(spaces[position] === widgetName){
        return position;
      }
    }

  }

  findCurrentWidget = (position) => {
    const spaces = this.state.spaces;
    
    return spaces[position];
      
    
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
          <WidgetContainer id="topLeft" widget={widgets[spaces.topLeft]}  assignSpace={this.assignSpace} findSpace={this.findSpace} findCurrentWidget={this.findCurrentWidget}/>
          <WidgetContainer id="topRight" widget={widgets[spaces.topRight]} assignSpace={this.assignSpace} findSpace={this.findSpace} findCurrentWidget={this.findCurrentWidget} />
          <WidgetContainer id="bottomRight" widget={widgets[spaces.bottomRight]} assignSpace={this.assignSpace} findSpace={this.findSpace} findCurrentWidget={this.findCurrentWidget} />
          <WidgetContainer id="bottomLeft" widget={widgets[spaces.bottomLeft]} assignSpace={this.assignSpace} findSpace={this.findSpace} findCurrentWidget={this.findCurrentWidget}  />
          <div className="background-btns">
          <p className="refresh-logo" onClick={this.handleRefreshClick}>
            <i className="fa fa-refresh" />
          </p>
          <p className="like-logo" onClick={this.handleLikeBackground}>
            <i className="fa fa-heart-o" />
          </p>  
          </div>
        </div>
      </div>
    );
  }

}

export default App;