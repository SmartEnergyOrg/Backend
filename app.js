require("dotenv").config();

const express = require("express");
const app = express();

// middleware
app.use(express.json());

console.log("hello world");

// routes
app.get("/", (req, res) => {
  res.send(
    "<h1>StatusMonitor Home Energy API</h1><a href='/api/v1/monitors'>test</a>"
  );
});

const port = process.env.PORT || 3333;

const start = async () => {
  try {
    app.listen(port, console.log(`Server listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
