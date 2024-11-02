const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secret = process.env.JWT_SECRET;

const authMiddleware = async (req, res, next) => {
  //  authMiddleware logic here
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.json({ mdg: "give a valid token" });
  }
  try {
    const decoded = await jwt.verify(token, secret);
    if (decoded) {
      req.id = decoded.id;
      next();
    } else {
      res.json({ msg: "invalid token ", decoded });
    }
  } catch (error) {
    res.json({ error: error.message, token: token });
  }
};

module.exports = authMiddleware;
