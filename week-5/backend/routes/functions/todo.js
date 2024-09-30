const { todoModel } = require("../../db/index");

async function getAllTodos(req, res) {
  try {
    const id = req.headers.id;
    const userTodos = await todoModel.find({ userId: id });
    res.json({ userTodos });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function getTodos(req, res) {
  try {
    const userTodos = await todoModel.find();
    res.json({ userTodos });
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
    const userId = req.headers.id || null;
    // if (userId == null) {
    //   res.json({ userId: "invalid user, user id should provide in headers" });
    // } else {
    console.log(userId);
    const { title, description } = req.body;
    const todo = await todoModel.create({
      userId: userId,
      title,
      description,
    });
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
