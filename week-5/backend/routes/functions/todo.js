const { todoModel } = require("../../db/index");

async function getAllTodos(req, res) {
  try {
    const userTodos = await todoModel.find({ userId: req.userId });
    console.log("all todos", req.userId, "usertodos", userTodos);
    res.json({ userTodos });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getTodos(req, res) {
  try {
    const userTodos = await todoModel.findOne({ userId: req.userId });
    console.log("all todos", req.userId);
    res.status(200).json({ userTodos });
  } catch (error) {
    res.status(400).json({ error: error.message, how: "howww" });
  }
}

async function getTodoById(req, res) {
  try {
    const id = req.params.id;
    const userTodo = await todoModel.findOne({ _id: id });
    res.json({ userTodo });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function addTodo(req, res) {
  try {
    const userId = req.userId;
    console.log("add todo", req.userId);
    const { title, description } = req.body;
    const todo = await todoModel.create({
      userId: userId,
      title,
      description,
    });
    console.log(todo);
    res.json({ todo });
    // }
  } catch (error) {
    res.status(400).json({ postEndpoint, error: error.message });
  }
}

async function updateTodo(req, res) {
  try {
    const { title, description } = req.body;
    const todoId = req.params.id;
    const todo = await todoModel.updateOne(
      { _id: todoId },
      {
        title: title,
        description: description,
      }
    );
    const data = await todoModel.findOne({ _id: todoId });
    res.json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function deleteTodo(req, res) {
  try {
    const todoId = req.params.id;
    console.log("whyyy");
    const success = await todoModel.deleteOne({ _id: todoId });
    res.json({ delete: success });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
// async function deleteAllTodos(req, res) {}
module.exports = {
  getAllTodos,
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  getTodoById,
};
