const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String,
  username: String,
});

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  userId: { type: mongoose.Types.ObjectId, rel: "USER" },
  priority: String,
});

const userModel = mongoose.model("USER", userSchema);
const todoModel = mongoose.model("TODO", todoSchema);

module.exports = { userModel, todoModel };
