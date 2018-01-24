import React, { Component } from 'react';

class TodoWidget extends Component {
  render () {
    return (
      <div className="todo-widget">
        <h4>Todo:</h4>
        <ul>
          <li>I need to feed the cat <input type="checkbox" /></li>
          <li>I need to finish the project <input type="checkbox" /></li>
          <li>I need to eat <input type="checkbox" /></li>
          <li>I need to feed the cat <input type="checkbox" /></li>
          <li>I need to finish the project <input type="checkbox" /></li>
          <li>I need to eat <input type="checkbox" /></li>
        </ul>
      </div>
    )
  }
}

export default TodoWidget;