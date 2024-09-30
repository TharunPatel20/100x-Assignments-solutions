//  start from here
// const axios = require("axios");
async function getAllTodos() {
  try {
    const response = await axios.get("http://localhost:3000/todo/all");
    const todos = response.data.userTodos;
    document.getElementById("username").innerHTML = todos.userId;
    console.log(todos);
    render(todos);
  } catch (error) {
    console.log("error");
  }
}

function render(todos) {
  const todolist = document.getElementById("todolist");
  todolist.innerHTML = "";
  let count = 1;
  todos.forEach((todo) => {
    console.log(todo);
    const todoDiv = document.createElement("p");
    // todoDiv.classList.add("todolist");
    todoDiv.setAttribute("id", todo._id);
    todoDiv.innerHTML = `<span id:${todo._id}>${count++}.</span>
    <span><b>${todo.title}:</b></span>
    <span><i>${todo.description}</i></span>
    <button onclick="edit('${todo._id}')" id="edit">edit</button>
    <button onclick="deleteTodo('${todo._id}')" id="delete" >del</button>
    <button onclick="strike('${todo._id}')" id="${todo._id}" >over</button>
    `;
    todolist.appendChild(todoDiv);
  });
}
getAllTodos();

async function addTodo() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const data = { title, description };
  try {
    console.log(data);
    axios.post("http://localhost:3000/todo/", data);
    getAllTodos();
  } catch (error) {
    console.log(error.message);
  }
}

function edit(id) {
  console.log("edit function", id);
  const style = "";
  document.getElementById(id).setAttribute("style", style);
}
async function deleteTodo(id) {
  console.log("delete function", id);
  await axios.delete(`http://localhost:3000/todo/${id}`);
  getAllTodos();
}

function strike(id) {
  const style = "text-decoration: line-through;";
  document.getElementById(id).setAttribute("style", style);
}

function userLogout() {
  window.location.href = "home.html";
  alert("logout success ");
}
