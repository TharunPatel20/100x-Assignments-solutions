const { z } = require("zod");
const jwt = require("jsonwebtoken");
require("dotenv").config();

function validateInput(req, res, next) {
  const { email, password, username } = req.body;
  try {
    console.log(email, password, username);
    const validateSchema = z.object({
      email: z.string().min(4),
      password: z.string().min(4).max(10),
      // username: z.string().min(4).max(10),
    });
    console.log(email, password, username);

    validateSchema.parse({ email, password, username });
    next();
  } catch (error) {
    console.log(email, password, username);

    res.status(400).json({ error: error.message });
  }
}
async function authUser(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Get token from 'Authorization' header

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    console.log(
      " printing from in authmiddleware ,UserId from token:",
      req.userId
    );

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ error: error.message }); // Send error if token verification fails
  }
}
let userRequests = {};
setInterval(() => {
  userRequests = {};
}, 1000 * 10);

function rateLimit(req, res, next) {
  const userid = res.userId;
  if (!userRequests[userid]) userRequests[userid] = 0;
  if (userRequests[userid] < 20) {
    userRequests[userid]++;
    next();
  } else {
    res.status(504).json({ msg: "too many requests" });
  }
}

module.exports = { authUser, validateInput, rateLimit };
