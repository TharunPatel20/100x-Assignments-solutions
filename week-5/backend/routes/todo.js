const { Router } = require("express");
const {
  getAllTodos,
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  getTodoById,
} = require("./functions/todo");
const todoRoute = Router();
const { authUser } = require("../middleware/user");
// todoRoute.use(authUser);
todoRoute.get("/all", getTodos);
todoRoute.post("/", addTodo);
todoRoute.get("/", getAllTodos);
todoRoute.post("/", addTodo);
todoRoute.put("/:id", updateTodo);
todoRoute.delete("/:id", deleteTodo);
todoRoute.get("/:id", getTodoById);

module.exports = todoRoute;
