import React, { Component } from 'react';

class TodoWidget extends Component {

  state = {
    todoItems: [],
    inputText: ''
  }


  componentDidMount = () => {
    // need to add functionality to GET todo items from database for the user
    this.setState({
      todoItems: [
        {
          text: "this is my first todo item",
          complete: false
        },
        {
          text: "this is my first todo item again",
          complete: false
        },
        {
          text: "this is my first todo item again again",
          complete: false
        },
        {
          text: "this is my first todo item again again again",
          complete: true
        }
      ]
    }) 
  }

  updateInputText = (event) => {
    this.setState({
      inputText: event.target.value
    })
  }

  addTodoItem = () => {
    console.log(this.state.todoItems, "state before addtodo setstate")
    const newTodo = {text: this.state.inputText, complete: false}
    if (this.state.inputText === '') return;
    this.setState({
      todoItems: [...this.state.todoItems, newTodo]
    })
    // need to add functionality to PUT new todo item in database for the user
  }

  // filterTodoList () => {

  // }


  render() {
    const {todoItems, inputText} = this.state;

    return (
      <div className="todo-widget">
        <div className="todo-header">
          <h3>To-Do:</h3>
        </div>
        <div className="todo-list">
        {todoItems.map((item, i) => {
          return <div key={i} className="todo-item">
              <p>{item.text}</p>
            </div>
        })}
        </div>

        <div className="todo-footer">
          <div className="todo-filter">
            <span>All</span>{" | "}
            <span onClick={this.filterTodoList}>Done</span>{" | "}
            <span>To-Do</span>
          </div>

          <div className="todo-input">
            <input type="text" value={inputText} onChange={this.updateInputText} />
            <button onClick={this.addTodoItem}>Add item</button>
          </div>
        </div>
      </div>
    )
  }
}

export default TodoWidget;