import React from 'react';


const TodoItem = (props) => {
  return (
    <p 
      data-index={props.index}
      style={{
        textDecoration: props.complete ? "line-through" : "none"
      }}
      onClick={props.toggleTodo}
      >
  {props.children}
      </p>
  )
}

export default TodoItem;