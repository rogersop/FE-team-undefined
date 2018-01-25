import React, { Component } from 'react';
import moment from 'moment';


class TimeBox extends Component {

  state = {
    curTime: new Date().toLocaleString(),
  }

  componentDidMount() {

    setInterval(() => {
      this.setState({
        curTime: new Date().toLocaleString(),
      })
    }, 1000)

  }


  render() {
    let date = new Date();

    return (
      <div className="time-box">
        <div>{moment(this.state.curTime).format('h:mm')}</div>
        <span>{moment(date).format('MMMM Do YYYY')}</span>


      </div>
    )
  }
}

export default TimeBox;

//var Timer = React.createClass({
//   getInitialState: function() {
//     return {secondsElapsed: 0};
//   },
//   tick: function() {
//     this.setState({secondsElapsed: this.state.secondsElapsed + 1});
//   },
//   componentDidMount: function() {
//     this.interval = setInterval(this.tick, 1000);
//   },
//   componentWillUnmount: function() {
//     clearInterval(this.interval);
//   },
//   render: function() {
//     return (
//       <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
//     );
//   }
// });

// ReactDOM.render(<Timer />, mountNode);