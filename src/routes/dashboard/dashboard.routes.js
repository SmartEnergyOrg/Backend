const router = require("express").Router();
const controller = require("../../controllers/dashboard.controller");

router.get("", controller.helloWorld);

module.exports = router;
