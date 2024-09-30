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
    const token = req.headers.token;
    const success = await jwt.verify(token, process.env.JWT_SECRET);
    if (success) {
      //   res.json({ validToken: success });
      next();
    } else res.json({ validToken: success });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { authUser, validateInput };
