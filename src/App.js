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
import moment from 'moment';
import $ from 'jquery';
import firebase from 'firebase';

const twitterConfig = {
  apiKey: process.env.REACT_APP_TWITTERCONFIG_apiKey,
  authDomain: process.env.REACT_APP_TWITTERCONFIG_authDomain,
  databaseURL: process.env.REACT_APP_TWITTERCONFIG_databaseURL,
  projectId: process.env.REACT_APP_TWITTERCONFIG_projectId,
  storageBucket: process.env.REACT_APP_TWITTERCONFIG_storageBucket,
  messagingSenderId: process.env.REACT_APP_TWITTERCONFIG_messagingSenderId
};
firebase.initializeApp(twitterConfig);

const newTwitterProvider = new firebase.auth.TwitterAuthProvider();


class App extends Component {

  state = {
    GoogleAuth: undefined,
    SCOPE: "https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly",
    discoveryUrls: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest', 'https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    cbIn: undefined,
    twitterIsAuthenticated: false,
    spaces: {
      topLeft: 'emailWidget',
      topRight: 'todoWidget',
      bottomLeft: 'twitterWidget',
      bottomRight: 'calendarWidget'
    },
    widgets: {
      'emailWidget': {
        component: <EmailWidget
                      loading={true} 
                      emails={[]}  
                    />
      },
      'calendarWidget': {
        component: <CalendarWidget 
                      loading={true} 
                      events={[]} 
                    />
      },
      'twitterWidget': {
        component: <TwitterWidget
                    loading={true} 
                    tweets={[]}
                    />
      },
      'newsWidget': {
        component: <NewsWidget />
      },
      'todoWidget': {
        component: <TodoWidget />
      }
    },
    background: {},
    backgroundLiked: false
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.handleClientLoad();
    }, 100)

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
    increaseUseCount(widgetName);
    const newSpaces = Object.assign({}, this.state.spaces)
    newSpaces[space] = widgetName;
    if(previousSpace) {
      newSpaces[previousSpace] = replacingWidget;
    }
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
    setTimeout(() => this.fetchFiveEmails((fiveEmails) => {
      const functioningWidgets = Object.assign({}, this.state.widgets, {
        emailWidget: Object.assign({}, this.state.widgets.emailWidget, {
          component: <EmailWidget loading={false} emails={fiveEmails} fetchFiveEmails={this.fetchFiveEmails} />
        })
      })
      this.setState({
        widgets: functioningWidgets
      });
    }), 3000);
  }

  autoFetchEvents = () => {
    setTimeout(() => this.fetchFiveEvents((fiveEvents) => {
      const functioningWidgets = Object.assign({}, this.state.widgets, {
        calendarWidget: Object.assign({}, this.state.widgets.calendarWidget, {
          component: <CalendarWidget loading={false} events={fiveEvents} fetchFiveEvents={this.fetchFiveEvents}  />
        })
      })
      this.setState({
        widgets: functioningWidgets
      });
    }), 3000);
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
          spaces={this.state.spaces}
          widgets={this.state.widgets}
          authClick={this.authClick}
          autoFetchEmails={this.autoFetchEmails}
          autoFetchEvents={this.autoFetchEvents}
          autoClearEmailsAndEvents={this.autoClearEmailsAndEvents}
          twitterIsAuthenticated={this.state.twitterIsAuthenticated}
          twitterSignin={this.twitterSignin}
          twitterSignout={this.twitterSignout}
          fetchTweets={this.fetchTweets}
          fetchTweetsInterval={this.fetchTweetsInterval}
          addTweetsToState={this.addTweetsToState}
           />
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

  // GOOGLE AUTH, GMAIL AND CALENDAR FUNCTIONS
  
  handleClientLoad = () => {
    window.gapi.load('client:auth2', this.initClient)
  }

  initClient = () => {
    window.gapi.client.init({
      'apiKey': process.env.REACT_APP_GMAILCONGIF_apiKey,
      'discoveryDocs': this.state.discoveryUrls,
      'clientId': process.env.REACT_APP_GMAILCONGIF_clientId,
      'scope': this.state.SCOPE
    }).then(() => {
      let NewGoogleAuth = window.gapi.auth2.getAuthInstance();
      
      NewGoogleAuth.isSignedIn.listen(this.updateSigninStatus);

      let newUser = NewGoogleAuth.currentUser.get();
      this.setState({
        user: newUser,
        GoogleAuth: NewGoogleAuth
      }, () => {
        this.setSigninStatus();
        $('#revoke-access-button').click(() => {
          this.revokeAccess();
        });
      })
    });
  }

  updateSigninStatus = () => {
    this.setSigninStatus();
  }

  setSigninStatus = () => {
    const user = this.state.GoogleAuth.currentUser.get();
    const isAuthorized = user.hasGrantedScopes(this.state.SCOPE);
    if (isAuthorized) {
      if (this.state.cbIn) this.state.cbIn();
      $('#sign-in-or-out-button').html('Sign out');
      $('#revoke-access-button').css('display', 'inline-block');
      $('#auth-status').html('Signed in.');
      $('#fetch-emails-button').css('display', 'inline-block');
    } else {
      $('#sign-in-or-out-button').html('Sign In/Authorize');
      $('#revoke-access-button').css('display', 'none');
      $('#auth-status').html('Signed out.');
      $('#fetch-emails-button').css('display', 'none');
    }
  }

  revokeAccess = () => {
    this.state.GoogleAuth.disconnect();
    this.autoClearEmailsAndEvents();
  }

  authClick = (cbOut, cbInFunc) => {
    if (this.state.GoogleAuth.isSignedIn.get()) {
      this.state.GoogleAuth.signOut().then(cbOut());
    } else {
      this.setState({cbIn: cbInFunc}, () => {
        this.state.GoogleAuth.signIn();
      });
    }
  }

  fetchFiveEmails = (cb) => {
    if (this.state.user.w3) {
      const requestEmailIds = window.gapi.client.gmail.users.messages.list({
        'userId': this.state.user.w3.U3,
        'maxResults': 5
      });
      let fiveEmailsArray = []
      requestEmailIds.execute((response) => {
        Promise.all(response.result.messages.map(message => {
          var requestEmailContent = window.gapi.client.gmail.users.messages.get({
            "userId": this.state.user.w3.U3,
            "id": message.id,
            "metadataHeaders": null
          })
          return new Promise((resolve, reject) => {
            requestEmailContent.execute((response) => {
              fiveEmailsArray.push(response);
              if (fiveEmailsArray.length === 5) cb(fiveEmailsArray);
            })
          })
        }))
      })
    }
  }

  fetchFiveEvents = (cb) => {
    if (this.state.user.w3) {
      const requestEvents = window.gapi.client.calendar.events.list({
        "calendarId": this.state.user.w3.U3,
        "privateExtendedProperty": null,
        "sharedExtendedProperty": null
      })
      requestEvents.execute(cb)
    }
  }

  // TWITTER FUNCTIONS
  twitterSignin = () => {
    firebase.auth().signInWithPopup(newTwitterProvider)
      .then((result) => {
        let token = result.credential.accessToken;
        let secret = result.credential.secret;
        let data = {
          token: token,
          secret: secret
        }
        this.fetchTweets(data);
        this.fetchTweetsInterval(data);   
        this.setState({
          twitterIsAuthenticated: true
        });
        localStorage.setItem('twitterData', JSON.stringify(data))     
      })
        .catch(function(error) {
            console.log(error.code)
            console.log(error.message)
        });
  }

  twitterSignout = () => {
    firebase.auth().signOut()
    .then( () => {
      const functioningWidgets = Object.assign({}, this.state.widgets, {
        twitterWidget: Object.assign({}, this.state.widgets.twitterWidget, {
          component: <TwitterWidget loading={true} tweets={[]} fetchTweets={this.fetchTweets} fetchTweetsInterval={this.fetchTweetsInterval}  />
        })
      })
      this.setState({
        widgets: functioningWidgets,
        twitterIsAuthenticated: false
      })
    }, (error)  => {
       console.log(error)
    });
  }

  fetchTweets = (data) => {
    fetch('https://team-undefined-back-end.herokuapp.com', {method: 'POST', body: JSON.stringify(data), headers: new Headers({
      'Content-Type': 'application/json'
    })})
    .then((res) => {
      return res.json()
    })
    .then((res) => {
      this.setTweetWidgetState(res)
    })
  }
  
  fetchTweetsInterval = (data) => {
    setInterval(() => this.fetchTweets(data),  1800000) // this is 30 minutes, do not change please
  }

  setTweetWidgetState = (tweets) => {
    const functioningWidgets = Object.assign({}, this.state.widgets, {
      twitterWidget: Object.assign({}, this.state.widgets.twitterWidget, {
        component: <TwitterWidget loading={false} tweets={tweets} fetchTweets={this.fetchTweets} fetchTweetsInterval={this.fetchTweetsInterval} />
      })
    })
    this.setState({
      widgets: functioningWidgets
    }, () => {
      localStorage.setItem("twitterState", JSON.stringify(this.state.tweets))
    })
  }
}

export default App;