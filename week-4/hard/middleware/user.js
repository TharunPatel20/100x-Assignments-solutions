require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const z = require("zod");

async function userMiddleware(req, res, next) {
  try {
    const token = req.headers.token;
    // console.log(token);
    const response = await jwt.verify(token, JWT_SECRET);

    if (response) {
      next();
    }
  } catch (err) {
    res.status(403).json({ message: "Incorrect creds" });
  }
}
function validateinput(req, res, next) {
  const { name, email, password } = req.body;
  const validatedSchema = z.object({
    name: z.string().min(3),
    email: z.string().email().min(5),
    password: z.string().min(6).max(12),
  });
  try {
    validatedSchema.parse({ name, email, password });
    next();
  } catch (err) {
    res.status(404).json({
      msg: "not a valid input",
    });
  }
}

// function adminMiddleware(req, res, next) {
//   next();
// }
function adminMiddleware(req, res, next) {
  next();
}

module.exports = {
  userMiddleware,
  validateinput,
  adminMiddleware,
  JWT_SECRET,
};
