import React, { Component } from 'react';

class WidgetContainer extends Component {
    
  
  
    dragover_handler = (event) => {
      event.preventDefault();
      // Set the dropEffect to move
      event.dataTransfer.dropEffect = "move"
    }

    drop_handler = (event) =>{
   
      event.preventDefault();

      const widRex = /Widget/;
      let targetContainer;
      let eventWidgetClass;
      const eventTargetClasses = event.target.classList;

      eventTargetClasses.forEach(className => {
          if(className.match(widRex)){
            eventWidgetClass = className;
          }
      })
      // console.log('eventWidgetClass', eventWidgetClass)
      // console.log('eventID', event.target.id)
      // console.log('eventTargetClass', event.target.classList, event.target.classList.toString())
      if(eventWidgetClass === undefined) {
           targetContainer = event.target.id;
      }

      else if(eventWidgetClass.match(widRex)){
        targetContainer = this.props.findSpace(eventWidgetClass);
      } 
        
      
      const currentWidget = event.dataTransfer.getData("text/plain");
      const previousPosition = this.props.findSpace(currentWidget);
      const replacingWidget = this.props.findCurrentWidget(targetContainer)
      // console.log('eventTarget', event.target)
      // console.log("targetContainer", targetContainer);
      // console.log("currentWidget", currentWidget);
      // console.log("previousPosition", previousPosition);
      // console.log("replacingWidget", replacingWidget);
      this.props.assignSpace(targetContainer, currentWidget, previousPosition, replacingWidget)
    }

  render () {

    const {widget, id} = this.props;

    return (
      <div className="widget-container" id={id} onDrop={this.drop_handler} onDragOver={this.dragover_handler}>
        {widget.component}
      </div>
    )
  }

}

export default WidgetContainer;