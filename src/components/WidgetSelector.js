import React, { Component } from 'react';

class WidgetSelector extends Component {
    
  render () {
    const selectedSpace = this.props.selectedSpace;
    const widgetNames = Object.keys(this.props.widgets);
    return (
      widgetNames.map((widgetName, i) => {
        return <div key={i}>
          <button onClick={() => this.props.assignSpace(selectedSpace, widgetName)}>{widgetName}</button>
        </div>
      })
    )
  }

}

export default WidgetSelector;