require("dotenv").config();
const cors = require("cors");
const router = require("./src/routes/router");
// const errors = require("./src/helpers/errors");

const express = require("express");
const { default: Logger } = require("js-logger");
const app = express();

// // Log messages will be written to the window's console.
// Logger.useDefaults();

// middleware
app.use(express.json());
app.use(cors());

app.use("/api", router);

// error responses
app.use("*", (err, req, res, next) => {
  console.error(`${err.name}: ${err.message}`);
  next(err);
});

// app.use("*", errors.handlers);

app.use("*", (err, req, res, next) => {
  if (err.code === "invalid_token") {
    res.status(401).json({
      error: "Token invalid",
    });
  } else {
    res.status(500).json({
      error: "something unexpected happened. please contact developers",
    });
  }
});

const port = 3333;

app.listen(port, console.log(`💡 Server is listening for requests`));

module.exports = app;
