const mongoose = require("mongoose");
require("dotenv").config();
// Connect to MongoDB
mongoose.connect(process.env.mongooseURL);

// Define schemas

const UserSchema = new mongoose.Schema({
  // Schema definition here
  email: {
    type: String,
    unique: true,
  },
  password: { type: String },
  name: { type: String },
});

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  User,
  Todo,
};
