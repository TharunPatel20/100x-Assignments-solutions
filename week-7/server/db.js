const mongoose = require("mongoose");

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  // userSchema here
  username: String,
  password: String,
  purchases: [{ type: mongoose.Types.ObjectId, rel: "Course" }],
});

const adminSchema = new mongoose.Schema({
  // adminSchema here
  password: String,
  username: String,
});

const courseSchema = new mongoose.Schema({
  // courseSchema here
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
  adminId: { type: mongoose.Types.ObjectId, rel: "Admin" },
});

// Define mongoose models
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

module.exports = { User, Admin, Course };
