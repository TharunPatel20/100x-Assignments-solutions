//  Create a middleware that logs all incoming requests to the console.

const express = require("express");
const app = express();

function logRequests(req, res, next) {
  // write the logic for request log here
  const method = req.method;
  const url = req.originalUrl;
  const timestamp = new Date().toISOString();
  console.log(`${method} ${url} - ${timestamp}`);
  if (req.method == "GET") {
    next();
  } else {
    res.status(404).json({
      msg: "not a get",
    });
  }
}

app.use(logRequests);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello, world!" });
});

module.exports = app;

// app.listen(5009);
