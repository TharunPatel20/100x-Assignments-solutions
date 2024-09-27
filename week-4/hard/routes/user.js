const { Router } = require("express");
const userRoute = Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  userMiddleware,
  validateinput,
  JWT_SECRET,
} = require("../middleware/user");
const { User, Todo } = require("../database/index");

// User Routes

userRoute.post("/signup", validateinput, async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const pwdHash = await bcrypt.hash(password, 5);
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(409).json({ msg: "Email already exists" });
    }

    const dbUser = await User.create({
      email,
      name,
      password: pwdHash,
    });

    return res.status(201).json({ msg: "Signup successful", user: dbUser });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

userRoute.post("/login", validateinput, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const verifyPwd = await bcrypt.compare(password, user.password);
    if (!verifyPwd) {
      return res.status(401).json({ msg: "Incorrect password" });
    }

    const token = await jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.setHeader("Authorization", `Bearer ${token}`);

    return res.status(200).json({ msg: "Login successful", token: token });
  } catch (err) {
    return res.status(500).json({ msg: "Error occurred", err: err.message });
  }
});

userRoute.get("/todos", validateinput, userMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const todos = await Todo.find({ userId: user._id });
    return res.status(200).json({ user: user, todos: todos });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

userRoute.post("/logout", validateinput, userMiddleware, (req, res) => {
  // For stateless token-based systems, this would be handled client-side
  res.setHeader("Authorization", null);
  return res.status(200).json({ msg: "Logout successful" });
});

module.exports = userRoute;
