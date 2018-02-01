import React, { Component } from 'react';

class WidgetSelector extends Component {


    
  render () {
    const selectedSpace = this.props.selectedSpace;
    const widgetName = this.props.widgets[0];
    return (
     
         <div>
          <button onClick={() => this.props.assignSpace(selectedSpace, widgetName)}>{widgetName}</button>
        </div>
      
    )
  }

}

export default WidgetSelector;