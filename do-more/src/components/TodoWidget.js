import React, { Component } from 'react';
import TodoItem from './TodoItem'
class TodoWidget extends Component {

  state = {
    todoItems: [],
    inputText: '',
    selectedFilter: "All"
  }


  componentDidMount = () => {
    // need to add functionality to GET todo items from database for the user
    this.setState({
      todoItems: [
        {
          text: "Example todo item, add your own tasks for the day below",
          complete: false
        }
      ],
      selectedFilter: "All"
    }) 
  }

  updateInputText = (event) => {
    this.setState({
      inputText: event.target.value
    })
  }

  addTodoItem = () => {
    const newTodo = {text: this.state.inputText, complete: false}
    if (this.state.inputText === '') return;
    this.setState({
      todoItems: [...this.state.todoItems, newTodo]
    })
    // need to add functionality to PUT new todo item in database for the user
  }

  setFilterAll = () => {
    this.setState({
      selectedFilter: "All"
    })
  }

  setFilterDone = () => {
    this.setState({
      selectedFilter: "Done"
    })
  }

  setFilterTodo = () => {
    this.setState({
      selectedFilter: "Todo"
    })
  }

  filterTodos = (todos, filter) => {
    return todos.filter(todo => {
      if(filter === "Done") return todo.complete
      else if( filter === "Todo") return !todo.complete
      else return true;
    })
  }

  toggleTodo = (event) => {
    const index = +event.target.dataset.index

    const todo = this.state.todoItems[index]

    const newTodo = Object.assign({}, todo, {
      complete: !todo.complete
    })

    const newTodos = [
      ...this.state.todoItems.slice(0, index),
      newTodo,
      ...this.state.todoItems.slice(index + 1)
    ]

    this.setState({
      todoItems: newTodos
    })
  }


  render() {
    const {todoItems, inputText, selectedFilter} = this.state;

    return (
      <div className="todo-widget">
        <div className="todo-header">
          <h3>To-Do:</h3>
        </div>
        <div className="todo-list">
        {this.filterTodos(todoItems, selectedFilter).map((item, i) => {
         return <TodoItem
           key={i} 
           index={i}
           complete={item.complete}
           toggleTodo={this.toggleTodo}
           >
           {item.text}
           </TodoItem>
        })}
        </div>

        <div className="todo-footer">
          <div className="todo-filter">
            <span className="filter-option" onClick={this.setFilterAll} value="All">All</span>{" | "}
            <span className="filter-option" onClick={this.setFilterDone} value="Done">Done</span>{" | "}
            <span className="filter-option" onClick={this.setFilterTodo} value="To-Do">To-Do</span>
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



