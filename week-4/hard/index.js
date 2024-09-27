const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const todoRoute = require("./routes/todo");
const userRoute = require("./routes/user");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/healthy", (req, res) => res.send("I am Healthy"));

// Define your routes here
app.use("/user", userRoute);
app.use("/todo", todoRoute);

app.listen(port, () =>
  console.log(`Server is running at http://localhost:${port}`)
);
