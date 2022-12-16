const router = require("express").Router();
const solarController = require("../../controllers/powersources/solar.controller");
const windController = require("../../controllers/powersources/wind.controller");
const batteryController = require("../../controllers/powersources/battery.controller");
const nuclearController = require("../../controllers/powersources/nuclear.controller");

router.get("/solar", solarController.getCompleteTimeline);
router.get("/wind", windController.getCompleteTimeline);
router.get("/battery", batteryController.getCompleteTimeline);
router.get("/nuclear", nuclearController.getCompleteTimeline);

module.exports = router;
