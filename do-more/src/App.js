import React, { Component } from 'react';
import SideBar from './components/SideBar';
import WidgetContainer from './components/WidgetContainer'
import './index.css';

class App extends Component {
  
  state = {
    spaces: {
      topLeft: 'EmailWidget',
      topRight: 'CalendarWidget',
      bottomLeft: 'InfoWidget',
      bottomRight: 'NewsWidget'
    },
    widgets: [
      {name: 'CalendarWidget'}, 
      {name: 'EmailWidget'}, 
      {name: 'InfoWidget'}, 
      {name: 'NewsWidget'}, 
      {name: 'TwitterWidget'}
    ]
  }

  //compdidmount

  assignSpace = (space, widgetName) => {
    const widget = this.state.widgets.find(widget => {
      return widget.name === widgetName
    })
    const newSpaces = Object.assign({}, this.state.spaces)
    newSpaces[space] = widgetName;
    this.setState({
      spaces : newSpaces
    })
  }
  
  render() {

    const {fetchFiveEmails} = this.props;

    return (
      <div id="outer-container">
       <SideBar pageWrapId= "page-wrap"  outerContainerId="outer-container" assignSpace={this.assignSpace} />
        <div className="App" id="page-wrap">
          <WidgetContainer id="NW" widget={this.state.spaces.topLeft} />
          <WidgetContainer id="NE" widget={this.state.spaces.topRight} />
          <WidgetContainer id="SE" widget={this.state.spaces.bottomRight} />
          <WidgetContainer id="SW" widget={this.state.spaces.bottomLeft} />
        </div>
      </div>
    );
  }

}

export default App;