const router = require("express").Router();
const controller = require("../../controllers/powersources/powersources.controller");

router.get("", controller.helloWorld);

module.exports = router;
