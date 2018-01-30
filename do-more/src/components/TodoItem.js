import React from 'react';


const TodoItem = (props) => {
  return (
    <div>
      <span id="todoWidget"
        data-index={props.index}
        style={{
        textDecoration: props.complete ? "line-through" : "none"
        }}
        onClick={props.toggleTodo}
      >
        {props.children}
      </span>
      <span id="todoWidget"
        data-index={props.index}
        onClick={props.deleteItem}
      >
        [x]
      </span>
    </div>
  )
}

export default TodoItem;