const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/user");
const taskRoute = require("./routes/todo");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();
// Enable CORS for all routes
// app.use(cors());

app.use(
  cors({
    origin: "http://127.0.0.1:5500", // Specify your frontend's origin
    exposedHeaders: ["Authorization"], // This exposes the Authorization header to the client
  })
);

app.use(express.json());
// app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.use("/user", userRoute);
app.use("/todo", taskRoute);

app.listen(PORT, async () => {
  await mongoose.connect(process.env.MONGOOSE_URL);
  console.log(
    `db connected  and server started and listening on http://localhost:${PORT}`
  );
});
