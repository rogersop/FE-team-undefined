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
    this.setState({selectedSpace: event.target.value}, () => {
    });
  }

  render () {
    return (
      <Menu pageWrapId = { "page-wrap" }>
        <div className="side-bar-top">
          <InfoWidget />
        </div>
        <div className="side-bar-bottom">
          <select value={this.state.selectedSpace} onChange={this.handleChange}>
            <option value="topLeft">Top Left</option>
            <option value="topRight">Top Right</option>
            <option value="bottomLeft">Bottom Left</option>
            <option value="bottomRight">Bottom Right</option>
          </select>
          <WidgetSelector assignSpace={this.props.assignSpace} widgets={this.props.widgets} selectedSpace={this.state.selectedSpace} />
        </div>
      </Menu>
    )
  }
  
}

export default SideBar;