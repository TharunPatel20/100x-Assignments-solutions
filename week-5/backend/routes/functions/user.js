const { userModel } = require("../../db/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function userSignup(req, res) {
  try {
    const { email, password, username } = req.body;
    console.log(email, password, username);
    const hashPwd = await bcrypt.hash(password, 6);
    const user = await userModel.create({
      email: email,
      password: hashPwd,
      username: username,
    });
    console.log(user);
    res.status(201).json({ msg: "signup endpoint" });
  } catch (error) {
    res.status(400).json({ msg: "email exists", error: error.message });
  }
}

async function userSignin(req, res) {
  const { email, password } = req.body;
  try {
    const userFound = await userModel.findOne({ email });
    if (!userFound) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, userFound.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: userFound._id.toString() },
      process.env.JWT_SECRET
    );
    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({ user: userFound, token: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function userDetails(req, res) {
  const userId = req.userId;
  console.log();
  try {
    const user = await userModel.findOne({ _id: userId });
    console.log(user);
    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function userLogout(req, res) {
  res.setHeader("token", null);
  res.setHeader("id", null);
  res.json({ msg: "logout sucess" });
}
module.exports = { userSignup, userDetails, userSignin, userLogout };
