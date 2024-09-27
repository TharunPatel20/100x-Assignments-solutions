const { Router } = require("express");
const { adminMiddleware } = require("../middleware/user");
const { User, Todo } = require("../database/index");
const todoRoute = Router();

// Create Todo
todoRoute.post("/", async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const user = await User.findOne({ email: req.headers["email"] });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const todo = await Todo.create({
      userId: user._id,
      title,
      description,
      category,
    });

    return res.status(201).json({ todo });
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
});

// Update Todo
todoRoute.put("/", adminMiddleware, async (req, res) => {
  try {
    const { id, title, description, category } = req.body;
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, description, category },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    return res.status(200).json({ todo });
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
});

// Delete Todo
todoRoute.delete("/", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.body;
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    return res.status(200).json({ msg: "Todo deleted" });
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
});

// Delete Todo by ID
todoRoute.delete("/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    return res.status(200).json({ msg: "Todo deleted" });
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
});

// Fetch all Todos
todoRoute.get("/", adminMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.headers.email });
    const todos = await Todo.find({ userId: user._id });
    // const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // const todos = await Todo.find({ userId: user._id });
    return res.status(200).json({ todos });
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
});

// Fetch Todo by ID
todoRoute.get("/:id", adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ msg: "Todo not found" });
    }

    return res.status(200).json({ todo });
  } catch (e) {
    return res.status(500).json({ err: e.message });
  }
});

module.exports = todoRoute;
