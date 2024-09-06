/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

// class to initiate  methods or functions
class Todo {
  constructor() {
    this.todos = [];
  }
  // function to add todo
  // pushes the todo to array
  add(todo) {
    this.todos.push(todo);
  }
  // removes the specific index todo
  remove(indexOfTodo) {
    // checks if todo with id exists
    if (indexOfTodo >= 0 && indexOfTodo < this.todos.length) {
      // if exists the todo is deleted
      this.todos.splice(indexOfTodo, 1);
    } else return null;
  }

  // updated the todo for a specific index provided
  update(index, updatedTodo) {
    if (this.todos.length > index && index >= 0) {
      this.todos[index] = updatedTodo;
    } else return null;
  }
  // returns the todo array
  getAll() {
    return this.todos;
  }
  get(indexOfTodo) {
    if (this.todos.length > indexOfTodo && indexOfTodo >= 0) {
      return this.todos[indexOfTodo];
    } else return null;
  }
  // empty the todo list
  clear() {
    this.todos = [];
  }
}
// to run tests
module.exports = Todo;
