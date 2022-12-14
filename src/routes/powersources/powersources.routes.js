const router = require("express").Router();
const solarController = require("../../controllers/powersources/solar.controller");

router.get("", solarController.getCompleteTimeline);

module.exports = router;
