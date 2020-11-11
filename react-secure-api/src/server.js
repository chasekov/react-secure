// Configurations
require("dotenv").config();

// Importing modules
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB @ 27017");
});

// Defaults
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());

// Middlware
app.use(require("./middleware/authorized")());

// Routes
app.use("/user", require("./route/user"));

// Creating server
const port = 3001;
app.listen(port, () => {
  console.log("Server running at port: " + port);
});
