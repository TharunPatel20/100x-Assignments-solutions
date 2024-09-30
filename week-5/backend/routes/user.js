const { Router } = require("express");
const userRoute = Router();

const {
  userSignup,
  userSignin,
  userDetails,
  userLogout,
} = require("./functions/user");
const { validateInput, authUser } = require("../middleware/user");

userRoute.post("/signup", validateInput, userSignup);
userRoute.post("/signin", validateInput, userSignin);
userRoute.get("/details", authUser, userDetails);
userRoute.get("/logout", validateInput, userLogout);
// userRoute.get("/oauth", (req, res) => {});
module.exports = userRoute;
