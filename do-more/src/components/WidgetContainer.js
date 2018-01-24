import React, { Component } from 'react';

class WidgetContainer extends Component {

  render () {

    const {widget, id} = this.props;

    return (
      <div className="widget-container" id={id}>
        {widget.component}
      </div>
    )
  }

}

export default WidgetContainer;