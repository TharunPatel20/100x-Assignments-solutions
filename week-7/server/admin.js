const { Router } = require("express");
const adminRoute = Router();
const authMiddleware = require("./auth");
const { Admin, Course } = require("./db");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const secret = process.env.JWT_SECRET;
// Admin routes
adminRoute.post("/admin/signup", async (req, res) => {
  // logic to sign up admin
  const { username, password } = req.body;
  console.log(username, password);
  try {
    const hashedPwd = await bcrypt.hash(password, 4);
    const userfound = await Admin.findOne({ username });
    if (userfound) {
      res.status(300).json({ msg: "username exists", userfound });
    } else {
      await Admin.create({
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

adminRoute.post("/admin/login", async (req, res) => {
  // logic to log in admin
  const { username, password } = req.body;
  try {
    const userFound = await Admin.findOne({ username });
    if (!userFound) {
      res.json({ msg: "userNotFound" });
    } else {
      const verifiedPwd = await bcrypt.compare(password, userFound.password);
      if (!verifiedPwd) {
        res.json({ password: "wrong , re-try" });
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

adminRoute.post("/admin/courses", authMiddleware, async (req, res) => {
  // logic to create a course
  const { title, description, price, imageLink, published } = req.body;
  const adminId = req.id;
  try {
    if (title == null) {
      res.json({ msg: "add title and price" });
    } else {
      const course = await Course.create({
        title: title,
        description: description,
        imageLink: imageLink,
        published: published,
        price: price,
        adminId,
      });
      res.json({
        msg: "course added",
        course,
      });
    }
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
});

adminRoute.put("/admin/courses/:courseId", authMiddleware, async (req, res) => {
  // logic to edit a course
  const { title, description, price, imageLink, published } = req.body;
  const adminId = req.id;
  try {
    const Updatedcourse = await Course.findByIdAndUpdate(
      { _id: req.params.courseId },
      {
        title: title,
        description: description,
        imageLink: imageLink,
        published: published,
        price: price,
        adminId,
      }
    );
    res.json({
      msg: "course updated",
      Updatedcourse,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

adminRoute.get("/admin/courses", authMiddleware, async (req, res) => {
  // logic to get all courses

  try {
    const adminCourses = await Course.find({ adminId: req.id });
    res.json({
      adminCourses,
    });
  } catch (error) {
    res.json({ error: error.message });
  }
});

adminRoute.delete(
  "/admin/courses/:courseId",
  authMiddleware,
  async (req, res) => {
    // logic to get all courses
    const courseId = req.params.courseId;
    try {
      const adminCourse = await Course.findOneAndDelete({
        _id: courseId,
      });
      if (adminCourse == null) {
        res.status(404).json({
          msg: "already deleted or course not found",
          delete: "failed",
        });
      } else {
        res.status(200).json({
          delete: "success",
        });
      }
    } catch (error) {
      res.json({ error: error.message });
    }
  }
);

module.exports = adminRoute;
