import React, { Component } from 'react';
import '../index.css';
import InfoWidget from './InfoWidget.js';
import { push as Menu } from 'react-burger-menu';
import WidgetSelector from './WidgetSelector';


class SideBar extends Component {

  state = {
    selectedSpace: ''
  }

  handleChange = (event) => {
    this.setState({ selectedSpace: event.target.value }, () => {
    });
  }

  handleAuthClick = () => {
    this.props.authClick(this.onSignOut, this.onSignIn);
  }

  onSignOut = () => {
    this.props.autoClearEmailsAndEvents();
  }

  onSignIn = () => {
    this.props.autoFetchEmails();
    this.props.autoFetchEvents();
  }

  render() {
    return (
      <Menu right pageWrapId={"page-wrap"}>
        <div className="side-bar-top">
          <InfoWidget />
        </div>
        <div className="side-bar-bottom">
          {/* <select value={this.state.selectedSpace} onChange={this.handleChange}>
            <option value="Select space to replace">Select space to replace</option>
            <option value="topLeft">Top Left</option>
            <option value="topRight">Top Right</option>
            <option value="bottomLeft">Bottom Left</option>
            <option value="bottomRight">Bottom Right</option>
          </select> */}

          <WidgetSelector assignSpace={this.props.assignSpace} widgets={this.props.widgets} selectedSpace={this.state.selectedSpace} />

          <div id="auth-status"></div><br />
            <button id="sign-in-or-out-button"
              style={{ marginLeft: "25px" }} onClick={this.handleAuthClick}>Sign In/Authorize</button>
            <button id="revoke-access-button"
              style={{ display: "none", marginLeft: "25px" }}>Revoke access</button>
        </div>
      </Menu>
    )
  }

}

export default SideBar;



