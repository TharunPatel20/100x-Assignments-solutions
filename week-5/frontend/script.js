async function getAllTodos() {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No token found, redirecting to home page");
      window.location.href = "home.html";
      return;
    }
    document.getElementById("username").innerHTML =
      localStorage.getItem("username");

    const response = await axios.get("http://localhost:3000/todo/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const todos = response.data.userTodos;
    console.log(todos);
    render(todos);
  } catch (error) {
    console.log("error", error.message);
  }
}

function render(todos) {
  const todolist = document.getElementById("todolist");
  todolist.innerHTML = "";
  let count = 1;
  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.setAttribute("id", "todo");
    todoDiv.innerHTML = `<h4> 
    <div>${count++}. ${todo.title}:</div>
    <div><button onclick="editTodoPopup('${todo._id}')" id="edit">edit</button>
    <button onclick="deleteTodo('${todo._id}')" id="delete">del</button>
    </div></h4>
    <b>desctiption</b>
    <p><i>${todo.description}</i></p>
    <br> <span>priority : ${todo.priority}</span>
    <br> <span>date created : ${todo.date}</span>

    `;
    todolist.appendChild(todoDiv);
  });
}
getAllTodos();

async function addTodo() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  const token = localStorage.getItem("token");
  const data = { title, description, priority };

  try {
    console.log(data);
    await axios.post("http://localhost:3000/todo/", data, {
      headers: { Authorization: `Bearer ${token}` },
    });
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
  const token = localStorage.getItem("token");
  await axios.delete(`http://localhost:3000/todo/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  getAllTodos();
}

function userLogout() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
  alert("logout success ");
  window.location.href = "home.html";
}

async function verifyUser() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("No token found, redirecting to home page");
    window.location.href = "home.html";
    return;
  }

  try {
    // Send the token to the server to verify
    const response = await axios.get("http://localhost:3000/user/details", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status === 200) {
      const username = response.data.user.username;
      localStorage.setItem("username", username);
      document.getElementById("username").innerHTML = username;
    }
  } catch (error) {
    console.log(error);
    alert("Try again after a minute.");
    window.location.href = "home.html";
  }
}

// Call verifyUser only on login page or after a successful login
if (window.location.pathname === "/home.html") {
  verifyUser();
}

function addTodoPopup() {}
function editTodoPopup(id) {
  addTodoPopup();
  deleteTodo(id);
}
