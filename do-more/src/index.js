import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App fetchFiveEmails={window.fetchFiveEmails} /> , document.getElementById('root'));
