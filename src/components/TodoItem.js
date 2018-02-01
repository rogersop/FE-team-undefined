import React from 'react';


const TodoItem = (props) => {
  return (
    <div>
      <span className="todoWidget"
        data-index={props.index}
        style={{
        textDecoration: props.complete ? "line-through" : "none"
        }}
        onClick={props.toggleTodo}
      >
        {props.children}
      </span>
      <span className="todoWidget fa fa-times"
        data-index={props.index}
        onClick={props.deleteItem}
      >
      </span>
    </div>
  )
}

export default TodoItem;