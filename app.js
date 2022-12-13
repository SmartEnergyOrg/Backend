require("dotenv").config();
const cors = require("cors");
const router = require("./src/routes/router");
// const errors = require("./src/helpers/errors");

const express = require("express");
const app = express();

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

const port = process.env.PORT || 3333;
const start = async () => {
  try {
    app.listen(
      port,
      console.log(`Server listening on http://localhost:${port}/api/`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
