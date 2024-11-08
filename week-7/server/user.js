const { Router } = require("express");
const userRoute = Router();
const authMiddleware = require("./auth");

const { User, Course } = require("./db");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.JWT_SECRET;
// User routes

userRoute.post("/users/signup", async (req, res) => {
  // logic to sign up user

  const { username, password } = req.body;
  console.log(username, password);
  try {
    const hashedPwd = await bcrypt.hash(password, 4);
    const userfound = await User.findOne({ username });
    if (userfound) {
      res.status(300).json({ msg: "username exists, try different one" });
    } else {
      await User.create({
        username: username,
        password: hashedPwd,
      });
      res.status(201).json({ msg: "signup success" });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

userRoute.post("/users/login", async (req, res) => {
  // logic to log in user
  const { username, password } = req.body;
  try {
    const userFound = await User.findOne({ username });
    if (!userFound) {
      res.json({ login: "user not found!" });
    } else {
      const verifiedPwd = await bcrypt.compare(password, userFound.password);
      if (!verifiedPwd) {
        res.json({ password: "wrong pwd, re-try" });
      } else {
        const token = jwt.sign({ id: userFound._id }, secret);
        console.log(token);
        res.setHeader("Authorization", `Bearer ${token}`);
        res.status(200).json({
          login: "success",
          jwt: token,
        });
      }
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

userRoute.get("/users/courses", async (req, res) => {
  // logic to list all courses
  try {
    const AllCourses = await Course.find({ published: true });
    res.json({
      AllCourses,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

userRoute.post("/users/courses/:id", authMiddleware, async (req, res) => {
  // logic to purchase a course
  const courseId = req.params.id;
  console.log("purchased" + courseId);
  try {
    const user = await User.findById({ _id: req.id });
    if (!user.purchases.includes(courseId)) {
      user.purchases.push(courseId);
      await user.save();
      res.json({ msg: "course added", courses: user.purchases.length });
    } else {
      res.json({
        msg: "course already purchased",
        courses: user.purchases.length,
      });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
});

userRoute.get("/users/purchasedCourses", authMiddleware, async (req, res) => {
  // logic to view purchased courses
  const userId = req.id;

  try {
    const userDetails = await User.findOne({ _id: userId });
    const userCourses = await Course.find({
      _id: { $in: userDetails.purchases },
    });
    res.json({ userCourses });
  } catch (error) {
    res.json({ error: error.message });
  }
});

userRoute.get("/users/info", authMiddleware, async (req, res) => {
  // logic to view purchased courses
  const userId = req.id;

  try {
    const userDetails = await User.findOne({ _id: userId });
    res.json({
      userDetails:
        userDetails == null ? "invalid token , login first" : userDetails,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = userRoute;
