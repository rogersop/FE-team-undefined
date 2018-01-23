import React, { Component } from 'react';
import '../index.css';
import InfoWidget from './InfoWidget.js';
import TwitterWidget from './TwitterWidget.js'
import { push as Menu } from 'react-burger-menu';
import CalendarWidget from './CalendarWidget';


const SideBar = ({assignSpace}) => {

  function showSideBar (event) {
    event.preventDefault();
  }

  return (
    <Menu pageWrapId = { "page-wrap" }>
      <div className="side-bar-top">
        <InfoWidget />
      </div>
      <div className="side-bar-bottom">
        <button onClick={() => assignSpace("topLeft", "CalendarWidget")}>Calendar</button>
      </div>
    </Menu>
  )
  
}

export default SideBar;