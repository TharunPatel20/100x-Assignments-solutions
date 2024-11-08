//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

const mongoose = require("mongoose");
app.use(cors());
const userRoute = require("./user");
const adminRoute = require("./admin");

const port = process.env.PORT;
const db_url = process.env.DB_URL;

app.use("/", userRoute);
app.use("/", adminRoute);
app.get("/", (req, res) => {
  res.json({ msg: "home" });
});
app.listen(port || 5000, () => {
  mongoose.connect(db_url);
  console.log("Server is listening on port " + port);
});
