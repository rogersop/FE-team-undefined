import React from 'react';
import CalendarWidget from './CalendarWidget';
import NewsWidget from './NewsWidget';
import EmailWidget from './EmailWidget';
import InfoWidget from './InfoWidget';

const WidgetContainer = ({widget, id}) => {
  if (widget === "CalendarWidget") {
    return (
      <div className="widget-container" id={id}>
       <CalendarWidget />
      </div>
    )
  }
  if (widget === "EmailWidget") {
    return (
      <div className="widget-container" id={id}>
       <EmailWidget />
      </div>
    )
  }
  if (widget === "InfoWidget") {
    return (
      <div className="widget-container" id={id}>
       <InfoWidget />
      </div>
    )
  }
  if (widget === "NewsWidget") {
    return (
      <div className="widget-container" id={id}>
       <NewsWidget />
      </div>
    )
  }
}

export default WidgetContainer;