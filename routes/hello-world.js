const express = require("express");
const router = express.Router();

router.route("/api").get((req, res) => {
  res.send("hello world");
});

module.exports = router;
