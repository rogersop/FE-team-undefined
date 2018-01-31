import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
  <App 
  authClick={window.authClick}
    fetchFiveEmails={window.fetchFiveEmails} 
    fetchFiveEvents={window.fetchFiveEvents}
    getUser={window.getUser}
  /> , document.getElementById('root'));
